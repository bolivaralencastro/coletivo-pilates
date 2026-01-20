import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Link } from 'react-router-dom';

// Dados dos produtos
// NOTA: Caminhos padronizados para 'cover.jpg' conforme instruções nos READMEs das pastas.
// Assumindo que a pasta 'public' é servida na raiz (padrão React/Vite/Next).
export const PRODUCTS = [
  {
    id: 'springs',
    name: "The Springs",
    subtitle: "Are Calling Me",
    price: "R$ 149,00",
    description: "A força das molas e a resistência do corpo. Ilustração técnica detalhada das molas do Cadillac.",
    image: "products/the-springs-are-calling-me/the-springs-are-calling-me-01-mockup.png",
    images: [
      "products/the-springs-are-calling-me/the-springs-are-calling-me-01-mockup.png",
      "products/the-springs-are-calling-me/the-springs-are-calling-me-03-arte-preto-e-branco.png",
      "products/the-springs-are-calling-me/the-springs-are-calling-me-04-frente.png",
      "products/the-springs-are-calling-me/the-springs-are-calling-me-05-croqui.png"
    ],
    tag: "Best Seller"
  },
  {
    id: 'cadillac',
    name: "Ceci n'est pas",
    subtitle: "Un Cadillac",
    price: "R$ 149,00",
    description: "Homenagem surrealista a Magritte. O equipamento não é o método, é apenas a ferramenta.",
    image: "products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-01-mockup.png",
    images: [
      "products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-01-mockup.png",
      "products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-02-arte-cor.png",
      "products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-04-frente.png",
      "products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-05-croqui.png"
    ],
    tag: "Concept"
  },
  {
    id: 'portraits',
    name: "Portraits",
    subtitle: "Of The Pilates Life",
    price: "R$ 149,00",
    description: "O inventário completo do sistema. Reformer, Wunda, Barrel e a arquitetura do movimento.",
    image: "products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-01-mockup.png",
    images: [
      "products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-01-mockup.png",
      "products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-02-arte-cor.png",
      "products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-04-frente.png",
      "products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-05-croqui.png"
    ],
    tag: "Collection"
  },
  {
    id: 'tainhas',
    name: "Tainhas",
    subtitle: "From Floripa",
    price: "R$ 149,00",
    description: "Hundred from Pilates vs Tainhas from Floripa. A conexão entre a natureza da ilha e o ritmo do mat.",
    image: "products/tainha-from-floripa/tainhas-from-floripa-01-mockup.png",
    images: [
      "products/tainha-from-floripa/tainhas-from-floripa-01-mockup.png",
      "products/tainha-from-floripa/tainha-from-floripa-01-arte-cor.png",
      "products/tainha-from-floripa/tainha-from-floripa-03-frente.png",
      "products/tainha-from-floripa/tainha-from-floripa-04-croqui.png"
    ],
    tag: "Local Hero"
  },
  {
    id: 'meias',
    name: "Meias Grip",
    subtitle: "Essencial",
    price: "R$ 89,00",
    description: "Meias antiderrapantes para estabilidade e precisão em cada movimento.",
    image: "products/meias/meias-coletivo-pilates-humanizada.png",
    images: [
      "products/meias/meias-coletivo-pilates-humanizada.png",
      "products/meias/meias-coletivo-pilates.png"
    ],
    tag: "Acessório"
  },
  {
    id: 'tote-bag',
    name: "Tote Bag Coletivo",
    subtitle: "Canvas 100% Algodao",
    price: "R$ 129,00",
    description: "Bolsa ampla em canvas para acompanhar o studio e o dia a dia.",
    image: "products/tote-bag/tote-bag-coletivo-pilates-humanizada.png",
    images: [
      "products/tote-bag/tote-bag-coletivo-pilates-humanizada.png",
      "products/tote-bag/tote_bag_branca_coletivo_pilates.png"
    ],
    tag: "Acessório"
  }
];

export const Shop: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const resolveAsset = (path: string) => `${baseUrl}${path.replace(/^\/+/, '')}`;

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
                Coleção 2026
              </h1>
           </div>
           <span className="hidden md:block font-mono text-[10px] text-gray-400 tracking-widest text-right">
             COLETIVO PILATES<br/>ORIGINAL
           </span>
        </header>

        {/* PRODUCT GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 bg-lines gap-px border-b border-lines">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white group relative flex flex-col">
               
               {/* Image Container */}
               <Link to={`/shop/${product.id}`} className="flex flex-col flex-1">
                 <div className="aspect-[4/5] overflow-hidden relative bg-smoke">
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-lines">
                        {product.tag}
                      </span>
                    </div>
                    <img 
                    src={resolveAsset(product.image)} 
                    alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                      onError={handleImageError}
                    />
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
                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex gap-2 font-mono text-[10px] text-gray-400 uppercase">
                        <span>Cotton Premium</span>
                        <span>•</span>
                        <span>Unissex</span>
                        <span>•</span>
                        <span>P-GG</span>
                      </div>
                      {product.id !== 'tote-bag' ? (
                        <a 
                          href="https://app.tecnofit.com.br/ng/online-sale/MTU1MTU/checkout/MTA5NzY1Mg/forms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-orange hover:text-black transition-colors"
                        >
                          Comprar
                          <span className="material-icons md-18">local_mall</span>
                        </a>
                      ) : (
                        <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                          Em Breve
                        </span>
                      )}
                    </div>
                 </div>
               </Link>
            </div>
          ))}
        </section>

        {/* FOOTER NOTE */}
        <div className="p-12 text-center bg-smoke">
           <p className="font-serif text-sm text-gray-500 italic max-w-lg mx-auto leading-relaxed">
             "Descubra a coleção que une arte, movimento e lifestyle. Vista a sua paixão."
           </p>
        </div>

      </div>
    </PageTransition>
  );
};
