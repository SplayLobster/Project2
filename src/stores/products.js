// stores/products.js
import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: []
  }),
  actions: {
    // Fetch products from API
    fetchProductsFromDB() {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((json) => {
          this.products = json.products
        })
    },

    // Add product to cart
    addToCart(product) {
      // Clone the product to avoid mutation issues
      const productCopy = { ...product }
      this.cart.push(productCopy)
    },

    // Remove all instances of a product from cart
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id)
    },

    // Remove one instance of a product from cart
    removeOneFromCart(id) {
      const index = this.cart.findIndex((item) => item.id === id)
      if (index !== -1) {
        this.cart.splice(index, 1) // Remove one instance of the product
      }
    },

    // Reset the store and fetch products again
    resetStore() {
      this.products = []
      this.fetchProductsFromDB()
    }
  }
})
