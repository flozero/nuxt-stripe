<template>
  <section>
    <h2>Stripe client OtherComponent</h2>
    <code>
        <!-- {{ stripe ? stripe : "Loading..." }} -->
        <div id="linkAuthenticationElement" />
      </code>
  </section>
</template>

<script setup lang="ts">
import { useClientStripe } from "#imports";
import { watch } from "vue";

// import { ref } from "vue";

// const { loadStripe } = useClientStripe();
// if you have already loaded the stripe client in the root component, you can use it here
// you can't re load another client
const { stripe } = useClientStripe();

watch(
  stripe,
  async () => {
    if (stripe.value) {
      // https://github.com/stripe-samples/accept-a-payment/blob/main/payment-element/client/vue-cva/src/components/SrCheckoutForm.vue
      const { clientSecret, error } = await $fetch(
        "/api/create-payment-intent"
      );
      if (error) {
        console.error(error);
        return;
      }

      if (!clientSecret) {
        console.error("Client Secret not initialized");
        return;
      }

      const elements = stripe.value.elements({
        clientSecret: clientSecret as string,
      });
      const linkAuthenticationElement = elements.create("linkAuthentication");
      linkAuthenticationElement.mount("#linkAuthenticationElement");
    }
  },
  {
    immediate: true,
  }
);
</script>
