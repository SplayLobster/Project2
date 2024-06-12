<template>
  <v-dialog class="modal-backdrop" v-model="isVisible" max-width="500px" @keydown.esc="closeDialog">
    <v-card class="modal-content">
      <v-toolbar flat style="background-color: #0ac6ffad; color: white">
        <v-toolbar-title>{{ isLogin ? 'Login' : 'Create Account' }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="modal-close" @click="closeDialog"> X </v-btn>
      </v-toolbar>
      <v-card-text>
        <form @submit.prevent="submit">
          <div class="form-group">
            <label for="email">Username</label>
            <input
              placeholder="Username"
              id="email"
              class="form-control"
              type="text"
              v-model="form.email"
              required
            />
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              placeholder="Password"
              id="password"
              class="form-control"
              type="password"
              v-model="form.password"
              required
            />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          <v-btn type="submit" style="background-color: #0ac6ffad; color: white">{{
            isLogin ? 'Login' : 'Create Account'
          }}</v-btn>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="toggleForm" style="background-color: #0ac6ffad; color: white">{{
          isLogin ? 'Create Account' : 'Login'
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

// Props and Emits
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['close'])

const isVisible = ref(props.show)
const isLogin = ref(true)

const form = ref({
  email: '',
  password: ''
})

// Error messages
const emailError = ref(null)
const passwordError = ref(null)

const validateForm = () => {
  emailError.value = !form.value.email ? 'Email is required' : null
  passwordError.value =
    form.value.password.length < 8 ? 'Password must be at least 8 characters' : null

  return !emailError.value && !passwordError.value
}

const submit = () => {
  if (validateForm()) {
    if (isLogin.value) {
      // Handle login
      const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
      const account = storedAccounts.find(
        (acc) => acc.email === form.value.email && acc.password === form.value.password
      )
      if (account) {
        console.log('Login successful', account)
        alert('Login successful')
      } else {
        console.log('Invalid login credentials')
        alert('Invalid login credentials')
      }
    } else {
      // Handle account creation
      const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
      const existingAccount = storedAccounts.find((acc) => acc.email === form.value.email)
      if (existingAccount) {
        console.log('Account already exists')
        alert('Account already exists')
      } else {
        storedAccounts.push({ email: form.value.email, password: form.value.password })
        localStorage.setItem('accounts', JSON.stringify(storedAccounts))
        console.log('Account created', form.value)
        alert('Account created')
      }
    }
    closeDialog()
  }
}
const logout = () => {
  localStorage.removeItem('session')
  alert('You have been logged out')
  // Update UI or redirect as needed
}
const toggleForm = () => {
  isLogin.value = !isLogin.value
}

const closeDialog = () => {
  isVisible.value = false
  emit('close')
}

// Watch for prop changes to handle visibility
watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal
  }
)

onMounted(() => {
  isVisible.value = props.show
})
</script>

<style scoped>
.modal-backdrop {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-close {
  position: absolute;
  top: -10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.v-btn {
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  background: #00e5ffcb;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.v-btn:hover {
  background: #0ac6ffad;
}
</style>
