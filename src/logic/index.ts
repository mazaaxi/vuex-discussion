import Vue from 'vue'
import {Logic, ShopLogic} from '@/logic/types'
import {ShopLogicImpl} from '@/logic/shop'

class LogicImpl implements Logic {
  constructor() {
    this.m_shop = new ShopLogicImpl()
  }

  m_shop: ShopLogic

  get shop(): ShopLogic {
    return this.m_shop
  }
}

export const logic: Logic = new LogicImpl()
Object.defineProperty(Vue.prototype, '$logic', {
  value: logic,
  writable: false,
})

export * from '@/logic/types'
