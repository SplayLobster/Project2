<template>
  <v-dialog v-model="isVisible" max-width="500px" @keydown.esc="closeDialog">
    <v-card>
      <v-toolbar flat class="modal-toolbar">
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog"> X </v-btn>
      </v-toolbar>
      <v-card-text>
        <form @submit.prevent="saveSettings">
          <div class="form-group">
            <label for="name">Change Name</label>
            <input
              placeholder="New Name"
              id="name"
              class="form-control"
              type="text"
              v-model="settings.name"
            />
          </div>
          <div class="form-group">
            <label for="password">Change Password</label>
            <input
              placeholder="New Password"
              id="password"
              class="form-control"
              type="password"
              v-model="settings.password"
            />
          </div>

          <v-btn class="submit-btn" type="submit">Save</v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

// Props and Emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'settingsSaved'])

const isVisible = ref(props.modelValue)

const settings = ref({
  name: '',
  password: ''
})

const saveSettings = () => {
  // Save settings logic (e.g., update localStorage or make API call)
  localStorage.setItem('userSettings', JSON.stringify(settings.value))
  alert('Settings saved!')
  emit('settingsSaved', settings.value)
  closeDialog()
}

const closeDialog = () => {
  isVisible.value = false
  emit('update:modelValue', false)
}

// Watch for prop changes to handle visibility
watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal
  }
)

onMounted(() => {
  isVisible.value = props.modelValue
})
</script>

<style scoped>
.modal-toolbar {
  background-color: #0ac6ffad;
  color: white;
}

.modal-settings {
  font-size: 20px;
  color: white;
  margin-right: 10px;
}

.modal-close {
  color: white;
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
</style>
