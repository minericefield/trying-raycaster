import {
  Box3,
  Group,
  Mesh,
  MeshNormalMaterial,
  MeshLambertMaterial,
  BoxGeometry,
  TextGeometry,
  Vector3
} from 'three'

// thanks to https://github.com/Sean-Bradley/Bender
import Bender from '@/modules/three/bender'

export const initializeAText = (font, text, fullZDistance, position) => {
  const vector3 = new Vector3()
  const options = {
    font,
    size: fullZDistance.value / 40,
    height: fullZDistance.value / 100,
    // bevelEnabled: true,
    // bevelThickness: 0.02,
    // bevelSize: 0.01,
    // bevelOffset: 0,
    // bevelSegments: 5
  }
  const textGeometry = new TextGeometry(text, options)
  const textMaterial = new MeshNormalMaterial()
  const textMesh = new Mesh(textGeometry, textMaterial)
  const originalTextMeshWidth = new Box3().setFromObject(textMesh).getSize(vector3).x
  const originalTextMeshHeight = new Box3().setFromObject(textMesh).getSize(vector3).y
  // add box for background because spaces in the text is not suitable for raycaster
  const backgroundGeometry = new BoxGeometry(originalTextMeshWidth, originalTextMeshHeight, fullZDistance.value / 100)
  const backgroundMaterial = new MeshLambertMaterial({ color: 0xFFFFFF })
  const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial)
  backgroundMesh.position.x = originalTextMeshWidth / 2
  backgroundMesh.position.y = originalTextMeshHeight / 2
  backgroundMesh.rotateY(Math.PI / 10)

  const bender = new Bender()
  const bendingAngle = -Math.PI / (fullZDistance.value * (originalTextMeshWidth / fullZDistance.value * 5))
  bender.bend(textMesh.geometry, 'y', bendingAngle)
  bender.bend(backgroundMesh.geometry, 'y', bendingAngle)

  const aTextGroup = new Group()
  aTextGroup.add(textMesh)
  aTextGroup.add(backgroundMesh)

  switch(position) {
    case 'front':
      aTextGroup.position.z = fullZDistance.value / 4
      break
    case 'right':
      aTextGroup.position.x = fullZDistance.value / 4
      aTextGroup.rotateY(Math.PI / 2)
      break
    case 'back':
      aTextGroup.position.z = -fullZDistance.value / 4
      aTextGroup.rotateY(Math.PI)
      break
    case 'left':
      aTextGroup.position.x = -fullZDistance.value / 4
      aTextGroup.rotateY(-Math.PI / 2)
      break
    default:
      // throw new Error()
  }

  return aTextGroup
}
