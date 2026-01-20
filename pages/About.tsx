import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ASSETS } from '../constants';

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const About: React.FC = () => {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white">
        
        {/* 1. HEADER MONUMENTAL */}
        <header className="p-8 md:p-16 border-b border-lines pt-32 pb-16">
          <Reveal>
            <span className="font-mono text-xs text-brand-orange uppercase tracking-[0.2em] block mb-4">
              (01) — Quem Somos
            </span>
            <h1 className="text-6xl md:text-9xl font-sans font-bold tracking-tighter uppercase leading-[0.85] text-black">
              Coletivo<br/>
              <span className="ml-8 md:ml-32 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Pilates</span>
            </h1>
          </Reveal>
        </header>

        {/* 2. MANIFESTO GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-b border-lines">
          {/* Coluna Esquerda: Meta-dados */}
          <div className="md:col-span-4 p-8 md:p-16 border-b md:border-b-0 md:border-r border-lines flex flex-col justify-between h-full bg-smoke/50">
             <Reveal>
               <h3 className="font-mono text-xs uppercase text-gray-400 mb-8">Nossa Filosofia</h3>
               <p className="font-sans text-2xl md:text-3xl font-medium leading-tight mb-8">
                 "Respeito à história de cada corpo através do método original."
               </p>
               <div className="w-12 h-1 bg-brand-orange"></div>
             </Reveal>
          </div>

          {/* Coluna Direita: Texto Principal */}
          <div className="md:col-span-8 p-8 md:p-16 flex items-center">
            <Reveal className="prose prose-xl font-serif text-gray-600 leading-relaxed max-w-2xl">
              <p>
                Fundado em 2017, o Coletivo não é apenas um estúdio. É um laboratório de movimento. Acreditamos que a verdadeira saúde nasce da <span className="text-black italic">autonomia</span>.
              </p>
              <p>
                Nosso objetivo não é criar alunos dependentes de instrução, mas sim corpos inteligentes, capazes de se mover com eficiência, elegância e economia de energia dentro e fora do tatame.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 3. IMAGEM FULL WIDTH EDITORIAL */}
        <section className="w-full h-[60vh] md:h-[80vh] border-b border-lines overflow-hidden group relative">
           <div className="absolute top-0 left-0 p-8 z-10">
              <span className="bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-lines">
                Florianópolis, SC
              </span>
           </div>
           <img 
             src={ASSETS.ABOUT} 
             alt="Equipe Coletivo Pilates" 
             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out scale-105 group-hover:scale-100"
           />
        </section>

        {/* 4. PILARES (3 COLUMNS SWISS GRID) */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-lines">
           {[
             { 
               num: "01", 
               title: "Autonomia", 
               desc: "O aluno deve entender o 'porquê' e o 'como' de cada movimento. Ensinamos ferramentas, não apenas coreografias." 
             },
             { 
               num: "02", 
               title: "Classicismo", 
               desc: "Mantemos a integridade do método criado por Joseph Pilates (Contrologia), respeitando a ordem e os aparelhos originais." 
             },
             { 
               num: "03", 
               title: "Comunidade", 
               desc: "Um espaço onde instrutores e alunos trocam experiências. O aprendizado é horizontal e contínuo." 
             }
           ].map((item, idx) => (
             <div key={idx} className="p-12 border-b md:border-b-0 md:border-r border-lines last:border-r-0 hover:bg-smoke transition-colors duration-500 group">
                <Reveal delay={idx * 0.1}>
                  <span className="font-mono text-xs text-brand-orange mb-6 block border-b border-gray-200 pb-2 w-fit group-hover:w-full transition-all duration-500">
                    ({item.num})
                  </span>
                  <h3 className="text-3xl font-sans font-bold mb-4">{item.title}</h3>
                  <p className="font-serif text-gray-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </Reveal>
             </div>
           ))}
        </section>

        {/* 5. DADOS TÉCNICOS / RODAPÉ DA PÁGINA */}
        <section className="bg-black text-white p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2 block">Direção Técnica</span>
                <h4 className="text-4xl font-sans font-bold">Priscila Wiggers</h4>
              </div>
              <p className="font-serif text-gray-400 mt-8 max-w-xs italic">
                "O corpo é a casa onde você vai morar pelo resto da sua vida. Cuide bem da estrutura."
              </p>
           </div>
           
           <div className="font-mono text-xs space-y-6">
              <div className="border-t border-gray-800 pt-4 flex justify-between">
                 <span className="text-gray-500 uppercase">Localização</span>
                 <span className="text-right">R. João Pio Duarte Silva, 1350<br/>Loja 06 — Córrego Grande</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between">
                 <span className="text-gray-500 uppercase">Contato</span>
                 <span className="text-right">coletivopilates@gmail.com<br/>+55 48 99977-0808</span>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between">
                 <span className="text-gray-500 uppercase">Social</span>
                 <a href="https://instagram.com/coletivopilates" target="_blank" className="text-right hover:text-brand-orange transition-colors">@coletivopilates</a>
              </div>
           </div>
        </section>

      </div>
    </PageTransition>
  );
};