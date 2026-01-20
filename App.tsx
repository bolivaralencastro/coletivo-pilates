import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Academy } from './pages/Academy';
import { Journal } from './pages/Journal';
import { BlogPost } from './pages/BlogPost';
import { Classes } from './pages/Classes';
import { Shop } from './pages/Shop';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<BlogPost />} />
        <Route path="/aulas" element={<Classes />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </HashRouter>
  );
};

export default App;