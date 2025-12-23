<template>
  <div>Other component using stripe</div>
  <section>
    <h2>Stripe client</h2>
    <ClientOnly>
      <div v-if="isLoading">Loading Stripe...</div>
      <code v-else-if="stripe">
        Stripe instance: {{ stripe }}
      </code>
      <button v-else @click="loadStripe()">Load Stripe Manually</button>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'
const { stripe, isLoading, loadStripe } = useClientStripe()
</script>
