import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Cursor } from './components/Cursor';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorProvider } from './context/CursorContext';

// Pages
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const AppContent: React.FC = () => {
  const location = useLocation();

  // Scroll to top instantly when route changes
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Layout>
        <Navigation />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              style={{ willChange: 'opacity, transform, filter' }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </Layout>
      <Cursor />
    </>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Premium loading sequence duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root options={{ 
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical', 
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    }}>
      <CursorProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loader" />
          ) : (
            <Router key="app">
              <AppContent />
            </Router>
          )}
        </AnimatePresence>
      </CursorProvider>
    </ReactLenis>
  );
};

export default App;
