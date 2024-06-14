<template>
  <Home v-if="!isLoading" :bigData="bigData" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Home from "./pages/index.vue";
const isLoading = ref(true);
var bigData = ref({
  skin: "couffo",
  productID: "",
  product: {},
  currentConfig: {},
  managesData: {
    fonts: [],
    cliparts: [],
    borders: [],
    pageSettings: { titleBalise: "h1" },

    allShapes: [],
    allFixingMethod: [],
    allBorder: [],
    outputOptions: [],
  },
  regularPrice: "40",
  thousandSep: "",
  decimalSep: ",",
  decimals: "0",
  nbDecimals: "0",
  currencySymbol: `${asoCurrency}`,
  currency_pos: "right_space",
  variations: [],
  fixing_methods_url: "/apps/aso-proxy/assets/images/fixing-methodes",
  frontend_nonce: "841fba2b18",
});

onMounted(async () => {
  const aso_confiurator_data = await aso_confiurator_dataFunction();

  // Update currentConfig

  bigData.value = {
    ...bigData.value,
    ...aso_confiurator_data
  };

  isLoading.value = false;

  console.log("big  data ", bigData.value);
});
</script>

<style scoped></style>
