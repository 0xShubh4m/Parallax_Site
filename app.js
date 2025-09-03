// Modern JavaScript for RYM Grenergy website
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
            currentEventData: null
        };

        this.mediaQuery = window.matchMedia('(min-width: 480px)');
        this.elements = this.cacheElements();
        this.eventData = this.initializeEventData();
        
        this.init();
    }

    cacheElements() {
        return {
            // Navigation elements
            hamburger: document.querySelector('.hamburger'),
            navMenu: document.querySelector('.navbar__menu'),
            navButtons: document.querySelectorAll('.buttons'),
            
            // Section elements
            nav1: document.querySelector('.nav1'),
            nav4: document.querySelector('.nav4'),
            nav2: document.querySelector('.nav2'),
            
            // Parallax elements
            parallaxElements: document.querySelectorAll('.parallax'),
            frontLayer: document.querySelector('.front-layer'),
            middleLayer: document.querySelector('.middle-layer'),
            name: document.querySelector('.name, .company-name'),
            
            // Team elements
            teamHeading: document.querySelector('.team-heading'),
            teamMembers: document.querySelectorAll('.team-member'),
            
            // Timeline elements
            yearTabs: document.querySelectorAll('.year-tab'),
            yearContents: document.querySelectorAll('.year-content'),
            eventButtons: document.querySelectorAll('.event-btn'),
            
            // Modal elements
            modal: document.querySelector('#event-modal'),
            backButton: document.querySelector('.back-btn'),
            carousel: {
                images: document.querySelectorAll('.carousel-image'),
                prevBtn: document.querySelector('.carousel-btn.prev'),
                nextBtn: document.querySelector('.carousel-btn.next')
            }
        };
    }

    initializeEventData() {
        return {
            'green-india': {
                title: 'Green India Hackathon',
                team: 'RYM Grenergy',
                members: 'Rohan Mathur, Mohit, Shubham Shakti',
                competition: 'Green India Hackathon, Manav Rachna University',
                date: '3rd and 4th Feb, 2023',
                position: '3rd',
                prize: '₹5,000 + ₹25,000 worth shopping vouchers',
                description: 'RYM Grenergy participated in the Green India Hackathon at Manav Rachna University...',
                images: ['./layers/pic1.jpg', './layers/pic2.jpg', './layers/pic3.jpeg']
            }
            // Add more events as needed
        };
    }

    init() {
        this.setupParallax();
        this.setupNavigation();
        this.setupTeamInteractions();
        this.setupTimeline();
        this.setupModal();
        this.setupResponsiveHandling();
        
        // Performance optimizations
        this.debounce = this.createDebounce();
        this.throttle = this.createThrottle();
    }

    // Utility functions
    createDebounce() {
        return (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };
    }

    createThrottle() {
        return (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
    }

    // Parallax functionality
    setupParallax() {
        if (!this.mediaQuery.matches || !this.elements.parallaxElements.length) return;

        const handleParallax = this.throttle((e) => {
            this.elements.parallaxElements.forEach(element => {
                const movingValue = parseFloat(element.getAttribute('data-value')) || 0;
                const x = (e.clientX * movingValue) / 250;
                const y = (e.clientY * movingValue) / 250;
                element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        }, 16); // ~60fps

        document.addEventListener('mousemove', handleParallax);
    }

    // Navigation system
    setupNavigation() {
        // Hamburger menu
        if (this.elements.hamburger) {
            this.elements.hamburger.addEventListener('click', () => this.toggleHamburger());
        }

        // Navigation buttons
        this.elements.navButtons.forEach(button => {
            const target = this.getNavigationTarget(button);
            if (target) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToSection(target);
                    if (!this.mediaQuery.matches) {
                        this.closeHamburger();
                    }
                });
            }
        });

        // Home button (bt3)
        const homeBtn = document.querySelector('.bt3');
        if (homeBtn) {
            homeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetToHome();
            });
        }
    }

    getNavigationTarget(button) {
        const classList = button.classList;
        if (classList.contains('bt1')) return 'about';
        if (classList.contains('bt2')) return 'achievements';
        if (classList.contains('bt4')) return 'team';
        return null;
    }

    navigateToSection(section) {
        // Hide all sections first
        this.hideAllSections();

        // Show target section
        switch (section) {
            case 'about':
                this.showSection('nav1', 'nav1Animation');
                this.state.nav1Click = true;
                break;
            case 'team':
                this.showSection('nav4', 'nav4Animation');
                if (this.elements.teamHeading) {
                    this.elements.teamHeading.style.bottom = '15rem';
                }
                this.state.nav4Click = true;
                break;
            case 'achievements':
                this.showAchievements();
                this.state.nav2Click = true;
                break;
        }

        this.updateStateForNavigation(section);
        this.playInitialAnimation();
    }

    hideAllSections() {
        const sections = ['nav1', 'nav4'];
        sections.forEach(sectionClass => {
            const element = document.querySelector(`.${sectionClass}`);
            if (element) {
                element.classList.remove(`${sectionClass}Animation`);
                element.classList.add(`${sectionClass}AnimationRev`);
            }
        });

        // Hide achievements
        const year = document.querySelector('.year, .timeline');
        if (year) {
            year.style.opacity = '0';
            year.style.zIndex = '0';
        }
    }

    showSection(sectionClass, animationClass) {
        const element = document.querySelector(`.${sectionClass}`);
        if (element) {
            element.classList.remove(`${sectionClass}AnimationRev`);
            element.classList.add(animationClass);
        }
    }

    showAchievements() {
        const timeline = document.querySelector('.timeline, .year');
        if (timeline) {
            timeline.style.opacity = '1';
            timeline.style.zIndex = '1000';
        }
    }

    updateStateForNavigation(section) {
        // Reset all navigation states
        this.state.nav1Click = false;
        this.state.nav2Click = false;
        this.state.nav4Click = false;
        this.state.eventClick = false;

        // Set active state
        this.state[`${section === 'about' ? 'nav1' : section === 'team' ? 'nav4' : 'nav2'}Click`] = true;
    }

    playInitialAnimation() {
        if (this.state.clickCounter === 0) {
            this.animateParallaxElements();
            this.state.clickCounter = 1;
        }
    }

    animateParallaxElements() {
        if (this.elements.frontLayer) {
            this.elements.frontLayer.classList.add('frontAnimation');
            setTimeout(() => this.elements.frontLayer.style.display = 'none', 300);
        }
        
        if (this.elements.middleLayer) {
            this.elements.middleLayer.classList.add('middleAnimation');
        }
        
        if (this.elements.name) {
            this.elements.name.style.opacity = '0';
        }

        // Remove parallax class
        this.elements.parallaxElements.forEach(el => el.classList.remove('parallax'));
    }

    toggleHamburger() {
        if (!this.elements.navMenu) return;

        this.elements.navMenu.style.display = 
            this.elements.navMenu.style.display === 'none' ? 'block' : 'none';

        const cross1 = document.querySelector('.cross1');
        const cross2 = document.querySelector('.cross2');

        if (cross1 && cross2) {
            if (!this.state.hamClick) {
                cross1.className = 'cross1 line cross1Animation1';
                cross2.className = 'cross2 line cross2Animation1';
            } else {
                cross1.className = 'cross1 line cross1Animation2';
                cross2.className = 'cross2 line cross2Animation2';
            }
        }

        this.state.hamClick = !this.state.hamClick;
        this.animateHamburger();
    }

    closeHamburger() {
        if (!this.elements.navMenu) return;
        
        this.elements.navMenu.style.display = 'none';
        const cross1 = document.querySelector('.cross1');
        const cross2 = document.querySelector('.cross2');
        
        if (cross1 && cross2) {
            cross1.className = 'cross1 line cross1Animation2';
            cross2.className = 'cross2 line cross2Animation2';
        }
        
        this.state.hamClick = false;
        this.animateHamburger();
    }

    animateHamburger() {
        if (this.elements.hamburger) {
            this.elements.hamburger.classList.add('hamburgerAnimation');
            setTimeout(() => {
                this.elements.hamburger.classList.remove('hamburgerAnimation');
            }, 100);
        }
    }

    resetToHome() {
        // Reset all states
        Object.keys(this.state).forEach(key => {
            if (typeof this.state[key] === 'boolean') {
                this.state[key] = false;
            }
        });
        
        this.state.clickCounter = 0;
        
        // Reload page for complete reset
        location.reload(true);
    }

    // Team interactions
    setupTeamInteractions() {
        this.elements.teamMembers.forEach((member, index) => {
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
            card: member.querySelector('.member-card')
        };
    }

    setupDesktopTeamHover(member, memberData, index) {
        member.addEventListener('mouseenter', () => this.showTeamMemberInfo(memberData, index));
        member.addEventListener('mouseleave', () => this.hideTeamMemberInfo(memberData, index));
    }

    setupMobileTeamClick(member, memberData, index) {
        const image = memberData.image;
        if (image) {
            image.addEventListener('click', () => this.toggleTeamMemberInfo(memberData, index));
        }
    }

    showTeamMemberInfo(memberData, index) {
        if (this.state.currentHover !== null) return;
        
        this.state.currentHover = index;
        
        // Blur other members
        this.elements.teamMembers.forEach((otherMember, otherIndex) => {
            if (otherIndex !== index) {
                otherMember.style.filter = 'blur(0.2rem)';
            }
        });
        
        // Show info
        if (memberData.info) {
            memberData.info.style.opacity = '1';
        }
        
        if (memberData.card) {
            memberData.card.classList.add('onHover');
            memberData.card.classList.remove('notOnHover');
        }
    }

    hideTeamMemberInfo(memberData, index) {
        this.state.currentHover = null;
        
        // Remove blur from all members
        this.elements.teamMembers.forEach(member => {
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
        this.elements.teamMembers.forEach((member, otherIndex) => {
            if (otherIndex !== index) {
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
        this.elements.teamMembers.forEach(member => {
            member.style.opacity = '1';
            member.classList.add('bigDpRev');
            member.classList.remove('bigDp');
            
            const info = member.querySelector('.member-info');
            if (info) info.style.opacity = '0';
        });
        
        this.state.tap = false;
        this.state.currentHover = null;
    }

    // Timeline functionality
    setupTimeline() {
        this.setupYearTabs();
        this.setupEventButtons();
    }

    setupYearTabs() {
        this.elements.yearTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchYear(tab);
            });
        });
    }

    switchYear(activeTab) {
        // Update tab states
        this.elements.yearTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
        
        // Update content
        const targetId = activeTab.getAttribute('aria-controls');
        this.elements.yearContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    setupEventButtons() {
        this.elements.eventButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const eventId = button.getAttribute('data-event');
                this.showEventModal(eventId);
            });
        });
    }

    // Modal functionality
    setupModal() {
        if (this.elements.backButton) {
            this.elements.backButton.addEventListener('click', () => this.hideEventModal());
        }
        
        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.hideEventModal();
                }
            });
        }
        
        // Carousel controls
        if (this.elements.carousel.prevBtn) {
            this.elements.carousel.prevBtn.addEventListener('click', () => this.previousImage());
        }
        
        if (this.elements.carousel.nextBtn) {
            this.elements.carousel.nextBtn.addEventListener('click', () => this.nextImage());
        }
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.elements.modal && !this.elements.modal.hidden) {
                if (e.key === 'Escape') {
                    this.hideEventModal();
                } else if (e.key === 'ArrowLeft') {
                    this.previousImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            }
        });
    }

    showEventModal(eventId) {
        const eventData = this.eventData[eventId];
        if (!eventData || !this.elements.modal) return;
        
        this.populateModalContent(eventData);
        this.elements.modal.hidden = false;
        this.elements.modal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const firstFocusable = this.elements.modal.querySelector('button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
        
        this.state.eventClick = true;
        this.state.currentEventData = eventData;
        
        // Hide timeline
        const timeline = document.querySelector('.timeline, .year');
        if (timeline) {
            timeline.style.opacity = '0';
            timeline.style.zIndex = '0';
        }
    }

    populateModalContent(eventData) {
        // Update modal content with event data
        const title = this.elements.modal.querySelector('#modal-title');
        const facts = this.elements.modal.querySelector('.event-facts');
        const description = this.elements.modal.querySelector('.event-description p');
        
        if (title) title.textContent = eventData.title;
        
        if (facts) {
            facts.innerHTML = `
                <dt>Team Name:</dt><dd>${eventData.team}</dd>
                <dt>Team Members:</dt><dd>${eventData.members}</dd>
                <dt>Competition:</dt><dd>${eventData.competition}</dd>
                <dt>Date:</dt><dd>${eventData.date}</dd>
                <dt>Position:</dt><dd>${eventData.position}</dd>
                <dt>Prize:</dt><dd>${eventData.prize}</dd>
            `;
        }
        
        if (description) description.textContent = eventData.description;
        
        // Update carousel images
        this.updateCarouselImages(eventData.images);
    }

    updateCarouselImages(images) {
        this.elements.carousel.images.forEach((img, index) => {
            if (images[index]) {
                img.src = images[index];
                img.style.display = index === 0 ? 'block' : 'none';
                img.classList.toggle('active', index === 0);
            } else {
                img.style.display = 'none';
            }
        });
        this.currentImageIndex = 0;
    }

    hideEventModal() {
        if (!this.elements.modal) return;
        
        this.elements.modal.hidden = true;
        this.elements.modal.setAttribute('aria-hidden', 'true');
        
        // Show timeline again
        const timeline = document.querySelector('.timeline, .year');
        if (timeline) {
            timeline.style.opacity = '1';
            timeline.style.zIndex = '1000';
        }
        
        this.state.eventClick = false;
        this.state.currentEventData = null;
    }

    previousImage() {
        if (!this.elements.carousel.images.length) return;
        
        this.elements.carousel.images[this.currentImageIndex].classList.remove('active');
        this.currentImageIndex = (this.currentImageIndex - 1 + this.elements.carousel.images.length) % this.elements.carousel.images.length;
        this.elements.carousel.images[this.currentImageIndex].classList.add('active');
    }

    nextImage() {
        if (!this.elements.carousel.images.length) return;
        
        this.elements.carousel.images[this.currentImageIndex].classList.remove('active');
        this.currentImageIndex = (this.currentImageIndex + 1) % this.elements.carousel.images.length;
        this.elements.carousel.images[this.currentImageIndex].classList.add('active');
    }

    // Responsive handling
    setupResponsiveHandling() {
        this.mediaQuery.addListener((mq) => {
            if (mq.matches) {
                this.switchToDesktopMode();
            } else {
                this.switchToMobileMode();
            }
        });
    }

    switchToDesktopMode() {
        // Re-enable parallax
        this.setupParallax();
        
        // Update team interactions
        this.elements.teamMembers.forEach((member, index) => {
            const memberData = this.getTeamMemberData(member);
            member.replaceWith(member.cloneNode(true)); // Remove old listeners
            this.setupDesktopTeamHover(member, memberData, index);
        });
        
        // Show navigation menu
        if (this.elements.navMenu) {
            this.elements.navMenu.style.display = 'block';
        }
    }

    switchToMobileMode() {
        // Hide navigation menu
        if (this.elements.navMenu) {
            this.elements.navMenu.style.display = 'none';
        }
        
        // Update team interactions
        this.elements.teamMembers.forEach((member, index) => {
            const memberData = this.getTeamMemberData(member);
            member.replaceWith(member.cloneNode(true)); // Remove old listeners
            this.setupMobileTeamClick(member, memberData, index);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RYMWebsite();
});

// Fallback for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RYMWebsite());
} else {
    new RYMWebsite();
}
