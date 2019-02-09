import {API, ShopAPI} from '@/api/types'
import {ShopAPIImpl} from '@/api/shop'

class APIImpl implements API {
  constructor() {
    this.m_shop = new ShopAPIImpl()
  }

  m_shop: ShopAPI

  get shop(): ShopAPI {
    return this.m_shop
  }
}

export const api: API = new APIImpl()
export * from '@/api/types'
