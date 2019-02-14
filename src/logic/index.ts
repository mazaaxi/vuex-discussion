import Vue from 'vue'
import {Logic, ShopLogic} from '@/logic/types'
import {ShopLogicImpl} from '@/logic/shop'

class LogicImpl implements Logic {
  m_shop: ShopLogic = new ShopLogicImpl()

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
