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
      <aside className="hidden lg:flex flex-col w-[320px] min-h-screen fixed left-0 top-0 border-r border-lines bg-white z-50">
        <Link
          to={ROUTES.HOME}
          className="group text-brand-orange w-full aspect-square border-b border-lines flex items-center justify-center"
        >
          <Logo className="w-[90%] h-[90%] transition-transform duration-500 group-hover:scale-105" />
        </Link>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => `
                    block px-8 py-2 text-sm uppercase tracking-widest font-medium transition-all duration-300 border-l-2
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

        <div className="p-6 border-t border-lines mt-auto">
          <a
            href="https://maps.app.goo.gl/aH79mSdnjmKyTM8n8"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-xs text-gray-500 mb-4 leading-relaxed hover:text-brand-orange transition-colors"
          >
            <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
              Como chegar:
            </span>
            Sapphire Studios &amp; Galery<br/>
            R. Joao Pio Duarte Silva, 1350<br/>
            Loja 06 - Corrego Grande<br/>
            Florianopolis - SC, 88034-001
          </a>
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
      <header className="lg:hidden landscape:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-lines z-50 flex items-center justify-between px-6 relative">
         <Link to={ROUTES.HOME} className="block text-black">
            <Logo className="h-10 w-auto" />
         </Link>
         <button
           onClick={() => setIsMenuOpen((open) => !open)}
           className={`absolute left-1/2 -translate-x-1/2 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
             isMenuOpen
               ? 'bg-brand-orange text-white border-brand-orange'
               : 'text-black hover:bg-brand-orange hover:text-white hover:border-brand-orange'
           }`}
           aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
         >
           <span className="material-icons md-18">menu</span>
         </button>
         <a
           href="https://wa.me/5548999770808"
           target="_blank"
           rel="noopener noreferrer"
           className="w-9 h-9 border border-lines text-black flex items-center justify-center rounded-full hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
           aria-label="Agendar visita"
         >
           <span className="material-icons md-18">calendar_today</span>
         </a>
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
            onClick={() => setIsMenuOpen((open) => !open)}
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
            className="fixed inset-x-0 bottom-0 top-16 landscape:top-0 bg-white z-[55] pl-6 landscape:pl-20 lg:hidden flex flex-col justify-center"
          >
             <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-6 flex items-center gap-2 font-mono text-xs uppercase border border-gray-200 pl-4 pr-2 py-2 hover:bg-black hover:text-white transition-colors group"
             >
               Fechar 
               <span className="material-icons md-18 group-hover:text-white text-gray-500">close</span>
             </button>

             <nav className="p-8 grid grid-rows-2 grid-cols-1 landscape:grid-rows-1 landscape:grid-cols-2 gap-8 h-full items-center overflow-y-auto">
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
                
                <div className="border-t border-lines pt-8 landscape:border-t-0 landscape:border-l landscape:pt-0 landscape:pl-8 flex flex-col justify-center h-full">
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
                      <div className="text-sm text-gray-600 max-w-xs">
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                          Como chegar:
                        </span>
                        <p className="font-sans">
                          Sapphire Studios &amp; Galery<br/>
                          R. Joao Pio Duarte Silva, 1350<br/>
                          Loja 06 - Corrego Grande<br/>
                          Florianopolis - SC, 88034-001
                        </p>
                      </div>
                   </div>
                </div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
