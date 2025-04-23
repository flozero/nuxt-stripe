<template>
  <div>
    <div>Other component using stripe</div>
    <section>
      <h2>Stripe client</h2>
      <code>
        {{ stripeOverride ? stripeOverride : "Loading..." }}
      </code>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useClientStripe } from "#imports";
import type { Stripe } from "@stripe/stripe-js";
import { onMounted, ref } from "vue";

const { loadStripe } = useClientStripe();
const stripeOverride = ref<Stripe | null>(null);

onMounted(async () => {
  stripeOverride.value = await loadStripe("key_override");
});
</script>
