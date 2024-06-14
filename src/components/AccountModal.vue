<template>
  <v-dialog class="modal-backdrop" v-model="isVisible" max-width="500px" @keydown.esc="closeDialog">
    <v-card class="modal-content">
      <v-toolbar flat class="modal-toolbar">
        <v-toolbar-title>{{ isLogin ? 'Login' : 'Create Account' }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openSettingsDialog" class="modal-settings">
          <img src="./assets/settings.png" alt="Settings" />
        </v-btn>
        <v-btn icon @click="closeDialog" class="modal-close"> X </v-btn>
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
          <v-btn class="submit-btn" type="submit">{{ isLogin ? 'Login' : 'Create Account' }}</v-btn>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn text class="toggle-form-btn" @click="toggleForm">{{
          isLogin ? 'Create Account' : 'Login'
        }}</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn class="logout-btn" @click="logout">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <SettingsModal v-model="isSettingsVisible" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import SettingsModal from '@/components/SettingsModal.vue' // Import the settings component

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
const isSettingsVisible = ref(false)

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

const openSettingsDialog = () => {
  isSettingsVisible.value = true
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
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-toolbar {
  background-color: #0ac6ffad;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-close {
  color: white;
  margin-right: 10px;
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

.submit-btn {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #0ac6ffad;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
}

.submit-btn:hover {
  background-color: #0099cc;
}

.toggle-form-btn {
  width: 100%;
  margin-top: 10px;
  color: #0ac6ffad;
  text-transform: none;
  font-size: 14px;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: red;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
}

.logout-btn:hover {
  background-color: darkred;
}
</style>
