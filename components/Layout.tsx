import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evita ativar a tela cheia se o usuário estiver digitando em um input
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-black">
      <Sidebar />
      {/* 
        Layout Adjustment Logic:
        - Mobile/Tablet Portrait (< lg): mt-16 (Header height), ml-0
        - Mobile/Tablet Landscape (< lg): mt-0, ml-20 (Rail width 80px)
        - Desktop (lg+): mt-0, ml-[320px] (Sidebar width)
      */}
      <main className="flex-1 mt-16 lg:mt-0 landscape:mt-0 lg:ml-[320px] landscape:ml-20 lg:landscape:ml-[320px] relative transition-all duration-300">
        {children}
      </main>
    </div>
  );
};