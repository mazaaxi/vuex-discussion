import {CartModule, CartState, RootState, CartItem, CartTypes, CheckoutStatus, Product, ProductState, ProductTypes} from '@/store/types'
import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {api} from '@/api'

export const cartModule = new class implements CartModule {
  namespaced = true

  state: CartState = {
    items: [],
    checkoutStatus: CheckoutStatus.None,
  }

  getters: GetterTree<CartState, RootState> = {
    [CartTypes.CHECKOUT_STATUS](state): CheckoutStatus {
      return state.checkoutStatus
    },

    [CartTypes.CART_ITEMS](state, getters, rootState): CartItem[] {
      const allProducts = (rootState.product as ProductState).all
      return state.items.map(({id, quantity}) => {
        const product = allProducts.find(item => item.id === id)!
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
        }
      })
    },

    [CartTypes.CART_TOTAL_PRICE](state, getters): number {
      const cartItems = getters[CartTypes.CART_ITEMS] as CartItem[]
      return cartItems.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    },

    [CartTypes.GET_CART_ITEM_BY_ID](state, getters, rootState, rootGetters): (productId: string) => CartItem | undefined {
      return (productId: string) => {
        const product = getProductById(rootGetters, productId)
        const cartItem = state.items.find(item => {
          return item.id === productId
        })
        if (!cartItem) return undefined
        return {
          id: cartItem.id,
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        } as CartItem
      }
    },
  }

  mutations: MutationTree<CartState> = {
    [CartTypes.SET_CART_ITEMS](state, items: Array<{id: string; quantity: number}>) {
      state.items = items
    },

    [CartTypes.SET_CHECKOUT_STATUS](state, status: CheckoutStatus) {
      state.checkoutStatus = status
    },

    [CartTypes.PUSH_PRODUCT_TO_CART](state, productId: string) {
      state.items.push({
        id: productId,
        quantity: 1,
      })
    },

    [CartTypes.INCREMENT_ITEM_QUANTITY](state, productId: string) {
      const cartItem = state.items.find(item => item.id === productId)
      if (cartItem) {
        cartItem.quantity++
      }
    },
  }

  actions: ActionTree<CartState, RootState> = {
    async [CartTypes.ADD_PRODUCT_TO_CART](context, productId: string): Promise<void> {
      context.commit(CartTypes.SET_CHECKOUT_STATUS, CheckoutStatus.None)
      const product = getProductById(context.rootGetters, productId)
      if (product.inventory > 0) {
        const cartItem = context.state.items.find(item => item.id === product.id)
        if (!cartItem) {
          context.commit(CartTypes.PUSH_PRODUCT_TO_CART, product.id)
        } else {
          context.commit(CartTypes.INCREMENT_ITEM_QUANTITY, product.id)
        }
        // 在庫を1つ減らす
        context.commit(`${ProductTypes.PATH}/${ProductTypes.DECREMENT_INVENTORY}`, productId, {root: true})
      }
    },

    async [CartTypes.CHECKOUT](context): Promise<void> {
      const cartProducts = [...context.state.items]
      context.commit(CartTypes.SET_CHECKOUT_STATUS, CheckoutStatus.None)
      try {
        await api.shop.buyProducts(cartProducts)
        context.commit(CartTypes.SET_CART_ITEMS, []) // カートを空にする
        context.commit(CartTypes.SET_CHECKOUT_STATUS, CheckoutStatus.Successful)
      } catch (err) {
        context.commit(CartTypes.SET_CHECKOUT_STATUS, CheckoutStatus.Failed)
      }
    },
  }
}()

function getProductById(rootGetters: any, productId: string): Product {
  const path = `${ProductTypes.PATH}/${ProductTypes.GET_PRODUCT_BY_ID}`
  const result = rootGetters[path](productId) as Product | undefined
  if (!result) {
    throw new Error(`A Product that matches the specified productId "${productId}" was not found.`)
  }
  return result
}
