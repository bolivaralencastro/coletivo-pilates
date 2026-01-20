import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { BLOG_POSTS } from '../constants';

export const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-sans mb-4">Post não encontrado</h2>
          <button onClick={() => navigate('/journal')} className="underline">Voltar ao Journal</button>
        </div>
      </div>
    );
  }

  const nextPost = BLOG_POSTS.find(p => p.id === post.id + 1) || BLOG_POSTS[0];

  return (
    <PageTransition>
      <article className="min-h-screen bg-white">
        
        {/* HEADER: Matches Sidebar Logo Area Height (~336px calculated from logo aspect ratio + padding) */}
        <header className="flex flex-col justify-between p-8 border-b border-lines min-h-[336px] bg-white">
           {/* Top: Category & Breadcrumb */}
           <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-widest">
              <Link to="/journal" className="text-gray-400 hover:text-black transition-colors">Journal</Link>
              <span className="text-gray-300">/</span>
              <span className="text-brand-orange font-bold">{post.category}</span>
           </div>
           
           {/* Middle: Title (Grow) */}
           <div className="py-6">
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold leading-[0.9] tracking-tighter text-black max-w-4xl">
               {post.title}
             </h1>
           </div>

           {/* Bottom: Metadata Columns */}
           <div className="flex flex-wrap gap-8 md:gap-16 font-mono text-[10px] uppercase tracking-widest">
             <div>
               <span className="block text-gray-300 mb-1">Publicado em</span>
               <span className="text-black font-bold">{post.date}</span>
             </div>
             <div>
               <span className="block text-gray-300 mb-1">Escrito por</span>
               <span className="text-black font-bold">{post.author}</span>
             </div>
             <div>
               <span className="block text-gray-300 mb-1">Tempo de Leitura</span>
               <span className="text-black font-bold">4 Min</span>
             </div>
           </div>
        </header>

        {/* HERO IMAGE */}
        <div className="w-full h-[50vh] md:h-[65vh] border-b border-lines overflow-hidden group">
           <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
           />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
           
           {/* Sidebar (Sticky Share) */}
           <aside className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-lines lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between">
              <div className="hidden lg:block">
                 {/* Espaço vazio para alinhar visualmente ou adicionar índice futuro */}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-4">Compartilhar</p>
                <div className="flex flex-col gap-3 font-mono text-xs">
                   <button className="text-left hover:text-brand-orange transition-colors">Instagram</button>
                   <button className="text-left hover:text-brand-orange transition-colors">Linkedin</button>
                   <button className="text-left hover:text-brand-orange transition-colors">Copiar Link</button>
                </div>
              </div>
           </aside>

           {/* Text Content */}
           <div className="lg:col-span-9 p-8 md:p-20 max-w-5xl">
              <p className="text-2xl md:text-3xl font-serif leading-relaxed text-black mb-16 max-w-3xl italic">
                "{post.summary}"
              </p>
              
              <div className="prose prose-lg prose-zinc font-serif text-gray-600 leading-loose max-w-none">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="mb-8 text-lg">{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-20 pt-8 border-t border-gray-100 flex gap-2">
                 {['Pilates', 'Saúde', 'Movimento'].map(tag => (
                   <span key={tag} className="px-3 py-1 border border-gray-200 rounded-full font-mono text-[10px] uppercase text-gray-500 hover:border-brand-orange hover:text-brand-orange cursor-pointer transition-colors">
                     #{tag}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* NEXT POST CTA */}
        <Link to={`/journal/${nextPost.id}`} className="block border-t border-lines bg-smoke hover:bg-black hover:text-white transition-colors duration-500 group relative overflow-hidden">
           <div className="p-8 md:p-20 grid grid-cols-1 md:grid-cols-2 items-center relative z-10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest mb-4 block text-gray-500 group-hover:text-brand-orange">Próxima Leitura</span>
                <h3 className="text-4xl md:text-5xl font-sans font-bold tracking-tight">{nextPost.title}</h3>
              </div>
              <div className="hidden md:flex justify-end">
                 <span className="text-6xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">&rarr;</span>
              </div>
           </div>
        </Link>

      </article>
    </PageTransition>
  );
};