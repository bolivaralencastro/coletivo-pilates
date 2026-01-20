import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '../constants';
import { Logo } from './Logo';

const navItems = [
  { label: 'Capa', path: ROUTES.HOME },
  { label: 'O Coletivo', path: ROUTES.ABOUT },
  { label: 'Aulas & Método', path: ROUTES.CLASSES },
  { label: 'TWR Academy', path: ROUTES.ACADEMY },
  { label: 'Journal', path: ROUTES.JOURNAL },
  { label: 'Shop', path: ROUTES.SHOP },
];

export const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Fecha o menu ao mudar de rota
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* =================================================================
          1. DESKTOP SIDEBAR (Standard Swiss Layout)
          Visible only on lg+ screens (Desktop & Large Tablets Landscape)
         ================================================================= */}
      <aside className="hidden lg:flex flex-col w-[320px] h-screen fixed left-0 top-0 border-r border-lines bg-white z-50">
        <div className="p-8 border-b border-lines text-center">
          <Link to={ROUTES.HOME} className="block group text-brand-orange">
            <Logo className="w-64 h-auto mx-auto transition-transform duration-500 group-hover:scale-105" />
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => `
                    block px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-300 border-l-2
                    ${isActive 
                      ? 'border-brand-orange text-black pl-10 font-bold' 
                      : 'border-transparent text-gray-500 hover:text-brand-orange hover:pl-10'}
                  `}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-8 border-t border-lines">
          <p className="font-mono text-xs text-gray-500 mb-4 leading-relaxed">
            FLORIANÓPOLIS, SC<br/>
            R. JOÃO PIO DUARTE SILVA, 1350<br/>
            LOJA 06 - CÓRREGO GRANDE
          </p>
          <a 
            href="https://wa.me/5548999770808" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-3 bg-brand-orange text-white text-center font-mono text-xs uppercase hover:bg-black transition-colors duration-300 group"
          >
            Agendar Visita
          </a>
        </div>
      </aside>

      {/* =================================================================
          2. MOBILE/TABLET PORTRAIT HEADER
          Visible on lg- screens AND portrait orientation
         ================================================================= */}
      <header className="lg:hidden landscape:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-lines z-50 flex items-center justify-between px-6">
         <Link to={ROUTES.HOME} className="block text-black">
            <Logo className="h-10 w-auto" />
         </Link>

         <nav className="flex gap-4 overflow-x-auto no-scrollbar ml-6">
            {navItems.map(item => (
                 <NavLink 
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    text-[10px] font-mono uppercase whitespace-nowrap
                    ${isActive ? 'text-brand-orange font-bold' : 'text-gray-400'}
                  `}
                >
                  {item.label}
                </NavLink>
            ))}
         </nav>
      </header>

      {/* =================================================================
          3. MOBILE/TABLET LANDSCAPE RAIL (New "Swiss Rail")
          Visible ONLY on lg- screens AND landscape orientation
         ================================================================= */}
      <aside className="hidden landscape:flex lg:!hidden flex-col w-20 h-screen fixed left-0 top-0 border-r border-lines bg-white z-[60] justify-between items-center py-4">
          
          {/* Top: Compact Logo */}
          <Link to={ROUTES.HOME} className="flex flex-col items-center text-black">
            <Logo className="w-10 h-10" />
          </Link>

          {/* Middle: Material Icon Menu Trigger */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex-1 w-full flex items-center justify-center group"
          >
            <span className="material-icons text-3xl text-gray-800 group-hover:text-brand-orange transition-colors">menu</span>
          </button>

          {/* Bottom: Action Icon - Changed to Outline Style */}
          <a 
            href="https://wa.me/5548999770808" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 border border-lines text-black flex items-center justify-center rounded-full hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
          >
            <span className="material-icons md-18">calendar_today</span>
          </a>
      </aside>

      {/* =================================================================
          4. FULLSCREEN MENU OVERLAY (Triggered by Rail)
          Used on Landscape Mobile/Tablet
         ================================================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-[55] pl-20 lg:hidden landscape:block flex flex-col justify-center"
          >
             <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-6 flex items-center gap-2 font-mono text-xs uppercase border border-gray-200 pl-4 pr-2 py-2 hover:bg-black hover:text-white transition-colors group"
             >
               Fechar 
               <span className="material-icons md-18 group-hover:text-white text-gray-500">close</span>
             </button>

             <nav className="p-8 grid grid-cols-2 gap-8 h-full items-center overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  <span className="font-mono text-xs text-gray-400 mb-2">NAVEGAÇÃO</span>
                  {navItems.map((item) => (
                    <NavLink 
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `
                        text-2xl font-sans font-bold tracking-tight hover:text-brand-orange transition-colors flex items-center gap-4
                        ${isActive ? 'text-black' : 'text-gray-300'}
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {isActive && <span className="material-icons md-18 text-brand-orange">arrow_right_alt</span>}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
                
                <div className="border-l border-lines pl-8 flex flex-col justify-center h-full">
                   <div className="mb-8">
                     <span className="font-mono text-xs text-gray-400 mb-2 block">CONTATO</span>
                     <p className="font-sans text-lg flex items-center gap-2">
                       <span className="material-icons md-18 text-gray-400">mail</span>
                       coletivopilates@gmail.com
                     </p>
                     <p className="font-sans text-lg flex items-center gap-2 mt-2">
                       <span className="material-icons md-18 text-gray-400">phone</span>
                       +55 48 99977-0808
                     </p>
                   </div>
                   <div>
                      <span className="font-mono text-xs text-gray-400 mb-2 block">ENDEREÇO</span>
                      <p className="font-sans text-sm text-gray-600 max-w-xs">
                        R. João Pio Duarte Silva, 1350<br/>
                        Loja 06 - Córrego Grande<br/>
                        Florianópolis - SC
                      </p>
                   </div>
                </div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
