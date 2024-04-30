<template>
  <div>Other component using stripe</div>
  <section>
    <h2>Stripe client</h2>
    <client-only>
      <code>
        {{ stripeClient ? stripeClient : 'Loading...' }}
      </code>
    </client-only>
  </section>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'

const stripeClient = await useClientStripe()
</script>
