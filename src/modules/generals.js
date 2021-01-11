import { reactive, computed, toRefs } from 'vue'

const getOs = (userAgent) => {
  const lowerCasedUserAgent = userAgent.toLowerCase()
  if (lowerCasedUserAgent.includes('win')) {
    return 'win'
  } else if (lowerCasedUserAgent.includes('mac')) {
    return 'mac'
  } else {
    return 'unknown'
  }
}

const getBrowser = (userAgent) => {
  const lowerCasedUserAgent = userAgent.toLowerCase()
  if (lowerCasedUserAgent.includes('trident')) {
    return 'ie'
  } else if (lowerCasedUserAgent.includes('edge')) {
    return 'edge'
  } else if (lowerCasedUserAgent.includes('chrome')) {
    return 'chrome'
  } else if (lowerCasedUserAgent.includes('safari')) {
    return 'safari'
  } else if (lowerCasedUserAgent.includes('firefox')) {
    return 'firefox'
  } else if (lowerCasedUserAgent.includes('opera')) {
    return 'opera'
  } else {
    return 'unknown'
  }
}

export const initializeGenerals = () => {
  const generals = reactive({
    os: '',
    browser: '',
    windowsInnerWidth: 0,
    windowsInnerHeight: 0
  })

  const isSpAspect = computed(() => generals.windowsInnerHeight > generals.windowsInnerWidth)

  const initializeOs = () => {
    const userAgent = window.navigator.userAgent
    generals.os = getOs(userAgent)
    generals.browser = getBrowser(userAgent)
  }

  const updateInnerSize = () => {
    generals.windowsInnerWidth = window.innerWidth
    generals.windowsInnerHeight = window.innerHeight
  }

  return {
    ...toRefs(generals),
    isSpAspect,

    initializeOs,
    updateInnerSize
  }
}

export const INJECTION_KEY = 'INJECTION_KEY_GENERALS'
