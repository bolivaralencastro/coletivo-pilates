/* mascara propria para a foto (zoom no hover fica dentro da moldura) */
(()=>{
  document.querySelectorAll('.dz:not(.h-aside):not(.h-img), .ph').forEach(z=>{
    const img=[...z.children].find(c=>c.tagName==='IMG'); if(!img)return;
    const m=document.createElement('div'); m.className='ph-in'; z.insertBefore(m,img); m.appendChild(img);
  });
})();
(()=>{
/* carregamento por linhas */
const root=document.documentElement;
(function(){
  if(!root.classList.contains('is-loading'))return;
  // No mobile, a entrada completa exigia centenas de leituras de layout antes
  // da primeira pintura. A marca continua animada, mas o conteudo entra direto.
  if(matchMedia('(max-width:820px)').matches){root.classList.remove('is-loading');return}
  const seen=sessionStorage.getItem('cp-intro')==='1';
  const k=seen?0.6:1;
  try{sessionStorage.setItem('cp-intro','1')}catch(e){}
  const logo=document.getElementById('logo'),rotEl=document.getElementById('rot');
  logo&&logo.style.setProperty('--ldur',(1.4*k)+'s');
  logo&&logo.classList.add('logo-intro');
  setTimeout(()=>{try{rotEl&&rotEl.beginElement()}catch(e){}},100);
  let done=false;
  function finish(){
    if(done)return;done=true;
    const ln=document.getElementById('ln');ln&&ln.remove();
    const sel='.menu>*:not(.logo-area),main>section>*,main>article,main>footer>*';
    document.querySelectorAll(sel).forEach(el=>{
      const y=Math.max(0,el.getBoundingClientRect().top);
      el.style.setProperty('--rd',(Math.min(y/innerHeight,1)*0.35*k).toFixed(2)+'s');
    });
    root.classList.add('is-reveal');root.classList.remove('is-loading');
    setTimeout(()=>{root.classList.remove('is-reveal');logo&&logo.classList.remove('logo-intro')},1600);
  }
  function start(){
    // le as cores reais das bordas com a classe desligada (sem pintar)
    root.classList.remove('is-loading');
    const W=innerWidth,Hh=innerHeight,lines=[];
    document.querySelectorAll('.menu, .menu *, main, main *').forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.width<2||r.height<1||r.bottom<0||r.top>Hh)return;
      const cs=getComputedStyle(el);
      for(const side of ['Top','Right','Bottom','Left']){
        const w=parseFloat(cs['border'+side+'Width']);
        if(!w||cs['border'+side+'Style']==='none')continue;
        const c=cs['border'+side+'Color'];
        if(/rgba\(.*,\s*0\)$/.test(c))continue;
        lines.push({side,w,c,r});
      }
    });
    root.classList.add('is-loading');
    const ln=document.createElement('div');ln.id='ln';
    const ease=t=>t*t*(3-2*t);
    for(const {side,w,c,r} of lines){
      const i=document.createElement('i');
      const horiz=side==='Top'||side==='Bottom';
      let x=r.left,y=r.top,wd=r.width,ht=r.height,d;
      if(side==='Top'){ht=w}
      if(side==='Bottom'){y=r.bottom-w;ht=w}
      if(side==='Left'){wd=w}
      if(side==='Right'){x=r.right-w;wd=w}
      d=horiz?ease(Math.min(Math.max(y,0)/Hh,1))*0.55+(x/W)*0.12:(x/W)*0.5+(Math.max(y,0)/Hh)*0.15;
      i.className=horiz?'h':'v';
      i.style.cssText=`left:${x}px;top:${y}px;width:${wd}px;height:${ht}px;--c:${c};--d:${(d*k).toFixed(2)}s;--dur:${(0.75*k).toFixed(2)}s`;
      ln.appendChild(i);
    }
    document.body.appendChild(ln);
    setTimeout(finish,(1.55*k+0.15)*1000);
  }
  const ready=(document.fonts&&document.fonts.ready)?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1200))]):Promise.resolve();
  ready.then(()=>requestAnimationFrame(start));
  setTimeout(finish,4500);   // seguranca
})();

/* hover da logo */
const svg=document.getElementById('logo'),rot=document.getElementById('rot');let busy=false;
function play(){if(busy)return;busy=true;svg.classList.remove('play');void svg.getBoundingClientRect();svg.classList.add('play');try{rot.beginElement()}catch(e){}setTimeout(()=>{svg.classList.remove('play');busy=false},2400)}
const brand=document.querySelector('.brand');brand.addEventListener('pointerenter',play);brand.addEventListener('focus',play);
/* cronograma: marca turmas encerradas pela data de hoje */
const today=new Date();today.setHours(0,0,0,0);let upcoming=0,firstNext=null;
document.querySelectorAll('#sched li').forEach(li=>{
  const end=new Date(li.dataset.end+'T23:59:59');
  if(end<today){li.classList.add('past');li.querySelector('em').textContent='Encerrada'}
  else{upcoming++;if(!firstNext){firstNext=li;li.classList.add('next')}li.querySelector('em').textContent=li===firstNext?'Próxima':'Aberta'}
});
const sn=document.getElementById('schednote');if(sn)sn.textContent=upcoming?'':'Todas as datas publicadas já aconteceram. Fale com a gente para saber da próxima turma.';
})();
/* skeleton: so aparece se a foto ainda nao chegou; some assim que ela carrega (sem tempo minimo). No mobile e estatico (dither). */
(()=>{
  const mobile=matchMedia('(max-width:820px)').matches;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const OR='#E35205',G1='#c9c9c4',G2='#dededa';
  const skels=[];
  document.querySelectorAll('.dz').forEach(z=>{
    const img=z.querySelector('img');
    const ok=()=>z.classList.add('ready');
    if(!img){ok();return}
    if(img.complete&&img.naturalWidth){ok();return}        // ja carregada/cache: nenhum skeleton
    const done=()=>{ok();setTimeout(()=>{const i=skels.findIndex(s=>s.z===z);if(i>-1){skels[i].c.remove();skels.splice(i,1)}},300)};
    img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});
    if(mobile||reduce)return;                              // sem canvas animado no mobile
    const c=document.createElement('canvas');c.className='sk';z.appendChild(c);
    skels.push({z,c,px:Math.max(4,Math.round(Math.min(z.clientWidth,900)/110)),pts:null});
  });
  if(!skels.length)return;
  function init(s){
    const r=s.z.getBoundingClientRect();
    const W=Math.max(8,Math.floor(r.width/s.px)),H=Math.max(8,Math.floor(r.height/s.px));
    s.c.width=W;s.c.height=H;s.W=W;s.H=H;s.ctx=s.c.getContext('2d');
    const n=Math.round(W*H/90);
    s.pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.012,vy:-.004-Math.random()*.014,
      ph:Math.random()*6.28,sp:.6+Math.random()*1.4,o:Math.random()<.16,s:Math.random()<.2?2:1}));
  }
  function frame(t){
    for(const s of skels){
      if(!s.pts)init(s);
      const{ctx,W,H}=s;ctx.clearRect(0,0,W,H);
      for(const p of s.pts){
        p.x+=p.vx*16+Math.sin(t/1400*p.sp+p.ph)*.02;p.y+=p.vy*16;
        if(p.y<-2){p.y=H+1;p.x=Math.random()*W}if(p.x<-2)p.x=W+1;if(p.x>W+2)p.x=-1;
        ctx.globalAlpha=.35+.65*(.5+.5*Math.sin(t/900*p.sp+p.ph));ctx.fillStyle=p.o?OR:(p.s>1?G1:G2);
        ctx.fillRect(Math.round(p.x),Math.round(p.y),p.s,p.s);
      }
    }
    if(skels.length)requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* indice do artigo: destaca a secao visivel */
(()=>{const toc=document.querySelector('.post-toc');if(!toc)return;
 const links=[...toc.querySelectorAll('a')],map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){links.forEach(l=>l.removeAttribute('aria-current'));map.get(en.target.id)?.setAttribute('aria-current','true')}}),{rootMargin:'-20% 0px -65% 0px'});
 document.querySelectorAll('.post-body h2[id]').forEach(h=>io.observe(h));})();

/* parallax das imagens full bleed: desloca em px, limitado a +-12% da altura (imagem tem 15% de sobra de cada lado) */
(()=>{
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const items=[...document.querySelectorAll('.bleed')];if(!items.length)return;
  let tick=false;
  const upd=()=>{tick=false;const h=innerHeight,changes=[];
    items.forEach(f=>{const box=f.querySelector('.ph-in');if(!box)return;const r=box.getBoundingClientRect();if(r.bottom<-80||r.top>h+80)return;
      const p=((r.top+r.height/2)-h/2)/(h/2+r.height/2);
      const amp=r.height*0.12,img=box.querySelector('img');
      if(img)changes.push([img,(Math.max(-1,Math.min(1,p))*-amp).toFixed(1)+'px']);});
    changes.forEach(([img,y])=>img.style.setProperty('--py',y));};
  const on=()=>{if(!tick){tick=true;requestAnimationFrame(upd)}};
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);setTimeout(upd,300);
})();

/* ===== mobile: menu hero -> barra compacta + dropdown logo abaixo da barra ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)'),root=document.documentElement;
  const src=document.querySelector('.menu'),btn=document.querySelector('.m-btn'),bar=document.querySelector('.m-bar');
  if(!src||!btn||!bar)return;
  const here=(location.pathname.split('/').pop()||'index.html');
  const drop=document.createElement('nav');drop.className='m-drop';drop.id='m-drop';drop.setAttribute('aria-label','Menu');
  drop.innerHTML=[...src.querySelectorAll('nav.main a')].map(a=>{const h=a.getAttribute('href');return `<a href="${h}"${h===here?' aria-current="page"':''}>${a.textContent}</a>`}).join('');
  bar.appendChild(drop);btn.setAttribute('aria-controls','m-drop');
  const ICON_MENU='<path d="M3 8h18M3 16h18" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="square"/>';
  const ICON_X='<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="square"/>';
  const svg0=btn.querySelector('svg');
  const open=o=>{
    root.classList.toggle('m-open',o);btn.setAttribute('aria-expanded',o);
    btn.setAttribute('aria-label',o?'Fechar menu':'Abrir menu');
    if(svg0)svg0.innerHTML=o?ICON_X:ICON_MENU;
  };
  window.__cpCloseMenu=()=>open(false);
  btn.addEventListener('click',e=>{e.stopPropagation();open(!root.classList.contains('m-open'))});
  drop.addEventListener('click',e=>{if(e.target.closest('a'))open(false)});
  document.addEventListener('click',e=>{if(root.classList.contains('m-open')&&!e.target.closest('.m-bar'))open(false)});
  addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
  let y0=0;addEventListener('scroll',()=>{if(root.classList.contains('m-open')&&Math.abs(scrollY-y0)>60)open(false);if(!root.classList.contains('m-open'))y0=scrollY},{passive:true});
  const mainEl=document.querySelector('main');let mainTop=0;
  const measure=()=>{mainTop=mainEl?mainEl.offsetTop:0};
  const onScroll=()=>root.classList.toggle('m-compact',mq.matches&&!!mainEl&&scrollY>=mainTop-1);
  measure();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{if(!mq.matches)open(false);measure();onScroll()});onScroll();
  /* a logo se desenha uma vez ao abrir a pagina */
  if(mq.matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    const svg=document.getElementById('logo'),rot=document.getElementById('rot');
    if(svg){setTimeout(()=>{svg.classList.add('play');try{rot&&rot.beginElement()}catch(e){}},350);setTimeout(()=>svg.classList.remove('play'),2800)}
  }
})();

/* mobile: ao trocar de pagina, pula o menu-hero e vai direto para a hero da pagina */
document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank')return;
  const h=a.getAttribute('href');if(!h||h[0]==='#'||/^(https?:|mailto:|tel:)/.test(h))return;
  try{sessionStorage.setItem('cp-go','1')}catch(_){}
},true);

/* ===== mobile: arrastar o dedo sobre a logo gira o Cadillac (e contra-gira as letras); ao soltar, assenta ===== */
(()=>{
  const svg=document.getElementById('logo'),rot=document.getElementById('rot');
  if(!svg||!rot)return;
  const a=svg.closest('a'),cad=rot.parentElement,letters=svg.querySelector('g.f');
  const K=rot.getAttribute('values').split(';');
  let startX=0,base=0,p=0,drag=false,moved=0,raf=0,lastTick=0;
  const CX=310.3,CY=300;
  const apply=v=>{
    const f=((v%1)+1)%1;
    cad.setAttribute('d',K[Math.round(f*(K.length-1))]);
    letters&&letters.setAttribute('transform',`rotate(${(-v*360).toFixed(2)} ${CX} ${CY})`);
    const t=Math.floor(v*12);if(t!==lastTick){lastTick=t;try{navigator.vibrate&&navigator.vibrate(4)}catch(e){}}
  };
  const settle=()=>{
    const from=p,to=Math.round(p),t0=performance.now(),D=520;
    cancelAnimationFrame(raf);
    const step=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);p=from+(to-from)*e;apply(p);
      if(k<1)raf=requestAnimationFrame(step);else{p=0;apply(0);letters&&letters.removeAttribute('transform')}};
    raf=requestAnimationFrame(step);
  };
  svg.style.touchAction='pan-y';a.style.touchAction='pan-y';
  a.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse')return;
    drag=true;moved=0;startX=e.clientX;base=p;cancelAnimationFrame(raf);
    svg.classList.remove('play');try{rot.endElement()}catch(_){}
    try{a.setPointerCapture(e.pointerId)}catch(_){}
  });
  a.addEventListener('pointermove',e=>{
    if(!drag)return;
    const dx=e.clientX-startX;moved=Math.max(moved,Math.abs(dx));
    p=base+dx/svg.getBoundingClientRect().width;apply(p);
  });
  const end=()=>{if(!drag)return;drag=false;if(moved>6){a.dataset.drag='1';setTimeout(()=>delete a.dataset.drag,400);settle()}};
  a.addEventListener('pointerup',end);a.addEventListener('pointercancel',end);
  a.addEventListener('click',e=>{if(a.dataset.drag){e.preventDefault();e.stopPropagation()}},true);
})();

/* ===== mobile: CTA flutuante que "encaixa" no botao do bloco laranja ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)'),root=document.documentElement;
  const sec=document.querySelector('.m-cta'),src=sec&&sec.querySelector('.btn');if(!src)return;
  const fab=document.createElement('a');fab.className='m-fab';fab.href=src.href;fab.target='_blank';fab.rel='noopener';fab.innerHTML=src.innerHTML;
  const bar=document.createElement('div');bar.className='m-fab-bar';bar.appendChild(fab);document.body.appendChild(bar);
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const defaultHref=src.href,defaultLabel=(src.querySelector('span')||src).textContent;
  const cards=[...document.querySelectorAll('#aulas .card[data-cta-label]')];
  const fabLabel=fab.querySelector('span');
  let currentCard=null;
  const setContext=card=>{
    if(card===currentCard)return;currentCard=card;
    const label=card?card.dataset.ctaLabel:defaultLabel;
    const message=card&&card.dataset.ctaMessage;
    fab.href=message?'https://wa.me/5548999770808?text='+encodeURIComponent(message):defaultHref;
    if(fabLabel){
      fabLabel.classList.remove('is-changing');void fabLabel.offsetWidth;
      fabLabel.textContent=label;fabLabel.classList.add('is-changing');
    }
  };
  let tick=false,snapped=false;
  const upd=()=>{
    tick=false;
    if(!mq.matches){root.classList.remove('m-cta-in');bar.style.removeProperty('--fab-t');bar.style.removeProperty('--fab-s');return}
    const target=src.getBoundingClientRect(),floating=fab.getBoundingClientRect();
    const distance=target.top-floating.top;
    const range=Math.min(180,innerHeight*.24);
    const approach=Math.max(0,Math.min(1,1-distance/range));
    let nextCard=null;
    if(cards.length){
      const visible=cards.map(card=>{
        const cr=card.getBoundingClientRect();
        return{card,area:Math.max(0,Math.min(cr.bottom,innerHeight)-Math.max(cr.top,64))};
      }).filter(item=>item.area>0).sort((a,b)=>b.area-a.area);
      nextCard=visible.length?visible[0].card:null;
    }
    setContext(nextCard);
    bar.style.setProperty('--fab-t',(reduce?0:approach*5).toFixed(2)+'px');
    bar.style.setProperty('--fab-s',(reduce?1:1+approach*.018).toFixed(4));

    // A troca acontece quando os dois botoes se tocam: o clone comprime e
    // entrega o foco visual ao CTA real, que responde com um pequeno pulso.
    const shouldSnap=target.top<=floating.bottom+6;
    if(shouldSnap!==snapped){
      snapped=shouldSnap;root.classList.toggle('m-cta-in',snapped);
      if(snapped){
        src.classList.remove('is-snapping');void src.offsetWidth;src.classList.add('is-snapping');
        setTimeout(()=>src.classList.remove('is-snapping'),520);
        try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}
      }
    }
  };
  const on=()=>{if(!tick){tick=true;requestAnimationFrame(upd)}};
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);mq.addEventListener&&mq.addEventListener('change',on);upd();
})();


/* ===== navegacao mobile coerente: logo = topo (menu); item da propria pagina = hero; outras paginas abrem na hero ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)'),root=document.documentElement;
  const here=(location.pathname.split('/').pop()||'index.html');
  const hero=()=>document.querySelector('main');
  const toTop=()=>scrollTo({top:0,behavior:'smooth'});
  const toHero=()=>{const m=hero();if(m)scrollTo({top:m.getBoundingClientRect().top+scrollY,behavior:'smooth'})};
  const navType=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0]||{}).type||'navigate';
  /* so pula o menu em navegacao nova; em reload / voltar o navegador restaura a posicao */
  if(mq.matches&&root.classList.contains('m-skip')&&navType==='navigate'){const m=hero();if(m)scrollTo(0,m.getBoundingClientRect().top+scrollY)}
  document.addEventListener('click',e=>{
    if(!mq.matches)return;
    const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    const close=()=>{if(window.__cpCloseMenu)window.__cpCloseMenu();else root.classList.remove('m-open')};
    // logo / nome: sempre volta ao menu do topo da pagina atual
    if(a.matches('.brand,.m-name')){e.preventDefault();e.stopImmediatePropagation();try{sessionStorage.removeItem('cp-go')}catch(_){};close();toTop();return}
    // item de menu da propria pagina: vai para a hero
    const href=a.getAttribute('href')||'';
    if(a.closest('nav.main')&&href===here){e.preventDefault();e.stopImmediatePropagation();try{sessionStorage.removeItem('cp-go')}catch(_){};close();setTimeout(toHero,60);}
  },true);
})();

/* mobile: segurar a foto mostra a legenda; soltar esconde */
(()=>{
  const caps=[...document.querySelectorAll('.dz')].filter(z=>z.querySelector(':scope > figcaption'));
  if(!caps.length)return;
  caps.forEach(z=>{
    let t=0;
    const on=()=>z.classList.add('cap'),off=()=>{clearTimeout(t);z.classList.remove('cap')};
    z.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;clearTimeout(t);t=setTimeout(on,250)});
    ['pointerup','pointercancel','pointerleave'].forEach(ev=>z.addEventListener(ev,off));
    z.addEventListener('contextmenu',e=>{if(matchMedia('(max-width:820px)').matches)e.preventDefault()});
    z.addEventListener('touchmove',off,{passive:true});
  });
})();

/* iOS: habilita o estado :active em toda a pagina */
document.addEventListener('touchstart',()=>{},{passive:true});

/* mobile: sem selecao/menu de contexto ao segurar botoes e links da interface */
(()=>{
  const mq=matchMedia('(max-width:820px),(hover:none)');
  const ui='a,button,.btn,.m-fab,nav,.m-cta,.m-bar,.m-overlay,.menu,footer,.door,.card,.dz';
  document.addEventListener('selectstart',e=>{if(!mq.matches)return;const t=e.target.nodeType===1?e.target:e.target.parentElement;if(t&&t.closest(ui)&&!t.closest('.pf-right p,.pf-right h2'))e.preventDefault()});
  document.addEventListener('contextmenu',e=>{if(!mq.matches)return;if(e.target.closest&&e.target.closest('a,button,.btn,.m-fab'))e.preventDefault()});
})();

/* ===== Safari/iOS: restauracao de rolagem confiavel (refresh e voltar) ===== */
(()=>{
  const key='cp-scroll:'+location.pathname;
  const navType=(performance.getEntriesByType&&performance.getEntriesByType('navigation')[0]||{}).type||'navigate';
  let t=0;
  const save=()=>{try{sessionStorage.setItem(key,String(Math.round(scrollY)))}catch(e){}};
  addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(save,120)},{passive:true});
  addEventListener('pagehide',save);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});
  if(navType==='navigate')return;                       // navegacao nova: nao restaura
  let y=0;try{y=parseInt(sessionStorage.getItem(key)||'0',10)||0}catch(e){}
  if(!y)return;
  let tries=0;
  const go=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(max>=y-2||tries>40){scrollTo(0,Math.min(y,Math.max(0,max)));if(tries<40&&Math.abs(scrollY-y)>2){tries++;setTimeout(go,100)}}
    else{tries++;setTimeout(go,100)}
  };
  go();
  addEventListener('load',()=>{setTimeout(()=>{if(Math.abs(scrollY-y)>4)scrollTo(0,y)},60)});
})();

/* ===== mobile: carrossel da equipe - flui sozinho, arrasta com o dedo, laco infinito ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)');
  const team=document.querySelector('.team');if(!team||!mq.matches)return;
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const orig=[...team.children];
  orig.forEach(f=>{
    const c=f.cloneNode(true);c.setAttribute('aria-hidden','true');c.classList.add('carousel-clone');
    c.querySelectorAll('a,button').forEach(x=>x.tabIndex=-1);
    c.querySelectorAll('.dz').forEach(z=>z.classList.add('ready'));
    c.querySelectorAll('img').forEach(img=>{img.loading='eager';img.decoding='async'});
    team.appendChild(c);
  });
  let loopWidth=team.scrollWidth/2;
  const measureLoop=()=>{loopWidth=team.scrollWidth/2};
  let paused=false,resume=0,acc=0,last=0,touchX=0,touchY=0,touchHorizontal=false;
  const hold=()=>{paused=true;clearTimeout(resume)};
  const release=()=>{clearTimeout(resume);resume=setTimeout(()=>{paused=false},2200)};
  team.addEventListener('touchstart',e=>{
    if(!e.touches.length)return;
    touchX=e.touches[0].clientX;touchY=e.touches[0].clientY;touchHorizontal=false;
  },{passive:true});
  team.addEventListener('touchmove',e=>{
    if(touchHorizontal||!e.touches.length)return;
    const dx=Math.abs(e.touches[0].clientX-touchX),dy=Math.abs(e.touches[0].clientY-touchY);
    if(dx>8&&dx>dy*1.15){touchHorizontal=true;hold()}
  },{passive:true});
  team.addEventListener('touchend',()=>{if(touchHorizontal)release();touchHorizontal=false},{passive:true});
  team.addEventListener('touchcancel',()=>{if(touchHorizontal)release();touchHorizontal=false},{passive:true});
  team.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')hold()});
  team.addEventListener('pointerup',e=>{if(e.pointerType==='mouse')release()});
  // laco infinito tambem durante o arrasto manual
  team.addEventListener('scroll',()=>{if(team.scrollLeft>=loopWidth)team.scrollLeft-=loopWidth;else if(team.scrollLeft<=0)team.scrollLeft+=loopWidth},{passive:true});
  addEventListener('resize',measureLoop,{passive:true});
  team.scrollLeft=1;
  let visible=true;
  new IntersectionObserver(es=>es.forEach(e=>visible=e.isIntersecting),{threshold:.05}).observe(team);
  const tick=t=>{
    if(!last)last=t;const dt=Math.min(64,t-last);last=t;
    if(!reduce&&!paused&&visible&&!document.hidden){
      acc+=dt*0.035;                       // ~35 px/s
      const px=Math.floor(acc);if(px){acc-=px;team.scrollLeft+=px}
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* ===== mobile: efeito cortina - o menu recua em parallax enquanto o site sobe por cima ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)');
  const menu=document.querySelector('.menu');if(!menu)return;
  let tick=false,menuHeight=menu.offsetHeight||innerHeight;
  const upd=()=>{
    tick=false;
    if(!mq.matches){menu.style.removeProperty('--mp-y');menu.style.removeProperty('--mp-s');menu.style.removeProperty('--mp-o');return}
    const p=Math.max(0,Math.min(1,scrollY/menuHeight));
    menu.style.setProperty('--mp-y',(p*menuHeight*0.28).toFixed(1)+'px');   // desce mais devagar: fica "por baixo"
    menu.style.setProperty('--mp-s',(1-p*0.06).toFixed(3));
    menu.style.setProperty('--mp-o',(1-p*0.55).toFixed(3));
  };
  const on=()=>{if(!tick){tick=true;requestAnimationFrame(upd)}};
  addEventListener('scroll',on,{passive:true});addEventListener('resize',()=>{menuHeight=menu.offsetHeight||innerHeight;on()});upd();
})();

/* ===== mobile: aparelhos - fluxo lento, loop continuo e gesto somente horizontal ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)'),reel=document.querySelector('.equipment-reel');
  if(!reel||!mq.matches)return;
  const track=reel.querySelector('.equipment-track'),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let paused=false,resume=0,acc=0,last=0,x=0,y=0,horizontal=false,visible=true,loopWidth=track.scrollWidth/2;
  const measureLoop=()=>{loopWidth=track.scrollWidth/2};
  const hold=()=>{paused=true;clearTimeout(resume)};
  const release=()=>{clearTimeout(resume);resume=setTimeout(()=>paused=false,2200)};
  reel.addEventListener('touchstart',e=>{if(!e.touches.length)return;x=e.touches[0].clientX;y=e.touches[0].clientY;horizontal=false},{passive:true});
  reel.addEventListener('touchmove',e=>{
    if(horizontal||!e.touches.length)return;
    const dx=Math.abs(e.touches[0].clientX-x),dy=Math.abs(e.touches[0].clientY-y);
    if(dx>8&&dx>dy*1.15){horizontal=true;hold()}
  },{passive:true});
  reel.addEventListener('touchend',()=>{if(horizontal)release();horizontal=false},{passive:true});
  reel.addEventListener('touchcancel',()=>{if(horizontal)release();horizontal=false},{passive:true});
  reel.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')hold()});
  reel.addEventListener('pointerup',e=>{if(e.pointerType==='mouse')release()});
  reel.addEventListener('scroll',()=>{if(reel.scrollLeft>=loopWidth)reel.scrollLeft-=loopWidth;else if(reel.scrollLeft<=0)reel.scrollLeft+=loopWidth},{passive:true});
  addEventListener('resize',measureLoop,{passive:true});
  new IntersectionObserver(es=>es.forEach(e=>visible=e.isIntersecting),{threshold:.05}).observe(reel);
  reel.scrollLeft=1;
  const tick=t=>{
    if(!last)last=t;const dt=Math.min(64,t-last);last=t;
    if(!reduce&&!paused&&visible&&!document.hidden){acc+=dt*.022;const px=Math.floor(acc);if(px){acc-=px;reel.scrollLeft+=px}}
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* ===== mobile: footer fixo sob o conteudo, revelado com parallax no fim ===== */
(()=>{
  const mq=matchMedia('(max-width:820px)'),root=document.documentElement;
  const main=document.querySelector('main'),footer=main&&main.querySelector(':scope > footer');if(!footer)return;
  const marker=document.createComment('footer-home');footer.parentNode.insertBefore(marker,footer);
  let tick=false,footerHeight=1;
  const place=()=>{
    if(mq.matches){
      if(footer.parentNode!==document.body)document.body.appendChild(footer);
      root.classList.add('m-footer-reveal');
      footerHeight=footer.offsetHeight||1;
      root.style.setProperty('--footer-h',footerHeight+'px');
    }else{
      if(footer.parentNode!==main)marker.parentNode.insertBefore(footer,marker.nextSibling);
      root.classList.remove('m-footer-reveal');
      root.classList.remove('m-footer-near');
      root.style.removeProperty('--footer-h');
      footer.style.removeProperty('--fp-y');
    }
  };
  const upd=()=>{
    tick=false;if(!mq.matches)return;
    const end=main.getBoundingClientRect().bottom;
    const p=Math.max(0,Math.min(1,(innerHeight-end)/footerHeight));
    root.classList.toggle('m-footer-near',end<=innerHeight+footerHeight);
    footer.style.setProperty('--fp-y',((1-p)*42).toFixed(2)+'px');
  };
  const on=()=>{if(!tick){tick=true;requestAnimationFrame(upd)}};
  const layout=()=>{place();on()};
  addEventListener('scroll',on,{passive:true});addEventListener('resize',layout);mq.addEventListener&&mq.addEventListener('change',layout);
  if('ResizeObserver'in window)new ResizeObserver(()=>{if(!mq.matches)return;const h=footer.offsetHeight||1;if(h!==footerHeight){footerHeight=h;root.style.setProperty('--footer-h',h+'px');on()}}).observe(footer);
  layout();
})();

/* mobile: segura o limite inferior para evitar o rubber band sobre o footer */
(()=>{
  const mq=matchMedia('(max-width:820px)');
  let x=0,y=0;
  addEventListener('touchstart',e=>{
    if(!mq.matches||!e.touches.length)return;
    x=e.touches[0].clientX;y=e.touches[0].clientY;
  },{passive:true});
  addEventListener('touchmove',e=>{
    if(!mq.matches||!e.touches.length)return;
    const dx=e.touches[0].clientX-x,dy=e.touches[0].clientY-y;
    const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
    if(scrollY>=max-1&&dy<0&&Math.abs(dy)>Math.abs(dx))e.preventDefault();
  },{passive:false});
})();
