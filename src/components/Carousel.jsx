import React, { useState, useRef, useEffect } from 'react';
import '@/css/Carousel.css';
import { motion, useAnimation } from 'framer-motion';

const Carousel = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const controls = useAnimation();
  const sectionRef = useRef(null);

  const panels = [
    {
      image: '/assets/CVSUweb.png',
      text: 'My Own Version Of The CVSU Website',
      description:
        'We were tasked as our first project in ITEC 50 to create our own version of the CVSU Website.',
      buttonText: 'Visit My Website',
      link: 'https://primoieyasu.github.io/',
    },
    {
      image: '/assets/ITWeb.png',
      text: 'About Us IT Website',
      description:
        'We were tasked as our second project in ITEC 50 to create our own IT Company about us website.',
      buttonText: 'Visit My Website',
      link: 'https://primoieyasu.github.io/FinalITWebsite/',
    },
    {
      image: '/assets/wedding.png',
      text: 'Wedding Catering Reservation System',
      description: 'OOP Project to create our own management system.',
      buttonText: 'Github',
      link: 'https://github.com/PrimoIeyasu/Wedding-Catering-Reservation-System',
    },
    {
      image: '/assets/bbird.jpg',
      text: 'Barrel Bird',
      description: 'A twist on the beloved flappy bird game.',
      buttonText: 'Github',
      link: 'https://github.com/MrkDchvz/BarrelBird',
    },
  ];

  const handleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, ease: 'easeInOut' },
          });
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  return (
    <motion.main
      ref={sectionRef}
      initial={{ opacity: 0, y: 100 }} // Start position off-screen vertically
      animate={controls}
      className="w-screen h-screen bg-black overflow-hidden relative"
    >
      {/* Title */}
      <div className="absolute top-10 left-0 right-0 text-center z-20">
        <h2 className="text-4xl font-bold text-white mb-0.5">My Projects</h2>
        <a className="text-lg font-semibold text-white">(click/tap to open)</a>
      </div>
      <div
        className="h-full w-full overflow-hidden flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${
            panels[expandedIndex]?.image || panels[0].image
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {/* Background blur overlay */}
        <div className="inset-0 absolute bg-[rgba(0,0,0,0.7)] backdrop-blur-md z-0"></div>

        {/* Image carousel and content */}
        <div
          className="flex w-full max-w-7xl h-[80vh] gap-2 items-center justify-center z-10 relative"
          style={{ paddingTop: '30px' }}
        >
          {panels.map((panel, index) => (
            <motion.div
              key={index}
              onClick={() => handleClick(index)}
              className={`h-full rounded-2xl bg-white cursor-pointer transition-all duration-1000 ease-in-out overflow-hidden ${
                expandedIndex === index
                  ? 'w-[200%]'
                  : 'w-[15%] hover:bg-gray-200'
              } min-w-[40px] block relative`}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.1, ease: 'easeInOut' },
              }}
            >
              <img
                src={panel.image}
                alt="panel"
                className="w-full h-full object-cover object-top"
              />

              {/* Centered vertical text */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                  expandedIndex === index
                    ? 'opacity-0 transform scale-0 translate-y-[150%]'
                    : 'bg-[rgba(0,0,0,0.7)]'
                } z-10 text-white text-2xl font-bold`}
                style={{
                  writingMode: 'vertical-rl',
                  transform: expandedIndex === index ? 'none' : 'rotate(0deg)',
                }}
              >
                <span>{panel.text}</span>
              </div>

              {/* Text, button */}
              <div
                className={`absolute bottom-10 left-10 z-20 text-white p-4 bg-[rgba(28,28,34,0.5)] rounded-lg text-container ${
                  expandedIndex === index ? 'show' : 'hide'
                }`}
              >
                <h2 className="text-4xl font-bold">{panel.text}</h2>
                <p className="mt-2 text-lg">{panel.description}</p>
                <a href={panel.link} target="_blank" rel="noopener noreferrer">
                  <button className="mt-4 px-6 py-3 bg-[#66FCF1] hover:bg-[#50c6be] text-black rounded-lg">
                    {panel.buttonText}
                  </button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
};

export default Carousel;