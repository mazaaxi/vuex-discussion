import {Product as APIProduct} from '@/api'

//----------------------------------------------------------------------
//
//  States
//
//----------------------------------------------------------------------

export interface ProductState {
  all: Product[]
}

export interface CartState {
  items: CartItem[]
  checkoutStatus: CheckoutStatus
}

//----------------------------------------------------------------------
//
//  Modules
//
//----------------------------------------------------------------------

export interface Store {
  products: ProductsModule

  cart: CartModule
}

export interface ProductsModule {
  all: Product[]

  getById(productId: string): Product | undefined

  setAll(products: Product[]): void

  decrementInventory(productId: string): void
}

export interface CartModule {
  items: CartItem[]

  totalPrice: number

  checkoutStatus: CheckoutStatus

  setItems(items: CartItem[]): void

  setCheckoutStatus(status: CheckoutStatus): void

  addProductToCart(product: Product): void

  incrementItemQuantity(productId: string): void
}

//----------------------------------------------------------------------
//
//  Data types
//
//----------------------------------------------------------------------

export type Product = APIProduct

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
}

//----------------------------------------------------------------------
//
//  Enumerations
//
//----------------------------------------------------------------------

export enum CheckoutStatus {
  None = 'none',
  Failed = 'failed',
  Successful = 'successful',
}
