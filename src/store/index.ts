import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import {CartTypes, ProductsTypes, RootState} from '@/store/types'
import {productsModule} from '@/store/modules/products'
import {cartModule} from '@/store/modules/cart'

Vue.use(Vuex)

export const store = new Vuex.Store<RootState>({
  modules: {
    [ProductsTypes.PATH]: productsModule,
    [CartTypes.PATH]: cartModule,
  },
} as StoreOptions<RootState>)

export * from './types'
