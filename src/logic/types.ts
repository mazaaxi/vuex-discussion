import {CartItem, CheckoutStatus, Product} from '@/store'

export interface Logic {
  shop: ShopLogic
}

export interface ShopLogic {
  allProducts: Product[]

  pullAllProducts(): Promise<void>

  cartItems: CartItem[]

  cartTotalPrice: number

  checkoutStatus: CheckoutStatus

  addProductToCart(productId: string): void

  checkout(): Promise<void>
}

export {CartItem, CheckoutStatus, Product}
