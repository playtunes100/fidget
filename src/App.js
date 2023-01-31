
import './App.css';
import { useRef, useState } from 'react'
import { Canvas, useThree} from '@react-three/fiber'
import { Sky, Image,Text, ScrollControls, Scroll, useScroll} from '@react-three/drei'

function Item({ index, position, scale, ...props }){
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  

  
  

  return (
  <Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} />
  
  
  )
}


function Items({ w = 4, gap = 4 }) {
  const [images, setImages] = useState(["https://scontent-jnb1-1.xx.fbcdn.net/v/t1.6435-9/82449134_1174425096234384_2141610640999972864_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CFOKesJgq6AAX9xAhDM&_nc_ht=scontent-jnb1-1.xx&oh=00_AfBaJeGkoL8mBdszkQuTYu3spV5x3CVwtiWgnEVtmmo4EQ&oe=64009853", "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.6435-9/82449134_1174425096234384_2141610640999972864_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CFOKesJgq6AAX9xAhDM&_nc_ht=scontent-jnb1-1.xx&oh=00_AfBaJeGkoL8mBdszkQuTYu3spV5x3CVwtiWgnEVtmmo4EQ&oe=64009853", "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.6435-9/82449134_1174425096234384_2141610640999972864_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CFOKesJgq6AAX9xAhDM&_nc_ht=scontent-jnb1-1.xx&oh=00_AfBaJeGkoL8mBdszkQuTYu3spV5x3CVwtiWgnEVtmmo4EQ&oe=64009853", "https://scontent-jnb1-1.xx.fbcdn.net/v/t1.6435-9/82449134_1174425096234384_2141610640999972864_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CFOKesJgq6AAX9xAhDM&_nc_ht=scontent-jnb1-1.xx&oh=00_AfBaJeGkoL8mBdszkQuTYu3spV5x3CVwtiWgnEVtmmo4EQ&oe=64009853"])
  const { width } = useThree((device) => device.viewport)
  console.log(width)
  const xW = w + gap
  return (
    <ScrollControls horizontal damping={1} pages={(width - xW + images.length * xW) / width}>
      <Scroll>
        {images.map((url, i) => {
        
        return(
          <group key={'group-'+i}>
              <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[(width <= 4.80 ? (width * 0.7) : w), (width <= 4.80 ? (width * 0.7) : 4), 1]} url={url} />
              <Text key={'text-'+i} index={i} position={[i * xW, -2.5, 0]} fontSize={0.5} color={'black'}>Welcome</Text>
          </group>
        
        
        )})}

        
      </Scroll>
    </ScrollControls>
  )
}


function App() {       

  return (
    
    <Canvas>
      <Sky distance={450} sunPosition={[0, 1, 0]} inclination={0} azimuth={180} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Items/>
      
    </Canvas>

  );
}

export default App;


