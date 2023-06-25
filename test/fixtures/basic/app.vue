<template>
  <h1>Nuxt Stripe module test</h1>
  <div>
    {{ stripe }}
  </div>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'

const stripe = useClientStripe()
</script>
