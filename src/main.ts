import './style.css';

// === Preloader ===
window.addEventListener('load', () => {
  setTimeout(() => {
      document.getElementById('preloader')?.classList.add('hidden');
        }, 2500);
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
                                                                                                                                                        btn.textContent = 'Merci ! Nous vous contacterons bientot.';
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
        }