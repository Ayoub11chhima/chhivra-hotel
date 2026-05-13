import './style.css';

// === Preloader ===
window.addEventListener('load', () => {
  setTimeout(() => {
      document.getElementById('preloader')?.classList.add('hidden');
        }, 2200);
        });

        // === Header scroll effect ===
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
          if (header) header.classList.toggle('scrolled', window.scrollY > 80);
          });

          // === Mobile nav toggle ===
          const menuToggle = document.getElementById('menu-toggle');
          const navOverlay = document.getElementById('nav-overlay');
          const navClose = document.getElementById('nav-close');
          const navLinks = document.querySelectorAll('[data-nav]');

          menuToggle?.addEventListener('click', () => navOverlay?.classList.add('active'));
          navClose?.addEventListener('click', () => navOverlay?.classList.remove('active'));
          navLinks.forEach(link => link.addEventListener('click', () => navOverlay?.classList.remove('active')));

          // === Scroll animations ===
          const animateElements = document.querySelectorAll('[data-animate]');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                      entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                                }
                                  });
                                  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
                                  animateElements.forEach(el => observer.observe(el));

                                  // === Counter animation ===
                                  const counters = document.querySelectorAll('[data-count]');
                                  const counterObserver = new IntersectionObserver((entries) => {
                                    entries.forEach(entry => {
                                        if (entry.isIntersecting) {
                                              const el = entry.target as HTMLElement;
                                                    const target = parseInt(el.dataset.count || '0');
                                                          let current = 0;
                                                                const step = Math.max(1, Math.floor(target / 60));
                                                                      const timer = setInterval(() => {
                                                                              current += step;
                                                                                      if (current >= target) { current = target; clearInterval(timer); }
                                                                                              el.textContent = current.toString();
                                                                                                    }, 30);
                                                                                                          counterObserver.unobserve(el);
                                                                                                              }
                                                                                                                });
                                                                                                                }, { threshold: 0.5 });
                                                                                                                counters.forEach(el => counterObserver.observe(el));
                                                                                                                
                                                                                                                // === Bars carousel ===
                                                                                                                const carousel = document.querySelector('.bars-carousel') as HTMLElement;
                                                                                                                const prevBtn = document.getElementById('bars-prev');
                                                                                                                const nextBtn = document.getElementById('bars-next');
                                                                                                                const dotsContainer = document.getElementById('bars-dots');
                                                                                                                const slides = document.querySelectorAll('.bar-slide');
                                                                                                                
                                                                                                                if (carousel && dotsContainer && slides.length) {
                                                                                                                  slides.forEach((_, i) => {
                                                                                                                      const dot = document.createElement('button');
                                                                                                                          dot.className = `bars-dot${i === 0 ? ' active' : ''}`;
                                                                                                                              dot.addEventListener('click', () => scrollToSlide(i));
                                                                                                                                  dotsContainer.appendChild(dot);
                                                                                                                                    });
                                                                                                                                    
                                                                                                                                      function scrollToSlide(index: number) {
                                                                                                                                          const slide = slides[index] as HTMLElement;
                                                                                                                                              carousel.scrollTo({ left: slide.offsetLeft - carousel.offsetLeft, behavior: 'smooth' });
                                                                                                                                                  updateDots(index);
                                                                                                                                                    }
                                                                                                                                                    
                                                                                                                                                      function updateDots(index: number) {
                                                                                                                                                          dotsContainer!.querySelectorAll('.bars-dot').forEach((d, i) => {
                                                                                                                                                                d.classList.toggle('active', i === index);
                                                                                                                                                                    });
                                                                                                                                                                      }
                                                                                                                                                                      
                                                                                                                                                                        prevBtn?.addEventListener('click', () => {
                                                                                                                                                                            const active = dotsContainer!.querySelector('.bars-dot.active');
                                                                                                                                                                                const idx = Array.from(dotsContainer!.children).indexOf(active!);
                                                                                                                                                                                    scrollToSlide(Math.max(0, idx - 1));
                                                                                                                                                                                      });
                                                                                                                                                                                      
                                                                                                                                                                                        nextBtn?.addEventListener('click', () => {
                                                                                                                                                                                            const active = dotsContainer!.querySelector('.bars-dot.active');
                                                                                                                                                                                                const idx = Array.from(dotsContainer!.children).indexOf(active!);
                                                                                                                                                                                                    scrollToSlide(Math.min(slides.length - 1, idx + 1));
                                                                                                                                                                                                      });
                                                                                                                                                                                                      
                                                                                                                                                                                                        carousel.addEventListener('scroll', () => {
                                                                                                                                                                                                            const scrollLeft = carousel.scrollLeft;
                                                                                                                                                                                                                let closest = 0;
                                                                                                                                                                                                                    slides.forEach((slide, i) => {
                                                                                                                                                                                                                          const el = slide as HTMLElement;
                                                                                                                                                                                                                                if (Math.abs(el.offsetLeft - carousel.offsetLeft - scrollLeft) < 
                                                                                                                                                                                                                                          Math.abs((slides[closest] as HTMLElement).offsetLeft - carousel.offsetLeft - scrollLeft)) {
                                                                                                                                                                                                                                                  closest = i;
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                updateDots(closest);
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                  // === Smooth scroll for anchors ===
                                                                                                                                                                                                                                                                  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                                                                                                                                                                                                                                                                    anchor.addEventListener('click', (e) => {
                                                                                                                                                                                                                                                                        const href = (anchor as HTMLAnchorElement).getAttribute('href');
                                                                                                                                                                                                                                                                            if (href && href !== '#') {
                                                                                                                                                                                                                                                                                  e.preventDefault();
                                                                                                                                                                                                                                                                                        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                              // === Booking form ===
                                                                                                                                                                                                                                                                                              document.getElementById('booking-form')?.addEventListener('submit', (e) => {
                                                                                                                                                                                                                                                                                                e.preventDefault();
                                                                                                                                                                                                                                                                                                  const btn = document.getElementById('btn-submit-booking');
                                                                                                                                                                                                                                                                                                    if (btn) {
                                                                                                                                                                                                                                                                                                        btn.textContent = 'Thank you! We\'ll be in touch.';
                                                                                                                                                                                                                                                                                                            (btn as HTMLButtonElement).disabled = true;
                                                                                                                                                                                                                                                                                                                btn.style.opacity = '0.7';
                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                  // === Parallax on scroll ===
                                                                                                                                                                                                                                                                                                                  window.addEventListener('scroll', () => {
                                                                                                                                                                                                                                                                                                                    const parallax = document.querySelector('.parallax-divider img') as HTMLElement;
                                                                                                                                                                                                                                                                                                                      if (parallax) {
                                                                                                                                                                                                                                                                                                                          const rect = parallax.parentElement!.getBoundingClientRect();
                                                                                                                                                                                                                                                                                                                              const speed = 0.3;
                                                                                                                                                                                                                                                                                                                                  parallax.style.transform = `translateY(${rect.top * speed}px)`;
                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                    });
