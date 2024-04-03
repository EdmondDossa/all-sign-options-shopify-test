<template>
    <Default v-if="skin == 'default'" :config="configData" :manage="manageData"/>
    <Couffo v-if="skin == 'couffo'" :config="configData" :manage="manageData"/>
</template>
  
<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    import Default from '../components/default/index.vue';
    import Couffo from '../components/couffo/index.vue';

    const skin = ref('');
    var configData = ref();
    var manageData = ref();

    const props = defineProps({
        bigData: Object,
    });
    configData.value = props.bigData.currentConfig;
    manageData.value = props.bigData.managesData;
    skin.value = props.bigData.skin;

</script>


<style scoped>
</style>
  