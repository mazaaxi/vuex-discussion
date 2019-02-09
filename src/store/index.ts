import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import {CartTypes, ProductTypes, RootState} from '@/store/types'
import {cartModule} from '@/store/modules/cart'
import {productModule} from '@/store/modules/product'

Vue.use(Vuex)

export const store = new Vuex.Store<RootState>({
  modules: {
    [ProductTypes.PATH]: productModule,
    [CartTypes.PATH]: cartModule,
  },
} as StoreOptions<RootState>)

export * from './types'
