<template>
  <div>
    <div>Other component using stripe</div>
    <section>
      <h2>Stripe client</h2>
      <code>
        {{ stripeClient ? stripeClient : 'Loading...' }}
      </code>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'
const stripeClient = await useClientStripe()
</script>
