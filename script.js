document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('heart-stage');
    const mainHeartSvg = document.getElementById('main-heart');
    const heartShape = document.getElementById('heart-shape');
    const crackPath = document.getElementById('crack-path');
    const proposalContainer = document.getElementById('proposal-container');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    let tapCount = 0;
    let noBtnScale = 1;

    // Initialize state
    heartShape.classList.add('breathing');

    // --- Main Heart Interaction Logic ---
    stage.addEventListener('click', () => {
        if (tapCount === 0) {
            // Tap 1: Stop breathing, Show crack
            tapCount++;
            heartShape.classList.remove('breathing');
            // Slight recoil effect
            mainHeartSvg.style.transform = "scale(0.95)";
            setTimeout(() => {
                mainHeartSvg.style.transform = "scale(1)";
                crackPath.style.opacity = "1"; // Show crack
            }, 100);

        } else if (tapCount === 1) {
            // Tap 2: Burst
            tapCount++;
            triggerBurst();
        }
    });

    function triggerBurst() {
        // Hide original heart
        stage.style.opacity = '0';
        stage.style.pointerEvents = 'none';

        // Create burst particles
        const rect = stage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 30; i++) {
            createParticle(centerX, centerY);
        }

        // Fade in text and buttons after delay
        setTimeout(() => {
            proposalContainer.style.opacity = '1';
            proposalContainer.style.pointerEvents = 'auto';
        }, 1500);
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.innerHTML = `<svg viewBox="0 0 100 100" width="30" height="30"><path d="M50 88.9C25.5 74.2 8.5 56.6 8.5 37.9C8.5 22.7 20.3 11 35.4 11C43.9 11 50 15 50 15C50 15 56.1 11 64.6 11C79.7 11 91.5 22.7 91.5 37.9C91.5 56.6 74.5 74.2 50 88.9Z" fill="#E6A6B2"/></svg>`;
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '30px';
        particle.style.height = '30px';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        
        document.body.appendChild(particle);

        // Randomize destination
        const destX = (Math.random() - 0.5) * window.innerWidth * 1.5;
        const destY = (Math.random() - 0.5) * window.innerHeight * 1.5;
        const rotation = Math.random() * 360;

        // Force reflow
        particle.offsetHeight;

        particle.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotation}deg)`;
        particle.style.opacity = '0';

        // Cleanup
        setTimeout(() => { particle.remove(); }, 1200);
    }

    // --- Button Logic ---

    // YES Button
    btnYes.addEventListener('click', () => {
        // Clear proposal
        proposalContainer.style.transition = 'opacity 0.5s';
        proposalContainer.style.opacity = '0';
        
        // Start infinite hearts
        startFloatingHearts();
    });

    // NO Button (The Runner)
    btnNo.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling issues
        
        // 1. Shrink
        noBtnScale *= 0.7; // Shrink by 30% each time
        btnNo.style.transform = `scale(${noBtnScale})`;

        // 2. Check if too small (effectively impossible to click)
        if (noBtnScale < 0.2) {
            btnNo.style.opacity = '0';
            btnNo.style.pointerEvents = 'none';
            return;
        }

        // 3. Move to absolute random position
        // We must switch to absolute positioning after the first click if not already
        if (btnNo.style.position !== 'absolute') {
            btnNo.style.position = 'absolute';
        }

        const maxX = window.innerWidth - btnNo.offsetWidth;
        const maxY = window.innerHeight - btnNo.offsetHeight;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    });

    function startFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤'; // Simple unicode heart
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4-7 seconds
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px'; // 20-40px
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 7000);
        }, 300);
    }
});