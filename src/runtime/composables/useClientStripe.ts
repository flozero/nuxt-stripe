import { useNuxtApp } from "#imports"

export default function useClientStripe() {
  return useNuxtApp().$stripe
}