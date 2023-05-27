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
              interactivity: {
                  events: {
                    onclick: {
                      enable: true,
                      mode: "push",
                    },
                    onhover: {
                      enable: true,
                      mode: "repulse",
                    },
                  },
                  modes: {
                     push: {
                      quantity: 0,
                     },
                     repulse: {
                      distance: 100,
                     },
                  }
              },
              particles: {
                number: {
                  value: 60,
                },
                links: {
                    enable: true,
                    distance: 200,
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