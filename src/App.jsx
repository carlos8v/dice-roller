import { useEffect } from 'react'

import * as CANNON from 'cannon'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * @typedef {Object} Dice
 * @property {THREE.Mesh} mesh
 * @property {CANNON.Body} body
 * @property {THREE.PointLight} light
 */

/**
 * @type {Dice[]}
 */
const dices = []
const dicesNumber = 5

const floorBodyMaterial = new CANNON.Material()
const diceBodyMaterial = new CANNON.Material()

/**
 *
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world
 */
function createMap(scene, world) {
  // const leftBarrierMaterial = new THREE.MeshPhongMaterial({
  //   color: 0xbababa,
  //   side: THREE.DoubleSide,
  // })
  // const leftBarrierGeometry = new THREE.PlaneGeometry(30, 2, 10, 1)
  // const leftBarrier = new THREE.Mesh(leftBarrierGeometry, leftBarrierMaterial)
  // leftBarrier.position.set(-15, 1, 0)
  // leftBarrier.rotateY(Math.PI / 2)
  // scene.add(leftBarrier)

  // const leftBarrierBody = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Plane(),
  //   material: floorBodyMaterial,
  // })
  // leftBarrierBody.position.copy(leftBarrier.position)
  // leftBarrierBody.quaternion.setFromAxisAngle(
  //   new CANNON.Vec3(0, 1, 0),
  //   Math.PI / 2
  // )
  // world.addBody(leftBarrierBody)

  // const rightBarrierMaterial = new THREE.MeshPhongMaterial({
  //   color: 0xbababa,
  //   side: THREE.DoubleSide,
  // })
  // const rightBarrierGeometry = new THREE.PlaneGeometry(30, 2, 10, 1)
  // const rightBarrier = new THREE.Mesh(
  //   rightBarrierGeometry,
  //   rightBarrierMaterial
  // )
  // rightBarrier.position.set(15, 1, 0)
  // rightBarrier.rotateY(Math.PI / 2)
  // scene.add(rightBarrier)

  // const rightBarrierBody = new CANNON.Body({
  //   mass: 0,
  //   shape: new CANNON.Plane(),
  //   material: floorBodyMaterial,
  // })
  // rightBarrierBody.position.copy(rightBarrier.position)
  // rightBarrierBody.quaternion.setFromAxisAngle(
  //   new CANNON.Vec3(0, 1, 0),
  //   -Math.PI / 2
  // )
  // world.addBody(rightBarrierBody)

  const floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xbababa,
    side: THREE.DoubleSide,
  })
  const floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10)
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.receiveShadow = true
  floor.rotation.x = Math.PI / 2
  scene.add(floor)

  const floorBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material: floorBodyMaterial,
  })
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
  world.addBody(floorBody)

  world.addContactMaterial(
    new CANNON.ContactMaterial(floorBodyMaterial, diceBodyMaterial, {
      friction: 0.01,
      restitution: 0.5,
    })
  )
  world.addContactMaterial(
    new CANNON.ContactMaterial(diceBodyMaterial, diceBodyMaterial, {
      friction: 0,
      restitution: 0.5,
    })
  )
}

/**
 * Updated dice mesh with body position
 * @param {Dice} dice
 */
function updateByBodyPosition(dice) {
  dice.mesh.position.copy(dice.body.position)
  dice.mesh.quaternion.copy(dice.body.quaternion)
  dice.light.position.copy(dice.mesh.position)
}

/**
 * Updated dice mesh with body position
 * @param {Dice} dice
 */
function updateByMeshPosition(dice) {
  dice.body.position.copy(dice.mesh.position)
  dice.body.quaternion.copy(dice.mesh.quaternion)
  dice.light.position.copy(dice.mesh.position)
}

/**
 * Create dice mesh and body
 *
 * @returns {Dice} cube
 */
function createDice() {
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
  const materials = [
    new THREE.TextureLoader().load('/D6/D6_1.png'),
    new THREE.TextureLoader().load('/D6/D6_2.png'),
    new THREE.TextureLoader().load('/D6/D6_3.png'),
    new THREE.TextureLoader().load('/D6/D6_4.png'),
    new THREE.TextureLoader().load('/D6/D6_5.png'),
    new THREE.TextureLoader().load('/D6/D6_6.png'),
  ].map(
    (m) =>
      new THREE.MeshPhongMaterial({
        map: m,
        normalMap: new THREE.TextureLoader().load('/D6/normal.png'),
      })
  )

  const mesh = new THREE.Mesh(geometry, materials)
  const body = new CANNON.Body({
    mass: 0.3,
    shape: new CANNON.Box(new CANNON.Vec3(0.75, 0.75, 0.75)),
    material: diceBodyMaterial,
    sleepTimeLimit: 0.02,
  })

  const light = new THREE.PointLight(0xffffff)

  return {
    mesh,
    body,
    light,
  }
}

function randomDiceThrow() {
  for (let i = 0; i < dices.length; i += 1) {
    dices[i].mesh.position.set(0, 10, 0)

    const yRand = Math.random() * 20
    dices[i].mesh.position.x = -15 - (i % 3) * 1.5
    dices[i].mesh.position.y = 2 + Math.floor(i / 3) * 1.5
    dices[i].mesh.position.z = -15 + (i % 3) * 1.5
    dices[i].mesh.quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180
    dices[i].mesh.quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180

    updateByMeshPosition(dices[i])

    const rand = Math.random() * 5
    dices[i].body.velocity.set(25 + rand, 40 + yRand, 15 + rand)
    dices[i].body.angularVelocity.set(
      20 * Math.random() - 10,
      20 * Math.random() - 10,
      20 * Math.random() - 10
    )
  }
}

function initialize() {
  // Initialize camera and scene
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    20000
  )
  camera.position.set(0, 30, 30)

  // Initialize lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-10, 10, 10)
  const directionLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  )
  scene.add(directionalLight, directionLightHelper)

  const spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(10, 25, 2.5)
  spotLight.angle = Math.PI / 6
  spotLight.penumbra = 1
  spotLight.decay = 2
  spotLight.distance = 40

  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = window.innerWidth
  spotLight.shadow.mapSize.height = window.innerHeight
  spotLight.shadow.camera.near = 50
  spotLight.shadow.camera.far = 110
  spotLight.shadow.camera.fov = 30

  const ligthHelper = new THREE.SpotLightHelper(spotLight)
  scene.add(spotLight, ligthHelper)

  // const gridHelper = new THREE.GridHelper(200, 50)
  // scene.add(gridHelper)

  const skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000)
  const skyBoxMaterial = new THREE.MeshPhongMaterial({
    color: 0x111111,
    side: THREE.BackSide,
  })
  const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial)
  scene.add(skyBox)
  scene.fog = new THREE.FogExp2(0x444444, 0.00025)

  const world = new CANNON.World()
  world.gravity.set(0, -9.82 * 20, 0)
  world.broadphase = new CANNON.NaiveBroadphase()
  world.solver.iterations = 16

  createMap(scene, world)

  // Initilize objects
  for (let i = 0; i < dicesNumber; i += 1) {
    const dice = createDice()
    dices.push(dice)

    scene.add(dice.mesh, dice.light)
    world.addBody(dice.body)
  }

  // Render scene
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(animate)

  // TODO: remove debug controls
  const controls = new OrbitControls(camera, renderer.domElement)

  function animate() {
    world.step(1.0 / 60.0)

    for (let i = 0; i < dices.length; i += 1) {
      updateByBodyPosition(dices[i])
    }

    renderer.render(scene, camera)

    // TODO: remove controls
    controls.update()
  }
}

function App() {
  useEffect(() => {
    initialize()
  }, [])

  return <canvas id="canvas" onClick={randomDiceThrow} />
}

export default App
