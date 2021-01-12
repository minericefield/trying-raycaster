import { computed, reactive, toRefs } from 'vue'

export const initializeThreeBaseSize = () => {
  const baseSize = reactive({
    width: 0,
    height: 0
  })

  const isMobileOrTabletAspect = computed(() => baseSize.height > baseSize.width)
  const horizontalRatio = computed(() => baseSize.width / baseSize.height)

  const updateSize = ({ width, height }) => {
    baseSize.width = width
    baseSize.height = height
  }

  return {
    ...toRefs(baseSize),

    isMobileOrTabletAspect,
    horizontalRatio,

    updateSize
  }
}

export const INJECTION_KEY = 'INJECTION_KEY_THREE_BASE_CLIENT_SIZE'
