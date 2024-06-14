<template>
  <Home v-if="!isLoading" :bigData="bigData" />
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import Home from './pages/index.vue';
  import '../src/assets/libs/tailwindcss.min.js';

  tailwind.config ={
    prefix: 'aso-',
    corePlugins: {
        preflight: false,
    },
    
    content: ["./**/*.{vue,js}"],
    theme: {
        extend: {
            keyframes: {
                slideToleft: {
                    'from': { transform: 'translateX(20%)' },
                    'to': { transform: 'translateX(0)' },
                },
                slideDown: {
                    'from': { transform: 'translateY(-20%)' },
                    'to': { transform: 'translateY(0)' },
                },
                slideUp: {
                    'from': { transform: 'translateY(0)' },
                    'to': { transform: 'translateY(-150%)' },
                },
            },
            animation: {
                slideToleft: 'slideToleft 0.5s ease',
                slideDown: 'slideDown 0.5s ease',
                slideUp: 'slideUp 0.5s ease',
            }
        }
    }

}

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
  currencySymbol: ``,
  currency_pos: "right_space",
  variations: [],
  fixing_methods_url: "/apps/aso-proxy/assets/images/fixing-methodes",
  frontend_nonce: "841fba2b18"
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


<style scoped>
</style>
