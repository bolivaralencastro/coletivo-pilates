import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { ASSETS, BLOG_POSTS } from '../constants';

export const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === Number(id));
  const baseUrl = import.meta.env.BASE_URL;
  const resolveAsset = (path: string) => `${baseUrl}${path.replace(/^\/+/, '')}`;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const stripVelocityRef = useRef(0);
  const stripRafRef = useRef<number | null>(null);
  const stopStripMotion = () => {
    stripVelocityRef.current = 0;
    if (stripRafRef.current) {
      cancelAnimationFrame(stripRafRef.current);
      stripRafRef.current = null;
    }
  };

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
  const defaultGalleryImages = [
    ASSETS.ACADEMY_GALLERY[0],
    ASSETS.ACADEMY_GALLERY[1],
    ASSETS.ACADEMY_GALLERY[2],
    ASSETS.ACADEMY_GALLERY[3],
    ASSETS.ABOUT,
    ASSETS.HERO,
  ];
  const allSiteImages = [
    "/hero/coletivo-pilates-hero-equipe.avif",
    "/hero/coletivo-pilates-hero-equipe-descontraida.avif",
    "/Equipe/coletivo-pilates-equipe-priscila-wiggers.avif",
    "/Equipe/coletivo-pilates-equipe-pamela-hilleschein.avif",
    "/Equipe/coletivo-pilates-equipe-cristina.avif",
    "/Equipe/coletivo-pilates-equipe-guilherme-rocha.avif",
    "/Equipe/coletivo-pilates-equipe-ana-leticia-bueno.avif",
    "/aulas/coletivo-pilates-aulas-1.avif",
    "/aulas/coletivo-pilates-aulas-2.avif",
    "/aulas/coletivo-pilates-aulas-3.avif",
    "/aulas/coletivo-pilates-aulas-4.avif",
    "/aulas/coletivo-pilates-aulas-5.avif",
    "/aulas/coletivo-pilates-aulas-6.avif",
    "/aulas/coletivo-pilates-aulas-7.avif",
    "/aulas/coletivo-pilates-aulas-8.avif",
    "/aulas/coletivo-pilates-aulas-9.avif",
    "/aulas/coletivo-pilates-aulas-10.avif",
    "/aulas/coletivo-pilates-aulas-11.avif",
    "/twr-academy/coletivo-pilates-twr-academy-1.avif",
    "/twr-academy/coletivo-pilates-twr-academy-2.avif",
    "/twr-academy/coletivo-pilates-twr-academy-3.avif",
    "/twr-academy/coletivo-pilates-twr-academy-4.avif",
    "/products/the-springs-are-calling-me/the-springs-are-calling-me-01-mockup.png",
    "/products/the-springs-are-calling-me/the-springs-are-calling-me-03-arte-preto-e-branco.png",
    "/products/the-springs-are-calling-me/the-springs-are-calling-me-04-frente.png",
    "/products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-01-mockup.png",
    "/products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-02-arte-cor.png",
    "/products/ceci-nest-pas-une-cadillac/ceci-nest-pas-une-cadillac-04-frente.png",
    "/products/drawing-of-the-pilates-life/drawing-of-the-pilates-life-01-mockup.png",
    "/products/drawing-of-the-pilates-life/drawing-of-the-pilates-life-02-arte-cor.png",
    "/products/drawing-of-the-pilates-life/drawing-of-the-pilates-life-04-frente.png",
    "/products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-01-mockup.png",
    "/products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-02-arte-cor.png",
    "/products/portraits-of-the-pilates-life/portraits-of-the-pilates-life-04-frente.png",
    "/products/tainha-from-floripa/tainhas-from-floripa-01-mockup.png",
    "/products/tainha-from-floripa/tainha-from-floripa-01-arte-cor.png",
    "/products/tainha-from-floripa/tainha-from-floripa-03-frente.png",
    "/products/meias/meias-coletivo-pilates-humanizada.png",
    "/products/meias/meias-coletivo-pilates.png",
    "/products/tote-bag/tote-bag-coletivo-pilates-humanizada.png",
    "/products/tote-bag/tote_bag_branca_coletivo_pilates.png"
  ];
  const blogGalleryImages = post.id === 1 ? allSiteImages : defaultGalleryImages;
  const stripImages = useMemo(() => [...blogGalleryImages, ...blogGalleryImages], [blogGalleryImages]);
  const layoutVariants: Record<number, Array<'inline' | 'full' | 'masonry' | 'pull' | 'side'>> = {
    1: ['inline', 'full', 'masonry'],
    2: ['pull', 'side', 'full'],
    3: ['masonry', 'inline', 'pull'],
    4: ['side', 'full', 'inline'],
  };
  const variant = layoutVariants[post.id] || ['inline', 'full', 'masonry'];
  const summaryClassByVariant: Record<number, string> = {
    1: 'text-2xl md:text-3xl font-serif italic',
    2: 'text-xl md:text-2xl font-sans font-medium',
    3: 'text-2xl md:text-3xl font-serif italic border-l-2 border-brand-orange pl-6',
    4: 'text-xl md:text-2xl font-serif italic',
  };
  const summaryClass = summaryClassByVariant[post.id] || 'text-2xl md:text-3xl font-serif italic';

  useEffect(() => {
    if (lightboxIndex !== null) {
      const { overflow } = document.body.style;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        const strip = stripRef.current;
        if (!strip) return;
        strip.scrollLeft = strip.scrollWidth / 4;
      });
      return () => {
        document.body.style.overflow = overflow;
      };
    }
    return undefined;
  }, [lightboxIndex]);

  const handleStripMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const strip = stripRef.current;
    if (!strip) return;
    const rect = strip.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const edgeZone = 140;
    let velocity = 0;
    if (x < edgeZone) {
      const strength = 1 - x / edgeZone;
      velocity = -12 * strength;
    } else if (x > rect.width - edgeZone) {
      const strength = (x - (rect.width - edgeZone)) / edgeZone;
      velocity = 12 * strength;
    }
    stripVelocityRef.current = velocity;
    if (stripRafRef.current) return;
    const step = () => {
      const currentStrip = stripRef.current;
      if (!currentStrip) {
        stripRafRef.current = null;
        return;
      }
      stripVelocityRef.current *= 0.92;
      if (Math.abs(stripVelocityRef.current) < 0.1) {
        stripRafRef.current = null;
        return;
      }
      currentStrip.scrollLeft += stripVelocityRef.current;
      const maxScroll = currentStrip.scrollWidth - currentStrip.clientWidth;
      const resetPoint = currentStrip.scrollWidth / 2;
      if (currentStrip.scrollLeft < 100) {
        currentStrip.scrollLeft += resetPoint;
      } else if (currentStrip.scrollLeft > maxScroll - 100) {
        currentStrip.scrollLeft -= resetPoint;
      }
      stripRafRef.current = requestAnimationFrame(step);
    };
    stripRafRef.current = requestAnimationFrame(step);
  };

  const handleStripLeave = () => {
    stripVelocityRef.current *= 0.85;
    if (stripRafRef.current) return;
    const step = () => {
      const currentStrip = stripRef.current;
      if (!currentStrip) {
        stripRafRef.current = null;
        return;
      }
      stripVelocityRef.current *= 0.92;
      if (Math.abs(stripVelocityRef.current) < 0.1) {
        stripVelocityRef.current = 0;
        stripRafRef.current = null;
        return;
      }
      currentStrip.scrollLeft += stripVelocityRef.current;
      const maxScroll = currentStrip.scrollWidth - currentStrip.clientWidth;
      const resetPoint = currentStrip.scrollWidth / 2;
      if (currentStrip.scrollLeft < 100) {
        currentStrip.scrollLeft += resetPoint;
      } else if (currentStrip.scrollLeft > maxScroll - 100) {
        currentStrip.scrollLeft -= resetPoint;
      }
      stripRafRef.current = requestAnimationFrame(step);
    };
    stripRafRef.current = requestAnimationFrame(step);
  };


  return (
    <PageTransition disableTransform>
      <article className="min-h-screen bg-white">
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-white/85 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full h-full" onClick={(event) => event.stopPropagation()}>
              <div className="h-full flex flex-col">
                <div className="relative flex-1 grid grid-cols-[auto_1fr_auto] items-center">
                  <div className="flex items-center justify-center p-2">
                    <button
                      onClick={() =>
                        setLightboxIndex((current) =>
                          current === null || current === 0 ? blogGalleryImages.length - 1 : current - 1
                        )
                      }
                      className="text-gray-700 hover:text-black transition-colors"
                      aria-label="Imagem anterior"
                    >
                      <span className="material-icons md-36">chevron_left</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="rounded overflow-hidden shadow-2xl">
                      <img
                        src={resolveAsset(blogGalleryImages[lightboxIndex])}
                        alt={`Galeria Coletivo Pilates ${lightboxIndex + 1}`}
                        className="max-h-[72vh] w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2">
                    <button
                      onClick={() =>
                        setLightboxIndex((current) =>
                          current === null || current === blogGalleryImages.length - 1 ? 0 : current + 1
                        )
                      }
                      className="text-gray-700 hover:text-black transition-colors"
                      aria-label="Proxima imagem"
                    >
                      <span className="material-icons md-36">chevron_right</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-4 right-4 text-gray-700 hover:text-black transition-colors"
                    aria-label="Fechar imagem"
                  >
                    <span className="material-icons md-24">close</span>
                  </button>
                </div>
                <div className="border-t border-gray-200">
                    <div className="flex items-center justify-center py-4">
                    <div
                      ref={stripRef}
                      onMouseMove={handleStripMove}
                      onMouseLeave={handleStripLeave}
                      className="flex overflow-x-auto no-scrollbar w-full px-4 cursor-pointer"
                    >
                      {stripImages.map((src, index) => (
                        <button
                          key={`thumb-${src}-${index}`}
                          data-strip-index={index}
                          onClick={() => {
                            stopStripMotion();
                            setLightboxIndex(index % blogGalleryImages.length);
                            requestAnimationFrame(() => {
                              const strip = stripRef.current;
                              if (!strip) return;
                              const target = strip.querySelector<HTMLButtonElement>(`[data-strip-index="${index}"]`);
                              if (!target) return;
                              const stripRect = strip.getBoundingClientRect();
                              const targetRect = target.getBoundingClientRect();
                              const targetCenter = targetRect.left - stripRect.left + targetRect.width / 2;
                              strip.scrollLeft += targetCenter - stripRect.width / 2;
                            });
                          }}
                          className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded border mr-0.5 last:mr-0 ${
                            index % blogGalleryImages.length === lightboxIndex ? 'border-brand-orange' : 'border-gray-200'
                          }`}
                          aria-label={`Abrir imagem ${index + 1}`}
                          type="button"
                        >
                          <img
                            src={resolveAsset(src)}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover rounded"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
             src={resolveAsset(post.image)} 
             alt={post.title} 
             className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
           />
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
           
           {/* Sidebar (Sticky Share) */}
           <aside className="lg:col-span-3 p-8 border-b lg:border-b-0 lg:border-r border-lines lg:sticky lg:top-0 lg:h-screen">
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
              <p className={`${summaryClass} leading-relaxed text-black mb-16 max-w-3xl`}>
                "{post.summary}"
              </p>
              
              <div className="prose prose-lg prose-zinc font-serif text-gray-600 leading-loose max-w-none">
                {post.content.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    <p className="mb-8 text-lg">{paragraph}</p>

                    {index === 0 && variant[0] === 'inline' && (
                      <figure className="mt-12 mb-12">
                        <img
                          src={resolveAsset(ASSETS.ABOUT)}
                          alt="Coletivo Pilates studio"
                          className="w-full h-64 md:h-80 object-cover rounded"
                        />
                        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                          Estudio Coletivo Pilates
                        </figcaption>
                      </figure>
                    )}

                    {index === 0 && variant[0] === 'pull' && (
                      <blockquote className="mt-12 mb-12 border-l-2 border-brand-orange pl-6 text-xl md:text-2xl font-serif italic text-gray-700">
                        "O método é menos sobre força e mais sobre precisão. Cada detalhe importa."
                      </blockquote>
                    )}

                    {index === 0 && variant[0] === 'masonry' && (
                      <section className="mt-12 mb-12 -mx-8 md:-mx-20 border-t border-b border-lines bg-gray-50">
                        <div className="p-8 md:p-16 columns-2 md:columns-3 gap-4">
                          {blogGalleryImages.map((src, galleryIndex) => (
                            <img
                              key={`${src}-${galleryIndex}`}
                              src={resolveAsset(src)}
                              alt={`Galeria Coletivo Pilates ${galleryIndex + 1}`}
                              className="mb-4 w-full break-inside-avoid object-cover cursor-zoom-in rounded"
                              onClick={() => setLightboxIndex(galleryIndex)}
                            />
                          ))}
                        </div>
                      </section>
                    )}

                    {index === 0 && variant[0] === 'side' && (
                      <div className="mt-12 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                          <img
                            src={resolveAsset(ASSETS.ACADEMY_GALLERY[1])}
                            alt="Detalhe de treino"
                            className="w-full h-64 md:h-80 object-cover rounded"
                          />
                        </div>
                        <p className="text-lg md:text-xl font-serif italic text-gray-700">
                          "A técnica aparece quando o corpo entende o porquê do movimento."
                        </p>
                      </div>
                    )}

                    {index === 1 && variant[1] === 'full' && (
                      <div className="mt-12 mb-12 -mx-8 md:-mx-20">
                        <img
                          src={resolveAsset(ASSETS.ACADEMY_GALLERY[2])}
                          alt="Treino em grupo"
                          className="w-full h-72 md:h-[60vh] object-cover rounded"
                        />
                      </div>
                    )}

                    {index === 1 && variant[1] === 'side' && (
                      <div className="mt-12 mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <p className="text-lg md:text-xl font-serif italic text-gray-700">
                          "A respiração organiza o movimento e expande o espaço interno."
                        </p>
                        <img
                          src={resolveAsset(ASSETS.ACADEMY_GALLERY[0])}
                          alt="Studio Coletivo Pilates"
                          className="w-full h-64 md:h-80 object-cover rounded"
                        />
                      </div>
                    )}

                    {index === 1 && variant[1] === 'inline' && (
                      <figure className="mt-12 mb-12">
                        <img
                          src={resolveAsset(ASSETS.ABOUT)}
                          alt="Coletivo Pilates studio"
                          className="w-full h-64 md:h-80 object-cover rounded"
                        />
                        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                          Estudio Coletivo Pilates
                        </figcaption>
                      </figure>
                    )}

                    {index === 2 && variant[2] === 'masonry' && (
                      <section className="mt-12 mb-12 -mx-8 md:-mx-20 border-t border-b border-lines bg-gray-50">
                        <div className="p-8 md:p-16 columns-2 md:columns-3 gap-4">
                          {blogGalleryImages.map((src, galleryIndex) => (
                            <img
                              key={`${src}-${galleryIndex}`}
                              src={resolveAsset(src)}
                              alt={`Galeria Coletivo Pilates ${galleryIndex + 1}`}
                              className="mb-4 w-full break-inside-avoid object-cover cursor-zoom-in rounded"
                              onClick={() => setLightboxIndex(galleryIndex)}
                            />
                          ))}
                        </div>
                      </section>
                    )}

                    {index === 2 && variant[2] === 'pull' && (
                      <blockquote className="mt-12 mb-12 border-l-2 border-brand-orange pl-6 text-xl md:text-2xl font-serif italic text-gray-700">
                        "O corpo aprende quando a mente desacelera."
                      </blockquote>
                    )}

                    {index === 2 && variant[2] === 'inline' && (
                      <figure className="mt-12 mb-12">
                        <img
                          src={resolveAsset(ASSETS.ACADEMY_GALLERY[3])}
                          alt="Treino no studio"
                          className="w-full h-64 md:h-80 object-cover rounded"
                        />
                        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                          Controle e fluidez
                        </figcaption>
                      </figure>
                    )}
                  </React.Fragment>
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
