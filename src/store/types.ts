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

  export type all = Product[]

  export const GET_BY_ID = 'getById'

  export type getById = (productId: string) => Product | undefined

  export const PULL_ALL = 'pullAll'

  export type pullAll = () => Promise<void>

  export const SET_ALL = 'setAll'

  export type setProducts = (products: Product[]) => void

  export const DECREMENT_INVENTORY = 'decrementInventory'
}

export namespace CartTypes {
  export const PATH = 'cart'

  export const CHECKOUT_STATUS = 'checkoutStatus'

  export type checkoutStatus = CheckoutStatus

  export const ITEMS = 'items'

  export type items = CartItem[]

  export const TOTAL_PRICE = 'totalPrice'

  export type totalPrice = number

  export const CHECKOUT = 'checkout'

  export type checkout = () => Promise<void>

  export const ADD_PRODUCT_TO_CART = 'addProductToCart'

  export type addProductToCart = (productId: string) => Promise<void>

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
