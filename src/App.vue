<template>
  <router-view />
</template>

<script>
import { onMounted, provide } from 'vue'

import { initializeGenerals, INJECTION_KEY as INJECTION_KEY_GENERALS } from '@/modules/generals'
import { initializePoint, INJECTION_KEY as INJECTION_KEY_POINT } from '@/modules/point'

export default {
  setup () {
    const generals = initializeGenerals()
    provide(INJECTION_KEY_GENERALS, generals)
    // initialize
    generals.initializeClient()
    generals.updateWindowsInnerSize()

    const point = initializePoint()
    provide(INJECTION_KEY_POINT, point)

    onMounted(() => {
      window.addEventListener('resize', generals.updateWindowsInnerSize)
    })

    return {
      generals,
      point
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
