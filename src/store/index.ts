import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {CartModule, ProductModule, Store} from '@/store/types'
import {CartModuleImpl} from '@/store/modules/cart'
import {ProductModuleImpl} from '@/store/modules/product'

@Component
export class StoreImpl extends Vue implements Store {
  m_product = new ProductModuleImpl()

  get product(): ProductModule {
    return this.m_product
  }

  m_cart = new CartModuleImpl()

  get cart(): CartModule {
    return this.m_cart
  }
}

export const store: Store = new StoreImpl()
export * from './types'
