import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';

// Dados dos produtos
// NOTA: Caminhos padronizados para 'cover.jpg' conforme instruções nos READMEs das pastas.
// Assumindo que a pasta 'public' é servida na raiz (padrão React/Vite/Next).
const PRODUCTS = [
  {
    id: 'springs',
    name: "The Springs",
    subtitle: "Are Calling Me",
    price: "R$ 149,00",
    description: "A força das molas e a resistência do corpo. Ilustração técnica detalhada das molas do Cadillac.",
    image: "/products/the-springs-are-calling-me/cover.jpg", 
    tag: "Best Seller"
  },
  {
    id: 'cadillac',
    name: "Ceci n'est pas",
    subtitle: "Un Cadillac",
    price: "R$ 149,00",
    description: "Homenagem surrealista a Magritte. O equipamento não é o método, é apenas a ferramenta.",
    image: "/products/ceci-nest-pas-une-cadillac/cover.jpg",
    tag: "Concept"
  },
  {
    id: 'portraits',
    name: "Portraits",
    subtitle: "Of The Pilates Life",
    price: "R$ 149,00",
    description: "O inventário completo do sistema. Reformer, Wunda, Barrel e a arquitetura do movimento.",
    image: "/products/portraits-of-the-pilates-life/cover.jpg",
    tag: "Collection"
  },
  {
    id: 'tainhas',
    name: "Tainhas",
    subtitle: "From Floripa",
    price: "R$ 149,00",
    description: "Hundred from Pilates vs Tainhas from Floripa. A conexão entre a natureza da ilha e o ritmo do mat.",
    image: "/products/tainha-from-floripa/cover.jpg",
    tag: "Local Hero"
  }
];

export const Shop: React.FC = () => {
  // Função helper para tratar erro de imagem
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    console.warn(`Failed to load image: ${target.src}`);
    
    // Evita loop infinito
    if (target.src.includes('via.placeholder')) return;

    // Fallback para placeholder se a imagem local não existir
    target.src = 'https://via.placeholder.com/800x1000/f4f4f4/111111?text=Product+Image';
    target.style.opacity = '0.8';
    target.style.filter = 'grayscale(100%)';
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="px-8 pt-12 pb-6 border-b border-lines flex justify-between items-end bg-white z-20">
           <div>
              <span className="font-mono text-[10px] md:text-xs text-brand-orange tracking-[0.25em] uppercase block mb-3">Shop</span>
              <h1 className="text-4xl md:text-6xl font-sans font-medium tracking-tight uppercase leading-none">
                Uniforme <span className="font-serif italic text-gray-400">&</span><br/>Lifestyle
              </h1>
           </div>
           <span className="hidden md:block font-mono text-[10px] text-gray-400 tracking-widest text-right">
             COLEÇÃO 2026<br/>FLORIANÓPOLIS
           </span>
        </header>

        {/* PRODUCT GRID (T-SHIRTS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 bg-lines gap-px border-b border-lines">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white group relative flex flex-col">
               
               {/* Image Container */}
               <div className="aspect-[4/5] overflow-hidden relative bg-smoke">
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-lines">
                      {product.tag}
                    </span>
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                    onError={handleImageError}
                  />
                  {/* Hover Overlay CTA */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <a 
                      href="https://app.tecnofit.com.br/ng/online-sale/MTU1MTU/checkout/MTA5NzY1Mg/forms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      Comprar Agora
                    </a>
                  </div>
               </div>

               {/* Info */}
               <div className="p-8 flex flex-col flex-1 justify-between border-t border-lines">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-sans text-2xl font-bold uppercase">{product.name}</h3>
                      <span className="font-mono text-sm text-gray-600">{product.price}</span>
                    </div>
                    <span className="font-mono text-xs text-brand-orange uppercase tracking-widest block mb-4">
                      {product.subtitle}
                    </span>
                    <p className="font-serif text-gray-500 text-sm leading-relaxed max-w-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex gap-2 font-mono text-[10px] text-gray-400 uppercase">
                    <span>Cotton Premium</span>
                    <span>•</span>
                    <span>Unissex</span>
                    <span>•</span>
                    <span>P-GG</span>
                  </div>
               </div>
            </div>
          ))}
        </section>

        {/* ACCESSORIES GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b border-lines">
          
          {/* Socks */}
          <div className="border-b md:border-b-0 md:border-r border-lines group cursor-pointer relative aspect-[3/4] md:aspect-auto">
             <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-12 overflow-hidden">
               <img 
                 src="/products/meias/cover.jpg"
                 alt="Meias Pilates"
                 className="w-full h-full object-cover mix-blend-multiply opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700"
                 onError={handleImageError}
               />
             </div>
             <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-white via-transparent to-transparent">
               <div className="flex justify-between items-end">
                 <div>
                   <h3 className="font-sans text-xl font-bold">Meias Grip</h3>
                   <span className="font-mono text-xs text-gray-500">ESSENCIAL</span>
                 </div>
                 <a 
                   href="https://app.tecnofit.com.br/ng/online-sale/MTU1MTU/checkout/MTA5NzY1Mg/forms"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="font-mono text-xs underline decoration-brand-orange hover:text-brand-orange"
                 >
                   Comprar
                 </a>
               </div>
             </div>
          </div>

          {/* Tote Bag */}
          <div className="border-b md:border-b-0 md:border-r border-lines group cursor-pointer relative aspect-[3/4] md:aspect-auto">
             <div className="absolute inset-0 bg-gray-50 flex items-center justify-center p-12 overflow-hidden">
               <img 
                 src="/products/tote-bag/cover.jpg"
                 alt="Tote Bag"
                 className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700 absolute inset-0 z-0"
                 onError={handleImageError}
               />
               
               {/* Visual overlay content (fallback visível enquanto carrega ou se falhar) */}
               <div className="relative z-10 flex flex-col items-center justify-center text-center">
                 <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="material-icons md-64 text-gray-800 text-6xl mb-4">local_mall</span>
                 </div>
                 <h3 className="font-sans text-2xl font-bold mb-2">Tote Bag Coletivo</h3>
                 <p className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-8">Canvas 100% Algodão</p>
                 <span className="px-4 py-2 border border-gray-200 font-mono text-[10px] uppercase text-gray-400 bg-white/80 backdrop-blur">
                    Em Breve / Coming Soon
                 </span>
               </div>
             </div>
          </div>

        </section>

        {/* FOOTER NOTE */}
        <div className="p-12 text-center bg-smoke">
           <p className="font-serif text-sm text-gray-500 italic max-w-lg mx-auto leading-relaxed">
             "O uniforme não é apenas roupa. É a pele que você veste para praticar a excelência."
           </p>
        </div>

      </div>
    </PageTransition>
  );
};