<template>
  <div>
    <header class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 border-b border-neutral-200 mb-10">
      <div class=" text-2xl text-black">
        Love cats with us
      </div>
      <SfButton
        class="font-semibold !bg-neutral-900 ml-4"
        type="button"
        @click="$router.push('/')"
      >
        Home
      </SfButton>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
</script>
