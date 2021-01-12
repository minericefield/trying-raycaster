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

// https://dev.to/itsabdessalam/detect-current-device-type-with-javascript-490j
const getDeviceType = (userAgent) => {
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'tablet'
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return 'mobile'
  } else {
    return 'desktop'
  }
}

export const initializeGenerals = () => {
  const generals = reactive({
    os: '',
    browser: '',
    deviceType: '',
    windowsInnerWidth: 0,
    windowsInnerHeight: 0
  })

  const isMobileOrTabletAspect = computed(() => generals.windowsInnerHeight > generals.windowsInnerWidth)

  const initializeClient = () => {
    const userAgent = window.navigator.userAgent

    generals.os = getOs(userAgent)
    generals.browser = getBrowser(userAgent)
    generals.deviceType = getDeviceType(userAgent)
  }

  const updateWindowsInnerSize = () => {
    generals.windowsInnerWidth = window.innerWidth
    generals.windowsInnerHeight = window.innerHeight
  }

  return {
    ...toRefs(generals),
    isMobileOrTabletAspect,

    initializeClient,
    updateWindowsInnerSize
  }
}

export const INJECTION_KEY = 'INJECTION_KEY_GENERALS'
