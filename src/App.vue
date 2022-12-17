<template>
  <provider-confirm>
    <router-view />
  </provider-confirm>
</template>

<script>
import ProviderConfirm from '@/components/ProviderConfirm.vue';
export default {
  components: { ProviderConfirm },
};
</script>
