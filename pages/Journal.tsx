import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { BLOG_POSTS } from '../constants';

export const Journal: React.FC = () => {
  return (
    <PageTransition>
      <div className="p-8 md:p-20">
        <header className="mb-20 border-b border-lines pb-8">
          <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">
            Journal
          </h1>
          <p className="font-mono text-sm text-gray-500 max-w-lg">
            Reflexões, estudos de caso e atualizações sobre o universo do Coletivo Pilates.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-lines border border-lines">
          {BLOG_POSTS.map((post) => (
            <Link to={`/journal/${post.id}`} key={post.id} className="bg-white p-12 hover:bg-smoke transition-colors duration-300 group cursor-pointer h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs text-brand-orange uppercase tracking-widest">{post.category}</span>
                  <span className="font-mono text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-3xl font-sans font-semibold leading-tight mb-4 group-hover:underline underline-offset-4 decoration-1">
                  {post.title}
                </h2>
                <p className="font-serif text-gray-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
                 <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2 text-brand-orange">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};