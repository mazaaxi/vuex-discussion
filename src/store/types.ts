import {Module} from 'vuex'

//----------------------------------------------------------------------
//
//  States
//
//----------------------------------------------------------------------

export interface RootState {
  [ProductsTypes.PATH]: ProductsModule
  [CartTypes.PATH]: CartModule
}

export interface ProductsState {
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

export interface ProductsModule extends Module<ProductsState, RootState> {}

export interface CartModule extends Module<CartState, RootState> {}

//----------------------------------------------------------------------
//
//  Types
//
//----------------------------------------------------------------------

export namespace ProductsTypes {
  export const PATH = 'products'

  export const ALL = 'all'

  export const GET_BY_ID = 'getById'

  export const PULL_ALL = 'pullAll'

  export const SET_ALL = 'setAll'

  export const DECREMENT_INVENTORY = 'decrementInventory'
}

export namespace CartTypes {
  export const PATH = 'cart'

  export const CHECKOUT_STATUS = 'checkoutStatus'

  export const ITEMS = 'items'

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

export interface Product {
  id: string
  title: string
  price: number
  inventory: number
}

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
