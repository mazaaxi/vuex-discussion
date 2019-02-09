//----------------------------------------------------------------------
//
//  API
//
//----------------------------------------------------------------------

export interface API {
  readonly shop: ShopAPI
}

export interface ShopAPI {
  getProducts(): Promise<Product[]>

  buyProducts(products: Array<{id: string; quantity: number}>): Promise<void>
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
