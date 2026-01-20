import { BlogPost } from './types';

export const ASSETS = {
  LOGO: '/Logo-Coletivo-Pilates.svg',
  HERO: 'https://static.wixstatic.com/media/5d7f48_7e7899bf271f449d986bf70ed2bf1da8~mv2.jpg/v1/fill/w_1440,h_662,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_7e7899bf271f449d986bf70ed2bf1da8~mv2.jpg',
  ABOUT: 'https://static.wixstatic.com/media/5d7f48_a9a3b040ac944f72ae97376fff1ab047~mv2.jpg/v1/fill/w_720,h_650,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_a9a3b040ac944f72ae97376fff1ab047~mv2.jpg',
  ACADEMY: 'https://static.wixstatic.com/media/5d7f48_1a049f9b9a724431b9057587f3b4c12d~mv2.jpg/v1/fill/w_821,h_510,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_1a049f9b9a724431b9057587f3b4c12d~mv2.jpg',
  ACADEMY_GALLERY: [
    'https://static.wixstatic.com/media/5d7f48_bd3d0408aeb941acaa9a21bcb6354c26~mv2.jpg/v1/fill/w_718,h_718,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_bd3d0408aeb941acaa9a21bcb6354c26~mv2.jpg',
    'https://static.wixstatic.com/media/5d7f48_465323bcf1c3444da2841f10c3af1845~mv2.jpg/v1/fill/w_719,h_626,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_465323bcf1c3444da2841f10c3af1845~mv2.jpg',
    'https://static.wixstatic.com/media/5d7f48_300a92a678cf4a568b87cbe02e5e4557~mv2.jpg/v1/fill/w_718,h_718,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_300a92a678cf4a568b87cbe02e5e4557~mv2.jpg',
    'https://static.wixstatic.com/media/5d7f48_b54c79e5b77844e0926398ff51de7463~mv2.jpg/v1/fill/w_719,h_626,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_b54c79e5b77844e0926398ff51de7463~mv2.jpg'
  ]
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/sobre',
  ACADEMY: '/academy',
  JOURNAL: '/journal',
  CLASSES: '/aulas',
  SHOP: '/shop',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "A evolução do Classic Pilates no Brasil",
    date: "12 OUT 2023",
    category: "História",
    author: "Priscila Wiggers",
    summary: "Como o método chegou ao país e quais foram as principais adaptações culturais e estruturais ao longo das últimas duas décadas.",
    image: "https://static.wixstatic.com/media/5d7f48_bd3d0408aeb941acaa9a21bcb6354c26~mv2.jpg/v1/fill/w_718,h_718,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_bd3d0408aeb941acaa9a21bcb6354c26~mv2.jpg",
    content: [
      "Quando Joseph Pilates desembarcou na América, ele carregava consigo não apenas uma bagagem física, mas um sistema de crenças sobre a saúde humana que estava décadas à frente de seu tempo. A 'Contrologia', como ele originalmente chamava, não era apenas exercício; era um estilo de vida.",
      "No Brasil, a chegada do método seguiu um caminho curioso. Inicialmente adotado por bailarinos em busca de reabilitação, o Pilates logo encontrou espaço nas clínicas de fisioterapia. No entanto, houve uma fragmentação. O 'Pilates Clássico', aquele que segue rigorosamente a ordem, os equipamentos e as intenções de Joe, muitas vezes foi substituído por variações contemporâneas.",
      "Hoje, vivemos um renascimento. O retorno às origens não é saudosismo, é eficiência. Entendemos que a genialidade do sistema está na sua integridade. Cada exercício prepara o corpo para o próximo. O Reformer não existe sem o Mat; o Cadillac não substitui a Wunda Chair.",
      "No Coletivo, nossa missão é preservar essa linha direta. Quando ensinamos o 'Teaser', não ensinamos apenas a levantar as pernas; ensinamos a conectar o Powerhouse ao resto do mundo."
    ]
  },
  {
    id: 2,
    title: "Respiração: O motor do Powerhouse",
    date: "28 SET 2023",
    category: "Técnica",
    author: "Equipe Coletivo",
    summary: "Entendendo a respiração torácica lateral e posterior como ferramenta fundamental para estabilização e descompressão vertebral.",
    image: "https://static.wixstatic.com/media/5d7f48_465323bcf1c3444da2841f10c3af1845~mv2.jpg/v1/fill/w_719,h_626,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_465323bcf1c3444da2841f10c3af1845~mv2.jpg",
    content: [
      "A respiração é o primeiro e o último ato da vida. Joseph Pilates sabia disso e colocou a respiração como um dos princípios fundamentais do seu método. Mas não falamos de qualquer respiração.",
      "A respiração torácica lateral e posterior é específica. Ela permite que mantenhamos a conexão abdominal profunda (o 'scoop') enquanto oxigenamos o corpo. Ao inspirar expandindo as costelas para os lados e para trás, criamos espaço entre as vértebras.",
      "Muitos alunos chegam ao estúdio com um padrão respiratório apical (no peito superior) ou paradoxal. Reeducar esse padrão é o primeiro passo para desbloquear movimentos complexos. Sem ar, não há movimento fluido. Sem fluidez, não há Contrologia."
    ]
  },
  {
    id: 3,
    title: "Workshop: Coluna Viva",
    date: "15 AGO 2023",
    category: "Eventos",
    author: "Zé Neto",
    summary: "Um registro fotográfico do nosso último encontro focado em mobilidade torácica e dissociação de cinturas.",
    image: "https://static.wixstatic.com/media/5d7f48_300a92a678cf4a568b87cbe02e5e4557~mv2.jpg/v1/fill/w_718,h_718,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_300a92a678cf4a568b87cbe02e5e4557~mv2.jpg",
    content: [
      "No último sábado, o estúdio vibrou de forma diferente. Recebemos instrutores de todo o estado para o Workshop 'Coluna Viva'. O foco? Devolver à coluna sua capacidade natural de serpentear, girar e se estender.",
      "Vivemos em uma sociedade de cadeiras. Nossas colunas estão ficando rígidas, presas em flexão constante. O Pilates é o antídoto para a vida moderna. Durante 4 horas, exploramos o repertório avançado do Barrel e da Chair, buscando onde o movimento estava bloqueado.",
      "Ver a compreensão nos olhos de um instrutor quando ele finalmente sente a articulação correta é impagável. A educação continuada não é um luxo, é uma necessidade ética da nossa profissão."
    ]
  },
  {
    id: 4,
    title: "Equipamentos: Reformer vs Cadillac",
    date: "02 JUL 2023",
    category: "Equipamentos",
    author: "Priscila Wiggers",
    summary: "Analisando as diferenças vetoriais de força e como escolher o melhor aparelho para cada objetivo de reabilitação.",
    image: "https://static.wixstatic.com/media/5d7f48_b54c79e5b77844e0926398ff51de7463~mv2.jpg/v1/fill/w_719,h_626,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5d7f48_b54c79e5b77844e0926398ff51de7463~mv2.jpg",
    content: [
      "Uma pergunta comum: 'Qual é melhor, o Reformer ou o Cadillac?'. A resposta, como tudo no Pilates, é: depende.",
      "O Reformer trabalha com um sistema de molas horizontais e um carrinho móvel. Ele desafia o controle sob instabilidade. É fantástico para fluxo, coordenação e fortalecimento excêntrico.",
      "O Cadillac, por outro lado, é uma mesa estável com molas vindas de várias direções. Ele permite isolar membros de forma que o Reformer não consegue. É a ferramenta perfeita para quem precisa de feedback tátil ou está em reabilitação inicial.",
      "Um corpo completo precisa de ambos. O sistema foi desenhado para ser integrado. O que você aprende no Cadillac, você aplica no Reformer, e testa no Mat."
    ]
  }
];