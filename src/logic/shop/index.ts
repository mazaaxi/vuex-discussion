import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {api} from '@/api'
import {store} from '@/store'
import {CartItem, CheckoutStatus, Product, ShopLogic} from '@/logic/types'

@Component
export class ShopLogicImpl extends Vue implements ShopLogic {
  get allProducts(): Product[] {
    return store.product.all
  }

  async pullAllProducts(): Promise<void> {
    const products = await api.shop.getProducts()
    store.product.setAll(products)
  }

  get cartItems(): CartItem[] {
    return store.cart.items
  }

  get cartTotalPrice(): number {
    return store.cart.totalPrice
  }

  get checkoutStatus(): CheckoutStatus {
    return store.cart.checkoutStatus
  }

  addProductToCart(productId: string): void {
    store.cart.setCheckoutStatus(CheckoutStatus.None)
    const product = this.m_getProductById(productId)
    if (product.inventory > 0) {
      const cartItem = store.cart.items.find(item => item.id === product.id)
      if (!cartItem) {
        store.cart.addProductToCart(product)
      } else {
        store.cart.incrementItemQuantity(productId)
      }
      // 在庫を1つ減らす
      store.product.decrementInventory(productId)
    }
  }

  async checkout(): Promise<void> {
    store.cart.setCheckoutStatus(CheckoutStatus.None)
    try {
      await api.shop.buyProducts(this.cartItems)
      store.cart.setItems([]) // カートを空にする
      store.cart.setCheckoutStatus(CheckoutStatus.Successful)
    } catch (err) {
      store.cart.setCheckoutStatus(CheckoutStatus.Failed)
    }
  }

  m_getProductById(productId: string): Product {
    const result = store.product.getById(productId)
    if (!result) {
      throw new Error(`A Product that matches the specified productId "${productId}" was not found.`)
    }
    return result
  }
}
