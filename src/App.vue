<template>
  <router-view />
</template>

<script>
import { onMounted, provide } from 'vue'

import { initializeGenerals, INJECTION_KEY as INJECTION_KEY_GENERALS } from '@/modules/generals'

export default {
  setup () {
    const generals = initializeGenerals()
    provide(INJECTION_KEY_GENERALS, generals)
    // initialize
    generals.initializeOs()
    generals.updateWindowsInnerSize()

    onMounted(() => {
      window.addEventListener('resize', generals.updateWindowsInnerSize)
    })

    return {
      generals
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
