<template>
  <div class="flex flex-col gap-6 md:flex-row">
    <div v-if="pending">
      Loading
    </div>
    <div v-else-if="error">
      Error {{ error.message }}
    </div>
    <div v-else>
      <div>
        <SfButton
          class="font-semibold !bg-neutral-900"
          type="button"
          @click="refresh"
        >
          Refresh
        </SfButton>
      </div>
      <div class="grid grid-cols-2 gap-4 p-4">
        <div
          v-for="p in data.data"
          :key="p.id"
        >
          <div
            class="relative"
            :style="{
              backgroundColor: 'gray',
              width: '300px',
              height: '500px',
              'background-image': 'url(' + p.images[0] + ')',
              'background-size': 'cover',
              'background-position': 'center',
            }
            "
          >
            <div class="absolute bottom-4 right-4">
              <div class="bg-white rounded-lg p-4 flex flex-col justify-center items-center">
                <div class="text-xl font-semibold mb-4">
                  Price: {{ p.default_price.unit_amount / 100 }} {{ p.default_price.currency }}
                </div>
                <SfButton
                  class="font-semibold !bg-neutral-900"
                  type="button"
                  @click="createCheckout(p.default_price.id, p.id)"
                >
                  Give me money human
                </SfButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFetch } from "#imports";

import { SfButton } from '@storefront-ui/vue';

const { data, error, pending, refresh } = await useFetch("/api/stripe/list", {
  onResponse({response}) {
    console.log(response._data)
  },
})

const createCheckout = async (priceId: string, productId: string) => {
  const res = await $fetch("/api/stripe/create-session", {
    method: "POST",
    body: {
      priceId,
      productId
    },
  })

  window.location.href = res.url
}

</script>
