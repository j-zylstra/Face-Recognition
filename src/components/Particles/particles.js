import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
//import { loadFull } from 'tsparticles';
import { useCallback, useMemo } from 'react';

const ParticlesComponent = () => {
   const options = useMemo(() => {
           return {
            
              fullscreen: {
                enable: true,
              },
              
              particles: {
                number: {
                  value: 70,
                },
                links: {
                    enable: true,
                    distance: 150,
                },
                move: {
                    enable: true,
                },
                
              }

           };
    }, []);


   const particlesInit = useCallback((engine) => {
       loadSlim(engine);
   }, []);


 return <Particles init={particlesInit} options={options}/>;

};

export default ParticlesComponent;