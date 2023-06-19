import { useNuxtApp } from '#app'

export default function useClientStripe() {
  return useNuxtApp().$stripe
}