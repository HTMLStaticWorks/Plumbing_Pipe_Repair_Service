/**
 * Apex Plumbing & Pipe Repair - Main JavaScript Controller
 * Version: 1.0.0
 * Features: Dark/Light Mode, RTL Toggle, Mobile Menu, Form Validation,
 *           Statistics Counter, Before/After Slider, Back-to-top
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Mode)
  // -------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'apex_plumbing_theme';
  const DIR_STORAGE_KEY = 'apex_plumbing_dir';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

    // Event listener for OS preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Attach to theme toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. RTL Layout Toggle (Arabic/Hebrew Support)
  // -------------------------------------------------------------------------
  function initRTL() {
    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    setDirection(savedDir);

    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleDirection);
    });
  }

  function setDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_STORAGE_KEY, dir);
    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    setDirection(newDir);
  }

  // -------------------------------------------------------------------------
  // 3. Header Scroll Effect & Back-to-Top
  // -------------------------------------------------------------------------
  function initHeaderAndScroll() {
    const header = document.querySelector('.site-header');
    const backToTopBtn = document.querySelector('.back-to-top');

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (header) {
        if (scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }
  }

  // -------------------------------------------------------------------------
  // 4. Mobile Offcanvas Navigation
  // -------------------------------------------------------------------------
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const closeBtn = document.querySelector('.drawer-close');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openMenu() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Statistics Counter Animation
  // -------------------------------------------------------------------------
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const prefix = counter.getAttribute('data-prefix') || '';
            const duration = 1800; // ms
            const start = 0;
            const startTime = performance.now();

            function updateNumber(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad
              const easeProgress = 1 - (1 - progress) * (1 - progress);
              const currentVal = Math.floor(start + (target - start) * easeProgress);

              counter.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(updateNumber);
              } else {
                counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
              }
            }

            requestAnimationFrame(updateNumber);
            obs.unobserve(counter);
          }
        });
      },
      { threshold: 0.25 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  // -------------------------------------------------------------------------
  // 6. Before / After Interactive Slider (Home 2)
  // -------------------------------------------------------------------------
  function initBeforeAfterSlider() {
    const containers = document.querySelectorAll('.before-after-container');
    containers.forEach((container) => {
      const slider = container.querySelector('.ba-range-input');
      const afterImage = container.querySelector('.ba-image-after');
      const handle = container.querySelector('.ba-slider-handle');

      if (!slider || !afterImage || !handle) return;

      function updatePosition(value) {
        afterImage.style.width = `${value}%`;
        handle.style.left = `${value}%`;
      }

      slider.addEventListener('input', (e) => {
        updatePosition(e.target.value);
      });

      // Initial position
      updatePosition(slider.value || 50);
    });
  }

  // -------------------------------------------------------------------------
  // 7. Form Validation (Booking & Contact Forms)
  // -------------------------------------------------------------------------
  function initFormValidation() {
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (bookingForm) setupFormValidation(bookingForm, 'Booking Request Received! Our dispatcher will call you within 15 minutes to confirm.');
    if (contactForm) setupFormValidation(contactForm, 'Thank you! Your message has been sent successfully. We will get back to you shortly.');
    if (newsletterForm) setupFormValidation(newsletterForm, 'Thank you for subscribing! We will keep you updated.');
  }

  function setupFormValidation(form, successMessageText) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

      inputs.forEach((input) => {
        const errorMsg = validateField(input);
        if (errorMsg) {
          showFieldError(input, errorMsg);
          isValid = false;
        } else {
          clearFieldError(input);
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
        }

        // Simulate secure API/Formspree transmission
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }

          // Show Success Banner
          const successBanner = form.querySelector('.form-alert-success') || createSuccessBanner(form);
          const messageElem = successBanner.querySelector('.success-text') || successBanner;
          messageElem.textContent = successMessageText;
          successBanner.style.display = 'block';

          form.reset();

          // Scroll to success banner smoothly
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1000);
      }
    });

    // Real-time error clearance on input
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          const errorMsg = validateField(input);
          if (!errorMsg) {
            clearFieldError(input);
          }
        }
      });
    });
  }

  function validateField(input) {
    const val = input.value.trim();

    if (!val) {
      return 'This field is required.';
    }

    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return 'Please enter a valid email address.';
      }
    }

    if (input.type === 'tel') {
      const phoneClean = val.replace(/\D/g, '');
      if (phoneClean.length < 7) {
        return 'Please enter a valid phone number with area code.';
      }
    }

    if (input.type === 'date') {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return 'Preferred date cannot be in the past.';
      }
    }

    return null;
  }

  function showFieldError(input, message) {
    input.classList.add('is-invalid');
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      input.parentNode.appendChild(feedback);
    }
    feedback.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove('is-invalid');
  }

  function createSuccessBanner(form) {
    const banner = document.createElement('div');
    banner.className = 'form-alert-success';
    banner.innerHTML = '<i class="bi bi-check-circle-fill"></i> <div class="success-text"></div>';
    form.prepend(banner);
    return banner;
  }

  // -------------------------------------------------------------------------
  // 8. Auto-populate Copyright Year
  // -------------------------------------------------------------------------
  function initCopyrightYear() {
    document.querySelectorAll('.current-year').forEach((el) => {
      el.textContent = '2026';
    });
  }

  // -------------------------------------------------------------------------
  // Initialize Everything on DOMContentLoaded
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initHeaderAndScroll();
    initMobileMenu();
    initCounters();
    initBeforeAfterSlider();
    initFormValidation();
    initCopyrightYear();
  });
})();
