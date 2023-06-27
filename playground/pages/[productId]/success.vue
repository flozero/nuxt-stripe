<template>
  <div class="flex justify-center items-center flex-col">
    <h1 class="text-4xl mb-4">
      Congratulations ! you finalize the subscription
    </h1>
    <div v-if="pending">
      Loading
    </div>
    <div v-else-if="error">
      Error {{ error.message }}
    </div>
    <div v-else>
      <div
        class="relative"
        :style="{
          backgroundColor: 'gray',
          width: '300px',
          height: '500px',
          'background-image': 'url(' + data.images[0] + ')',
          'background-size': 'cover',
          'background-position': 'center',
        }
        "
      />
    </div>
  </div>
</template>

<script setup>
import { useFetch } from "#imports"
import { useRoute } from "vue-router"
const { params } = useRoute()

const { data, error, pending }  = await useFetch("/api/stripe/product", {
  method: "GET",
  params: {
    productId: params.productId
  }
})

</script>
