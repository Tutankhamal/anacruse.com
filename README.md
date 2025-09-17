# 🎸 Anacruse - Site Oficial da Banda

> **Website oficial da banda de rock Anacruse com estética cyberpunk e funcionalidades modernas**

![Anacruse Banner](https://i.imgur.com/05mus5v.png)

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [🌐 Estrutura de Páginas](#-estrutura-de-páginas)
- [🎨 Sistema de Estilos](#-sistema-de-estilos)
- [⚡ Funcionalidades JavaScript](#-funcionalidades-javascript)
- [📱 Responsividade](#-responsividade)
- [🚀 Como Usar](#-como-usar)
- [🔧 Personalização](#-personalização)
- [📦 Dependências](#-dependências)
- [🤝 Contribuição](#-contribuição)

---

## 🎯 Visão Geral

O site oficial da banda **Anacruse** é uma aplicação web moderna com tema **cyberpunk/retrowave** que oferece:

- ✨ **Design Responsivo** com estética cyberpunk
- 🎥 **Player de Vídeo Otimizado** (lite-youtube-embed)
- 🌍 **Suporte Multilíngue** (Português/Inglês)
- 🎵 **Integração com Plataformas** (YouTube, Spotify, etc.)
- 🛒 **Loja Virtual** integrada
- 📱 **Mobile-First** com navegação touch

### 🎨 Características Visuais

- **Paleta de Cores**: Roxo neon (#a855f7), Ciano (#22d3ee), Magenta (#f472b6)
- **Tipografia**: Oxanium (títulos) + Inter (texto)
- **Efeitos**: Glitch, neon glow, parallax, animações CSS
- **Background**: Grid animado + fog com movimento

---

## 🏗️ Arquitetura do Projeto

```
anacruse.com/
├── 📁 ptbr/                    # Versão em Português
│   ├── index.html              # Página inicial
│   ├── loja.html              # Loja virtual
│   ├── banda.html             # Sobre a banda
│   ├── canal.html             # Canal/vídeos
│   ├── sobre.html             # Sobre o projeto
│   └── contato.html           # Contato
├── 📁 eng/                     # Versão em Inglês
│   ├── index.html              # Home page
│   ├── store.html             # Store
│   ├── band.html              # About band
│   ├── channel.html           # Channel/videos
│   ├── about.html             # About project
│   └── contact.html           # Contact
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── style.css          # Estilos principais (2111 linhas)
│   │   └── lite-yt-embed.css  # Estilos do player de vídeo
│   ├── 📁 js/
│   │   ├── main.js            # JavaScript principal (752 linhas)
│   │   ├── gallery.js         # Sistema de galeria/carrossel
│   │   └── lite-yt-embed.js   # Player de vídeo otimizado
│   └── 📁 images/
│       ├── main_logo.webp     # Logo principal
│       └── favicon.ico        # Ícone do site
└── index.html                  # Redirecionamento automático
```

---

## 🌐 Estrutura de Páginas

### 📄 Estrutura HTML Base

Todas as páginas seguem a mesma estrutura semântica:

```html
<!doctype html>
<html lang="pt-BR" | lang="en">
<head>
  <!-- Meta tags SEO otimizadas -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  
  <!-- Open Graph + Twitter Cards -->
  <meta property="og:type" content="website">
  <meta property="twitter:card" content="summary_large_image">
  
  <!-- Fontes e estilos -->
  <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/lite-yt-embed.css">
</head>
<body>
  <!-- Background animado -->
  <div class="bg-wrap">
    <div class="bg-grid"></div>
    <div class="bg-fog"></div>
  </div>
  
  <!-- Navegação fixa -->
  <header class="navbar">...</header>
  
  <!-- Conteúdo principal -->
  <main>...</main>
  
  <!-- Rodapé com links sociais -->
  <footer class="footer">...</footer>
  
  <!-- Scripts -->
  <script src="../assets/js/lite-yt-embed.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

### 🧭 Sistema de Navegação

**Navbar Responsiva:**
- Logo com efeito glitch no hover
- Menu horizontal (desktop) / hamburger (mobile)
- Seletor de idioma (PT/EN)
- Indicador de página ativa
- Backdrop blur + transparência

**Links de Navegação:**
- Home/Início
- Store/Loja
- Band/Banda
- Channel/Canal
- About/Sobre
- Contact/Contato

---

## 🎨 Sistema de Estilos

### 🎨 Variáveis CSS (`:root`)

```css
:root {
  /* Cores principais */
  --bg: #0a0a0f;                    /* Fundo escuro */
  --bg-soft: #0f0f16;               /* Fundo suave */
  --glass: rgba(0,0,0,0.5);         /* Efeito vidro */
  --text: #e5e7eb;                  /* Texto principal */
  --muted: #a1a1aa;                 /* Texto secundário */
  
  /* Cores neon */
  --primary: #a855f7;               /* Roxo neon */
  --primary-2: #7c3aed;             /* Roxo hover */
  --accent: #22d3ee;                /* Ciano apoio */
  --magenta: #f472b6;               /* Magenta */
  --success: #34d399;               /* Verde sucesso */
  --danger: #fb7185;                /* Vermelho erro */
  
  /* Efeitos */
  --shadow: 0 10px 30px rgba(168,85,247,0.25);
  --radius: 14px;
  --radius-sm: 10px;
  --maxw: 1200px;
}
```

### 🌟 Componentes Principais

#### 1. **Background Animado**
```css
.bg-wrap {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
}

.bg-grid {
  /* Grid com gradientes radiais */
  background: 
    radial-gradient(circle at 50% 10%, rgba(168,85,247,0.12), transparent 60%),
    repeating-linear-gradient(to right, rgba(168,85,247,0.08) 0 1px, transparent 1px 120px),
    repeating-linear-gradient(to bottom, rgba(34,211,238,0.06) 0 1px, transparent 1px 120px);
}

.bg-fog {
  /* Névoa com movimento */
  animation: fogMove 18s ease-in-out infinite alternate;
}
```

#### 2. **Botões Neon**
```css
.btn {
  padding: 14px 24px;
  border-radius: 16px;
  border: 2px solid rgba(168,85,247,0.6);
  background: rgba(124,58,237,0.3);
  box-shadow: 
    0 0 20px rgba(168,85,247,0.3),
    0 4px 15px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.1);
  animation: btnPulse 4s ease-in-out infinite;
}

.btn:hover {
  transform: translateY(-3px) scale(1.05);
  animation: btnNeonPulse 1.2s ease-in-out infinite alternate;
}
```

#### 3. **Efeito Glitch**
```css
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  clip-path: inset(0 0 0 0);
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 var(--accent);
  animation: glitchTop 2.5s infinite ease-in-out alternate;
}

.glitch::after {
  left: -2px;
  text-shadow: 2px 0 var(--magenta);
  animation: glitchBot 2.8s infinite ease-in-out alternate;
}
```

#### 4. **Avatar com Efeitos**
```css
.hero .avatar {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(168,85,247,0.35), transparent 60%);
  border: 2px solid rgba(168,85,247,0.6);
  box-shadow: 0 0 30px rgba(168,85,247,0.3);
  animation: logoPulse 3s ease-in-out infinite;
}

.hero .avatar:hover {
  animation: logoGlitchHover 0.4s ease-in-out, logoZoom 0.3s ease-in-out forwards;
}

/* Efeito Neon Saber na borda */
.hero .avatar::after {
  background: conic-gradient(
    from 0deg,
    rgba(168,85,247,0) 0%,
    rgba(168,85,247,0.8) 25%,
    rgba(34,211,238,0.8) 50%,
    rgba(168,85,247,0.8) 75%,
    rgba(168,85,247,0) 100%
  );
  animation: neonRotate 4s linear infinite;
}
```

---

## ⚡ Funcionalidades JavaScript

### 📱 Menu Mobile (`main.js`)

```javascript
// Toggle do menu hamburger
const hamb = document.querySelector('.hamb');
const mobileMenu = document.querySelector('.mobile-menu');

hamb.addEventListener('click', () => {
  hamb.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  hamb.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!hamb.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamb.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});
```

### 🌍 Sistema de Idiomas

```javascript
// Redirecionamento automático baseado no idioma do navegador
const isRoot = document.documentElement.hasAttribute('data-root-index');
if (isRoot) {
  const nav = navigator.language || navigator.userLanguage || 'en';
  const isPT = /pt|pt-BR/i.test(nav);
  const stored = localStorage.getItem('site_lang');
  const target = stored || (isPT ? 'ptbr' : 'eng');
  window.location.replace(`./${target}/index.html`);
}
```

### 🎥 Player de Vídeo Otimizado

**Lite YouTube Embed** - Carregamento sob demanda:

```javascript
// Classe personalizada para YouTube embeds otimizados
class LiteYTEmbed extends HTMLElement {
  connectedCallback() {
    this.videoId = this.getAttribute('videoid');
    
    // Thumbnail de alta qualidade
    if (!this.style.backgroundImage) {
      this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg")`;
    }
    
    // Botão de play
    const playBtnEl = document.createElement('button');
    playBtnEl.classList.add('lyt-playbtn');
    this.append(playBtnEl);
    
    // Carregar iframe apenas quando clicado
    this.addEventListener('click', this.activate);
  }
  
  async activate() {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1&rel=0`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    this.innerHTML = '';
    this.appendChild(iframe);
    
    // Adicionar classe para efeitos visuais
    document.documentElement.classList.add('is-playing');
  }
}

customElements.define('lite-youtube', LiteYTEmbed);
```

### 🎠 Sistema de Galeria (`gallery.js`)

```javascript
class ModernGallery {
  constructor(selector) {
    this.carousel = document.querySelector(selector);
    this.track = this.carousel.querySelector('.carousel-track');
    this.items = this.carousel.querySelectorAll('.carousel-item');
    
    this.currentIndex = 0;
    this.itemsToShow = this.getItemsToShow(); // Responsivo
    
    this.init();
  }
  
  getItemsToShow() {
    const width = window.innerWidth;
    if (width <= 768) return 1;      // Mobile
    if (width <= 1024) return 2;     // Tablet
    return 3;                        // Desktop
  }
  
  setupTouchEvents() {
    // Suporte a gestos touch para mobile
    let startX = 0;
    let currentX = 0;
    
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.track.addEventListener('touchend', () => {
      const diffX = currentX - startX;
      const threshold = 50;
      
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          this.prev();
        } else {
          this.next();
        }
      }
    });
  }
}
```

### 🎯 Parallax do Background

```javascript
// Efeito parallax baseado no movimento do mouse
const bgGrid = document.querySelector('.bg-grid');
const bgFog = document.querySelector('.bg-fog');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  
  bgGrid.style.transform = `translate(${x*10}px, ${y*10}px)`;
  bgFog.style.setProperty('--x', `${(x+0.5)*100}%`);
  bgFog.style.setProperty('--y', `${(y+0.5)*100}%`);
}, {passive: true});
```

### 📺 Integração com YouTube API

```javascript
// Buscar vídeos dos canais via RSS (sem API key)
const fetchChannelVideos = async (channelId, maxResults = 10) => {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    
    const entries = Array.from(xmlDoc.querySelectorAll('entry'));
    return entries.slice(0, maxResults).map(entry => {
      const id = entry.querySelector('yt\\:videoId, videoId')?.textContent;
      const title = entry.querySelector('title')?.textContent;
      const published = entry.querySelector('published')?.textContent;
      return { id, title, published };
    }).filter(v => v.id && v.title && !/(#shorts?|shorts?)/i.test(v.title));
  } catch (error) {
    console.warn('Failed to fetch videos:', error);
    return [];
  }
};

// Canais configurados
const CHANNELS = {
  afonso: 'UCN1qsUWT7bElmmqmROlJpvw',
  anacruse: 'UCFfqCGtJckEiFJX2T6TUIvw'
};
```

---

## 📱 Responsividade

### 📐 Breakpoints

| Dispositivo | Largura | Colunas Grid | Menu |
|-------------|---------|--------------|------|
| **Mobile** | ≤ 768px | 1 coluna | Hamburger |
| **Tablet** | 769px - 1024px | 2 colunas | Hamburger |
| **Desktop** | ≥ 1025px | 3 colunas | Horizontal |

### 📱 Adaptações Mobile

```css
@media (max-width: 980px) {
  .nav-links { display: none; }
  .hamb { display: flex; }
}

@media (max-width: 768px) {
  .hero {
    margin-top: 50px;
    text-align: center;
  }
  
  .hero h1 {
    font-size: clamp(28px, 8vw, 48px);
  }
  
  .hero .ctas {
    flex-direction: column;
    align-items: center;
  }
  
  .grid.cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 580px) {
  .container {
    padding: 0 16px;
  }
  
  .section {
    padding: 48px 0;
  }
}
```

### 🤏 Gestos Touch

- **Swipe horizontal**: Navegação na galeria
- **Tap**: Ativação de vídeos e botões
- **Pinch/Zoom**: Suportado nativamente
- **Scroll**: Suave com `scroll-behavior: smooth`

---

## 🚀 Como Usar

### 1. **Instalação Local**

```bash
# Clonar o repositório
git clone https://github.com/Tutankhamal/anacruse.com.git
cd anacruse.com

# Servir localmente (Python)
python -m http.server 8000

# Ou com Node.js
npx serve .

# Acessar
open http://localhost:8000
```

### 2. **Estrutura de Deploy**

```
📁 Servidor Web
├── index.html              # Redirecionamento
├── 📁 ptbr/               # Versão PT-BR
├── 📁 eng/                # Versão EN
└── 📁 assets/             # Recursos estáticos
```

### 3. **Configuração de Servidor**

**Apache (.htaccess):**
```apache
# Redirecionamento baseado no idioma
RewriteEngine On
RewriteCond %{HTTP_ACCEPT_LANGUAGE} ^pt [NC]
RewriteRule ^$ /ptbr/index.html [R,L]
RewriteRule ^$ /eng/index.html [R,L]

# Cache para assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|webp|svg|ico)$">
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
</FilesMatch>
```

**Nginx:**
```nginx
location / {
  # Redirecionamento por idioma
  if ($http_accept_language ~* "^pt") {
    return 302 /ptbr/index.html;
  }
  return 302 /eng/index.html;
}

# Cache para assets
location ~* \.(css|js|png|jpg|jpeg|gif|webp|svg|ico)$ {
  expires 1M;
  add_header Cache-Control "public, immutable";
}
```

---

## 🔧 Personalização

### 🎨 Alterando Cores

**1. Editar variáveis CSS:**
```css
:root {
  --primary: #your-color;     /* Cor principal */
  --accent: #your-accent;     /* Cor de apoio */
  --magenta: #your-magenta;   /* Cor de destaque */
}
```

**2. Cores disponíveis:**
- `--primary`: Roxo neon principal
- `--primary-2`: Variação hover
- `--accent`: Ciano de apoio
- `--magenta`: Rosa/magenta
- `--success`: Verde para sucessos
- `--danger`: Vermelho para erros

### 🖼️ Alterando Imagens

**Logo principal:**
```html
<!-- Substituir em todas as páginas -->
<img src="../assets/images/main_logo.webp" alt="Anacruse logo" />
```

**Favicon:**
```html
<link rel="icon" type="image/x-icon" href="../assets/images/favicon.ico" />
```

**Open Graph:**
```html
<meta property="og:image" content="https://i.imgur.com/05mus5v.png" />
```

### 📝 Alterando Textos

**Metadados SEO:**
```html
<title>Seu Título | Sua Banda</title>
<meta name="description" content="Sua descrição aqui" />
<meta name="keywords" content="suas, palavras, chave" />
```

**Conteúdo das páginas:**
- Editar diretamente nos arquivos HTML
- Manter a estrutura semântica
- Atualizar ambos os idiomas (ptbr/ e eng/)

### 🎵 Configurando Canais

**IDs dos canais YouTube:**
```javascript
// Em main.js
const CHANNELS = {
  principal: 'SEU_CHANNEL_ID_PRINCIPAL',
  banda: 'SEU_CHANNEL_ID_BANDA'
};
```

**Links sociais:**
```html
<!-- No footer -->
<a href="https://youtube.com/@seucanalaqui" target="_blank">
  <i class="fa-brands fa-youtube"></i> YouTube
</a>
```

---

## 📦 Dependências

### 🌐 CDN Externas

| Recurso | URL | Versão | Uso |
|---------|-----|--------|-----|
| **Google Fonts** | fonts.googleapis.com | Latest | Oxanium + Inter |
| **Font Awesome** | cdnjs.cloudflare.com | 6.5.0 | Ícones |
| **AllOrigins** | api.allorigins.win | - | Proxy CORS |

### 📁 Arquivos Locais

| Arquivo | Tamanho | Descrição |
|---------|---------|----------|
| `style.css` | ~2111 linhas | Estilos principais |
| `main.js` | ~752 linhas | JavaScript principal |
| `lite-yt-embed.js` | ~239 linhas | Player de vídeo |
| `lite-yt-embed.css` | ~95 linhas | Estilos do player |
| `gallery.js` | ~244 linhas | Sistema de galeria |

### 🔧 Ferramentas de Desenvolvimento

```json
{
  "devDependencies": {
    "live-server": "^1.2.2",
    "http-server": "^14.1.1",
    "serve": "^14.2.1"
  }
}
```

### 🌍 Compatibilidade

| Navegador | Versão Mínima | Suporte |
|-----------|---------------|----------|
| **Chrome** | 88+ | ✅ Completo |
| **Firefox** | 85+ | ✅ Completo |
| **Safari** | 14+ | ✅ Completo |
| **Edge** | 88+ | ✅ Completo |
| **Mobile** | iOS 14+, Android 10+ | ✅ Completo |

**Recursos utilizados:**
- CSS Custom Properties (variáveis)
- CSS Grid & Flexbox
- Custom Elements (Web Components)
- Fetch API
- LocalStorage
- Touch Events
- Intersection Observer

---

## 🤝 Contribuição

### 🐛 Reportando Bugs

1. **Verifique** se o bug já foi reportado
2. **Crie uma issue** com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Screenshots (se aplicável)
   - Informações do navegador/dispositivo

### 💡 Sugerindo Melhorias

1. **Fork** o repositório
2. **Crie** uma branch para sua feature
3. **Implemente** as mudanças
4. **Teste** em diferentes dispositivos
5. **Envie** um Pull Request

### 📋 Checklist para PRs

- [ ] Código testado em Chrome, Firefox e Safari
- [ ] Responsividade verificada (mobile/tablet/desktop)
- [ ] Ambos idiomas atualizados (PT/EN)
- [ ] Performance não impactada
- [ ] Acessibilidade mantida
- [ ] Documentação atualizada

### 🎨 Padrões de Código

**CSS:**
```css
/* Comentários descritivos */
.component {
  /* Propriedades em ordem alfabética */
  background: var(--bg);
  border-radius: var(--radius);
  color: var(--text);
  padding: 1rem;
}

/* Media queries no final */
@media (max-width: 768px) {
  .component {
    padding: 0.5rem;
  }
}
```

**JavaScript:**
```javascript
// Comentários explicativos
const functionName = (param) => {
  // Lógica clara e concisa
  return result;
};

// Event listeners com passive quando possível
element.addEventListener('scroll', handler, {passive: true});
```

---

## 📄 Licença

**MIT License** - Veja o arquivo [LICENSE](LICENSE) para detalhes.

### 🏷️ Créditos

- **Desenvolvedor**: André "Tutankhamal" Borba
- **Website**: [tutankhamal.com](https://tutankhamal.com)
- **Banda**: Anacruse
- **Inspiração**: Estética Cyberpunk/Retrowave

### 🎵 Recursos Utilizados

- **Lite YouTube Embed**: [Paul Irish](https://github.com/paulirish/lite-youtube-embed)
- **Font Awesome**: [Fonticons](https://fontawesome.com)
- **Google Fonts**: [Oxanium](https://fonts.google.com/specimen/Oxanium) + [Inter](https://fonts.google.com/specimen/Inter)

---

## 📞 Suporte

### 🆘 Precisa de Ajuda?

- 📧 **Email**: contato@tutankhamal.com
- 🐦 **Twitter**: [@oafonsofonseca](https://twitter.com/oafonsofonseca)
- 💬 **Discord**: [Comunidade](https://discord.com/invite/szrjjcsu4C)
- 🌐 **Website**: [tutankhamal.com](https://tutankhamal.com)

### 📚 Recursos Adicionais

- [Documentação CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Web Components Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [YouTube API Documentation](https://developers.google.com/youtube/v3)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

<div align="center">

[⬆️ Voltar ao topo](#-anacruse---site-oficial-da-banda)

</div>