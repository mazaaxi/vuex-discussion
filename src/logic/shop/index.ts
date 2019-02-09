import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {store} from '@/store'
import {ProductTypes, CartTypes} from '@/store/types'
import {Product, CartItem, CheckoutStatus} from '@/logic/types'
import {ShopLogic} from '@/logic/types'

@Component
export class ShopLogicImpl extends Vue implements ShopLogic {
  get allProducts(): Product[] {
    return store.getters[`${ProductTypes.PATH}/${ProductTypes.ALL}`]
  }

  pullAllProducts(): Promise<void> {
    return store.dispatch(`${ProductTypes.PATH}/${ProductTypes.PULL_ALL}`)
  }

  get cartItems(): CartItem[] {
    return store.getters[`${CartTypes.PATH}/${CartTypes.ITEMS}`]
  }

  get cartTotalPrice(): number {
    return store.getters[`${CartTypes.PATH}/${CartTypes.TOTAL_PRICE}`]
  }

  get checkoutStatus(): CheckoutStatus {
    return store.getters[`${CartTypes.PATH}/${CartTypes.CHECKOUT_STATUS}`]
  }

  addProductToCart(productId: string): Promise<void> {
    return store.dispatch(`${CartTypes.PATH}/${CartTypes.ADD_PRODUCT_TO_CART}`, productId)
  }

  checkout(): Promise<void> {
    return store.dispatch(`${CartTypes.PATH}/${CartTypes.CHECKOUT}`)
  }
}
