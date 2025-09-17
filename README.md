<div align="center">

# 🎸 ANACRUSE — Site Oficial

[![Cyberpunk Badge](https://img.shields.io/badge/Theme-Cyberpunk%2FRetrowave-a855f7?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMjJkM2VlIi8+Cjwvc3ZnPgo=)](https://anacruse.com)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-22d3ee?style=for-the-badge)](https://tutankhamal.com)
[![License](https://img.shields.io/badge/License-Custom%20%7C%20Study%20Only-f472b6?style=for-the-badge)](#-licença-e-créditos)
[![Developer](https://img.shields.io/badge/Dev-Tutankhamal-a855f7?style=for-the-badge&logo=github)](https://tutankhamal.com)

**🌐 [Site em Produção](https://anacruse.com) • 👨‍💻 [Portfólio do Dev](https://tutankhamal.com) • 📄 [Licença](LICENCA.md)**

---

*Site oficial da banda Anacruse com estética cyberpunk/retrowave dark-only, otimizado para performance e experiência do usuário.*

</div>

## 📋 Índice de Navegação

<details>
<summary><strong>🚀 Início Rápido</strong></summary>

- [⚡ Setup Instantâneo](#-setup-instantâneo)
- [🎯 Primeiros Passos](#-primeiros-passos)
- [📱 Preview Local](#-preview-local)

</details>

<details>
<summary><strong>✏️ Guia do Editor de Conteúdo</strong></summary>

- [📝 Editando Textos e Links](#-editando-textos-e-links)
- [🏷️ Metadados e SEO](#️-metadados-e-seo)
- [🖼️ Gerenciamento de Imagens](#️-gerenciamento-de-imagens)
- [🎥 Vídeos do YouTube](#-vídeos-do-youtube)

</details>

<details>
<summary><strong>🎨 Guia do Designer</strong></summary>

- [🌈 Sistema de Cores](#-sistema-de-cores)
- [🔤 Tipografia](#-tipografia)
- [🌌 Backgrounds Animados](#-backgrounds-animados)
- [📐 Layout Responsivo](#-layout-responsivo)

</details>

<details>
<summary><strong>⚙️ Guia do Desenvolvedor</strong></summary>

- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [📜 Scripts e APIs](#-scripts-e-apis)
- [🔧 Customizações Avançadas](#-customizações-avançadas)
- [🐛 Troubleshooting](#-troubleshooting)

</details>

<details>
<summary><strong>📚 Referência Técnica</strong></summary>

- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📊 Especificações Técnicas](#-especificações-técnicas)
- [♿ Acessibilidade](#-acessibilidade)
- [⚖️ Licença e Créditos](#️-licença-e-créditos)

</details>

---

## ⚡ Setup Instantâneo

> **💡 Para usuários que querem começar imediatamente**

```bash
# Clone ou baixe o projeto
git clone <repository-url>
cd "Afonso Fonseca"

# Abra com Live Server (VS Code) ou servidor local
# Navegue para: ptbr/index.html ou eng/index.html
```

**🎯 Tarefas mais comuns:**
- ✏️ **Editar texto**: Abra `ptbr/*.html` ou `eng/*.html` → Edite diretamente
- 🎨 **Mudar cores**: `assets/css/style.css` → Seção `:root`
- 🖼️ **Trocar imagens**: Substitua arquivos em `assets/images/`
- 🎥 **Atualizar vídeos**: Edite `assets/data/afonso-videos.json`

---

## 🏗️ Arquitetura do Projeto

```
📁 Anacruse Website/
├── 📁 assets/                    # Recursos estáticos
│   ├── 📁 css/
│   │   ├── 📄 style.css          # Estilos principais (2111 linhas)
│   │   └── 📄 lite-yt-embed.css  # YouTube embed otimizado
│   ├── 📁 js/
│   │   ├── 📄 main.js            # Core JavaScript (752 linhas)
│   │   ├── 📄 gallery.js         # Carrossel/galeria
│   │   └── 📄 lite-yt-embed.js   # Web Component YouTube
│   ├── 📁 images/
│   │   ├── 🖼️ main_logo.webp     # Logo principal (WebP)
│   │   ├── 🖼️ og-image.svg       # Open Graph (SVG)
│   │   └── 📄 favicon.ico        # Favicon multi-size
│   └── 📁 data/
│       └── 📄 afonso-videos.json # Dados dos vídeos
├── 📁 ptbr/                      # Páginas em Português
│   ├── 📄 index.html            # Home PT-BR
│   ├── 📄 loja.html             # Loja/produtos
│   ├── 📄 banda.html            # Sobre a banda
│   ├── 📄 canal.html            # Canal YouTube
│   ├── 📄 sobre.html            # Sobre o projeto
│   └── 📄 contato.html          # Contato
├── 📁 eng/                       # Páginas em Inglês
│   ├── 📄 index.html            # Home EN
│   ├── 📄 store.html            # Store/products
│   ├── 📄 band.html             # About band
│   ├── 📄 channel.html          # YouTube channel
│   ├── 📄 about.html            # About project
│   └── 📄 contact.html          # Contact
├── 📄 index.html                 # Redirect automático PT/EN
├── 📄 README.md                  # Esta documentação
└── 📄 LICENCA.md                 # Licenças e créditos
```

### 🔍 **Características Técnicas**

| Aspecto | Especificação |
|---------|---------------|
| **Tema** | Cyberpunk/Retrowave dark-only |
| **Performance** | Lazy loading, WebP, CSS otimizado |
| **Responsividade** | Mobile-first, 6 breakpoints |
| **Acessibilidade** | ARIA, semântica, contraste |
| **SEO** | Meta tags completas, Open Graph |
| **Internacionalização** | PT-BR/EN com localStorage |

## 📝 Guia do Editor

<details>
<summary><strong>🎯 Editando Textos e Conteúdo</strong></summary>

### **Páginas HTML**
Cada página está em `ptbr/` (português) e `eng/` (inglês):

```html
<!-- Exemplo: ptbr/index.html -->
<h1 class="hero-title">Afonso Fonseca</h1>
<p class="hero-subtitle">Compositor • Produtor • Multi-instrumentista</p>
```

### **Metadados SEO**
```html
<!-- Título da página -->
<title>Afonso Fonseca - Compositor e Produtor Musical</title>

<!-- Descrição para buscadores -->
<meta name="description" content="Sua descrição aqui">

<!-- Open Graph (redes sociais) -->
<meta property="og:title" content="Título para redes sociais">
<meta property="og:description" content="Descrição para redes sociais">
```

### **Dados dos Vídeos**
```json
// assets/data/afonso-videos.json
{
  "featured": {
    "live_now": "dQw4w9WgXcQ",     // ID do YouTube
    "latest_live": "dQw4w9WgXcQ"
  },
  "videos": [
    {
      "id": "dQw4w9WgXcQ",
      "title": "Título do Vídeo"
    }
  ]
}
```

</details>

---

## 🎨 Guia do Designer

<details>
<summary><strong>🌈 Sistema de Cores e Estética</strong></summary>

### **Variáveis CSS (Tema Cyberpunk)**
```css
/* assets/css/style.css - Linha ~15 */
:root {
  /* Cores principais */
  --bg: #0a0a0a;              /* Fundo principal */
  --text: #e0e0e0;            /* Texto principal */
  --primary: #ff6b9d;         /* Rosa neon */
  --secondary: #4ecdc4;       /* Ciano */
  --accent: #ffe66d;          /* Amarelo */
  
  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, #ff6b9d, #4ecdc4);
  --gradient-bg: linear-gradient(135deg, #0a0a0a, #1a1a2e);
  
  /* Sombras neon */
  --shadow-neon: 0 0 20px rgba(255, 107, 157, 0.3);
  --shadow-glow: 0 0 40px rgba(78, 205, 196, 0.2);
}
```

### **Breakpoints Responsivos**
| Breakpoint | Largura | Uso |
|------------|---------|-----|
| `@media (max-width: 980px)` | Tablet grande | Layout principal |
| `@media (max-width: 768px)` | Tablet | Menu mobile |
| `@media (max-width: 700px)` | Mobile grande | Ajustes de texto |
| `@media (max-width: 580px)` | Mobile pequeno | Layout compacto |

### **Animações Disponíveis**
```css
/* Pulsar neon */
.pulse-neon { animation: pulse-neon 2s infinite; }

/* Glitch effect */
.glitch { animation: glitch 0.3s infinite; }

/* Parallax background */
.bg-grid { animation: grid-move 20s linear infinite; }
```

</details>

---

## 💻 Guia do Desenvolvedor

<details>
<summary><strong>⚙️ APIs e Funcionalidades JavaScript</strong></summary>

### **Estrutura do main.js**
```javascript
// assets/js/main.js - Principais funções:

// 1. Menu mobile toggle
function toggleMobileMenu() { /* ... */ }

// 2. Navegação ativa
function setActiveNavigation() { /* ... */ }

// 3. Parallax background
function initParallax() { /* ... */ }

// 4. Detecção de idioma
function handleLanguageRedirect() { /* ... */ }

// 5. YouTube embed otimizado
function initYouTubeEmbeds() { /* ... */ }
```

### **Carregamento de Vídeos**
```javascript
// Carrega dados do JSON
fetch('./assets/data/afonso-videos.json')
  .then(response => response.json())
  .then(data => {
    // Processa vídeos em destaque
    loadFeaturedVideos(data.featured);
    // Carrega lista de vídeos
    loadVideoList(data.videos);
  });
```

### **Performance Otimizations**
- **Lazy Loading**: Imagens e vídeos carregam sob demanda
- **Web Components**: YouTube embed customizado
- **CSS Critical**: Estilos inline para above-the-fold
- **Preload**: Fontes e recursos críticos

</details>

## 📚 Referência Técnica

<details>
<summary><strong>🔧 Troubleshooting e Soluções</strong></summary>

### **Problemas Comuns**

| Problema | Causa | Solução |
|----------|-------|----------|
| **Vídeos não carregam** | JSON malformado | Valide `afonso-videos.json` |
| **Estilos quebrados** | CSS cache | Ctrl+F5 ou limpe cache |
| **Menu mobile não abre** | JavaScript erro | Verifique console (F12) |
| **Imagens não aparecem** | Caminho incorreto | Verifique `assets/images/` |
| **Fontes não carregam** | CDN bloqueado | Use fontes locais |

### **Validação de Arquivos**
```bash
# Validar JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('./assets/data/afonso-videos.json')))"

# Verificar links quebrados (com ferramenta)
npx broken-link-checker http://localhost:3000

# Validar HTML
npx html-validate ptbr/*.html eng/*.html
```

### **Performance Check**
- **Lighthouse**: Teste no Chrome DevTools
- **GTmetrix**: Análise completa de performance
- **WebPageTest**: Teste de velocidade global

</details>

<details>
<summary><strong>🚀 Checklist de Deploy</strong></summary>

### **Antes do Deploy**
- [ ] ✅ Testar todas as páginas localmente
- [ ] ✅ Validar JSON de vídeos
- [ ] ✅ Otimizar imagens (WebP, compressão)
- [ ] ✅ Minificar CSS/JS (opcional)
- [ ] ✅ Testar responsividade (mobile/tablet)
- [ ] ✅ Verificar meta tags SEO
- [ ] ✅ Testar links externos

### **Deploy Recomendado**
```bash
# Netlify (arrastar pasta)
# Vercel (conectar GitHub)
# GitHub Pages (branch gh-pages)

# Configuração de servidor (se necessário)
# .htaccess para Apache:
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]
```

### **Pós-Deploy**
- [ ] ✅ Testar URL de produção
- [ ] ✅ Verificar HTTPS
- [ ] ✅ Testar compartilhamento social
- [ ] ✅ Configurar analytics (opcional)

</details>

<details>
<summary><strong>🛠️ Customizações Avançadas</strong></summary>

### **Adicionando Nova Página**
1. **Criar arquivos HTML**:
   ```bash
   # PT-BR
   cp ptbr/sobre.html ptbr/nova-pagina.html
   # EN
   cp eng/about.html eng/new-page.html
   ```

2. **Atualizar navegação** em todas as páginas:
   ```html
   <nav class="navbar">
     <!-- Adicionar novo item -->
     <a href="nova-pagina.html" class="nav-link">Nova Página</a>
   </nav>
   ```

### **Integrações Externas**
```javascript
// Google Analytics
gtag('config', 'GA_MEASUREMENT_ID');

// Facebook Pixel
fbq('track', 'PageView');

// Hotjar
hj('identify', 'USER_ID', { /* attributes */ });
```

### **Otimizações de Performance**
```html
<!-- Preload crítico -->
<link rel="preload" href="assets/css/style.css" as="style">
<link rel="preload" href="assets/js/main.js" as="script">

<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.youtube.com">
```

</details>

---

## 📋 Templates e Exemplos

### **Template de Nova Página**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título da Página - Afonso Fonseca</title>
    <meta name="description" content="Descrição da página">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Título da Página">
    <meta property="og:description" content="Descrição da página">
    <meta property="og:image" content="../assets/images/og-image.svg">
    
    <!-- Estilos -->
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
    <!-- Header padrão -->
    <header class="header">
        <!-- Copiar de outra página -->
    </header>
    
    <!-- Conteúdo principal -->
    <main class="main">
        <section class="section">
            <div class="container">
                <h1>Título da Página</h1>
                <p>Conteúdo aqui...</p>
            </div>
        </section>
    </main>
    
    <!-- Footer padrão -->
    <footer class="footer">
        <!-- Copiar de outra página -->
    </footer>
    
    <!-- Scripts -->
    <script src="../assets/js/main.js"></script>
</body>
</html>
```

---
- O item ativo do menu usa aria-current="page". Se criar novas páginas, mantenha este atributo para acessibilidade e destaque.

2) Metadados (SEO / Open Graph)
- Em cada página, no <head>, ajuste: <title>, meta description, keywords, author, developer, canonical.
- Open Graph (og:title, og:description, og:image) é importante para compartilhamento. Recomendo usar uma imagem local (assets/images) com proporção 1200x630.
- Após publicar no seu domínio, ajuste o link canonical para https://anacruse.com/<rota>.

Como trocar imagens (formatos, tamanhos, proporções e resolução)
- Priorize SVG para logos/ícones (nítido e leve). Já existe assets/images/og-image.svg.
- Para fotos e gráficos com textura, use WebP (leve e com ótima qualidade).

Recomendações por seção
- Produtos (loja):
  - O layout usa aspect-ratio: 1 e object-fit: cover (miniaturas quadradas).
  - Dimensões sugeridas: 800×800 px (mínimo) até 1200×1200 px (ideal)
  - Peso-alvo: 200–300 KB por imagem
  - Centralize o assunto (por causa do corte “cover”).
- Galerias/Carrosséis:
  - Os itens são horizontais; boa base é exportar 1200×880 px (WebP) com object-fit: cover.
  - Peso-alvo: 150–250 KB.
- Banners/hero:
  - Se usar fotos grandes, prefira WebP entre 1600–2000 px de largura (250–400 KB). Sempre inclua alt.
- Favicon:
  - Já existe assets/images/favicon.ico. Pode substituir mantendo múltiplos tamanhos dentro do .ico.

Como customizar as cores (variáveis CSS)
- Todas as cores estão em assets/css/style.css, dentro de :root. Exemplo:

  :root{
    --bg:#0a0a0f;        /* fundo */
    --bg-soft:#0f0f16;   /* variação de fundo */
    --glass:rgba(0,0,0,0.5);
    --text:#e5e7eb;      /* texto principal */
    --muted:#a1a1aa;     /* texto secundário */
    --primary:#a855f7;   /* cor primária (neon roxo) */
    --primary-2:#7c3aed; /* variação para hover */
    --accent:#22d3ee;    /* ciano de apoio */
    --magenta:#f472b6;   /* rosa de apoio */
    --success:#34d399;   /* sucesso */
    --danger:#fb7185;    /* erro/alerta */
    --shadow:0 10px 30px rgba(168,85,247,0.25);
    --radius:14px;
    --radius-sm:10px;
    --maxw:1200px;
  }

- Troque os valores conforme sua paleta. O tema inteiro herda essas variáveis.
- Boas práticas: mantenha bom contraste entre texto e fundo; teste hovers e focos depois de mudar as cores.

Tipografia
- Google Fonts: Oxanium (títulos) e Inter (texto). Ajuste o <link> no <head> das páginas e, se necessário, a font-family em style.css.

Backgrounds (grid + fog)
- O fundo é todo em CSS: há uma grade (bg-grid) e uma névoa animada (bg-fog). Ao iniciar um vídeo (modo playing), a névoa fica mais intensa.
- Pode ajustar gradientes e opacidades em style.css, mas mude com cuidado para preservar a estética e a performance.

Scripts e funcionamento
- assets/js/main.js:
  - Menu mobile (toggle, fechar ao clicar fora).
  - Destaque automático do menu conforme a página atual.
  - Lite YouTube helper: cria poster/iframe sob demanda em <lite-youtube>.
  - Segurança em links externos: adiciona rel seguro aos target="_blank".
  - Lista de vídeos do YouTube via RSS (sem API key) e exibição em destaque e grade.
  - Modal de vídeo (abre/fecha com click/ESC e trava scroll ao abrir).
  - Controles simples de carrossel.
  - Integração com o modal do Mercado Pago (detecta e adiciona evento para fechar com ESC/click fora).
- assets/js/lite-yt-embed.js:
  - Web Component para embed do YouTube leve e acessível. Evite alterações, apenas use <lite-youtube>.
- assets/js/gallery.js:
  - Comportamentos de galeria/carrossel com auto-scroll e suporte a toque.

Ícones
- Font Awesome 6 (CDN). Troque/adicione ícones ajustando as classes <i class="fa-..."> no HTML.

Internacionalização (PT/EN)
- Seletor de idioma no topo (PT/EN). A preferência é registrada no localStorage.

Acessibilidade e boas práticas
- Use alt descritivo nas imagens.
- Links ativos com aria-current="page".
- Modais fecham por ESC e clique fora. Links externos usam rel seguro.

Tecnologias utilizadas
- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts (Oxanium, Inter)
- Font Awesome 6 (CDN)
- Lite YouTube Embed (Web Component)
- YouTube RSS + fetch via AllOrigins (sem API key)
- Mercado Pago (suporte visual ao modal e botão)
- Imagens SVG/WebP

Créditos, licença e política de uso
- Uso particular: somente André Borba “Tutankhamal”, Afonso Fonseca e a banda Anacruse estão autorizados a modificar/comercializar.
- Estudo: o código está livre para estudos, com atribuição obrigatória de créditos. Uso comercial indevido é proibido.
- Entrega “no estado em que se encontra”: Tutankhamal entrega o projeto como está, sem garantias de qualquer tipo, e não se responsabiliza por mal uso ou uso indevido do código aqui presente.
- Portfólio do desenvolvedor: https://tutankhamal.com
- Licenças e créditos de terceiros: veja o arquivo LICENCA.md.

Dica final
- Faça alterações graduais e teste em páginas reais. Comece por textos, imagens e variáveis de cor; depois parta para ajustes em scripts e backgrounds.

### **Exemplo de Vídeo JSON**
```json
{
  "featured": {
    "live_now": "dQw4w9WgXcQ",
    "latest_live": "dQw4w9WgXcQ"
  },
  "videos": [
    {
      "id": "dQw4w9WgXcQ",
      "title": "Exemplo de Vídeo 1"
    },
    {
      "id": "dQw4w9WgXcQ",
      "title": "Exemplo de Vídeo 2"
    }
  ]
}
```

---

## 🏆 Especificações Técnicas

### **Stack Tecnológico**
- **Frontend**: HTML5 semântico, CSS3 moderno, JavaScript ES6+
- **Estética**: Cyberpunk/Retrowave dark-only theme
- **Performance**: Lazy loading, WebP, CSS otimizado
- **Acessibilidade**: ARIA completo, navegação por teclado
- **SEO**: Meta tags completas, Open Graph, estrutura semântica
- **Responsividade**: Mobile-first, 6 breakpoints

### **Dependências Externas**
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Lite YouTube Embed -->
<script src="assets/js/lite-yt-embed.js"></script>
```

### **Compatibilidade**
- ✅ **Chrome 60+** (Recomendado)
- ✅ **Firefox 55+**
- ✅ **Safari 12+**
- ✅ **Edge 79+**
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

---

## 📄 Licenças e Créditos

### **Código**
- **Licença**: Uso restrito (ver detalhes abaixo)
- **Desenvolvedor**: [André Borba "Tutankhamal"](https://tutankhamal.com)
- **Cliente**: [Afonso Fonseca](https://afonsofonseca.com) / Banda Anacruse

### **Recursos Externos**
- **Fontes**: Google Fonts (Orbitron, Rajdhani) - SIL Open Font License
- **Ícones**: Font Awesome 6 - Font Awesome Free License
- **YouTube Embed**: [lite-yt-embed](https://github.com/paulirish/lite-yt-embed) - Apache 2.0
- **Emojis**: Nativos do sistema

### **Política de Uso**
- **✅ Uso Autorizado**: André Borba "Tutankhamal", Afonso Fonseca e Banda Anacruse
- **📚 Estudo**: Código livre para estudos com atribuição obrigatória
- **❌ Uso Comercial**: Proibido sem autorização expressa
- **⚠️ Garantias**: Fornecido "como está", sem garantias de qualquer tipo

### **Licenças Completas**
Consulte o arquivo `LICENCA.md` para detalhes completos sobre licenças de terceiros.

---

## 🤝 Contribuição

Para melhorias ou correções:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou suporte:
- 🎵 **Artista**: [Afonso Fonseca](https://afonsofonseca.com)
- 💻 **Desenvolvedor**: [Tutankhamal](https://tutankhamal.com)
- 📧 **Email**: Disponível nos sites acima
- 🌐 **Website**: [anacruse.com](https://anacruse.com)

---

<div align="center">

**[Tutankhamal](https://tutankhamal.com)**


**[Afonso Fonseca](https://afonsofonseca.com)**
*Compositor • Produtor • Multi-instrumentista*

</div>