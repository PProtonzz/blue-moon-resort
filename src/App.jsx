import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Scene from './components/Scene';
import UserInterface from './components/UserInterface';

function App() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <Loader 
        containerStyles={{ backgroundColor: '#000' }}
        innerStyles={{ width: '300px' }}
        barStyles={{ backgroundColor: '#1e3a8a' }}
        dataStyles={{ color: '#dbeafe', fontFamily: 'Inter, sans-serif' }}
      />
      
      <div className="absolute inset-0 z-10 pointer-events-none">
        <UserInterface />
      </div>
    </>
  );
}

export default App;
