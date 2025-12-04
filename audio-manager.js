// Audio elements
const hoverSound = new Audio('sounds/hover.mp3');
const clickSound = new Audio('sounds/click.mp3');
const backgroundMusic = new Audio('sounds/menu_music.mp3');

// Set volume levels
hoverSound.volume = 0.3;
clickSound.volume = 0.4;
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;

// Track music position between page navigations
backgroundMusic.addEventListener('timeupdate', () => {
    localStorage.setItem('musicPosition', backgroundMusic.currentTime);
});

// Audio state
let isAudioEnabled = localStorage.getItem('audioEnabled') === 'true';

// Function to enable audio
function enableAudio() {
    isAudioEnabled = true;
    localStorage.setItem('audioEnabled', 'true');
    
    // Resume music from stored position or restart
    const storedPosition = parseFloat(localStorage.getItem('musicPosition')) || 0;
    backgroundMusic.currentTime = storedPosition;
    backgroundMusic.play().catch(e => console.log('Audio play prevented:', e));
    
    updateAudioToggle();
}

// Function to disable audio
function disableAudio() {
    isAudioEnabled = false;
    localStorage.setItem('audioEnabled', 'false');
    backgroundMusic.pause();
    updateAudioToggle();
}

// Toggle audio
function toggleAudio() {
    if (isAudioEnabled) {
        disableAudio();
    } else {
        enableAudio();
    }
}

// Update audio toggle button
function updateAudioToggle() {
    const toggle = document.querySelector('.audio-toggle i');
    if (toggle) {
        toggle.className = isAudioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
}

// Play sound effects only if audio is enabled
function playSound(sound) {
    if (isAudioEnabled) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play prevented:', e));
    }
}

// Initialize audio on page load
function initializeAudio() {
    // Create audio toggle button if it doesn't exist
    if (!document.querySelector('.audio-toggle')) {
        const audioToggle = document.createElement('div');
        audioToggle.className = 'audio-toggle';
        audioToggle.onclick = toggleAudio;
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        document.body.appendChild(audioToggle);
    }

    // Update toggle state
    updateAudioToggle();

    // Start background music if enabled
    if (isAudioEnabled) {
        // Resume music from stored position
        const storedPosition = parseFloat(localStorage.getItem('musicPosition')) || 0;
        backgroundMusic.currentTime = storedPosition;
        backgroundMusic.play().catch(e => {
            console.log('Audio play prevented:', e);
            // Enable audio on first user interaction (if browser blocks autoplay)
            document.addEventListener('click', function enableOnFirstClick() {
                enableAudio();
                document.removeEventListener('click', enableOnFirstClick);
            }, { once: true });
        });
    }

    // Add audio toggle styles if they don't exist
    if (!document.querySelector('#audio-toggle-styles')) {
        const style = document.createElement('style');
        style.id = 'audio-toggle-styles';
        style.textContent = `
            .audio-toggle {
                position: fixed;
                bottom: 20px;
                left: 20px;
                color: var(--text-color, #adadad);
                cursor: pointer;
                padding: 12px 14px;
                background-color: rgba(14, 14, 12, 0.85);
                border: 1px solid rgba(194, 176, 28, 0.22);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 1000;
                overflow: hidden;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background-image: 
                    /* Small scratches */
                    linear-gradient(88deg, transparent 0%, transparent 52%, rgba(60, 58, 50, 0.15) 52.2%, transparent 52.4%),
                    linear-gradient(110deg, transparent 0%, transparent 75%, rgba(55, 53, 45, 0.12) 75.1%, transparent 75.3%),
                    /* Dust spots */
                    radial-gradient(circle at 85% 20%, rgba(50, 48, 42, 0.08) 0%, transparent 3%),
                    radial-gradient(circle at 15% 80%, rgba(48, 46, 40, 0.07) 0%, transparent 2.5%),
                    /* Subtle wear gradient */
                    linear-gradient(135deg, 
                        rgba(25, 25, 22, 0.2) 0%, 
                        transparent 30%,
                        rgba(18, 18, 16, 0.25) 70%, 
                        transparent 100%),
                    /* Texture */
                    repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 3px,
                        rgba(0, 0, 0, 0.02) 3px,
                        rgba(0, 0, 0, 0.02) 4px
                    );
                box-shadow: 
                    inset 0 1px 3px rgba(0, 0, 0, 0.4),
                    inset 0 -1px 1px rgba(30, 30, 26, 0.1),
                    0 1px 0 rgba(194, 176, 28, 0.05),
                    0 0 15px rgba(0, 0, 0, 0.5);
                opacity: 0.75;
                filter: brightness(0.85);
            }

            .audio-toggle::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                background-image: 
                    /* Corner dust/wear */
                    radial-gradient(ellipse at 2% 2%, rgba(40, 40, 35, 0.12) 0%, transparent 35%),
                    radial-gradient(ellipse at 98% 98%, rgba(35, 35, 30, 0.1) 0%, transparent 35%),
                    /* Subtle edge fade */
                    linear-gradient(180deg, rgba(30, 30, 26, 0.08) 0%, transparent 25%, transparent 75%, rgba(20, 20, 18, 0.12) 100%);
                opacity: 0.6;
            }

            .audio-toggle:hover {
                color: var(--primary-color, #f7b933);
                border-color: rgba(194, 176, 28, 0.4);
                background-color: rgba(18, 18, 16, 0.95);
                box-shadow: 
                    0 0 15px rgba(194, 176, 28, 0.2),
                    inset 0 1px 3px rgba(0, 0, 0, 0.5),
                    inset 0 -1px 1px rgba(30, 30, 26, 0.15),
                    0 1px 0 rgba(194, 176, 28, 0.1);
                transform: translateY(-2px);
                opacity: 1;
                filter: brightness(1.1) drop-shadow(0 0 6px rgba(247, 185, 51, 0.3));
            }

            .audio-toggle:active {
                transform: translateY(0) scale(0.98);
                box-shadow: 
                    0 0 8px rgba(194, 176, 28, 0.15),
                    inset 0 1px 3px rgba(0, 0, 0, 0.6),
                    inset 0 -1px 1px rgba(30, 30, 26, 0.2);
            }

            .audio-toggle i {
                font-size: 1.2em;
                opacity: 0.7;
                filter: brightness(0.8) saturate(0.85);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                z-index: 1;
                display: block;
                line-height: 1;
            }

            .audio-toggle:hover i {
                opacity: 1;
                filter: brightness(1.1) saturate(1.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Export functions and audio elements
window.audioManager = {
    hoverSound,
    clickSound,
    backgroundMusic,
    playSound,
    toggleAudio,
    initializeAudio,
    enableAudio
}; 