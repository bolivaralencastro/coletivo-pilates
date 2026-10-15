import fs from 'node:fs';
import path from 'node:path';

const root=path.dirname(new URL(import.meta.url).pathname);
const base='https://bolivaralencastro.github.io/coletivo-pilates';
const pages={
  'index.html':{slug:'home',url:'/',type:'website',title:'Movimento consciente | Coletivo Pilates',desc:'Pilates clássico no Córrego Grande, Florianópolis. Aulas privadas, em grupo e formação para profissionais.'},
  'coletivo.html':{slug:'coletivo',url:'/coletivo.html',type:'website',title:'O Coletivo | Coletivo Pilates',desc:'Conheça a equipe que ensina Pilates clássico com atenção individual, autonomia e presença em Florianópolis.'},
  'aulas.html':{slug:'aulas',url:'/aulas.html',type:'website',title:'Aulas & Método | Coletivo Pilates',desc:'Aulas privadas, grupos reduzidos e mentoria em Pilates clássico, com aparelhos originais e acompanhamento preciso.'},
  'academy.html':{slug:'academy',url:'/academy.html',type:'website',title:'TWR Academy | Coletivo Pilates',desc:'Formação presencial em Pilates clássico para profissionais, com prática intensiva, técnica e acompanhamento individual.'},
  'journal.html':{slug:'journal',url:'/journal.html',type:'website',title:'Journal | Coletivo Pilates',desc:'Artigos, registros e reflexões sobre Pilates clássico, corpo, técnica, história e movimento consciente.'},
  'journal-1.html':{slug:'journal-1',url:'/journal-1.html',type:'article',title:'A evolução do Classic Pilates no Brasil | Coletivo Pilates',desc:'Como o método chegou ao país e quais foram as principais adaptações culturais e estruturais nas últimas duas décadas.',published:'2023-10-12T12:00:00-03:00',section:'História'},
  'journal-2.html':{slug:'journal-2',url:'/journal-2.html',type:'article',title:'Respiração: O motor do Powerhouse | Coletivo Pilates',desc:'A respiração torácica lateral e posterior como ferramenta fundamental para estabilização e descompressão vertebral.',published:'2023-09-28T12:00:00-03:00',section:'Técnica'},
  'journal-3.html':{slug:'journal-3',url:'/journal-3.html',type:'article',title:'Workshop: Coluna Viva | Coletivo Pilates',desc:'Um registro do encontro dedicado à mobilidade torácica, dissociação de cinturas e prática consciente.',published:'2023-08-15T12:00:00-03:00',section:'Eventos'},
  'journal-4.html':{slug:'journal-4',url:'/journal-4.html',type:'article',title:'Equipamentos: Reformer vs Cadillac | Coletivo Pilates',desc:'As diferenças vetoriais de força entre Reformer e Cadillac e como escolher o aparelho para cada objetivo.',published:'2023-07-02T12:00:00-03:00',section:'Equipamentos'},
  'shop.html':{slug:'shop',url:'/shop.html',type:'website',title:'Shop | Coletivo Pilates',desc:'Peças e objetos do Coletivo Pilates para levar a cultura do movimento consciente além do estúdio.'}
};

const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for(const [file,p] of Object.entries(pages)){
  const full=path.join(root,file),url=base+p.url,image=`${base}/assets/og/${p.slug}.png`;
  let html=fs.readFileSync(full,'utf8');
  html=html.replace('<html lang="pt-BR">','<html lang="pt-BR" prefix="og: https://ogp.me/ns#">');
  html=html.replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(p.desc)}">`);
  html=html.replace(/\n?<link rel="canonical"[^>]*>|\n?<meta (?:property|name)="(?:og:|twitter:|article:|robots)[^>]*>/g,'');
  const article=p.type==='article'?`\n<meta property="article:published_time" content="${p.published}">\n<meta property="article:section" content="${esc(p.section)}">`:'';
  const meta=`
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:type" content="${p.type}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="Coletivo Pilates">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${image}">
<meta property="og:image:secure_url" content="${image}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Card de compartilhamento: ${esc(p.title)}">${article}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.desc)}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="Card de compartilhamento: ${esc(p.title)}">`;
  html=html.replace(/(<meta name="description"[^>]*>)/,`$1${meta}`);
  if(p.type==='article')html=html.replace(/"image":\s*"[^"]+"/,`"image": "${image}"`);
  fs.writeFileSync(full,html);
}
console.log(`Applied OG metadata to ${Object.keys(pages).length} pages.`);
