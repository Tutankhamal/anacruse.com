// Core interactions: navbar, language redirect, background reactivity, lite-youtube helper
(function(){
  const $ = (q,ctx=document)=>ctx.querySelector(q);
  const $$ = (q,ctx=document)=>Array.from(ctx.querySelectorAll(q));

  // Mobile menu toggle
  const hamb = $('.hamb');
  const mobileMenu = $('.mobile-menu');
  if(hamb && mobileMenu){
    // Ensure mobile menu is initially hidden
    mobileMenu.classList.remove('active');
    hamb.setAttribute('aria-expanded', 'false');
    hamb.classList.remove('active');
    
    hamb.addEventListener('click', ()=>{
      hamb.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      hamb.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamb.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamb.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamb.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active navigation highlighting
  const currentPath = window.location.pathname;
  const navLinks = $$('.nav-links a, .mobile-menu a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath.endsWith(linkPath.split('/').pop()) || 
        (currentPath.includes('index.html') && link.href.includes('index.html')) ||
        (currentPath.endsWith('/') && link.href.includes('index.html'))) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    }
  });

  // Background parallax by mouse
  const bgGrid = $('.bg-grid');
  const bgFog = $('.bg-fog');
  if(bgGrid && bgFog){
    window.addEventListener('mousemove', (e)=>{
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      bgGrid.style.transform = `translate(${x*10}px, ${y*10}px)`;
      bgFog.style.setProperty('--x', `${(x+0.5)*100}%`);
      bgFog.style.setProperty('--y', `${(y+0.5)*100}%`);
    }, {passive:true});
  }

  // Language redirect (only if on root index.html)
  const isRoot = document.documentElement.hasAttribute('data-root-index');
  if(isRoot){
    try{
      const nav = navigator.language || navigator.userLanguage || 'en';
      const isPT = /pt|pt-BR/i.test(nav);
      const stored = localStorage.getItem('site_lang');
      const target = stored || (isPT ? 'ptbr' : 'eng');
      window.location.replace(`./${target}/index.html`);
    }catch(err){
      window.location.replace(`./eng/index.html`);
    }
  }

  // Lite YouTube Embed functionality
  // The lite-yt-embed.js file handles the custom element registration

  // Fallback for existing lite-youtube elements
  $$('lite-youtube').forEach(el=>{
    const vid = el.getAttribute('videoid') || el.getAttribute('data-id');
    const title = el.getAttribute('title') || 'YouTube Video';
    if(!vid) return;
    const poster = `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
    const inner = document.createElement('div');
    inner.className = 'lyt-inner';
    inner.style.backgroundImage = `url('${poster}')`;
    const btn = document.createElement('button');
    btn.className = 'lit-btn';
    btn.setAttribute('aria-label', 'Play');
    btn.innerHTML = '<i class="lit-icon"></i>';
    inner.appendChild(btn);
    el.appendChild(inner);
    let iframeLoaded = false;
    const loadIframe = ()=>{
      if(iframeLoaded) return; iframeLoaded = true;
      const iframe = document.createElement('iframe');
      const params = el.getAttribute('params') || 'autoplay=1&rel=0&modestbranding=1';
      iframe.src = `https://www.youtube-nocookie.com/embed/${vid}?${params}`;
      iframe.title = title;
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.style.position = 'absolute';
      iframe.style.inset = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      el.innerHTML = '';
      el.appendChild(iframe);
      document.documentElement.classList.add('is-playing');
    };
    el.addEventListener('pointerdown', loadIframe, {passive:true});
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); loadIframe(); } });
  });

  // External links: open in new tab safely
  $$('a[target="_blank"]').forEach(a=>{ a.rel = 'noopener noreferrer external'; });

})();

// Dynamic YouTube video fetching
(function(){
  const featured = document.getElementById('featured-video');
  const grid = document.getElementById('video-grid');
  if(!featured && !grid) return;

  // Channel IDs
  const CHANNELS = {
    afonso: 'UCN1qsUWT7bElmmqmROlJpvw',
    anacruse: 'UCFfqCGtJckEiFJX2T6TUIvw'
  };

  const makeLite = (id, title)=>{
    const el = document.createElement('lite-youtube');
    el.setAttribute('videoid', id);
    el.setAttribute('title', title || 'Video');
    return el;
  };

  // Fetch videos from YouTube RSS feeds (no API key needed)
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
      console.warn('Failed to fetch videos for channel:', channelId, error);
      return [];
    }
  };

  // Check if a video is live
  const checkIfLive = async (videoId) => {
    try {
      const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
      const text = await response.text();
      return text.includes('"isLiveContent":true') && text.includes('"isLive":true');
    } catch {
      return false;
    }
  };

  // Load videos
  const loadVideos = async () => {
    try {
      // Check if we're on the band page to load only Anacruse videos
      const isBandPage = window.location.pathname.includes('banda.html') || window.location.pathname.includes('band.html');
      
      let allVideos;
      if (isBandPage) {
        // Only fetch Anacruse videos for band page
        const anacruseVideos = await fetchChannelVideos(CHANNELS.anacruse, 15);
        allVideos = anacruseVideos.sort((a, b) => new Date(b.published) - new Date(a.published));
      } else {
        // Fetch videos from both channels for other pages
        const [afonsoVideos, anacruseVideos] = await Promise.all([
          fetchChannelVideos(CHANNELS.afonso, 15),
          fetchChannelVideos(CHANNELS.anacruse, 15)
        ]);
        
        // Combine and sort by date
        allVideos = [...afonsoVideos, ...anacruseVideos]
          .sort((a, b) => new Date(b.published) - new Date(a.published));
      }

      if (allVideos.length === 0) {
        console.warn('No videos found');
        return;
      }

      // Check for live videos
      let featuredVideo = null;
      for (const video of allVideos.slice(0, 5)) {
        if (await checkIfLive(video.id)) {
          featuredVideo = video;
          break;
        }
      }

      // If no live video, use the latest video
      if (!featuredVideo) {
        featuredVideo = allVideos[0];
      }

      // Set featured video
      if (featured && featuredVideo) {
        featured.innerHTML = '';
        featured.appendChild(makeLite(featuredVideo.id, featuredVideo.title));
      }

      // Set video grid (excluding featured video)
      if (grid) {
        const gridVideos = allVideos.filter(v => v.id !== featuredVideo?.id).slice(0, 12);
        const frag = document.createDocumentFragment();
        
        gridVideos.forEach(video => {
          const card = document.createElement('div');
          card.className = 'surface video-card';
          card.style.cursor = 'pointer';
          card.setAttribute('data-video-id', video.id);
          card.setAttribute('data-video-title', video.title);
          
          const wrap = document.createElement('div');
          wrap.style.padding = '10px';
          
          const lite = makeLite(video.id, video.title);
          const title = document.createElement('p');
          title.className = 'mt-2';
          title.textContent = video.title;
          
          wrap.appendChild(lite);
          wrap.appendChild(title);
          card.appendChild(wrap);
          frag.appendChild(card);
        });
        
        grid.innerHTML = '';
        grid.appendChild(frag);
      }
    } catch (error) {
      console.error('Failed to load videos:', error);
      // Fallback to static data if available
      const container = document.querySelector('[data-video-source]');
      const src = container?.getAttribute('data-video-source');
      if (src) {
        fetch(src).then(r=>r.json()).then(data=>{
          if(featured && data.featured){
            const vid = data.featured.latest_live?.id;
            if(vid) {
              featured.innerHTML = '';
              featured.appendChild(makeLite(vid, data.featured.latest_live.title));
            }
          }
          if(grid && data.videos){
            const frag = document.createDocumentFragment();
            data.videos.filter(v=>!/(#shorts?|shorts?)/i.test(v.title||'')).forEach(v=>{
              const card = document.createElement('a');
              card.className = 'surface';
              card.href = `https://www.youtube.com/watch?v=${v.id}`;
              card.target = '_blank';
              const wrap = document.createElement('div');
              wrap.style.padding = '10px';
              const lite = makeLite(v.id, v.title);
              const title = document.createElement('p');
              title.className = 'mt-2';
              title.textContent = v.title;
              wrap.appendChild(lite);
              wrap.appendChild(title);
              card.appendChild(wrap);
              frag.appendChild(card);
            });
            grid.innerHTML = '';
            grid.appendChild(frag);
          }
        }).catch(()=>{});
      }
    }
  };

  // Load videos when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadVideos);
  } else {
    loadVideos();
  }
})();

// Video Modal
(function(){
  // Create modal HTML
  const createModal = () => {
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-content">
        <button class="video-modal-close" aria-label="Close video">&times;</button>
        <div class="video-modal-body">
          <iframe id="video-modal-iframe" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  };

  // Open modal with video
  const openVideoModal = (videoId, title) => {
    let modal = document.getElementById('video-modal');
    if (!modal) {
      modal = createModal();
    }
    
    const iframe = document.getElementById('video-modal-iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.title = title || 'Video';
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeVideoModal = () => {
    const modal = document.getElementById('video-modal');
    if (modal) {
      modal.style.display = 'none';
      const iframe = document.getElementById('video-modal-iframe');
      iframe.src = '';
      document.body.style.overflow = '';
    }
  };

  // Event listeners
  document.addEventListener('click', (e) => {
    // Open video in modal
    if (e.target.closest('.video-card')) {
      const card = e.target.closest('.video-card');
      const videoId = card.getAttribute('data-video-id');
      const title = card.getAttribute('data-video-title');
      if (videoId) {
        e.preventDefault();
        openVideoModal(videoId, title);
      }
    }
    
    // Close modal
    if (e.target.classList.contains('video-modal') || e.target.classList.contains('video-modal-close')) {
      closeVideoModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });
})();

// Simple carousel controls
(function(){
  document.querySelectorAll('.carousel').forEach(carousel=>{
    const track = carousel.querySelector('.carousel-track');
    if(!track) return;
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    const by = ()=> Math.min(400, track.clientWidth * 0.9);
    if(prev) prev.addEventListener('click', ()=> track.scrollBy({left:-by(), behavior:'smooth'}));
    if(next) next.addEventListener('click', ()=> track.scrollBy({left: by(), behavior:'smooth'}));
  });
})();