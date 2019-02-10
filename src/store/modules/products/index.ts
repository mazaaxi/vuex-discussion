import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {Product, ProductsModule, ProductsState, ProductsTypes, RootState} from '@/store/types'
import {api} from '@/api'

export const productsModule = new class implements ProductsModule {
  namespaced = true

  state: ProductsState = {
    all: [],
  }

  getters: GetterTree<ProductsState, RootState> = {
    [ProductsTypes.ALL](state): Product[] {
      return state.all
    },

    [ProductsTypes.GET_BY_ID](state) {
      return (productId: string) => {
        const product = state.all.find(item => item.id === productId)
        return product
      }
    },
  }

  mutations: MutationTree<ProductsState> = {
    [ProductsTypes.SET_ALL](state, products: Product[]): void {
      state.all = products
    },

    [ProductsTypes.DECREMENT_INVENTORY](state, productId: string): void {
      const product = state.all.find(item => item.id === productId)
      if (product) {
        product.inventory--
      }
    },
  }

  actions: ActionTree<ProductsState, RootState> = {
    async [ProductsTypes.PULL_ALL](context): Promise<void> {
      const products = await api.shop.getProducts()
      context.commit(ProductsTypes.SET_ALL, products)
    },
  }
}()
