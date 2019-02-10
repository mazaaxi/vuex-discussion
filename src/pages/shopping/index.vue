<template>
  <div>
    <h1>Shopping Cart Example</h1>

    <hr />

    <h2>Products</h2>
    <ul>
      <li v-for="product in allProducts" :key="product.id">
        {{ product.title }} - {{ `$ ${product.price}` }}
        <br />
        <button :disabled="!product.inventory" @click="m_addButtonOnClick(product)">
          Add to cart
        </button>
      </li>
    </ul>

    <hr />

    <h2>Your Cart</h2>
    <div>
      <p v-show="!cartItems.length"><i>Please add some products to cart.</i></p>
      <ul>
        <li v-for="cartItem in cartItems" :key="cartItem.id">{{ cartItem.title }} - {{ `$ ${cartItem.price}` }} x {{ cartItem.quantity }}</li>
      </ul>
      <p>Total: {{ `$ ${cartTotalPrice}` }}</p>
      <p><button :disabled="!cartItems.length" @click="m_checkoutButtonOnClick">Checkout</button></p>
      <p v-show="m_checkoutStatus">Checkout {{ m_checkoutStatus.message }}.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {mapActions, mapGetters} from 'vuex'
import {CartTypes, CheckoutStatus, Product, ProductsTypes} from '@/store'

@Component({
  computed: {
    ...mapGetters(ProductsTypes.PATH, {
      allProducts: ProductsTypes.ALL,
    }),
    ...mapGetters(CartTypes.PATH, {
      cartItems: CartTypes.ITEMS,
      cartTotalPrice: CartTypes.TOTAL_PRICE,
      checkoutStatus: CartTypes.CHECKOUT_STATUS,
    }),
  },
  methods: {
    ...mapActions(ProductsTypes.PATH, {
      pullAllProducts: ProductsTypes.PULL_ALL,
    }),
    ...mapActions(CartTypes.PATH, [CartTypes.ADD_PRODUCT_TO_CART, CartTypes.CHECKOUT]),
  },
})
export default class ShoppingPage extends Vue {
  checkoutStatus!: CartTypes.checkoutStatus

  addProductToCart!: CartTypes.addProductToCart

  pullAllProducts!: ProductsTypes.pullAll

  checkout!: CartTypes.checkout

  async created() {
    await this.pullAllProducts()
  }

  get m_checkoutStatus(): {result: boolean; message: string} {
    const checkoutStatus = this.checkoutStatus
    const result = checkoutStatus === CheckoutStatus.None || checkoutStatus === CheckoutStatus.Successful
    return {
      result,
      message: result ? '' : 'Checkout failed.',
    }
  }

  async m_addButtonOnClick(product: Product): Promise<void> {
    await this.addProductToCart(product.id)
  }

  async m_checkoutButtonOnClick(): Promise<void> {
    await this.checkout()
  }
}
</script>
