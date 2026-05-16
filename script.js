document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressDotsContainer = document.getElementById('progress-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // --- NAVIGATION LOGIC ---
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('progress-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        progressDotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.progress-dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'passed');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('passed'); // Zooms past the camera
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
        else if (e.key === 'ArrowLeft') prevSlide();
    });

    // --- CUSTOM CURSOR & TRAILS ---
    const cursorCore = document.getElementById('cursor-core');
    const cursorGlow = document.getElementById('cursor-glow');
    const trailsContainer = document.getElementById('cursor-trails');
    const rippleContainer = document.getElementById('ripple-container');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    // Last time a trail dot was spawned
    let lastTrailTime = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate core position update
        cursorCore.style.left = mouseX + 'px';
        cursorCore.style.top = mouseY + 'px';

        // Color shift based on X position
        const ratio = mouseX / window.innerWidth;
        // Violet (124, 58, 237) to Teal (20, 184, 166)
        const r = Math.round(124 + ratio * (20 - 124));
        const g = Math.round(58 + ratio * (184 - 58));
        const b = Math.round(237 + ratio * (166 - 237));
        cursorGlow.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // Spawn trail dots
        const now = Date.now();
        if (now - lastTrailTime > 50) { // spawn dot every 50ms
            spawnTrail(mouseX, mouseY, `rgb(${r}, ${g}, ${b})`);
            lastTrailTime = now;
        }
    });

    // Lagging glow ring loop
    function animateCursor() {
        // LERP for smooth lag
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    function spawnTrail(x, y, color) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        dot.style.background = color;
        trailsContainer.appendChild(dot);

        // Remove after animation completes (600ms)
        setTimeout(() => {
            if(trailsContainer.contains(dot)) trailsContainer.removeChild(dot);
        }, 600);
    }

    // Ripple effect on click
    document.addEventListener('mousedown', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        rippleContainer.appendChild(ripple);

        setTimeout(() => {
            if(rippleContainer.contains(ripple)) rippleContainer.removeChild(ripple);
        }, 600);
    });

    // --- MAGNETIC 3D TILT & ANTI-GRAVITY REPEL ---
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Animate the baseline floating (bobbing)
    let time = 0;
    function animateFloating() {
        time += 0.02;
        floatingElements.forEach((el, index) => {
            // Check repel proximity
            const rect = el.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;
            
            const dx = mouseX - elCenterX;
            const dy = mouseY - elCenterY;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            let repelX = 0;
            let repelY = 0;
            let tiltX = 0;
            let tiltY = 0;
            
            // 1. Anti-gravity repel (within 100px)
            if (distance < 150) {
                const force = (150 - distance) / 150; // 0 to 1
                repelX = -(dx / distance) * force * 30; // max 30px push
                repelY = -(dy / distance) * force * 30;
            }
            
            // 2. Magnetic 3D Tilt (within 300px for a smooth effect)
            if (distance < 400 && el.classList.contains('glass-card')) {
                // Map mouse position to tilt angles (max 10 degrees)
                tiltX = -(dy / rect.height) * 15; // rotateX based on Y axis
                tiltY = (dx / rect.width) * 15;   // rotateY based on X axis
                // Clamp values
                tiltX = Math.max(-15, Math.min(15, tiltX));
                tiltY = Math.max(-15, Math.min(15, tiltY));
            } else if (distance < 200 && !el.classList.contains('glass-card')) {
                // smaller elements tilt more gently
                tiltX = -(dy / rect.height) * 20;
                tiltY = (dx / rect.width) * 20;
                tiltX = Math.max(-20, Math.min(20, tiltX));
                tiltY = Math.max(-20, Math.min(20, tiltY));
            }
            
            // 3. Baseline bobbing
            const bobOffset = Math.sin(time + index) * 8; // 8px float up/down

            // Apply all transforms
            el.style.transform = `
                translate3d(${repelX}px, ${repelY + bobOffset}px, 0)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
            `;
        });
        requestAnimationFrame(animateFloating);
    }
    animateFloating();
});
