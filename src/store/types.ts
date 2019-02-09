import {Module} from 'vuex'
import {Product as APIProduct} from '@/api'

//----------------------------------------------------------------------
//
//  States
//
//----------------------------------------------------------------------

export interface RootState {
  counter: CounterModule
  product: ProductModule
  cart: CartModule
}

export interface ProductState {
  all: Product[]
}

export interface CartState {
  items: CartItem[]
  checkoutStatus: CheckoutStatus
}

export interface CounterState {
  counter: number
}

//----------------------------------------------------------------------
//
//  Modules
//
//----------------------------------------------------------------------

export interface ProductModule extends Module<ProductState, RootState> {}

export interface CartModule extends Module<CartState, RootState> {}

export interface CounterModule extends Module<CounterState, RootState> {}

//----------------------------------------------------------------------
//
//  Types
//
//----------------------------------------------------------------------

export namespace ProductTypes {
  export const PATH = 'product'

  export const ALL = 'all'

  export const GET_BY_ID = 'getById'

  export const PULL_ALL = 'pullAll'

  export const SET_ALL = 'setAll'

  export const DECREMENT_INVENTORY = 'decrementInventory'
}

export namespace CartTypes {
  export const PATH = 'cart'

  export const CHECKOUT_STATUS = 'checkoutStatus'

  export const ITEMS = 'cartItems'

  export const TOTAL_PRICE = 'totalPrice'

  export const CHECKOUT = 'checkout'

  export const ADD_PRODUCT_TO_CART = 'addProductToCart'

  export const SET_ITEMS = 'setItems'

  export const SET_CHECKOUT_STATUS = 'setCheckoutStatus'

  export const PUSH_PRODUCT_TO_CART = 'pushProductToCart'

  export const INCREMENT_ITEM_QUANTITY = 'incrementItemQuantity'
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
