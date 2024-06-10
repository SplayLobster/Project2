<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">X</button>
      <h2>Payment Details</h2>
      <form @submit.prevent="handlePayment">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <input
            type="text"
            maxlength="16"
            id="cardNumber"
            v-model="paymentData.cardNumber"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div class="form-group">
          <label for="cardName">Cardholder Name</label>
          <input
            type="text"
            id="cardName"
            v-model="paymentData.cardName"
            placeholder="J. Smith"
            required
          />
        </div>
        <div class="form-group form-group-inline">
          <div>
            <label for="expiryDate">Expiry Date</label>
            <input
              class="number-input"
              maxlength="5"
              type="text"
              id="expiryDate"
              v-model="paymentData.expiryDate"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label for="cvv">CVV/CVC</label>
            <input
              maxlength="3"
              type="text"
              id="cvv"
              v-model="paymentData.cvv"
              placeholder="007"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="billingAddress">Billing Address</label>
          <input type="text" id="billingAddress" v-model="paymentData.billingAddress" required />
        </div>
        <button type="submit" class="payment-submit">Submit Payment</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['close'])

const paymentData = ref({
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  billingAddress: ''
})

const resetForm = () => {
  paymentData.value = {
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  }
}
const handlePayment = () => {
  // Implement payment logic here
  alert('Payment Submitted')
  close()
}

const close = () => {
  resetForm()
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group-inline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

input[type='text'],
input[type='number'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.payment-submit {
  width: 100%;
  padding: 10px;
  background: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.payment-submit:hover {
  background: #0056b3;
}
</style>
