// Audio elements
const hoverSound = new Audio('sounds/hover.mp3');
const clickSound = new Audio('sounds/click.mp3');
const selectSound = new Audio('sounds/select.mp3');
const backgroundMusic = new Audio('sounds/menu_music.mp3');

// Set volume levels
hoverSound.volume = 0.3;
clickSound.volume = 0.4;
selectSound.volume = 0.5;
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
                color: var(--text-color);
                cursor: pointer;
                padding: 10px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                transition: all 0.3s;
                z-index: 3;
            }

            .audio-toggle:hover {
                color: var(--primary-color);
                transform: scale(1.1);
            }

            .audio-toggle i {
                font-size: 1.2em;
            }
        `;
        document.head.appendChild(style);
    }
}

// Export functions and audio elements
window.audioManager = {
    hoverSound,
    clickSound,
    selectSound,
    backgroundMusic,
    playSound,
    toggleAudio,
    initializeAudio,
    enableAudio
}; 