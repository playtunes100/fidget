
import './App.css';
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, DeviceOrientationControls} from '@react-three/drei'



function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function App() {

  dcontrols = new DeviceOrientationControls ( camera, renderer.domElement );

  instructions.addEventListener( 'touchstart', function (evt) {
				
                dcontrols.enabled = true;
                evt.preventDefault();
				console.log ('touch test');
                dcontrols.enabled = true;
                instructions.style.display = 'none';
                blocker.style.display = 'none';

			}, false );

  return (
    
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} />
      <OrbitControls autoRotate={true} autoRotateSpeed={0.5} />
      <DeviceOrientationControls />
    </Canvas>

  );
}

export default App;