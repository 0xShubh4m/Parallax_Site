// Modern JavaScript for RYM Grenergy website - Updated Version
class RYMWebsite {
    constructor() {
        this.state = {
            hamClick: false,
            nav1Click: false,
            nav2Click: false,
            nav4Click: false,
            eventClick: false,
            tap: false,
            clickCounter: 0,
            currentHover: null,
            currentEventData: null,
            currentImageIndex: 0,
            isInitialized: false
        };

        // Use modern media query API
        this.mediaQuery = window.matchMedia('(min-width: 480px)');
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        this.elements = {};
        this.eventData = {};
        this.observers = new Map(); // For intersection observers
        this.abortController = new AbortController(); // For cleanup
        
        this.init();
    }

    async init() {
        try {
            await this.waitForDOM();
            this.cacheElements();
            this.initializeEventData();
            this.setupAllInteractions();
            this.setupPerformanceOptimizations();
            this.state.isInitialized = true;
            
            console.log('RYM Website initialized successfully');
        } catch (error) {
            console.error('Failed to initialize RYM Website:', error);
        }
    }

    // Wait for DOM to be fully loaded
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            } else {
                resolve();
            }
        });
    }

    cacheElements() {
        const selectors = {
            // Navigation elements
            hamburger: '.hamburger',
            navMenu: '.navbar__menu',
            navButtons: '.buttons',
            homeBtn: '.bt3',
            
            // Section elements
            nav1: '.nav1',
            nav4: '.nav4',
            nav2: '.nav2',
            
            // Parallax elements
            parallaxElements: '.parallax',
            frontLayer: '.front-layer',
            middleLayer: '.middle-layer',
            name: '.name, .company-name',
            
            // Team elements
            teamHeading: '.team-heading',
            teamMembers: '.team-member',
            
            // Timeline elements
            yearTabs: '.year-tab',
            yearContents: '.year-content',
            eventButtons: '.event-btn',
            timeline: '.timeline, .year',
            
            // Modal elements
            modal: '#event-modal',
            backButton: '.back-btn',
            
            // Carousel elements
            carouselImages: '.carousel-image',
            carouselPrevBtn: '.carousel-btn.prev',
            carouselNextBtn: '.carousel-btn.next',
            
            // Hamburger cross elements
            cross1: '.cross1',
            cross2: '.cross2'
        };

        // Cache all elements with error handling
        Object.entries(selectors).forEach(([key, selector]) => {
            try {
                if (selector.includes(',') || key.includes('Elements') || key.includes('Members') || 
                    key.includes('Tabs') || key.includes('Contents') || key.includes('Buttons') || 
                    key.includes('Images')) {
                    this.elements[key] = document.querySelectorAll(selector);
                } else {
                    this.elements[key] = document.querySelector(selector);
                }
            } catch (error) {
                console.warn(`Failed to cache element: ${key}`, error);
                this.elements[key] = key.includes('Elements') || key.includes('Members') || 
                                  key.includes('Tabs') || key.includes('Contents') || 
                                  key.includes('Buttons') || key.includes('Images') ? [] : null;
            }
        });
    }

    initializeEventData() {
        this.eventData = {
            'green-india': {
                title: 'Green India Hackathon',
                team: 'RYM Grenergy',
                members: 'Rohan Mathur, Mohit, Shubham Shakti',
                competition: 'Green India Hackathon, Manav Rachna University',
                date: '3rd and 4th Feb, 2023',
                position: '3rd',
                prize: '₹5,000 + ₹25,000 worth shopping vouchers',
                description: 'RYM Grenergy participated in the Green India Hackathon at Manav Rachna University, focusing on sustainable energy solutions and environmental conservation technologies...',
                images: ['./layers/pic1.jpg', './layers/pic2.jpg', './layers/pic3.jpeg']
            },
            'tech-innovation': {
                title: 'Tech Innovation Summit',
                team: 'RYM Grenergy',
                members: 'Rohan Mathur, Yash Sharma, Mohit Kumar',
                competition: 'National Tech Innovation Summit',
                date: '15th March, 2023',
                position: '2nd',
                prize: '₹10,000 + Certificate',
                description: 'Participated in the National Tech Innovation Summit with a project focusing on renewable energy integration...',
                images: ['./layers/tech1.jpg', './layers/tech2.jpg']
            }
            // Add more events as needed
        };
    }

    setupAllInteractions() {
        this.setupParallax();
        this.setupNavigation();
        this.setupTeamInteractions();
        this.setupTimeline();
        this.setupModal();
        this.setupResponsiveHandling();
        this.setupAccessibility();
        this.setupIntersectionObservers();
    }

    setupPerformanceOptimizations() {
        // Debounce and throttle utilities with better performance
        this.debounce = this.createDebounce();
        this.throttle = this.createThrottle();
        this.requestAnimationFrame = this.createRAFThrottle();
    }

    // Enhanced utility functions
    createDebounce() {
        return (func, wait, immediate = false) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    if (!immediate) func.apply(this, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
            };
        };
    }

    createThrottle() {
        return (func, limit) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
    }

    createRAFThrottle() {
        return (func) => {
            let ticking = false;
            return function(...args) {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        func.apply(this, args);
                        ticking = false;
                    });
                    ticking = true;
                }
            };
        };
    }

    // Enhanced parallax with better performance
    setupParallax() {
        if (!this.mediaQuery.matches || 
            !this.elements.parallaxElements?.length || 
            this.prefersReducedMotion.matches) {
            return;
        }

        const handleParallax = this.requestAnimationFrame((e) => {
            this.elements.parallaxElements.forEach(element => {
                const movingValue = parseFloat(element.dataset.value) || 0;
                const rect = element.getBoundingClientRect();
                
                // Only animate visible elements
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const x = (e.clientX * movingValue) / 250;
                    const y = (e.clientY * movingValue) / 250;
                    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                }
            });
        });

        document.addEventListener('mousemove', handleParallax, {
            signal: this.abortController.signal,
            passive: true
        });
    }

    // Enhanced navigation system
    setupNavigation() {
        this.setupHamburgerMenu();
        this.setupNavigationButtons();
        this.setupHomeButton();
    }

    setupHamburgerMenu() {
        if (!this.elements.hamburger) return;

        this.elements.hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleHamburger();
        }, { signal: this.abortController.signal });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.state.hamClick && 
                !this.elements.hamburger.contains(e.target) && 
                !this.elements.navMenu?.contains(e.target)) {
                this.closeHamburger();
            }
        }, { signal: this.abortController.signal });
    }

    setupNavigationButtons() {
        this.elements.navButtons?.forEach(button => {
            const target = this.getNavigationTarget(button);
            if (target) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToSection(target);
                    if (!this.mediaQuery.matches) {
                        this.closeHamburger();
                    }
                }, { signal: this.abortController.signal });
            }
        });
    }

    setupHomeButton() {
        if (!this.elements.homeBtn) return;

        this.elements.homeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.resetToHome();
        }, { signal: this.abortController.signal });
    }

    getNavigationTarget(button) {
        if (button.classList.contains('bt1')) return 'about';
        if (button.classList.contains('bt2')) return 'achievements';
        if (button.classList.contains('bt4')) return 'team';
        return null;
    }

    async navigateToSection(section) {
        // Hide all sections first
        await this.hideAllSections();

        // Show target section with animation
        switch (section) {
            case 'about':
                await this.showSection('nav1', 'nav1Animation');
                this.state.nav1Click = true;
                break;
            case 'team':
                await this.showSection('nav4', 'nav4Animation');
                if (this.elements.teamHeading) {
                    this.elements.teamHeading.style.bottom = '15rem';
                }
                this.state.nav4Click = true;
                break;
            case 'achievements':
                await this.showAchievements();
                this.state.nav2Click = true;
                break;
        }

        this.updateStateForNavigation(section);
        this.playInitialAnimation();
        this.announceNavigationToScreenReader(section);
    }

    async hideAllSections() {
        const sections = ['nav1', 'nav4'];
        const promises = sections.map(sectionClass => {
            const element = document.querySelector(`.${sectionClass}`);
            if (element) {
                element.classList.remove(`${sectionClass}Animation`);
                element.classList.add(`${sectionClass}AnimationRev`);
                
                // Return a promise that resolves when animation completes
                return new Promise(resolve => {
                    setTimeout(resolve, 300); // Adjust based on CSS animation duration
                });
            }
            return Promise.resolve();
        });

        // Hide achievements
        if (this.elements.timeline) {
            this.elements.timeline.style.opacity = '0';
            this.elements.timeline.style.zIndex = '0';
        }

        await Promise.all(promises);
    }

    async showSection(sectionClass, animationClass) {
        const element = document.querySelector(`.${sectionClass}`);
        if (element) {
            element.classList.remove(`${sectionClass}AnimationRev`);
            element.classList.add(animationClass);
            
            // Wait for animation to complete
            return new Promise(resolve => {
                setTimeout(resolve, 300);
            });
        }
        return Promise.resolve();
    }

    async showAchievements() {
        if (this.elements.timeline) {
            this.elements.timeline.style.opacity = '1';
            this.elements.timeline.style.zIndex = '1000';
        }
        return Promise.resolve();
    }

    updateStateForNavigation(section) {
        // Reset all navigation states
        this.state.nav1Click = false;
        this.state.nav2Click = false;
        this.state.nav4Click = false;
        this.state.eventClick = false;

        // Set active state
        const stateMap = {
            'about': 'nav1Click',
            'team': 'nav4Click',
            'achievements': 'nav2Click'
        };
        
        if (stateMap[section]) {
            this.state[stateMap[section]] = true;
        }
    }

    playInitialAnimation() {
        if (this.state.clickCounter === 0) {
            this.animateParallaxElements();
            this.state.clickCounter = 1;
        }
    }

    animateParallaxElements() {
        if (this.prefersReducedMotion.matches) return;

        const animations = [];

        if (this.elements.frontLayer) {
            this.elements.frontLayer.classList.add('frontAnimation');
            animations.push(
                new Promise(resolve => {
                    setTimeout(() => {
                        this.elements.frontLayer.style.display = 'none';
                        resolve();
                    }, 300);
                })
            );
        }
        
        if (this.elements.middleLayer) {
            this.elements.middleLayer.classList.add('middleAnimation');
        }
        
        if (this.elements.name) {
            this.elements.name.style.opacity = '0';
        }

        // Remove parallax class
        this.elements.parallaxElements?.forEach(el => el.classList.remove('parallax'));

        return Promise.all(animations);
    }

    toggleHamburger() {
        if (!this.elements.navMenu) return;

        const isVisible = this.elements.navMenu.style.display !== 'none';
        this.elements.navMenu.style.display = isVisible ? 'none' : 'block';

        this.updateCrossAnimation();
        this.state.hamClick = !this.state.hamClick;
        this.animateHamburger();
    }

    closeHamburger() {
        if (!this.elements.navMenu) return;
        
        this.elements.navMenu.style.display = 'none';
        this.updateCrossAnimation(false);
        this.state.hamClick = false;
        this.animateHamburger();
    }

    updateCrossAnimation(opening = null) {
        const isOpening = opening !== null ? opening : !this.state.hamClick;
        
        if (this.elements.cross1 && this.elements.cross2) {
            const animationSuffix = isOpening ? '1' : '2';
            this.elements.cross1.className = `cross1 line cross1Animation${animationSuffix}`;
            this.elements.cross2.className = `cross2 line cross2Animation${animationSuffix}`;
        }
    }

    animateHamburger() {
        if (!this.elements.hamburger) return;

        this.elements.hamburger.classList.add('hamburgerAnimation');
        setTimeout(() => {
            this.elements.hamburger.classList.remove('hamburgerAnimation');
        }, 100);
    }

    resetToHome() {
        // Show confirmation for better UX
        if (confirm('Are you sure you want to return to the home page? This will reload the page.')) {
            // Reset all states
            Object.keys(this.state).forEach(key => {
                if (typeof this.state[key] === 'boolean') {
                    this.state[key] = false;
                }
            });
            
            this.state.clickCounter = 0;
            
            // Clean up before reload
            this.cleanup();
            
            // Reload page for complete reset
            window.location.reload();
        }
    }

    // Enhanced team interactions
    setupTeamInteractions() {
        this.elements.teamMembers?.forEach((member, index) => {
            const memberData = this.getTeamMemberData(member);
            
            if (this.mediaQuery.matches) {
                this.setupDesktopTeamHover(member, memberData, index);
            } else {
                this.setupMobileTeamClick(member, memberData, index);
            }
        });
    }

    getTeamMemberData(member) {
        return {
            element: member,
            image: member.querySelector('.member-image'),
            info: member.querySelector('.member-info'),
            card: member.querySelector('.member-card'),
            name: member.querySelector('.member-name')?.textContent || 'Team Member'
        };
    }

    setupDesktopTeamHover(member, memberData, index) {
        member.addEventListener('mouseenter', () => this.showTeamMemberInfo(memberData, index), {
            signal: this.abortController.signal
        });
        
        member.addEventListener('mouseleave', () => this.hideTeamMemberInfo(memberData, index), {
            signal: this.abortController.signal
        });
    }

    setupMobileTeamClick(member, memberData, index) {
        const image = memberData.image;
        if (image) {
            image.addEventListener('click', () => this.toggleTeamMemberInfo(memberData, index), {
                signal: this.abortController.signal
            });
        }
    }

    showTeamMemberInfo(memberData, index) {
        if (this.state.currentHover !== null) return;
        
        this.state.currentHover = index;
        
        // Blur other members with smooth transition
        this.elements.teamMembers?.forEach((otherMember, otherIndex) => {
            if (otherIndex !== index) {
                otherMember.style.transition = 'filter 0.3s ease';
                otherMember.style.filter = 'blur(0.2rem)';
            }
        });
        
        // Show info with animation
        if (memberData.info) {
            memberData.info.style.transition = 'opacity 0.3s ease';
            memberData.info.style.opacity = '1';
        }
        
        if (memberData.card) {
            memberData.card.classList.add('onHover');
            memberData.card.classList.remove('notOnHover');
        }

        // Announce to screen readers
        this.announceToScreenReader(`Showing details for ${memberData.name}`);
    }

    hideTeamMemberInfo(memberData, index) {
        this.state.currentHover = null;
        
        // Remove blur from all members
        this.elements.teamMembers?.forEach(member => {
            member.style.filter = 'blur(0)';
        });
        
        // Hide info
        if (memberData.info) {
            memberData.info.style.opacity = '0';
        }
        
        if (memberData.card) {
            memberData.card.classList.add('notOnHover');
            memberData.card.classList.remove('onHover');
        }
    }

    toggleTeamMemberInfo(memberData, index) {
        if (this.state.tap && this.state.currentHover === index) {
            this.hideMobileTeamInfo();
        } else {
            this.showMobileTeamInfo(memberData, index);
        }
    }

    showMobileTeamInfo(memberData, index) {
        // Hide other members
        this.elements.teamMembers?.forEach((member, otherIndex) => {
            if (otherIndex !== index) {
                member.style.transition = 'opacity 0.3s ease';
                member.style.opacity = '0';
            }
        });
        
        // Show selected member info
        memberData.element.classList.add('bigDp');
        memberData.element.classList.remove('bigDpRev');
        
        if (memberData.info) {
            memberData.info.style.opacity = '1';
        }
        
        this.state.tap = true;
        this.state.currentHover = index;
    }

    hideMobileTeamInfo() {
        // Show all members
        this.elements.teamMembers?.forEach(member => {
            member.style.opacity = '1';
            member.classList.add('bigDpRev');
            member.classList.remove('bigDp');
            
            const info = member.querySelector('.member-info');
            if (info) info.style.opacity = '0';
        });
        
        this.state.tap = false;
        this.state.currentHover = null;
    }

    // Enhanced timeline functionality
    setupTimeline() {
        this.setupYearTabs();
        this.setupEventButtons();
    }

    setupYearTabs() {
        this.elements.yearTabs?.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchYear(tab);
            }, { signal: this.abortController.signal });

            // Add keyboard support
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.switchYear(tab);
                }
            }, { signal: this.abortController.signal });
        });
    }

    switchYear(activeTab) {
        // Update tab states
        this.elements.yearTabs?.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            tab.tabIndex = -1;
        });
        
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
        activeTab.tabIndex = 0;
        
        // Update content
        const targetId = activeTab.getAttribute('aria-controls');
        this.elements.yearContents?.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
        });
        
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.setAttribute('aria-hidden', 'false');
        }

        // Announce change to screen readers
        this.announceToScreenReader(`Switched to ${activeTab.textContent} timeline`);
    }

    setupEventButtons() {
        this.elements.eventButtons?.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const eventId = button.getAttribute('data-event');
                this.showEventModal(eventId);
            }, { signal: this.abortController.signal });

            // Add keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const eventId = button.getAttribute('data-event');
                    this.showEventModal(eventId);
                }
            }, { signal: this.abortController.signal });
        });
    }

    // Enhanced modal functionality
    setupModal() {
        this.setupModalControls();
        this.setupCarouselControls();
        this.setupKeyboardSupport();
    }

    setupModalControls() {
        if (this.elements.backButton) {
            this.elements.backButton.addEventListener('click', () => this.hideEventModal(), {
                signal: this.abortController.signal
            });
        }
        
        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.hideEventModal();
                }
            }, { signal: this.abortController.signal });
        }
    }

    setupCarouselControls() {
        if (this.elements.carouselPrevBtn) {
            this.elements.carouselPrevBtn.addEventListener('click', () => this.previousImage(), {
                signal: this.abortController.signal
            });
        }
        
        if (this.elements.carouselNextBtn) {
            this.elements.carouselNextBtn.addEventListener('click', () => this.nextImage(), {
                signal: this.abortController.signal
            });
        }

        // Add touch/swipe support for mobile
        this.setupTouchControls();
    }

    setupTouchControls() {
        let touchStartX = 0;
        let touchEndX = 0;

        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { signal: this.abortController.signal, passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { signal: this.abortController.signal, passive: true });

        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
        };
    }

    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (this.elements.modal && !this.elements.modal.hidden) {
                switch (e.key) {
                    case 'Escape':
                        this.hideEventModal();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextImage();
                        break;
                }
            }
        }, { signal: this.abortController.signal });
    }

    showEventModal(eventId) {
        const eventData = this.eventData[eventId];
        if (!eventData || !this.elements.modal) return;
        
        this.populateModalContent(eventData);
        this.elements.modal.hidden = false;
        this.elements.modal.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstFocusable = this.elements.modal.querySelector('button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
        
        this.state.eventClick = true;
        this.state.currentEventData = eventData;
        
        // Hide timeline
        if (this.elements.timeline) {
            this.elements.timeline.style.opacity = '0';
            this.elements.timeline.style.zIndex = '0';
        }

        // Announce to screen readers
        this.announceToScreenReader(`Opening details for ${eventData.title}`);
    }

    populateModalContent(eventData) {
        try {
            // Update modal content with event data
            const title = this.elements.modal?.querySelector('#modal-title');
            const facts = this.elements.modal?.querySelector('.event-facts');
            const description = this.elements.modal?.querySelector('.event-description p');
            
            if (title) title.textContent = eventData.title;
            
            if (facts) {
                facts.innerHTML = `
                    <dt>Team Name:</dt><dd>${this.escapeHtml(eventData.team)}</dd>
                    <dt>Team Members:</dt><dd>${this.escapeHtml(eventData.members)}</dd>
                    <dt>Competition:</dt><dd>${this.escapeHtml(eventData.competition)}</dd>
                    <dt>Date:</dt><dd>${this.escapeHtml(eventData.date)}</dd>
                    <dt>Position:</dt><dd>${this.escapeHtml(eventData.position)}</dd>
                    <dt>Prize:</dt><dd>${this.escapeHtml(eventData.prize)}</dd>
                `;
            }
            
            if (description) description.textContent = eventData.description;
            
            // Update carousel images
            this.updateCarouselImages(eventData.images);
        } catch (error) {
            console.error('Error populating modal content:', error);
        }
    }

    updateCarouselImages(images) {
        if (!Array.isArray(images) || !this.elements.carouselImages) return;

        this.elements.carouselImages.forEach((img, index) => {
            if (images[index]) {
                img.src = images[index];
                img.alt = `Event image ${index + 1}`;
                img.style.display = index === 0 ? 'block' : 'none';
                img.classList.toggle('active', index === 0);
                
                // Add error handling for images
                img.onerror = () => {
                    console.warn(`Failed to load image: ${images[index]}`);
                    img.style.display = 'none';
                };
            } else {
                img.style.display = 'none';
            }
        });
        
        this.state.currentImageIndex = 0;
    }

    hideEventModal() {
        if (!this.elements.modal) return;
        
        this.elements.modal.hidden = true;
        this.elements.modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Show timeline again
        if (this.elements.timeline) {
            this.elements.timeline.style.opacity = '1';
            this.elements.timeline.style.zIndex = '1000';
        }
        
        // Return focus to trigger element
        const activeYearTab = document.querySelector('.year-tab.active');
        if (activeYearTab) activeYearTab.focus();
        
        this.state.eventClick = false;
        this.state.currentEventData = null;

        // Announce to screen readers
        this.announceToScreenReader('Modal closed, returned to timeline');
    }

    previousImage() {
        if (!this.elements.carouselImages?.length) return;
        
        this.elements.carouselImages[this.state.currentImageIndex]?.classList.remove('active');
        this.state.currentImageIndex = (this.state.currentImageIndex - 1 + this.elements.carouselImages.length) % this.elements.carouselImages.length;
        this.elements.carouselImages[this.state.currentImageIndex]?.classList.add('active');
        
        this.announceToScreenReader(`Previous image, ${this.state.currentImageIndex + 1} of ${this.elements.carouselImages.length}`);
    }

    nextImage() {
        if (!this.elements.carouselImages?.length) return;
        
        this.elements.carouselImages[this.state.currentImageIndex]?.classList.remove('active');
        this.state.currentImageIndex = (this.state.currentImageIndex + 1) % this.elements.carouselImages.length;
        this.elements.carouselImages[this.state.currentImageIndex]?.classList.add('active');
        
        this.announceToScreenReader(`Next image, ${this.state.currentImageIndex + 1} of ${this.elements.carouselImages.length}`);
    }

    // Responsive handling with improved performance
    setupResponsiveHandling() {
        // Use ResizeObserver for better performance
        if (window.ResizeObserver) {
            this.setupResizeObserver();
        } else {
            // Fallback for older browsers
            this.setupMediaQueryListener();
        }
    }

    setupResizeObserver() {
        const resizeObserver = new ResizeObserver(this.debounce((entries) => {
            const viewport = entries[0];
            const isDesktop = viewport.contentRect.width >= 480;
            
            if (isDesktop !== this.mediaQuery.matches) {
                this.handleViewportChange(isDesktop);
            }
        }, 250));

        resizeObserver.observe(document.documentElement);
        
        // Store for cleanup
        this.observers.set('resize', resizeObserver);
    }

    setupMediaQueryListener() {
        const handleChange = (mq) => {
            this.handleViewportChange(mq.matches);
        };

        this.mediaQuery.addEventListener('change', handleChange, {
            signal: this.abortController.signal
        });
    }

    handleViewportChange(isDesktop) {
        if (isDesktop) {
            this.switchToDesktopMode();
        } else {
            this.switchToMobileMode();
        }
    }

    switchToDesktopMode() {
        // Re-enable parallax
        this.setupParallax();
        
        // Update team interactions
        this.updateTeamInteractions(true);
        
        // Show navigation menu
        if (this.elements.navMenu) {
            this.elements.navMenu.style.display = 'block';
        }

        // Close mobile hamburger menu if open
        if (this.state.hamClick) {
            this.closeHamburger();
        }

        console.log('Switched to desktop mode');
    }

    switchToMobileMode() {
        // Hide navigation menu initially
        if (this.elements.navMenu && !this.state.hamClick) {
            this.elements.navMenu.style.display = 'none';
        }
        
        // Update team interactions
        this.updateTeamInteractions(false);

        console.log('Switched to mobile mode');
    }

    updateTeamInteractions(isDesktop) {
        // Remove existing event listeners by cloning elements
        this.elements.teamMembers?.forEach((member, index) => {
            const newMember = member.cloneNode(true);
            member.parentNode?.replaceChild(newMember, member);
            
            // Update our cached reference
            this.elements.teamMembers[index] = newMember;
            
            const memberData = this.getTeamMemberData(newMember);
            
            if (isDesktop) {
                this.setupDesktopTeamHover(newMember, memberData, index);
            } else {
                this.setupMobileTeamClick(newMember, memberData, index);
            }
        });
    }

    // Accessibility enhancements
    setupAccessibility() {
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
        this.setupReducedMotionSupport();
    }

    setupScreenReaderSupport() {
        // Create a live region for announcements
        if (!document.getElementById('sr-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'sr-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(liveRegion);
        }
    }

    setupFocusManagement() {
        // Add focus visible polyfill behavior
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        }, { signal: this.abortController.signal });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        }, { signal: this.abortController.signal });

        // Skip links for better navigation
        this.addSkipLinks();
    }

    addSkipLinks() {
        if (document.querySelector('.skip-links')) return;

        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
        `;
        
        // Add styles for skip links
        const style = document.createElement('style');
        style.textContent = `
            .skip-links { position: fixed; top: 0; left: 0; z-index: 10000; }
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                border-radius: 0 0 4px 4px;
                transition: top 0.3s;
            }
            .skip-link:focus { top: 0; }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    setupReducedMotionSupport() {
        if (this.prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }

        this.prefersReducedMotion.addEventListener('change', (mq) => {
            if (mq.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            } else {
                document.documentElement.style.removeProperty('--animation-duration');
                document.documentElement.style.removeProperty('--transition-duration');
            }
        }, { signal: this.abortController.signal });
    }

    // Intersection observers for performance
    setupIntersectionObservers() {
        this.setupLazyLoading();
        this.setupAnimationTriggers();
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        this.observers.set('lazyImages', imageObserver);
    }

    setupAnimationTriggers() {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Only observe once for most animations
                    if (!entry.target.dataset.repeatAnimation) {
                        animationObserver.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-10% 0px'
        });

        // Observe elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(el => {
            animationObserver.observe(el);
        });

        this.observers.set('animations', animationObserver);
    }

    // Utility functions
    announceToScreenReader(message) {
        const liveRegion = document.getElementById('sr-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    announceNavigationToScreenReader(section) {
        const sectionNames = {
            'about': 'About section',
            'team': 'Team section', 
            'achievements': 'Achievements section'
        };
        
        this.announceToScreenReader(`Navigated to ${sectionNames[section] || section}`);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Error handling and logging
    handleError(error, context = '') {
        console.error(`RYM Website Error ${context}:`, error);
        
        // Could integrate with error reporting service here
        if (window.errorReporting) {
            window.errorReporting.captureException(error, { context });
        }
    }

    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }

    // Cleanup methods
    cleanup() {
        // Abort all event listeners
        this.abortController.abort();
        
        // Disconnect all observers
        this.observers.forEach(observer => {
            if (observer.disconnect) {
                observer.disconnect();
            }
        });
        this.observers.clear();
        
        // Clear any pending timeouts/intervals
        if (this.timeouts) {
            this.timeouts.forEach(clearTimeout);
        }
        
        if (this.intervals) {
            this.intervals.forEach(clearInterval);
        }
        
        console.log('RYM Website cleaned up');
    }

    // Public API methods for external use
    getState() {
        return { ...this.state };
    }

    isInitialized() {
        return this.state.isInitialized;
    }

    // Method to programmatically navigate (for external API)
    navigate(section) {
        if (!this.state.isInitialized) {
            console.warn('Website not yet initialized');
            return;
        }
        
        if (['about', 'team', 'achievements'].includes(section)) {
            this.navigateToSection(section);
        } else {
            console.warn('Invalid section:', section);
        }
    }

    // Method to show specific event (for external API)
    showEvent(eventId) {
        if (!this.state.isInitialized) {
            console.warn('Website not yet initialized');
            return;
        }
        
        if (this.eventData[eventId]) {
            this.showEventModal(eventId);
        } else {
            console.warn('Event not found:', eventId);
        }
    }
}

// Enhanced initialization with error handling
class RYMWebsiteInitializer {
    static async initialize() {
        try {
            // Check for required browser features
            if (!RYMWebsiteInitializer.checkBrowserSupport()) {
                console.warn('Some features may not work in this browser');
            }
            
            // Wait for DOM and critical resources
            await RYMWebsiteInitializer.waitForReady();
            
            // Initialize the website
            const website = new RYMWebsite();
            
            // Make it globally accessible for debugging
            if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
                window.RYMWebsite = website;
                console.log('RYM Website instance available as window.RYMWebsite');
            }
            
            return website;
            
        } catch (error) {
            console.error('Failed to initialize RYM Website:', error);
            RYMWebsiteInitializer.showFallbackMessage();
            throw error;
        }
    }
    
    static checkBrowserSupport() {
        const requiredFeatures = [
            'querySelector',
            'addEventListener',
            'classList',
            'dataset',
            'Promise'
        ];
        
        return requiredFeatures.every(feature => {
            const hasFeature = feature in document || feature in Element.prototype || feature in window;
            if (!hasFeature) {
                console.warn(`Missing browser feature: ${feature}`);
            }
            return hasFeature;
        });
    }
    
    static waitForReady() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            } else {
                resolve();
            }
        });
    }
    
    static showFallbackMessage() {
        const fallback = document.createElement('div');
        fallback.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f44336;
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        fallback.textContent = 'Some website features may not work properly. Please try refreshing the page or using a modern browser.';
        
        document.body.appendChild(fallback);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            fallback.remove();
        }, 5000);
    }
}

// Initialize when ready
RYMWebsiteInitializer.initialize().catch(error => {
    console.error('Critical initialization error:', error);
});

// Also provide fallback initialization for immediate execution contexts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.RYMWebsiteInstance) {
            RYMWebsiteInitializer.initialize().then(instance => {
                window.RYMWebsiteInstance = instance;
            });
        }
    });
} else {
    if (!window.RYMWebsiteInstance) {
        RYMWebsiteInitializer.initialize().then(instance => {
            window.RYMWebsiteInstance = instance;
        });
    }
}
