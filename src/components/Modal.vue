<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">X</button>
      <h2>Payment Details</h2>
      <form @submit.prevent="handlePayment">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" v-model="paymentData.cardNumber" required />
        </div>
        <div class="form-group">
          <label for="cardName">Cardholder Name</label>
          <input type="text" id="cardName" v-model="paymentData.cardName" required />
        </div>
        <div class="form-group form-group-inline">
          <div>
            <label for="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              v-model="paymentData.expiryDate"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="paymentData.cvv" required />
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
