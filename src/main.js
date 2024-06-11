import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

router.beforeEach((to, from, next) => {
  // Set the title based on the route's meta.title property
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    // Set a default title if the route doesn't have a meta.title
    document.title = 'Intranet'
  }
  next()
})

const vuetify = createVuetify({
  components,
  directives
})

library.add(faStar, faStarHalfAlt)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
