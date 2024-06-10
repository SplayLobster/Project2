// stores/products.js
import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    n_products: 0
  }),
  actions: {
    fetchProductsFromDB() {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((json) => {
          this.products = json.products
        })
    },
    setProductCount(count) {
      this.n_products = count
    },
    addToCart(product) {
      this.cart.push(product)
      this.global.setProductCount(this.products.length)
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id)
      this.global.setProductCount(this.products.length)
    },
    resetStore() {
      this.products = []
      this.fetchProductsFromDB()
    }
  }
})
