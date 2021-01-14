<template>
  <div
    ref="mobileOrTabletElm"
    class="mobile-or-tablet"
    @touchstart="onTouchStart"
  >
    <canvas
      ref="threeElm"
      :width="threeBaseSize.width.value"
      :height="threeBaseSize.height.value"
    />

    <ray-caster-checker
      v-show="didTouchStart"
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
    const mobileOrTabletElm = ref(null)
    const threeElm = ref(null)

    const point = inject(INJECTION_KEY_POINT)

    const threeBaseSize = initializeThreeBaseSize()
    const three = initializeThree(threeBaseSize)

    const rayCaster = initializeRayCaster(three.camera)

    const didTouchStart = ref(false)

    onMounted(async () => {
      window.addEventListener('resize', debounce(onResized, 500))
      await nextTick()
      threeBaseSize.updateSize({ width: mobileOrTabletElm.value.clientWidth, height: mobileOrTabletElm.value.clientHeight })
      three.execute(threeElm)
    })

    watch(three.rotateY, () => {
      rayCaster.checkWhetherTheMouseOnMeshs(point, three.textGroup.value.children)
    })

    const onTouchStart = (event) => {
      didTouchStart.value = true
      point.update(event.touches[0])
      rayCaster.checkWhetherTheMouseOnMeshs(point, three.textGroup.value.children)
    }

    const onResized = async () => {
      await nextTick()
      threeBaseSize.updateSize({ width: mobileOrTabletElm.value.clientWidth, height: mobileOrTabletElm.value.clientHeight })
      three.onResized()
    }

    return {
      mobileOrTabletElm,
      threeElm,

      point,
      threeBaseSize,
      three,
      rayCaster,
      didTouchStart,

      onTouchStart
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-or-tablet {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>