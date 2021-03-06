<template>
  <div
    ref="desktopElm"
    class="desktop"
    @mousemove="onMouseMove"
  >
    <canvas
      ref="threeElm"
      :width="threeBaseSize.width.value"
      :height="threeBaseSize.height.value"
    />

    <ray-caster-checker
      v-show="didMouseMove"
      :style="{ top: point.y.value + 'px', left: point.x.value + 'px' }"
      :should-be-active="rayCaster.isTheMouseOnMeshs.value"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { inject, nextTick, onMounted, ref, watch } from 'vue'

import { INJECTION_KEY as INJECTION_KEY_POINT } from '@/modules/point'
import { initializeRayCaster } from '@/modules/rayCaster'
import { initializeThree } from '@/modules/three'
import { initializeThreeBaseSize } from '@/modules/threeBaseSize'

import RayCasterChecker from '@/components/RayCasterChecker'

export default {
  components: {
    RayCasterChecker
  },
  setup () {
    const desktopElm = ref(null)
    const threeElm = ref(null)

    const point = inject(INJECTION_KEY_POINT)

    const threeBaseSize = initializeThreeBaseSize()
    const three = initializeThree(threeBaseSize)

    const rayCaster = initializeRayCaster(three.camera)

    const didMouseMove = ref(false)

    onMounted(async () => {
      window.addEventListener('resize', debounce(onResized, 500))
      await nextTick()
      threeBaseSize.updateSize({ width: desktopElm.value.clientWidth, height: desktopElm.value.clientHeight })
      three.execute(threeElm)
    })

    watch(three.rotateY, () => {
      rayCaster.checkWhetherTheMouseOnMeshs(point, three.textGroup.value.children)
    })

    const onMouseMove = (event) => {
      didMouseMove.value = true
      point.update(event)
      rayCaster.checkWhetherTheMouseOnMeshs(point, three.textGroup.value.children)
    }

    const onResized = async () => {
      await nextTick()
      threeBaseSize.updateSize({ width: desktopElm.value.clientWidth, height: desktopElm.value.clientHeight })
      three.onResized()
    }

    return {
      desktopElm,
      threeElm,

      point,
      threeBaseSize,
      three,
      rayCaster,
      didMouseMove,

      onMouseMove
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>