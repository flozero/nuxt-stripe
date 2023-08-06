<template>
  <h1>Nuxt Stripe module test</h1>
  <client-only>
    <code>
      {{ stripeClient ? stripeClient : 'Loading...' }}
    </code>
  </client-only>
  <OtherComponent />
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'

const stripeClient = await useClientStripe()
</script>
