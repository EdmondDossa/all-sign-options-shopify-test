<template>
    <Default v-if="skin == 'default'" :config="configData" :manage="manageData" :currency="currencySymbol"/>
    <Couffo v-if="skin == 'couffo'" :config="configData" :manage="manageData" :currency="currencySymbol"/>

</template>
  
<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    import Default from '../components/default/index.vue';
    import Couffo from '../components/couffo/index.vue';

    const skin = ref('');
    var configData = ref();
    var manageData = ref();
    var currencySymbol = ref();

    const props = defineProps({
        bigData: Object,
    });
    configData.value = props.bigData.currentConfig;
    manageData.value = props.bigData.managesData;
    skin.value = props.bigData.skin;
    currencySymbol.value = props.bigData.currencySymbol


</script>


<style scoped>
</style>
  