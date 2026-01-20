import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ASSETS } from '../constants';

// Componente auxiliar para animação de scroll
const ScrollSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Home: React.FC = () => {
  return (
    <PageTransition className="flex flex-col w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full aspect-[4/5] landscape:aspect-[21/9] md:aspect-[21/9] border-b border-lines group overflow-hidden">
        <img 
          src={ASSETS.HERO} 
          alt="Pilates Studio Hero" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 landscape:p-8 md:p-16 w-full flex flex-col md:flex-row landscape:flex-row justify-between items-end">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block bg-brand-orange text-white font-mono text-xs px-2 py-1 mb-4 uppercase tracking-widest"
            >
              Florianópolis — SC
            </motion.span>
            <h1 className="text-white font-sans text-5xl landscape:text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
              Movimento<br />Consciente.
            </h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 md:mt-0 landscape:mt-0 landscape:mb-2"
          >
             <Link to="/aulas" className="group relative inline-flex items-center gap-4 text-white font-mono text-xs uppercase tracking-widest border border-white/30 px-6 py-4 hover:bg-white hover:text-black transition-colors">
                <span>Começar Agora</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
             </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. MANIFESTO SUMMARY (About) */}
      <ScrollSection className="grid grid-cols-1 md:grid-cols-12 border-b border-lines min-h-[50vh]">
        <div className="md:col-span-5 lg:col-span-4 p-8 md:p-16 border-b md:border-b-0 md:border-r border-lines flex flex-col justify-between">
          <span className="font-mono text-xs text-gray-400 block tracking-widest uppercase">01 — O Coletivo</span>
          <h2 className="text-4xl md:text-5xl font-sans font-light leading-tight mt-8 md:mt-0">
            A arquitetura<br/>do corpo.
          </h2>
        </div>
        <div className="md:col-span-7 lg:col-span-8 p-8 md:p-16 flex flex-col justify-center bg-white">
           <p className="font-serif text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
             "Não é apenas sobre fazer o exercício. É sobre <span className="text-black font-normal border-b-2 border-brand-orange">como você faz</span>."
           </p>
           <div className="mt-12 flex items-center gap-8">
              <Link to="/sobre" className="font-mono text-xs uppercase border-b border-black pb-1 hover:text-brand-orange hover:border-brand-orange transition-colors">
                Ler Manifesto Completo
              </Link>
              <span className="font-mono text-xs text-gray-400">EST. 2017</span>
           </div>
        </div>
      </ScrollSection>

      {/* 3. CLASSES & METHOD (Services) */}
      <ScrollSection className="grid grid-cols-1 landscape:grid-cols-3 md:grid-cols-3 border-b border-lines">
         {[
           { title: "Privado", sub: "1:1 Individual", desc: "Foco absoluto na sua necessidade.", link: "/aulas" },
           { title: "Grupo", sub: "1:4 Coletivo", desc: "Dinâmica fluida e energia compartilhada.", link: "/aulas" },
           { title: "Mentoria", sub: "Profissional", desc: "Para instrutores que buscam excelência.", link: "/aulas" }
         ].map((item, idx) => (
           <Link 
            to={item.link} 
            key={idx} 
            className="group p-12 border-b md:border-b-0 landscape:border-b-0 md:border-r landscape:border-r border-lines last:border-r-0 hover:bg-smoke transition-colors flex flex-col justify-between h-64 md:h-80"
           >
              <div className="flex justify-between items-start">
                 <span className="font-mono text-xs text-brand-orange uppercase">02.{idx + 1}</span>
                 <span className="material-icons opacity-0 group-hover:opacity-100 transition-opacity text-2xl">north_east</span>
              </div>
              <div>
                <h3 className="font-sans text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                <span className="font-mono text-xs text-gray-400 uppercase block mb-4">{item.sub}</span>
                <p className="font-serif text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
           </Link>
         ))}
      </ScrollSection>

      {/* 4. TWR ACADEMY TEASER */}
      <ScrollSection className="bg-zinc-900 text-white grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-2 min-h-[40vh]">
        <div className="p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r landscape:border-b-0 landscape:border-r border-zinc-800">
           <span className="font-mono text-xs text-brand-orange block tracking-widest uppercase mb-6">03 — Educação</span>
           <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-6">
             TWR<br/>Academy
           </h2>
           <p className="text-zinc-400 max-w-md mb-8">
             Formação completa em Pilates Clássico com Zé Neto. O próximo passo da sua carreira começa aqui.
           </p>
           <Link to="/academy" className="inline-block border border-white px-8 py-3 font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors w-fit">
             Ver Cronograma 2025
           </Link>
        </div>
        <div className="relative h-64 lg:h-auto landscape:h-auto overflow-hidden group">
           <img 
             src={ASSETS.ACADEMY} 
             alt="Academy Class" 
             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale"
           />
        </div>
      </ScrollSection>

      {/* 5. SHOP & JOURNAL GRID */}
      <div className="grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-2 border-b border-lines">
        
        {/* Shop Teaser */}
        <ScrollSection className="border-b lg:border-b-0 landscape:border-b-0 lg:border-r landscape:border-r border-lines p-8 md:p-16 flex flex-col justify-between bg-gray-50 group hover:bg-white transition-colors">
           <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">04 — Shop</span>
              <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-1 uppercase rounded-full">New Drop</span>
           </div>
           
           <div className="flex-1 flex items-center justify-center py-8">
              <div className="relative w-48 h-48 bg-white border border-lines shadow-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 rounded-full">
                 <span className="material-icons text-6xl text-gray-300 group-hover:text-black transition-colors md-64">checkroom</span>
              </div>
           </div>

           <div className="text-center mt-8">
              <h3 className="font-sans text-2xl font-bold mb-2">Coleção Molas</h3>
              <Link to="/shop" className="inline-block font-mono text-xs uppercase border-b border-black pb-1 hover:text-brand-orange hover:border-brand-orange transition-colors">
                Ir para Shop
              </Link>
           </div>
        </ScrollSection>

        {/* Journal Teaser */}
        <div className="flex flex-col">
          <div className="p-8 border-b border-lines">
             <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">05 — Journal</span>
          </div>
          <div className="flex-1">
             {[
               { date: "02 OUT", title: "Workshop Contrologia Avançada", cat: "Evento" },
               { date: "15 SET", title: "Respiração Torácica", cat: "Artigo" },
               { date: "12 AGO", title: "História do Reformer", cat: "História" }
             ].map((post, i) => (
               <Link to="/journal" key={i} className="group flex items-center p-8 border-b border-lines last:border-b-0 hover:bg-smoke transition-colors">
                  <div className="w-16 md:w-24 font-mono text-xs text-gray-400 group-hover:text-brand-orange">{post.date}</div>
                  <div className="flex-1">
                    <span className="block font-mono text-[10px] text-gray-400 uppercase mb-1">{post.cat}</span>
                    <h4 className="font-sans text-lg md:text-xl font-medium leading-none group-hover:underline decoration-1 underline-offset-4">{post.title}</h4>
                  </div>
                  <span className="material-icons opacity-0 group-hover:opacity-100 transition-opacity text-brand-orange">arrow_forward</span>
               </Link>
             ))}
          </div>
          <Link to="/journal" className="p-6 text-center bg-black text-white font-mono text-xs uppercase hover:bg-brand-orange transition-colors flex items-center justify-center gap-2">
            Ler Todas as Publicações
            <span className="material-icons md-18">read_more</span>
          </Link>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="p-4 bg-white">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-[10px] uppercase text-gray-400">© 2026 Coletivo Pilates</span>
            <div className="flex gap-6">
                <a href="https://instagram.com/coletivopilates" target="_blank" className="font-mono text-[10px] uppercase hover:text-brand-orange hover:underline">Instagram</a>
                <a href="https://wa.me/5548999770808" target="_blank" className="font-mono text-[10px] uppercase hover:text-brand-orange hover:underline">Whatsapp</a>
                <a href="mailto:coletivopilates@gmail.com" className="font-mono text-[10px] uppercase hover:text-brand-orange hover:underline">Email</a>
            </div>
         </div>
      </div>

    </PageTransition>
  );
};