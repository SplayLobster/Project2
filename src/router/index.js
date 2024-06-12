import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '@/views/Catalog.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog,
      meta: {
        title: 'IntraNet'
      }
    },
    {
      path: '/product/:title',
      name: 'ProductView',
      component: ProductDetail,
      props: (route) => ({ name: decodeURIComponent(route.params.title) }) // Decode the product name
    },
    {
      path: '/cart',
      name: 'CartView',
      component: Cart
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
