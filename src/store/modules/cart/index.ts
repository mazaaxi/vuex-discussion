import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {CartModule, CartState, CartItem, CheckoutStatus, Product} from '@/store/types'

@Component
export class CartModuleImpl extends Vue implements CartModule {
  m_state: CartState = {
    items: [],
    checkoutStatus: CheckoutStatus.None,
  }

  get items(): CartItem[] {
    return this.m_state.items
  }

  get totalPrice(): number {
    return this.m_state.items.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }

  get checkoutStatus(): CheckoutStatus {
    return this.m_state.checkoutStatus
  }

  setItems(items: CartItem[]): void {
    this.m_state.items = items
  }

  setCheckoutStatus(status: CheckoutStatus): void {
    this.m_state.checkoutStatus = status
  }

  addProductToCart(product: Product): void {
    this.m_state.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    })
  }

  incrementItemQuantity(productId: string): void {
    const cartItem = this.m_state.items.find(item => item.id === productId)
    if (cartItem) {
      cartItem.quantity++
    }
  }
}
