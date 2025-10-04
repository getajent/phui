# Lobby Avatar Feature Documentation

## Overview
The lobby now includes animated avatars for each player that respond to microphone input with a vertical split animation effect.

## Features Implemented

### 1. **Avatar Display**
- Each player in the lobby now has a visual avatar
- Avatar consists of two halves (top and bottom) that can animate independently
- Styled with the game's retro-futuristic aesthetic (golden borders, gradients)

### 2. **Microphone Integration**
- Real-time microphone access using the Web Audio API
- Audio analysis to detect when players are speaking
- Threshold-based speech detection (default: 25 dB average)

### 3. **Speaking Animation**
- When a player speaks, their avatar splits vertically:
  - Top half moves upward
  - Bottom half moves downward
- Color changes to green (tertiary color) when speaking
- Pulsing glow effect around the avatar border
- Visual microphone indicator that pulses when active

### 4. **Microphone Control**
- Floating circular button in bottom-right corner
- Toggle microphone on/off with a single click
- Visual states:
  - **Muted** (default): Red border, microphone-slash icon
  - **Active**: Green border with pulsing glow, microphone icon
- Hover effects and sound feedback

### 5. **Player Simulation**
- Demo feature: Other players that join will randomly "speak" to show the animation
- Each simulated player has their own speaking pattern

## Technical Implementation

### Audio Analysis
```javascript
- Uses Web Audio API (AudioContext, MediaStreamSource, Analyser)
- FFT size: 512
- Smoothing: 0.8
- Real-time frequency analysis using requestAnimationFrame
```

### CSS Animations
```css
- Vertical split: translateY(-5px) for top, translateY(5px) for bottom
- Transition time: 0.15s for responsive feel
- Speaking pulse: 0.3s infinite alternate
- Mic indicator pulse: 0.5s ease-in-out infinite
```

### Browser Permissions
- Microphone access is requested only when user clicks the toggle button
- Complies with browser autoplay/permission policies
- Graceful error handling if permission is denied

## Usage

### For Players
1. Enter the lobby
2. Click the microphone button (bottom-right corner) to enable voice detection
3. Grant microphone permission when prompted
4. Your avatar will animate when you speak

### For Developers
To enable player join simulation (for testing):
```javascript
// Uncomment in lobby.html around line 1135:
simulatePlayerJoin();
```

## Customization

### Adjust Speech Sensitivity
In `lobby.html`, modify the threshold:
```javascript
const speechThreshold = 25; // Lower = more sensitive, Higher = less sensitive
```

### Change Animation Distance
In the CSS (around line 360-365):
```css
.player-item.speaking .player-avatar-half.top {
    transform: translateY(-5px); /* Increase for larger split */
}
```

### Modify Colors
Avatar colors are tied to CSS variables:
- `--primary-color`: Default avatar color (golden)
- `--tertiary-color`: Speaking state color (green)
- `--secondary-color`: Muted state color (red)

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may require HTTPS for microphone access)
- Mobile browsers: Supported but may have different permission flows

## Known Issues
- Microphone permission must be granted each session (browser security)
- Audio analysis may be affected by background noise
- Multiple tabs accessing microphone may cause conflicts

## Future Enhancements
- Volume-based animation intensity (louder = bigger split)
- Custom avatar images/colors per player
- Push-to-talk option
- Visual audio level indicator
- Network synchronization for real multiplayer
