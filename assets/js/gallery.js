// Modern Gallery JavaScript - Enhanced Functionality
class ModernGallery {
    constructor(selector) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;
        
        this.track = this.carousel.querySelector('.carousel-track');
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.prevBtn = this.carousel.querySelector('.carousel-btn.prev');
        this.nextBtn = this.carousel.querySelector('.carousel-btn.next');
        
        this.currentIndex = 0;
        this.itemsToShow = this.getItemsToShow();
        this.maxIndex = Math.max(0, this.items.length - this.itemsToShow);
        
        this.init();
    }
    
    getItemsToShow() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }
    
    init() {
        this.setupEventListeners();
        this.updateButtons();
        this.setupTouchEvents();
        this.setupKeyboardEvents();
        
        // Duplicate items for infinite scroll effect
        this.duplicateItems();
        
        // Initialize position
        this.updatePosition();
    }
    
    duplicateItems() {
        // Clone first few items and append to end
        for (let i = 0; i < this.itemsToShow; i++) {
            const clone = this.items[i].cloneNode(true);
            clone.classList.add('clone');
            this.track.appendChild(clone);
        }
        
        // Clone last few items and prepend to beginning
        for (let i = this.items.length - this.itemsToShow; i < this.items.length; i++) {
            const clone = this.items[i].cloneNode(true);
            clone.classList.add('clone');
            this.track.insertBefore(clone, this.track.firstChild);
        }
        
        // Update items list to include clones
        this.allItems = this.track.querySelectorAll('.carousel-item');
        this.currentIndex = this.itemsToShow; // Start at first real item
    }
    
    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.track.style.animationPlayState = 'paused';
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.track.style.animationPlayState = 'running';
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.itemsToShow = this.getItemsToShow();
            this.maxIndex = Math.max(0, this.items.length - this.itemsToShow);
            this.updatePosition();
        });
    }
    
    setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.track.style.transition = 'none';
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const currentTransform = this.getCurrentTransform();
            
            this.track.style.transform = `translateX(${currentTransform + diffX}px)`;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = currentX - startX;
            const threshold = 50;
            
            this.track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.prev();
                } else {
                    this.next();
                }
            } else {
                this.updatePosition();
            }
            
            isDragging = false;
        });
    }
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.carousel.matches(':hover')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
            }
        });
    }
    
    getCurrentTransform() {
        const style = window.getComputedStyle(this.track);
        const matrix = style.transform;
        
        if (matrix === 'none') return 0;
        
        const values = matrix.split('(')[1].split(')')[0].split(',');
        return parseInt(values[4]) || 0;
    }
    
    prev() {
        this.currentIndex--;
        
        if (this.currentIndex < 0) {
            this.currentIndex = this.items.length - 1;
            // Jump to end without animation
            this.track.style.transition = 'none';
            this.currentIndex = this.items.length + this.itemsToShow - 1;
            this.updatePosition();
            
            // Re-enable transition and move to correct position
            setTimeout(() => {
                this.track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                this.currentIndex = this.items.length + this.itemsToShow - 2;
                this.updatePosition();
            }, 10);
        } else {
            this.updatePosition();
        }
        
        this.updateButtons();
    }
    
    next() {
        this.currentIndex++;
        
        if (this.currentIndex >= this.items.length + this.itemsToShow) {
            // Jump to beginning without animation
            this.track.style.transition = 'none';
            this.currentIndex = this.itemsToShow;
            this.updatePosition();
            
            // Re-enable transition and move to next position
            setTimeout(() => {
                this.track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                this.currentIndex = this.itemsToShow + 1;
                this.updatePosition();
            }, 10);
        } else {
            this.updatePosition();
        }
        
        this.updateButtons();
    }
    
    updatePosition() {
        const itemWidth = this.allItems[0]?.offsetWidth || 300;
        const gap = 24; // 1.5rem gap
        const offset = -(this.currentIndex * (itemWidth + gap));
        
        this.track.style.transform = `translateX(${offset}px)`;
    }
    
    updateButtons() {
        // Always show buttons for infinite scroll
        if (this.prevBtn) this.prevBtn.style.opacity = '1';
        if (this.nextBtn) this.nextBtn.style.opacity = '1';
    }
    
    // Auto-scroll functionality
    startAutoScroll(interval = 4000) {
        this.stopAutoScroll();
        
        this.autoScrollInterval = setInterval(() => {
            if (!this.carousel.matches(':hover')) {
                this.next();
            }
        }, interval);
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new ModernGallery('.carousel');
    
    // Start auto-scroll if gallery exists
    if (gallery.carousel) {
        gallery.startAutoScroll(5000);
    }
    
    // Add smooth scroll behavior to page
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernGallery;
}