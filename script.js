/**
 * ==========================================================================
 * PREMIUM DARK CREATIVE PORTFOLIO — JAVASCRIPT ENGINE
 * Independent Creative Studio & Cinematic Motion Design
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DYNAMIC YEAR
  // --------------------------------------------------------------------------
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. CUSTOM DESKTOP CURSOR
  // --------------------------------------------------------------------------
  const cursor = document.getElementById('customCursor');
  const cursorBadge = cursor ? cursor.querySelector('.cursor-badge') : null;
  const cursorBadgeLabel = cursor ? cursor.querySelector('.badge-label') : null;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (cursor && isFinePointer) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      // Smooth interpolation
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);

    // Hover interactions on project items
    const projectCards = document.querySelectorAll('.project-card-inner');
    projectCards.forEach((card) => {
      const projectItem = card.closest('.project-item');
      const isVideo = projectItem && projectItem.classList.contains('is-video-project');

      card.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering-project');
        if (cursorBadgeLabel) {
          cursorBadgeLabel.textContent = isVideo ? 'PLAY REEL' : 'VIEW PROJECT';
        }
      });

      card.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering-project');
      });
    });

    // Hover interactions on service rows
    const serviceRows = document.querySelectorAll('.service-row-item');
    serviceRows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering-project');
        if (cursorBadgeLabel) {
          cursorBadgeLabel.textContent = 'EXPLORE';
        }
      });
      row.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering-project');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. STICKY NAVIGATION & ACTIVE SECTION OBSERVER
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-item-link');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-section') === activeId) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach((section) => sectionObserver.observe(section));

  // --------------------------------------------------------------------------
  // 4. MOBILE FULLSCREEN MENU
  // --------------------------------------------------------------------------
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  const toggleMobileMenu = (forceClose = false) => {
    if (!menuToggleBtn || !mobileNavOverlay) return;
    const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    const shouldClose = forceClose || isExpanded;

    menuToggleBtn.setAttribute('aria-expanded', !shouldClose);
    mobileNavOverlay.classList.toggle('is-open', !shouldClose);
    mobileNavOverlay.setAttribute('aria-hidden', shouldClose);
    document.body.style.overflow = shouldClose ? '' : 'hidden';
  };

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => toggleMobileMenu());
  }

  mobileNavItems.forEach((item) => {
    item.addEventListener('click', () => toggleMobileMenu(true));
  });

  // --------------------------------------------------------------------------
  // 5. FUNCTIONAL CATEGORY FILTERS
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');

      // Update button active state
      filterButtons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter project cards
      projectItems.forEach((item) => {
        const itemCategories = item.getAttribute('data-category') || '';
        const categoryList = itemCategories.toLowerCase().split(' ');

        if (selectedFilter === 'all' || categoryList.includes(selectedFilter)) {
          item.classList.remove('is-hidden');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        } else {
          item.classList.add('is-hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. SERVICES FLOATING PREVIEW IMAGE (DESKTOP TRACKER)
  // --------------------------------------------------------------------------
  const serviceRows = document.querySelectorAll('.service-row-item');
  const floatingPreview = document.getElementById('serviceFloatingPreview');
  const floatingPreviewImg = document.getElementById('floatingPreviewImg');

  if (floatingPreview && floatingPreviewImg && isFinePointer) {
    let previewX = 0;
    let previewY = 0;
    let targetX = 0;
    let targetY = 0;
    let isTrackingService = false;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX + 24;
      targetY = e.clientY - 90;
    });

    const updateFloatingPreview = () => {
      if (isTrackingService) {
        previewX += (targetX - previewX) * 0.15;
        previewY += (targetY - previewY) * 0.15;
        floatingPreview.style.left = `${previewX}px`;
        floatingPreview.style.top = `${previewY}px`;
      }
      requestAnimationFrame(updateFloatingPreview);
    };
    requestAnimationFrame(updateFloatingPreview);

    serviceRows.forEach((row) => {
      const previewSrc = row.getAttribute('data-preview');

      row.addEventListener('mouseenter', () => {
        if (previewSrc) {
          floatingPreviewImg.src = previewSrc;
          floatingPreview.classList.add('is-active');
          isTrackingService = true;
        }
      });

      row.addEventListener('mouseleave', () => {
        floatingPreview.classList.remove('is-active');
        isTrackingService = false;
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. COPY EMAIL TO CLIPBOARD
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyLabelText = document.getElementById('copyLabelText');

  if (copyEmailBtn && copyLabelText) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailToCopy = 'hello@yourdomain.com';
      try {
        await navigator.clipboard.writeText(emailToCopy);
        copyLabelText.textContent = 'COPIED TO CLIPBOARD!';
        copyEmailBtn.style.borderColor = 'var(--accent-lime)';
        copyEmailBtn.style.color = 'var(--accent-lime)';

        setTimeout(() => {
          copyLabelText.textContent = 'COPY EMAIL';
          copyEmailBtn.style.borderColor = '';
          copyEmailBtn.style.color = '';
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${emailToCopy}?subject=Project%20Inquiry`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. ACCESSIBLE PROJECT DETAIL MODAL
  // --------------------------------------------------------------------------
  const projectDetailModal = document.getElementById('projectDetailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const modalProjectIndex = document.getElementById('modalProjectIndex');
  const modalProjectCategory = document.getElementById('modalProjectCategory');
  const modalProjectYear = document.getElementById('modalProjectYear');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectSubtitle = document.getElementById('modalProjectSubtitle');
  const modalProjectDescription = document.getElementById('modalProjectDescription');
  const modalProjectImage = document.getElementById('modalProjectImage');
  const modalSpecDiscipline = document.getElementById('modalSpecDiscipline');
  const modalSpecTools = document.getElementById('modalSpecTools');
  const modalSpecDeliverables = document.getElementById('modalSpecDeliverables');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  let lastActiveElement = null;

  const openProjectModal = (projectItem) => {
    if (!projectDetailModal || !projectItem) return;

    lastActiveElement = document.activeElement;

    // Populate data
    const title = projectItem.getAttribute('data-title') || 'Featured Project';
    const subtitle = projectItem.getAttribute('data-subtitle') || '';
    const index = projectItem.getAttribute('data-index') || '01';
    const year = projectItem.getAttribute('data-year') || '2026';
    const categoryDisplay = projectItem.getAttribute('data-category-display') || 'GRAPHIC DESIGN';
    const imageSrc = projectItem.getAttribute('data-image') || '';
    const desc = projectItem.getAttribute('data-description') || 'Exploration in visual direction.';
    const tools = projectItem.getAttribute('data-tools') || 'Adobe Creative Suite';
    const deliverables = projectItem.getAttribute('data-deliverables') || 'Identity & Direction';

    modalProjectTitle.textContent = title;
    modalProjectSubtitle.textContent = subtitle;
    modalProjectIndex.textContent = `PROJECT ${index}`;
    modalProjectCategory.textContent = categoryDisplay;
    modalProjectYear.textContent = year;
    modalProjectDescription.textContent = desc;
    modalSpecDiscipline.textContent = categoryDisplay;
    modalSpecTools.textContent = tools;
    modalSpecDeliverables.textContent = deliverables;

    if (modalProjectImage) {
      modalProjectImage.src = imageSrc;
      modalProjectImage.alt = `${title} preview artwork`;
    }

    projectDetailModal.classList.add('is-active');
    projectDetailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 100);
  };

  const closeProjectModal = () => {
    if (!projectDetailModal) return;
    projectDetailModal.classList.remove('is-active');
    projectDetailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', closeProjectModal);
  }

  // --------------------------------------------------------------------------
  // 9. CINEMATIC VIDEO PLAYER MODAL & CANVAS PLAYBACK ENGINE
  // --------------------------------------------------------------------------
  const videoCinemaModal = document.getElementById('videoCinemaModal');
  const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const videoCinemaTitle = document.getElementById('videoCinemaTitle');
  const videoCinemaIndex = document.getElementById('videoCinemaIndex');

  const cinemaVideo = document.getElementById('cinemaVideo');
  const canvas = document.getElementById('cinemaCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const canvasContainer = document.getElementById('cinemaPlayerContainer');
  const canvasPlayIndicator = document.getElementById('canvasPlayIndicator');

  const ctrlPlayPauseBtn = document.getElementById('ctrlPlayPauseBtn');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const currentTimecode = document.getElementById('currentTimecode');
  const totalTimecode = document.getElementById('totalTimecode');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineHandle = document.getElementById('timelineHandle');
  const ctrlTimelineWrapper = document.getElementById('ctrlTimelineWrapper');
  const ctrlSoundBtn = document.getElementById('ctrlSoundBtn');
  const iconSoundOn = document.getElementById('iconSoundOn');
  const iconSoundMuted = document.getElementById('iconSoundMuted');
  const ctrlFullscreenBtn = document.getElementById('ctrlFullscreenBtn');

  // Video State Variables
  let isVideoPlaying = false;
  let currentProjectTitle = 'WEDDING HIGHLIGHTS';

  // Format SMPTE Timecode: HH:MM:SS:FF (24fps)
  const formatTimecode = (seconds) => {
    if (isNaN(seconds) || seconds < 0) seconds = 0;
    const totalFrames = Math.floor(seconds * 24);
    const frames = totalFrames % 24;
    const s = Math.floor(seconds) % 60;
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 3600);

    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
  };

  const flashPlayIndicator = () => {
    if (canvasPlayIndicator) {
      canvasPlayIndicator.classList.add('is-flashing');
      setTimeout(() => {
        canvasPlayIndicator.classList.remove('is-flashing');
      }, 350);
    }
  };

  const toggleVideoPlayback = (play) => {
    if (!cinemaVideo) return;
    if (typeof play === 'boolean') {
      if (play) {
        cinemaVideo.play().catch(() => {
          cinemaVideo.muted = true;
          cinemaVideo.play();
        });
      } else {
        cinemaVideo.pause();
      }
    } else {
      if (cinemaVideo.paused || cinemaVideo.ended) {
        cinemaVideo.play().catch(() => {
          cinemaVideo.muted = true;
          cinemaVideo.play();
        });
      } else {
        cinemaVideo.pause();
      }
    }
    flashPlayIndicator();
  };

  if (cinemaVideo) {
    cinemaVideo.addEventListener('play', () => {
      if (iconPlay) iconPlay.classList.add('is-hidden');
      if (iconPause) iconPause.classList.remove('is-hidden');
    });

    cinemaVideo.addEventListener('pause', () => {
      if (iconPlay) iconPlay.classList.remove('is-hidden');
      if (iconPause) iconPause.classList.add('is-hidden');
    });

    cinemaVideo.addEventListener('timeupdate', () => {
      if (!cinemaVideo.duration) return;
      const progressPercent = (cinemaVideo.currentTime / cinemaVideo.duration) * 100;
      if (timelineProgress) timelineProgress.style.width = `${progressPercent}%`;
      if (timelineHandle) timelineHandle.style.left = `${progressPercent}%`;
      if (currentTimecode) currentTimecode.textContent = formatTimecode(cinemaVideo.currentTime);
      if (ctrlTimelineWrapper) ctrlTimelineWrapper.setAttribute('aria-valuenow', Math.round(progressPercent));
    });

    cinemaVideo.addEventListener('loadedmetadata', () => {
      if (totalTimecode) totalTimecode.textContent = formatTimecode(cinemaVideo.duration);
    });

    cinemaVideo.addEventListener('ended', () => {
      if (iconPlay) iconPlay.classList.remove('is-hidden');
      if (iconPause) iconPause.classList.add('is-hidden');
    });
  }

  const openVideoCinemaModal = (projectItem) => {
    if (!videoCinemaModal) return;

    lastActiveElement = document.activeElement;
    currentProjectTitle = projectItem ? (projectItem.getAttribute('data-title') || 'NOCTURNE') : 'CINEMATIC REEL';
    const index = projectItem ? (projectItem.getAttribute('data-index') || '01') : '01';
    const videoSrc = projectItem ? projectItem.getAttribute('data-video') : '';

    if (videoCinemaTitle) videoCinemaTitle.textContent = currentProjectTitle.toUpperCase();
    if (videoCinemaIndex) videoCinemaIndex.textContent = `REEL ${index}`;

    videoCinemaModal.classList.add('is-active');
    videoCinemaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (cinemaVideo && videoSrc) {
      cinemaVideo.src = videoSrc;
      cinemaVideo.currentTime = 0;
      cinemaVideo.play().catch(() => {
        cinemaVideo.muted = true;
        if (iconSoundOn) iconSoundOn.classList.add('is-hidden');
        if (iconSoundMuted) iconSoundMuted.classList.remove('is-hidden');
        cinemaVideo.play();
      });
    }

    setTimeout(() => {
      if (videoModalCloseBtn) videoModalCloseBtn.focus();
    }, 100);
  };

  const closeVideoCinemaModal = () => {
    if (!videoCinemaModal) return;

    if (cinemaVideo) {
      cinemaVideo.pause();
      cinemaVideo.removeAttribute('src');
      cinemaVideo.load();
    }

    if (timelineProgress) timelineProgress.style.width = '0%';
    if (timelineHandle) timelineHandle.style.left = '0%';
    if (currentTimecode) currentTimecode.textContent = '00:00:00:00';
    if (iconPlay) iconPlay.classList.remove('is-hidden');
    if (iconPause) iconPause.classList.add('is-hidden');

    videoCinemaModal.classList.remove('is-active');
    videoCinemaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoCinemaModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoCinemaModal);
  if (ctrlPlayPauseBtn) ctrlPlayPauseBtn.addEventListener('click', () => toggleVideoPlayback());
  if (canvasContainer) {
    canvasContainer.addEventListener('click', (e) => {
      if (e.target.closest('.cinema-controls-bar')) return;
      toggleVideoPlayback();
    });
  }

  // Scrub Bar interaction
  const handleScrub = (e) => {
    if (!ctrlTimelineWrapper || !cinemaVideo || !cinemaVideo.duration) return;
    const rect = ctrlTimelineWrapper.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = clickX / rect.width;
    cinemaVideo.currentTime = percent * cinemaVideo.duration;
  };

  if (ctrlTimelineWrapper) {
    ctrlTimelineWrapper.addEventListener('click', handleScrub);
  }

  // Audio Sound Toggle
  if (ctrlSoundBtn && cinemaVideo) {
    ctrlSoundBtn.addEventListener('click', () => {
      cinemaVideo.muted = !cinemaVideo.muted;
      if (!cinemaVideo.muted) {
        if (iconSoundOn) iconSoundOn.classList.remove('is-hidden');
        if (iconSoundMuted) iconSoundMuted.classList.add('is-hidden');
      } else {
        if (iconSoundOn) iconSoundOn.classList.add('is-hidden');
        if (iconSoundMuted) iconSoundMuted.classList.remove('is-hidden');
      }
    });
  }

  // Fullscreen Toggle
  if (ctrlFullscreenBtn && canvasContainer) {
    ctrlFullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (canvasContainer.requestFullscreen) {
          canvasContainer.requestFullscreen();
        } else if (canvasContainer.webkitRequestFullscreen) {
          canvasContainer.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. DELEGATE PROJECT CARD CLICKS (MODAL OR CINEMA)
  // --------------------------------------------------------------------------
  const allProjectItems = document.querySelectorAll('.project-item');

  allProjectItems.forEach((item) => {
    const cardInner = item.querySelector('.project-card-inner');
    const isVideo = item.classList.contains('is-video-project');

    if (cardInner) {
      cardInner.addEventListener('click', (e) => {
        // Prevent trigger if clicking an external link inside
        if (e.target.closest('a') && !e.target.closest('.project-action-btn')) {
          return;
        }

        if (isVideo) {
          openVideoCinemaModal(item);
        } else {
          openProjectModal(item);
        }
      });
    }
  });

  // Global ESC key listener for modals & menus
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoCinemaModal && videoCinemaModal.classList.contains('is-active')) {
        closeVideoCinemaModal();
      } else if (projectDetailModal && projectDetailModal.classList.contains('is-active')) {
        closeProjectModal();
      } else if (mobileNavOverlay && mobileNavOverlay.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 11. SCROLL-TRIGGERED ENTRANCE REVEALS & HERO PARALLAX
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.about-editorial-grid, .work-header-editorial, .services-header-editorial, .services-table-rows, .contact-content-grid'
  );

  const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entranceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    entranceObserver.observe(el);
  });

  // Hero Parallax on Scroll
  const heroParallaxArtwork = document.getElementById('heroParallaxArtwork');
  if (heroParallaxArtwork) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroParallaxArtwork.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
      }
    }, { passive: true });
  }

  // Smooth Back to Top
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
