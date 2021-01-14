import { PlaneGeometry, Mesh, MeshLambertMaterial } from 'three'

// not reactive
export const initializeBackground = (fullZDistance, fullFarWidth, fullFarHeight) => {
  const geometry = new PlaneGeometry(fullFarWidth.value, fullFarHeight.value)
  const material = new MeshLambertMaterial({ color: 0xFFFFFF  })
  const background = new Mesh(geometry, material)
  // background.receiveShadow = true
  background.position.z = -fullZDistance.value / 2

  return background
}