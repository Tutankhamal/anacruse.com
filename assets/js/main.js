/*
 * Anacruse Website - Main JavaScript
 * 
 * Developer: André "Tutankhamal" Borba
 * Website: https://tutankhamal.com
 * 
 * Created for Anacruse Band Official Website
 */

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

  const makeLite = (id, title, isFeatured = false)=>{
    const el = document.createElement('lite-youtube');
    el.setAttribute('videoid', id);
    el.setAttribute('title', title || 'Video');
    
    // Se for o vídeo principal, adicionar comportamento de modal
    if (isFeatured) {
      el.style.cursor = 'pointer';
      el.setAttribute('data-video-id', id);
      el.setAttribute('data-video-title', title || 'Video');
      el.classList.add('featured-video-player');
    }
    
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
        featured.appendChild(makeLite(featuredVideo.id, featuredVideo.title, true));
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
    document.body.classList.add('modal-view');
  };

  // Close modal
  const closeVideoModal = () => {
    const modal = document.getElementById('video-modal');
    if (modal) {
      modal.style.display = 'none';
      const iframe = document.getElementById('video-modal-iframe');
      iframe.src = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-view');
    }
  };

  // Event listeners
  document.addEventListener('click', (e) => {
    // Open video in modal - para cards do grid
    if (e.target.closest('.video-card')) {
      const card = e.target.closest('.video-card');
      const videoId = card.getAttribute('data-video-id');
      const title = card.getAttribute('data-video-title');
      if (videoId) {
        e.preventDefault();
        openVideoModal(videoId, title);
      }
    }
    
    // Open video in modal - para o player principal
    if (e.target.closest('.featured-video-player')) {
      const player = e.target.closest('.featured-video-player');
      const videoId = player.getAttribute('data-video-id');
      const title = player.getAttribute('data-video-title');
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

// Mercado Pago modal close functionality
(function(){
  // Function to setup Mercado Pago modal close functionality
  const setupMercadoPagoModalClose = () => {
    // Observer to detect when modal is added to DOM
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            // Check for various modal patterns including the specific MP class
            const isModal = node.classList && (
              node.classList.contains('mp-mercadopago-checkout-wrapper') ||
              node.classList.contains('mercadopago-checkout-wrapper') ||
              node.style.position === 'fixed' ||
              (node.style.zIndex && parseInt(node.style.zIndex) > 999) ||
              node.className.includes('checkout') ||
              node.className.includes('mp-mercadopago') ||
              node.id.includes('mercadopago')
            );
            
            if (isModal) {
              setupModalCloseEvents(node);
            }
            
            // Also check child elements
            const modalElements = node.querySelectorAll && node.querySelectorAll(
              '.mp-mercadopago-checkout-wrapper, .mercadopago-checkout-wrapper, div[style*="position: fixed"], div[class*="checkout"], div[class*="mp-mercadopago"], div[id*="mercadopago"], div[style*="z-index"]'
            );
            if (modalElements && modalElements.length > 0) {
              modalElements.forEach(modal => setupModalCloseEvents(modal));
            }
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also check for existing modals
    const existingModals = document.querySelectorAll(
      '.mp-mercadopago-checkout-wrapper, .mercadopago-checkout-wrapper, div[style*="position: fixed"], div[class*="checkout"], div[class*="mp-mercadopago"], div[id*="mercadopago"]'
    );
    existingModals.forEach(modal => setupModalCloseEvents(modal));
  };

  // Function to setup close events for the modal
  const setupModalCloseEvents = (modalWrapper) => {
    if (!modalWrapper || modalWrapper.dataset.closeEventsAdded) return;
    modalWrapper.dataset.closeEventsAdded = 'true';
    
    // Add modal-view class to body when modal is detected
    document.body.classList.add('modal-view');
    
    const modalContainer = modalWrapper.querySelector('.mercadopago-checkout-container') ||
                          modalWrapper.querySelector('div[class*="checkout-container"]') ||
                          modalWrapper.querySelector('div[class*="modal-container"]') ||
                          modalWrapper.children[0];
    
    // Close modal when clicking on overlay (outside container)
    modalWrapper.addEventListener('click', function(e) {
      if (e.target === modalWrapper) {
        closeModal(modalWrapper);
      }
    });
    
    // Close modal when clicking the X button (pseudo-element click simulation)
    if (modalContainer) {
      modalContainer.addEventListener('click', function(e) {
        const rect = modalContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if click is in the area of the X button (top-right corner)
        if (x >= rect.width - 45 && x <= rect.width - 15 && y >= 10 && y <= 40) {
          closeModal(modalWrapper);
        }
      });
    }
    
    // Close modal with ESC key
    const escHandler = function(e) {
      if (e.key === 'Escape' && modalWrapper.parentNode) {
        closeModal(modalWrapper);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  };

  // Function to close the modal
  const closeModal = (modalWrapper) => {
    if (modalWrapper && modalWrapper.parentNode) {
      modalWrapper.style.opacity = '0';
      modalWrapper.style.transform = 'scale(0.9)';
      modalWrapper.style.transition = 'all 0.3s ease';
      
      // Remove modal-view class from body
      document.body.classList.remove('modal-view');
      
      setTimeout(() => {
        if (modalWrapper.parentNode) {
          modalWrapper.parentNode.removeChild(modalWrapper);
        }
      }, 300);
    }
  };

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMercadoPagoModalClose);
  } else {
    setupMercadoPagoModalClose();
  }
  
  // Also run periodically to catch any missed modals (reduced interval for better detection)
  setInterval(() => {
    const modals = document.querySelectorAll(
      '.mp-mercadopago-checkout-wrapper:not([data-close-events-added]), .mercadopago-checkout-wrapper:not([data-close-events-added]), div[style*="position: fixed"]:not([data-close-events-added])'
    );
    modals.forEach(modal => {
      if (modal.style.zIndex && parseInt(modal.style.zIndex) > 999) {
        setupModalCloseEvents(modal);
      }
    });
  }, 500);
})();

// Developer Credit Interactive Effects
(function(){
  const initializeDeveloperCredit = () => {
    const developerCredit = document.querySelector('.developer-credit a');
    
    if (developerCredit) {
      // Add random glitch effect
      setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
          developerCredit.style.animation = 'developerGlitch 0.2s ease-in-out';
          setTimeout(() => {
            developerCredit.style.animation = '';
          }, 200);
        }
      }, 3000);
      
      // Enhanced hover effects
      developerCredit.addEventListener('mouseenter', function() {
        this.style.textShadow = `
          0 0 5px rgba(34, 211, 238, 1),
          0 0 10px rgba(34, 211, 238, 0.8),
          0 0 15px rgba(34, 211, 238, 0.6),
          0 0 20px rgba(34, 211, 238, 0.4)`;
      });
      
      developerCredit.addEventListener('mouseleave', function() {
        this.style.textShadow = '0 0 5px rgba(168, 85, 247, 0.3)';
      });
      
      // Click effect
      developerCredit.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(34, 211, 238, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          left: ${e.offsetX - 10}px;
          top: ${e.offsetY - 10}px;
          width: 20px;
          height: 20px;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    }
  };

  // Add ripple animation keyframes via JavaScript
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDeveloperCredit);
  } else {
    initializeDeveloperCredit();
  }
})();

// Interactive Gallery Effects
(function(){
  const initializeGalleryEffects = () => {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      if (!track) return;
      
      // Duplicate items for seamless infinite scroll
      const items = track.querySelectorAll('.carousel-item');
      items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });
      
      // Mouse position tracking for interactive effects
      carousel.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate distance from center (0 to 1)
        const distanceFromCenter = Math.sqrt(
          Math.pow((x - centerX) / centerX, 2) + 
          Math.pow((y - centerY) / centerY, 2)
        );
        
        // Remove existing classes
        this.classList.remove('reverse-scroll', 'fast-scroll', 'slow-scroll');
        
        // Left side = reverse scroll
        if (x < centerX * 0.3) {
          this.classList.add('reverse-scroll');
        }
        
        // Right side = fast scroll
        if (x > centerX * 1.7) {
          this.classList.add('fast-scroll');
        }
        
        // Center = slow scroll
        if (x > centerX * 0.7 && x < centerX * 1.3) {
          this.classList.add('slow-scroll');
        }
        
        // Distance from center affects speed
        if (distanceFromCenter > 0.8) {
          this.classList.add('fast-scroll');
        }
      });
      
      // Reset on mouse leave
      carousel.addEventListener('mouseleave', function() {
        this.classList.remove('reverse-scroll', 'fast-scroll', 'slow-scroll');
      });
      
      // Enhanced button functionality
      const prevBtn = carousel.querySelector('.carousel-btn.prev');
      const nextBtn = carousel.querySelector('.carousel-btn.next');
      
      if (prevBtn && nextBtn) {
        let currentTransform = 0;
        const itemWidth = 370; // 350px + 20px gap
        
        nextBtn.addEventListener('click', () => {
          currentTransform -= itemWidth;
          track.style.transform = `translateX(${currentTransform}px)`;
          track.style.animation = 'none';
          
          // Resume animation after manual control
          setTimeout(() => {
            track.style.animation = '';
          }, 1000);
        });
        
        prevBtn.addEventListener('click', () => {
          currentTransform += itemWidth;
          track.style.transform = `translateX(${currentTransform}px)`;
          track.style.animation = 'none';
          
          // Resume animation after manual control
          setTimeout(() => {
            track.style.animation = '';
          }, 1000);
        });
      }
      
      // Touch/swipe support for mobile
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      
      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
      });
      
      track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        track.style.transform = `translateX(${diffX}px)`;
      });
      
      track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = currentX - startX;
        if (Math.abs(diffX) > 50) {
          // Trigger slide
          if (diffX > 0) {
            prevBtn?.click();
          } else {
            nextBtn?.click();
          }
        }
        
        track.style.transition = '';
        track.style.transform = '';
      });
    });
  };
  
  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGalleryEffects);
  } else {
    initializeGalleryEffects();
  }
})();