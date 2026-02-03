document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('heart-stage');
    const mainHeartImg = document.getElementById('main-heart-img');
    const proposalContainer = document.getElementById('proposal-container');
    const proposalImg = document.getElementById('proposal-img');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnWrapper = document.getElementById('button-wrapper');
    
    const flowerLeft = document.getElementById('flower-left');
    const flowerRight = document.getElementById('flower-right');

    let tapCount = 0;
    let noBtnScale = 1;
    let rainInterval; // Variable to control the rain loop

    // --- Main Heart Interaction Logic ---
    stage.addEventListener('click', () => {
        if (tapCount === 0) {
            // Tap 1: Inflate and Pop!
            tapCount++;
            
            // 1. Remove breathing animation
            mainHeartImg.style.animation = 'none';
            
            // 2. Add Inflate/Pop Class
            mainHeartImg.classList.add('inflating');

            // 3. Wait for the "POP" (0.7s matches the CSS animation)
            setTimeout(() => {
                // Hide main heart
                mainHeartImg.style.display = 'none';
                
                // Explode particles (Pixel Hearts)
                triggerBurst();
            }, 700); 

        } else if (tapCount === 1) {
            // Optional safety catch
        }
    });

    function triggerBurst() {
        stage.style.opacity = '0';
        stage.style.pointerEvents = 'none';

        const rect = stage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 1. Initial Burst: Use the Pixel Heart particles
        for (let i = 0; i < 30; i++) {
            createParticle(centerX, centerY, "pixelheartttt.png");
        }

        // 2. Show Proposal & START INFINITE RAIN
        setTimeout(() => {
            proposalContainer.style.opacity = '1';
            proposalContainer.style.pointerEvents = 'auto';

            // --- Trigger Infinite Rain Effect ---
            startStickerRain();

        }, 1500);
    }

    // --- INFINITE RAIN LOGIC ---
    function startStickerRain() {
        // Create a new drop every 100 milliseconds (forever)
        rainInterval = setInterval(() => {
            createRainDrop();
        }, 100); 
    }

    function createRainDrop() {
        const drop = document.createElement('img');
        drop.src = "pugsticker.png"; // Using your uploaded sticker file
        drop.classList.add('pixel-particle'); 
        
        // Start Position: Random X, Top (Above Screen)
        drop.style.position = 'absolute';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.top = '-10vh'; 
        
        // Size
        const size = Math.random() * 20 + 20; // 20px to 40px
        drop.style.width = size + 'px';
        drop.style.height = 'auto';
        
        // Animation Speed: Random between 2s and 5s
        const duration = Math.random() * 3 + 2; 
        drop.style.transition = `top ${duration}s linear, transform ${duration}s linear`;
        
        document.body.appendChild(drop);

        // Trigger Fall
        drop.offsetHeight; 

        // End Position: Bottom (Below Screen) + Rotation
        drop.style.top = '110vh';
        const rotation = Math.random() * 360;
        drop.style.transform = `rotate(${rotation}deg)`;

        // Cleanup after animation ends
        setTimeout(() => { 
            drop.remove(); 
        }, duration * 1000); 
    }

    // --- Standard Explosion Particle ---
    function createParticle(x, y, imgSrc) {
        const particle = document.createElement('img');
        particle.src = imgSrc; 
        particle.classList.add('pixel-particle');
        
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '30px'; 
        particle.style.height = '30px';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        
        document.body.appendChild(particle);

        const destX = (Math.random() - 0.5) * window.innerWidth * 1.5; 
        const destY = (Math.random() - 0.5) * window.innerHeight * 1.5;
        const rotation = Math.random() * 360;

        particle.offsetHeight; 

        particle.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotation}deg)`;
        particle.style.opacity = '0';

        setTimeout(() => { particle.remove(); }, 1200);
    }

    // --- Button Logic ---

    // YES Button
    btnYes.addEventListener('click', () => {
        // 1. Stop the Sticker Rain (Optional: Remove this line if you want rain AND hearts)
        clearInterval(rainInterval);

        // 2. Change the Image to the GIF
        proposalImg.src = "pug1.gif"; // Using your uploaded GIF
        
        // 3. Hide the Buttons
        btnWrapper.style.display = 'none';

        // 4. Ensure the container stays visible
        proposalContainer.style.opacity = '1';
        
        // 5. Show Flowers & Final Floating Hearts
        flowerLeft.classList.add('flowers-visible');
        flowerRight.classList.add('flowers-visible');

        startFloatingHearts();
    });

    // NO Button
    btnNo.addEventListener('click', (e) => {
        e.stopPropagation();
        noBtnScale *= 0.7;
        btnNo.style.transform = `scale(${noBtnScale})`;

        if (noBtnScale < 0.2) {
            btnNo.style.opacity = '0';
            btnNo.style.pointerEvents = 'none';
            return;
        }

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
            const heart = document.createElement('img');
            heart.src = "pixelheartttt.png";
            heart.classList.add('floating-heart');
            
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; 
            
            const size = (Math.random() * 30 + 20) + 'px';
            heart.style.width = size;
            heart.style.height = 'auto'; 
            
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 7000);
        }, 300);
    }
});