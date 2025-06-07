//nav links
$(document).ready(function () {
    const $header = $('.header');
    const headerOffset = $header.length ? $header.outerHeight() : 0;

    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');

        if (href.length > 1 && $(href).length) {
            e.preventDefault();
            const $target = $(href);
            const targetPosition = $target.offset().top;
            const scrollToPosition = targetPosition - headerOffset;

            $('html, body').animate({
                scrollTop: scrollToPosition
            }, 600);
        }
    });
});
//nav links end

// nav links hover effect
document.querySelectorAll('.header__inner__nav__item').forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.querySelectorAll('.header__inner__nav__item').forEach(otherLink => {
            if (otherLink !== link) {
                otherLink.style.color = 'var(--black60, rgba(0, 0, 0, 0.6))';
                otherLink.style.opacity = '0.6';
            }
        });
    });

    link.addEventListener('mouseleave', () => {
        document.querySelectorAll('.header__inner__nav__item').forEach(otherLink => {
            otherLink.style.color = '';
            otherLink.style.opacity = '';
        });
    });
});
// nav links hover effect end

//  lenis
const lenis = new Lenis();
window.lenis = lenis;
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// lenis end

// main
window.addEventListener('scroll', () => {
    const mainScreen = document.querySelector('.main-screen');
    const scrollY = window.scrollY;
    const maxScroll = 400;

    const progress = Math.min(scrollY / maxScroll, 1); // 0...1
    const scale = 1 + progress * 0.08; // scale from 1.00 to 1.08

    mainScreen.style.transform = `scale(${scale})`;
});
// main end

// faq
document.querySelectorAll('.faq__inner__item').forEach(item => {
    const top = item.querySelector('.faq__inner__item__top');
    const mid = item.querySelector('.faq__inner__item__mid');
    const originalHeight = item.offsetHeight;

    top.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq__inner__item').forEach(el => {
            el.classList.remove('active');
            el.style.height = `${el === item ? el.offsetHeight : originalHeight}px`;
        });

        if (!isActive) {
            const topHeight = top.offsetHeight;
            const midHeight = mid.scrollHeight;
            const totalHeight = topHeight + midHeight - 8;
            item.style.height = `${totalHeight}px`;
            item.classList.add('active');
        } else {
            item.style.height = `${originalHeight}px`;
        }
    });
});
// faq end

// advantages hover
document.addEventListener('DOMContentLoaded', function() {
    const mountainElement = document.querySelector('.advantages-mountain');
    const chartElement = document.querySelector('.advantages-chart');

    const paymentWrapper = document.querySelector('.wrapper-payment');
    const paymentInfoToShow = document.querySelector('.dop-info-payment');

    const payrollWrapper = document.querySelector('.wrapper-payroll');
    const payrollInfoToShow = document.querySelector('.dop-info-payroll');

    function resetAllElements() {
        if (chartElement) chartElement.style.opacity = '1';
        if (paymentWrapper) paymentWrapper.style.opacity = '1';
        if (payrollWrapper) payrollWrapper.style.opacity = '1';
        if (mountainElement) mountainElement.style.opacity = '1';
        if (paymentInfoToShow) paymentInfoToShow.style.opacity = '0';
        if (payrollInfoToShow) payrollInfoToShow.style.opacity = '0';
    }

    if (paymentWrapper) {
        paymentWrapper.addEventListener('mouseenter', function() {
            if (chartElement) chartElement.style.opacity = '0.2';
            if (mountainElement) mountainElement.style.opacity = '0';
            if (paymentInfoToShow) paymentInfoToShow.style.opacity = '1';
        });

        paymentWrapper.addEventListener('mouseleave', resetAllElements);
    }

    if (payrollWrapper) {
        payrollWrapper.addEventListener('mouseenter', function() {
            if (chartElement) chartElement.style.opacity = '0.2';
            if (mountainElement) mountainElement.style.opacity = '0';
            if (payrollInfoToShow) payrollInfoToShow.style.opacity = '1';
        });

        payrollWrapper.addEventListener('mouseleave', resetAllElements);
    }

    const elementsWithTransition = [
        chartElement,
        paymentWrapper,
        payrollWrapper,
        mountainElement,
        paymentInfoToShow,
        payrollInfoToShow
    ];

    elementsWithTransition.forEach(el => {
        if (el) el.style.transition = 'opacity 0.3s ease';
    });
});
// advantages end

// advantages shining
document.addEventListener('DOMContentLoaded', () => {
    const darkOverlay = document.querySelector('.wrapper-payment-image-dark');
    const wrapper = document.querySelector('.wrapper-payment');

    let isHovered = false;
    wrapper.addEventListener('mouseenter', () => isHovered = true);
    wrapper.addEventListener('mouseleave', () => isHovered = false);

    function animateOpacity() {
        if (isHovered) return;

        darkOverlay.style.opacity = '0';

        setTimeout(() => {
            if (!isHovered) {
                darkOverlay.style.opacity = '1';
            }
        }, 300);
    }
    setInterval(animateOpacity, 3100);
});
// advantages shining end

//   how it works
class ScrollVideoAnimation {
    constructor() {
        this.totalFrames = 626;
        this.framePath = 'animation/'; // <-- новий шлях
        this.frameFormat = 'webp';     // <-- новий формат

        this.frameImage = document.getElementById('frameImage');
        this.scrollSection = document.querySelector('.scroll-animation');
        this.frames = [];
        this.currentFrame = 0;

        this.init();
    }

    async init() {
        await this.preloadFrames();
        this.setupScrollAnimation();
        this.setFrame(0);
    }

    async preloadFrames() {
        const promises = [];

        for (let i = 1; i <= this.totalFrames; i++) {
            const frameNumber = i.toString().padStart(5, '0');
            const frameSrc = `${this.framePath}${frameNumber}.${this.frameFormat}`;

            const promise = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    this.frames[i - 1] = img.src;
                    resolve();
                };
                img.onerror = () => {
                    this.frames[i - 1] = this.frames[i - 2] || '';
                    resolve();
                };
                img.src = frameSrc;
            });
            promises.push(promise);
        }
        await Promise.all(promises);
    }

    setupScrollAnimation() {
        let ticking = false;

        const updateFrame = () => {
            const rect = this.scrollSection.getBoundingClientRect();
            const sectionHeight = this.scrollSection.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrollStart = -rect.top;
            const scrollEnd = sectionHeight - viewportHeight;
            const scrollProgress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

            const targetFrame = Math.floor(scrollProgress * (this.totalFrames - 1));

            if (targetFrame !== this.currentFrame) {
                this.setFrame(targetFrame);
            }

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateFrame);
                ticking = true;
            }
        });
    }

    setFrame(frameIndex) {
        if (frameIndex >= 0 && frameIndex < this.frames.length && this.frames[frameIndex]) {
            this.frameImage.src = this.frames[frameIndex];
            this.currentFrame = frameIndex;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollVideoAnimation();
});
// how it works end

// header  sticky
let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector('.header');

function isAnimationContainerVisible() {
    const animBlock = document.querySelector('.animation-container');
    if (!animBlock) return false;

    const rect = animBlock.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

function updateHeaderVisibility() {
    const currentScrollY = window.scrollY;

    if (isAnimationContainerVisible()) {
        header.classList.add('header--hidden');
        return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header--hidden');
    } else {
        header.classList.remove('header--hidden');
    }

    lastScrollY = currentScrollY;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateHeaderVisibility();
            ticking = false;
        });
        ticking = true;
    }
});

// header sticky end

// modal

// modal.js
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__inner__close');
    const modalForm = document.getElementById('modalForm');
    
    const openModalButtons = document.querySelectorAll(
        '.header__inner__btn, ' +
        '.intro__inner__info__btn, ' +
        '.pricing__inner__info__item__main__btn, ' +
        '.cta__inner__btn'
    );
    
    function openModal() {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(modalForm);
        const email = formData.get('email');
        
        fetch('../form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            closeModal();
            showPopup(data.success);
        })
        .catch(error => {
            closeModal();
            showPopup(false);
        });
    });
    
    function showPopup(success) {
        const popup = document.createElement('div');
        popup.className = `popup ${success ? 'popup--success' : 'popup--error'}`;
        popup.textContent = success ? 'Success! Thank you for your submission.' : 'Error! Please try again later.';
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.classList.add('popup--show');
        }, 10);
        
        setTimeout(() => {
            popup.classList.remove('popup--show');
            setTimeout(() => {
                popup.remove();
            }, 300);
        }, 2000);
    }
});

