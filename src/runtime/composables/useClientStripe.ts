import { loadStripe } from "@stripe/stripe-js";

import type { Stripe } from "@stripe/stripe-js";
import { onMounted, useNuxtApp, useState } from "#imports";
import type { ModuleOptions } from "nuxt/schema";

/**
 * useClientStripe function
 *
 * This function is a helper to easily access the Stripe instance provided by the Nuxt plugin.
 * It can be used in components or pages to interact with the Stripe.js library.
 *
 */
export default function useClientStripe() {
  const nuxtApp = useNuxtApp();
  const stripe = useState<Stripe | null>("stripe-client", () => null);
  const isLoading = useState("stripe-client-loading", () => false);

  async function _loadStripe(
    key: string | undefined = undefined,
    options: ModuleOptions["client"]["options"] | undefined = undefined
  ) {
    const _key = key ?? nuxtApp.$config.public.stripe.key;
    const _options = options ?? nuxtApp.$config.public.stripe.options;

    if (stripe.value) {
      return stripe.value;
    }

    isLoading.value = true;

    if (!nuxtApp.$config.public.stripe.key && !key)
      console.warn("no key given for Stripe client service");

    const _stripe = await loadStripe(_key, _options);

    isLoading.value = false;
    if (!nuxtApp.$config.public.stripe.manualClientLoad) {
      stripe.value = _stripe;
    }
    return _stripe;
  }

  onMounted(async () => {
    if (nuxtApp.$config.public.stripe.manualClientLoad) return;
    if (!isLoading.value) {
      await _loadStripe(undefined, undefined);
    }
  });

  return {
    loadStripe: _loadStripe,
    stripe,
    isLoading,
  };
}
