// MATRIX CANVAS BACKGROUND
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const fontSize = 14;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f0ff';
    ctx.font = fontSize + 'px JetBrains Mono';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = Array(Math.floor(columns)).fill(1);
});

// CUSTOM CURSOR
const cursor = document.getElementById('custom-cursor');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 10 + 'px';
    cursor.style.top = mouseY - 10 + 'px';
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.left = trailX - 4 + 'px';
    trail.style.top = trailY - 4 + 'px';
    requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .btn, .project-link, .contact-btn, .skill-node, .pip-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ACTIVE NAV LINK
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// TYPING EFFECT
const typingText = document.getElementById('typing-text');
const texts = ['Angel David', 'Angel.DEV', 'kindred-98'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex === currentText.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500;
    }

    setTimeout(typeEffect, delay);
}

setTimeout(typeEffect, 1000);

// COUNTER ANIMATION
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// INTERSECTION OBSERVER FOR REVEAL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill bars
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
            });

            // Animate counters
            if (entry.target.querySelector('.stat-number')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Add reveal class to elements
document.querySelectorAll('.about-card, .project-card, .pip-card, .timeline-item, .skill-bar-container, .section-header, .hero-content, .contact-content').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Hero elements always visible
document.querySelectorAll('.hero-content .reveal').forEach(el => {
    el.classList.add('active');
});

// PARALLAX ON MOUSE MOVE
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    document.querySelectorAll('.hero-content').forEach(el => {
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// GLITCH HOVER EFFECT
document.querySelectorAll('.glitch').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.animation = 'glitch-hover 0.3s';
        setTimeout(() => el.style.animation = '', 300);
    });
});

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// HERO PARTICLES
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00f0ff' : '#a855f7'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * -10}s;
        `;
        container.appendChild(particle);
    }
}

// Add particle animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

createParticles();

// TILT EFFECT ON CARDS
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

console.log('%c Angel.DEV ', 'background: linear-gradient(135deg, #00f0ff, #a855f7); color: #0a0a0f; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Built with passion & code ', 'color: #94a3b8; font-size: 12px;');
