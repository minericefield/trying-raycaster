<template>
  <div class="top">
    <desktop v-if="deviceType === 'desktop'" />
    <mobile-or-tablet v-else />
  </div>
</template>

<script>
import { inject } from 'vue'

import { INJECTION_KEY as INJECTION_KEY_GENERALS } from '@/modules/generals'

import Desktop from '@/templates/Desktop.vue'
import MobileOrTablet from '@/templates/MobileOrTablet.vue'

export default {
  components: {
    Desktop,
    MobileOrTablet
  },
  setup () {
    const { deviceType } = inject(INJECTION_KEY_GENERALS)

    return {
      deviceType
    }
  }  
}
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
