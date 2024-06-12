<template>
  <div class="product-comments">
    <h3>Customer Reviews</h3>
    <div v-if="reviews.length === 0">
      <p>No reviews yet.</p>
    </div>
    <div v-else>
      <div v-for="(review, index) in reviews" :key="index" class="review">
        <p class="reviewer">{{ review.reviewerName }}</p>
        <div class="rating">
          <font-awesome-icon
            v-for="star in 5"
            :key="star"
            :icon="star <= review.rating ? 'fas fa-star' : 'far fa-star'"
            class="star-icon"
          />
        </div>
        <p class="comment">{{ review.comment }}</p>
        <p class="date">{{ formatDate(review.date) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  reviews: {
    type: Array,
    required: true
  }
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.product-comments {
  margin-top: 20px;
}

.review {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.reviewer {
  font-weight: bold;
  margin-bottom: 5px;
}

.rating {
  color: #ffd814;
}

.star-icon {
  margin-right: 5px;
}

.comment {
  margin-bottom: 10px;
}

.date {
  font-style: italic;
  color: #666;
}
</style>
