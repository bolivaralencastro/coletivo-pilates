import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { PRODUCTS } from './Shop'; // Assuming PRODUCTS is exported from Shop.tsx

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-sans">Produto não encontrado</p>
        </div>
      </PageTransition>
    );
  }

  const productImages = product.images ?? [product.image];
  const baseUrl = import.meta.env.BASE_URL;
  const resolveAsset = (path: string) => `${baseUrl}${path.replace(/^\/+/, '')}`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <PageTransition>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        {/* Coluna de Imagens (Scrollable) */}
        <div className="md:col-span-1 order-2 md:order-1 bg-white pb-8">
          <div className="flex flex-col gap-4">
            {productImages.map((img, index) => (
              <motion.img
                key={index}
                src={resolveAsset(img)}
                alt={`${product.name} - view ${index + 1}`}
                className="w-full object-cover"
                onError={handleImageError}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>

        </div>

        {/* Coluna de Detalhes (Fixa) */}
        <div className="md:col-span-1 md:sticky top-0 h-screen order-1 md:order-2">
          <div className="flex flex-col justify-between h-full p-8 md:p-12 lg:p-16 border-l border-lines bg-white">
            <div>
              <span className="font-mono text-xs text-brand-orange tracking-widest uppercase mb-4 block">{product.tag}</span>
              <h1 className="text-4xl lg:text-5xl font-sans font-bold tracking-tighter uppercase leading-none mb-4">
                {product.name}
              </h1>
              <p className="font-mono text-lg mb-6">{product.price}</p>
              <p className="font-serif text-neutral-600 leading-relaxed max-w-md mb-8">
                {product.description}
              </p>
              <div className="border-t border-lines pt-6">
                <h3 className="font-mono text-xs uppercase tracking-widest mb-4">Detalhes</h3>
                <ul className="font-serif text-sm text-neutral-500 space-y-2">
                  <li>100% Algodão Premium</li>
                  <li>Corte unissex e moderno</li>
                  <li>Estampa em serigrafia de alta durabilidade</li>
                  <li>Produzido de forma sustentável em Florianópolis</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://app.tecnofit.com.br/ng/online-sale/MTU1MTU/checkout/MTA5NzY1Mg/forms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-black text-white text-center py-4 font-mono text-sm uppercase tracking-widest hover:bg-brand-orange transition-colors duration-300"
              >
                Comprar Agora
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Outros Produtos */}
      <section className="border-t border-lines bg-smoke">
        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Outros Produtos</span>
            <span className="font-mono text-xs text-gray-400">Veja mais</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-lines border border-lines">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to={`/shop/${p.id}`}
                className="bg-white group flex flex-col hover:bg-white transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden bg-smoke">
                  <img
                    src={resolveAsset(p.image)}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={handleImageError}
                  />
                </div>
                <div className="p-4 border-t border-lines">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-1">
                    {p.tag}
                  </span>
                  <h3 className="font-sans text-sm font-bold uppercase leading-tight">
                    {p.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
