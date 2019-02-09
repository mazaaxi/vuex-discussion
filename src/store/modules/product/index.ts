import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import {Product, ProductModule, ProductState} from '@/store/types'

@Component
export class ProductModuleImpl extends Vue implements ProductModule {
  m_state: ProductState = {
    all: [],
  }

  get all(): Product[] {
    return this.m_state.all
  }

  getById(productId: string): Product | undefined {
    const product = this.m_state.all.find(item => item.id === productId)
    return product
  }

  setAll(products: Product[]): void {
    this.m_state.all = products
  }

  decrementInventory(productId: string): void {
    const product = this.m_state.all.find(item => item.id === productId)
    if (product) {
      product.inventory--
    }
  }
}
