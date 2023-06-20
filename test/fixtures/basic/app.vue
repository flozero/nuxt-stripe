<template>
  <h1>Nuxt Stripe module playground!</h1>
  <div>
    {{ stripe }}
  </div>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports';

const stripe = useClientStripe()
</script>
