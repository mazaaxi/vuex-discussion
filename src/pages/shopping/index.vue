<template>
  <div>
    <h1>Shopping Cart Example</h1>

    <hr />

    <h2>Products</h2>
    <ul>
      <li v-for="product in $logic.shop.allProducts" :key="product.id">
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
      <p v-show="!$logic.shop.cartItems.length"><i>Please add some products to cart.</i></p>
      <ul>
        <li v-for="cartItem in $logic.shop.cartItems" :key="cartItem.id">
          {{ cartItem.title }} - {{ `$ ${cartItem.price}` }} x {{ cartItem.quantity }}
        </li>
      </ul>
      <p>Total: {{ `$ ${$logic.shop.cartTotalPrice}` }}</p>
      <p><button :disabled="!$logic.shop.cartItems.length" @click="m_checkoutButtonOnClick">Checkout</button></p>
      <p v-show="m_checkoutStatus">Checkout {{ m_checkoutStatus.message }}.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {CheckoutStatus, Product} from '@/logic'

@Component
export default class ShoppingPage extends Vue {
  async created() {
    await this.$logic.shop.pullAllProducts()
  }

  get m_checkoutStatus(): {result: boolean; message: string} {
    const checkoutStatus = this.$logic.shop.checkoutStatus
    const result = checkoutStatus === CheckoutStatus.None || checkoutStatus === CheckoutStatus.Successful
    return {
      result,
      message: result ? '' : 'Checkout failed.',
    }
  }

  m_addButtonOnClick(product: Product): void {
    this.$logic.shop.addProductToCart(product.id)
  }

  async m_checkoutButtonOnClick(): Promise<void> {
    await this.$logic.shop.checkout()
  }
}
</script>
