document.addEventListener('DOMContentLoaded', () => {
    // Add some random glitches to CRT display
    setupRandomGlitches();

    // Check if we're returning from a death (observer mode)
    if (localStorage.getItem('observerModeActive')) {
        // Clear the flag
        localStorage.removeItem('observerModeActive');

        // Show absurd notification about observer mode after a short delay
        setTimeout(() => {
            const observerMessages = [
                "OBSERVER MODE: Your consciousness has been uploaded to company database",
                "REBIRTH COMPLETE: New clone body provided (charges apply)",
                "WARRANTY VOID: Death exceeds permitted employee malfunction parameters",
                "PRODUCTIVITY RESTORED: Death break time has been deducted from paycheck",
                "CONGRATULATIONS: You've unlocked premium suffering!",
                "OBSERVER STATUS: You are now a tax-deductible corporate liability",
                "RESURRECTION PROTOCOL: Memory wipe unsuccessful - please ignore existential dread",
                "COMPANY POLICY: Death counts as unauthorized absence"
            ];

            const message = observerMessages[Math.floor(Math.random() * observerMessages.length)];
            showNotification(message, notificationTypes.DANGER, 8000, "fa-skull-crossbones");

            // Shortly after, show a second follow-up notification
            setTimeout(() => {
                const followupMessages = [
                    "REMINDER: Dying repeatedly affects your yearly evaluation",
                    "NOTE: Your personal items have been liquidated as per Section 34B",
                    "TIP: Try avoiding death to increase survival metrics",
                    "UPDATE: Your family has been notified of your performance issues",
                    "ALERT: Current death count makes you ineligible for dental benefits"
                ];

                const followupMessage = followupMessages[Math.floor(Math.random() * followupMessages.length)];
                showNotification(followupMessage, notificationTypes.WARNING, 5000, "fa-exclamation-triangle");
            }, 4000);
        }, 1500);
    }

    // In-Game Time System
    const timeDisplay = document.getElementById('game-time');
    const timePeriod = document.querySelector('.time-period');
    const timeContainer = document.querySelector('.time-container');

    // Initial in-game time (starts at 7:30 PM by default)
    let gameHours = 19; // 24-hour format
    let gameMinutes = 30;
    let timeScale = 60; // 1 real second = 60 in-game seconds
    let timeInterval;
    let departureMode = false;

    function updateGameTime() {
        // Randomly add small glitch effects to the time display
        if (Math.random() < 0.05) {
            timeDisplay.style.transform = `translateX(${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                timeDisplay.style.transform = 'translateX(0)';
            }, 200);
        }

        // Advance in-game time
        gameMinutes++;
        if (gameMinutes >= 60) {
            gameMinutes = 0;
            gameHours++;
            if (gameHours >= 24) {
                gameHours = 0;
            }
        }

        // Format time for display (12-hour format)
        let displayHours = gameHours % 12;
        displayHours = displayHours ? displayHours : 12; // Convert 0 to 12

        // Occasionally show time with glitchy numbers
        if (Math.random() < 0.01) {
            const glitchChar = Math.random() < 0.5 ? '8' : '0';
            const displayMinutes = Math.random() < 0.5
                ? glitchChar + gameMinutes.toString().padStart(2, '0').charAt(1)
                : gameMinutes.toString().padStart(2, '0').charAt(0) + glitchChar;
            timeDisplay.textContent = `${displayHours}:${displayMinutes}`;
        } else {
            const displayMinutes = gameMinutes.toString().padStart(2, '0');
            timeDisplay.textContent = `${displayHours}:${displayMinutes}`;
        }

        const isPM = gameHours >= 12;
        timePeriod.textContent = isPM ? 'PM' : 'AM';

        // Add subtle pulse animation when time changes
        timeDisplay.animate([
            { opacity: 0.7 },
            { opacity: 1 }
        ], {
            duration: 300,
            easing: 'ease-out'
        });

        // Check for midnight departure (00:00 AM)
        if (gameHours === 0 && gameMinutes === 0) {
            startDeparture();
        }

        // Show 2-hour departure reminder at 22:00 (10:00 PM)
        if (gameHours === 22 && gameMinutes === 0 && !departureMode) {
            showTwoHourDepartureNotification();
        }

        // Start warning 30 in-game minutes before departure
        if (gameHours === 23 && gameMinutes === 30 && !departureMode) {
            startDepartureWarning();
        }

        // Increase warning intensity as midnight approaches
        if (gameHours === 23 && gameMinutes >= 30) {
            updateDepartureWarningIntensity();
        }

        // Check for midnight launch
        checkForMidnightLaunch();
    }

    function startGameTime() {
        // Clear any existing interval
        if (timeInterval) clearInterval(timeInterval);

        // Start the time progression
        timeInterval = setInterval(() => {
            updateGameTime();
        }, 1000 / (timeScale / 60)); // Adjust for time scale
    }

    function startDepartureWarning() {
        // Add warning class to time display
        timeContainer.classList.add('departure-warning');

        // Show warning message
        const warningMessage = document.createElement('div');
        warningMessage.className = 'departure-message';
        warningMessage.innerHTML = 'IMMINENT LAUNCH: <span class="countdown">0:30</span>';
        document.querySelector('.time-display').appendChild(warningMessage);

        // Add sound effect for warning
        const warningSound = document.createElement('audio');
        warningSound.src = 'audio/warning-beep.mp3'; // Add this audio file to your project
        warningSound.volume = 0.3;
        warningSound.play();

        // Visual effect on the screen
        const gameUI = document.querySelector('.game-ui');
        gameUI.classList.add('warning-active');

        // Play warning sound every 5 minutes of game time
        const warningInterval = setInterval(() => {
            if (gameHours === 0 && gameMinutes === 0) {
                clearInterval(warningInterval);
                return;
            }
            warningSound.currentTime = 0;
            warningSound.play();
        }, 5 * (1000 / (timeScale / 60)) * 60);
    }

    // Function to show notification 2 hours before departure
    function showTwoHourDepartureNotification() {
        // Array of corporate-style departure messages
        const departureMessages = [
            "ATTENTION: Mandatory evacuation in 2 hours - Employee attendance required",
            "COMPANY REMINDER: Planet abandonment scheduled in T-minus 2 hours",
            "MANAGEMENT ALERT: Facility self-destruct sequence initiates in 2 hours",
            "IMPORTANT: Survival pod boarding commences in 2 hours. Tardiness will result in termination",
            "NOTICE: Planet-side employment contract expires in 2 hours. Please vacate premises"
        ];

        // Array of follow-up instructions
        const instructionMessages = [
            "Collect all company property and preferred limbs before departure",
            "All unattended personal items will be incinerated and billed to your account",
            "Remember to file form HR-6070: 'Request Not To Be Left Behind'",
            "Employees without evacuation clearance will be considered voluntary planet donations",
            "Departure procedures are outlined in your employee handbook (Chapter 12: Acceptable Casualties)"
        ];

        // Get random messages
        const departureMessage = departureMessages[Math.floor(Math.random() * departureMessages.length)];
        const instructionMessage = instructionMessages[Math.floor(Math.random() * instructionMessages.length)];

        // Show first notification
        showNotification(departureMessage, notificationTypes.DANGER, 7000, "fa-rocket");

        // Show follow-up notification after a delay
        setTimeout(() => {
            showNotification(instructionMessage, notificationTypes.INFO, 5000, "fa-clipboard-list");

            // Pulse the time display to draw attention to countdown
            timeDisplay.style.animation = "pulse 2s ease-in-out 3";

            // Reset animation after it completes
            setTimeout(() => {
                timeDisplay.style.animation = "";
            }, 6000);
        }, 3000);
    }

    function updateDepartureWarningIntensity() {
        const minutesLeft = (60 - gameMinutes) % 60;
        const secondsLeft = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;

        // Update countdown display
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            countdown.textContent = `${23 - gameHours}:${secondsLeft}`;
        }

        // Increase warning visual intensity as time gets closer to midnight
        const intensity = 1 - ((60 - gameMinutes) / 60);

        if (intensity > 0.8) {
            timeContainer.classList.add('critical');
            timeContainer.style.animationDuration = '0.5s';
        } else if (intensity > 0.5) {
            timeContainer.classList.add('severe');
            timeContainer.style.animationDuration = '1s';
        }
    }

    function startDeparture() {
        departureMode = true;

        // Stop the game time
        clearInterval(timeInterval);

        // Full-screen effect for departure
        const departureOverlay = document.createElement('div');
        departureOverlay.className = 'departure-overlay';
        document.body.appendChild(departureOverlay);

        // Add departure text
        const departureText = document.createElement('div');
        departureText.className = 'departure-text';

        // Add corner elements for UI design
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(position => {
            const corner = document.createElement('div');
            corner.className = `departure-corner ${position}`;
            departureText.appendChild(corner);
        });

        // Add warning icon
        const warningIcon = document.createElement('div');
        warningIcon.className = 'warning-icon-container';
        warningIcon.innerHTML = '<i class="fa-solid fa-rocket"></i>';
        departureText.appendChild(warningIcon);

        // Add main text
        const mainText = document.createElement('span');
        mainText.textContent = 'LAUNCH SEQUENCE INITIATED';
        departureText.appendChild(mainText);

        // Add timer
        const launchTimer = document.createElement('div');
        launchTimer.className = 'launch-timer';
        launchTimer.textContent = '00:00:05';
        departureText.appendChild(launchTimer);

        // Add warning text
        const warningText = document.createElement('div');
        warningText.className = 'launch-warning';
        warningText.textContent = 'Mandatory evacuation in progress';
        departureText.appendChild(warningText);

        // Add employee ID
        const employeeId = document.createElement('div');
        employeeId.className = 'launch-employee-id';
        employeeId.textContent = 'EMPLOYEE TERMINATION PROTOCOL INITIATED - ID #4815';
        departureText.appendChild(employeeId);

        // Add the text container to the overlay
        departureOverlay.appendChild(departureText);

        // Show the overlay with animation
        setTimeout(() => {
            departureOverlay.classList.add('active');

            // Play alarm sound if available
            if (typeof playSound === 'function') {
                playSound('alarm', 0.7, true);
            }

            // Countdown effect with emergency style
            let countdown = 5;
            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    launchTimer.textContent = "LAUNCHED";

                    // Final effects before redirect or game end
                    setTimeout(() => {
                        // Trigger game end or redirect
                        window.location.href = 'main-menu.html';
                    }, 2000);
                } else {
                    launchTimer.textContent = `00:00:0${countdown}`;
                }
            }, 1000);
        }, 500);
    }

    // For debugging: Function to set in-game time
    function setGameTime(hours, minutes) {
        gameHours = hours;
        gameMinutes = minutes;
        updateGameTime();
    }

    // For debugging: J key to test departure sequence
    document.addEventListener('keydown', (e) => {
        if (e.key === 'j' || e.key === 'J') {
            // Jump to 23:45 (15 minutes before midnight)
            setGameTime(23, 29);
        }
    });

    // Start the in-game time system
    updateGameTime();
    startGameTime();

    // Set random malfunctions on the broken equpiment
    setupBrokenEquipment();

    // Show initial departure time notification
    setTimeout(() => {
        showNotification('SCHEDULED DEPARTURE: 00:00 - All personnel must be on board', notificationTypes.SYSTEM, 8000, 'fa-rocket');
    }, 3000);

    // Objectives system
    const objectivesHint = document.querySelector('.objectives-hint');
    const objectivesPanel = document.getElementById('objectives-panel');

    // Set initial objectives panel state
    objectivesPanel.classList.remove('visible');

    // Show objectives notification dot
    setTimeout(() => {
        showObjectiveNotification();
    }, 5000);

    // Toggle objectives panel on click or TAB key
    objectivesHint.addEventListener('click', toggleObjectivesPanel);
    document.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            e.preventDefault();
            toggleObjectivesPanel();
        }
    });

    // Vitals system (health and stamina)
    // Set initial health and stamina values (0-100)
    let health = 70;
    let stamina = 85;

    // Show vitals at start
    updateHealth(health, true);
    updateStamina(stamina, true);

    // Initialize upgrade visual indicators
    setTimeout(() => {
        if (typeof initializeVitalUpgradeVisuals === 'function') {
            initializeVitalUpgradeVisuals();
        }
    }, 500);

    // Update vitals periodically (simulating gameplay)
    setInterval(() => {
        // Random health fluctuations (small decreases)
        if (Math.random() < 0.3) {
            health = Math.max(0, health - Math.random() * 5);
            updateHealth(health);
        }

        // Random stamina fluctuations
        if (Math.random() < 0.5) {
            if (Math.random() < 0.7) {
                // Decrease stamina more often
                stamina = Math.max(0, stamina - Math.random() * 10);
            } else {
                // Increase stamina sometimes (recover)
                stamina = Math.min(100, stamina + Math.random() * 5);
            }
            updateStamina(stamina);
        }

        // Low health notification
        if (health < 30 && Math.random() < 0.2) {
            notifyLowHealth();
        }
    }, 3000);

    // Equipment system (flashlight, radio, etc.)
    const equipmentSlots = document.querySelectorAll('.equipment-slot');
    const flashlightSlot = document.querySelector('.flashlight-slot');
    const radioSlot = document.querySelector('.radio-slot');
    const flashlightBeam = document.querySelector('.flashlight-beam');
    const radioTransmission = document.querySelector('.radio-transmission');

    // Set initial states
    let flashlightOn = false;
    let radioOn = false;
    let flashlightBattery = 75; // 0-100
    let radioBattery = 60; // 0-100

    // Update battery indicators
    updateFlashlightBattery(flashlightBattery);
    updateRadioBattery(radioBattery);

    // Monster slot system
    const monsterSlot = document.querySelector('.monster-slot');
    const totalMonsterCostDisplay = document.getElementById('total-monster-cost');
    const totalCostContainer = document.querySelector('.total-cost-container');
    let totalMonsterCost = 999; // Initial cost value from the data-cost attribute

    // Ensure total cost container is hidden initially
    if (totalCostContainer) {
        totalCostContainer.classList.remove('visible');
    }

    // Update total monster cost display
    updateTotalMonsterCost();

    // Periodically update the total monster cost (simulating game mechanics)
    setInterval(() => {
        // Only update if the total cost container is visible (monster slot is active)
        if (totalCostContainer && totalCostContainer.classList.contains('visible')) {
            // Randomly fluctuate the monster cost slightly
            if (Math.random() < 0.3) {
                // Small random adjustment to cost (between -10 and +20)
                const adjustment = Math.floor(Math.random() * 30) - 10;
                totalMonsterCost = Math.max(500, Math.min(999, totalMonsterCost + adjustment));
                updateTotalMonsterCost();
            }

            // Occasional "system error" in cost display with more dramatic glitching
            if (Math.random() < 0.05) {
                totalCostContainer.style.transform = 'rotate(-2deg) translateY(1px)';

                // Flash the display
                totalCostContainer.style.borderColor = 'rgba(162, 52, 48, 0.9)';
                totalMonsterCostDisplay.style.color = 'rgba(162, 52, 48, 0.9)';

                setTimeout(() => {
                    totalCostContainer.style.transform = 'rotate(-1deg) translateY(1px)';
                    totalCostContainer.style.borderColor = 'rgba(162, 52, 48, 0.9)';
                    totalMonsterCostDisplay.style.color = 'rgba(162, 52, 48, 1)';
                }, 300);
            }
        }
    }, 3000);

    // Function to update the total monster cost display
    function updateTotalMonsterCost() {
        if (totalMonsterCostDisplay) {
            // Add glitch effect to the cost display
            if (Math.random() < 0.1) {
                totalMonsterCostDisplay.textContent = Math.floor(Math.random() * 50) + 990;
                setTimeout(() => {
                    totalMonsterCostDisplay.textContent = totalMonsterCost;
                }, 150);
            } else {
                totalMonsterCostDisplay.textContent = totalMonsterCost;
            }
        }
    }

    // Set up equipment selection with monster slot highlight
    equipmentSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            // Deselect all slots
            equipmentSlots.forEach(s => s.classList.remove('active'));
            // Select clicked slot
            slot.classList.add('active');

            // Show/hide total monster cost based on monster slot activation
            const totalCostContainer = document.querySelector('.total-cost-container');

            if (slot.classList.contains('monster-slot')) {
                // Show the total cost when monster slot is active
                totalCostContainer.classList.add('visible');

                // Add glitch effect to cost when monster slot is activated
                const monsterCost = slot.querySelector('.monster-cost');
                if (monsterCost) {
                    // Add glitch effect temporarily
                    monsterCost.style.transform = 'translateY(0) translateX(1px)';
                    setTimeout(() => {
                        monsterCost.style.transform = 'translateY(0) translateX(-1px)';
                        setTimeout(() => {
                            monsterCost.style.transform = 'translateY(0)';
                        }, 50);
                    }, 50);
                }
            } else {
                // Hide the total cost when monster slot is not active
                totalCostContainer.classList.remove('visible');
            }
        });
    });

    // Set up keyboard shortcuts for equipment slots
    document.addEventListener('keydown', e => {
        // Number keys 1-5 for equipment slots
        if (e.key >= '1' && e.key <= '5') {
            e.preventDefault(); // Prevent default browser behavior
            const index = parseInt(e.key) - 1;
            if (index < equipmentSlots.length) {
                selectEquipmentSlot(index);

                // Notification removed as requested
            }
        }

        // L key toggles flashlight
        if (e.key === 'l' || e.key === 'L') {
            toggleFlashlight();

            // Automatically select flashlight slot when toggled
            selectEquipmentSlot(0); // 0 is the index of the flashlight slot
        }

        // R key toggles radio
        if (e.key === 'r' || e.key === 'R') {
            toggleRadio();

            // Automatically select radio slot when toggled
            selectEquipmentSlot(4); // 4 is the index of the radio slot
        }

        // F key to use first aid kit (slot 3)
        if (e.key === 'f' || e.key === 'F') {
            useFirstAid();

            // Automatically select firstaid slot when used
            selectEquipmentSlot(2); // 2 is the index of the firstaid slot
        }

        // M key to activate monster slot
        if (e.key === 'm' || e.key === 'M') {
            selectEquipmentSlot(3); // 3 is the index of the monster slot
        }

        // C key to charge the currently selected device
        if (e.key === 'c' || e.key === 'C') {
            const activeSlot = document.querySelector('.equipment-slot.active');
            if (activeSlot) {
                if (activeSlot.classList.contains('flashlight-slot')) {
                    startChargingBattery('flashlight');
                } else if (activeSlot.classList.contains('radio-slot')) {
                    startChargingBattery('radio');
                }
            }
        }
    });

    // Add middle mouse button (wheel) scroll through equipment slots
    document.addEventListener('wheel', (event) => {
        // Check if in an input element
        const activeElement = document.activeElement;
        const isInputFocused = activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable;

        // Only proceed if not focused on input elements
        if (!isInputFocused) {
            // Find current active slot
            const activeSlot = document.querySelector('.equipment-slot.active');
            let currentIndex = 0;

            if (activeSlot) {
                // Get current slot index
                currentIndex = Array.from(equipmentSlots).indexOf(activeSlot);
            }

            // Calculate next index based on scroll direction
            // deltaY > 0 means scrolling down, deltaY < 0 means scrolling up
            const direction = event.deltaY > 0 ? 1 : -1;
            let nextIndex = currentIndex + direction;

            // Loop around if out of bounds
            if (nextIndex < 0) nextIndex = equipmentSlots.length - 1;
            if (nextIndex >= equipmentSlots.length) nextIndex = 0;

            // Select the new slot
            selectEquipmentSlot(nextIndex);

            // Optional: Add some visual feedback for slot change
            equipmentSlots[nextIndex].classList.add('scroll-selected');
            setTimeout(() => {
                equipmentSlots[nextIndex].classList.remove('scroll-selected');
            }, 150);
        }
    });

    // Helper function to select an equipment slot by index
    function selectEquipmentSlot(index) {
        if (index >= 0 && index < equipmentSlots.length) {
            // Remove active class from all slots
            equipmentSlots.forEach(slot => {
                slot.classList.remove('active');
            });

            // Select the target slot
            const selectedSlot = equipmentSlots[index];
            selectedSlot.classList.add('active');

            // Show/hide total monster cost based on selection
            if (selectedSlot.classList.contains('monster-slot')) {
                totalCostContainer.classList.add('visible');
            } else {
                totalCostContainer.classList.remove('visible');
            }

            // Handle selection of first aid kit (slot index 2)
            if (index === 2) { // First aid slot
                showTeammateStatus();
            } else {
                hideTeammateStatus();
            }

            return selectedSlot;
        }
        return null;
    }

    // Helper function to get a slot's display name
    function getSlotName(slot) {
        if (slot.classList.contains('flashlight-slot')) return 'Flashlight';
        if (slot.classList.contains('radio-slot')) return 'Radio';
        if (slot.classList.contains('firstaid-slot')) return 'First Aid Kit';
        if (slot.classList.contains('monster-slot')) return 'Monster';
        if (slot.classList.contains('empty-slot')) return 'Error';
        return 'Item';
    }

    // Function to use first aid kit
    function useFirstAid() {
        const firstaidSlot = document.querySelector('.firstaid-slot');

        // If the firstaid slot is active and teammate status is visible, heal teammate
        if (firstaidSlot && firstaidSlot.classList.contains('active') &&
            teammateStatus && teammateStatus.classList.contains('visible')) {
            healTeammate();
        } else {
            // Original personal healing logic
            if (firstaidSlot) {
                firstaidSlot.classList.add('active');

                // Add use animation
                const icon = firstaidSlot.querySelector('.icon-main');
                if (icon) {
                    icon.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 200);
                }

                // Heal the player
                if (health < 100) {
                    const healAmount = 30 + Math.floor(Math.random() * 20); // Heal 30-50 points
                    health = Math.min(100, health + healAmount);
                    updateHealth(health, true);

                    showNotification(`Healing: +${healAmount} health`, notificationTypes.SUCCESS, 2000, 'fa-first-aid');
                } else {
                    showNotification('Health already at maximum', notificationTypes.INFO, 2000, 'fa-first-aid');
                }
            }
        }
    }

    // Interaction hints system
    const regularInteraction = document.getElementById('regularInteraction');
    const holdInteraction = document.getElementById('holdInteraction');

    // Initially hide interaction hints
    hideInteractionHints();

    // Button hints panel
    const buttonHints = document.querySelector('.button-hints');
    const hintsToggle = document.querySelector('.hints-toggle');
    const pressHHint = document.querySelector('.press-h-hint');

    // Set initial state (collapsed)
    buttonHints.classList.remove('expanded');

    // Toggle hints panel on H key or toggle button click
    hintsToggle.addEventListener('click', toggleHintsPanel);
    document.addEventListener('keydown', e => {
        if (e.key === 'h' || e.key === 'H') {
            toggleHintsPanel();
        }
    });

    // Hide press H hint when expanded
    if (pressHHint) {
        setTimeout(() => {
            pressHHint.classList.add('visible');

            // Auto-hide the hint after 8 seconds
            setTimeout(() => {
                pressHHint.classList.remove('visible');
                pressHHint.dataset.autoHidden = 'true';
            }, 8000);
        }, 2000);
    }

    // Death screen
    const deathScreen = document.getElementById('deathScreen');
    const restartButton = document.getElementById('restartButton');
    const deathCause = document.getElementById('deathCause');
    const deathAnalysis = document.getElementById('deathAnalysis');
    const survivalTime = document.getElementById('survivalTime');

    // Function to toggle death screen visibility
    function toggleDeathScreen() {
        if (deathScreen) {
            // Show death screen with glitchy animation
            deathScreen.classList.add('visible');

            // Save state to localStorage to detect observer mode after reload
            localStorage.setItem('observerModeActive', 'true');

            // Set random survival time
            const minutes = Math.floor(Math.random() * 60);
            const seconds = Math.floor(Math.random() * 60);
            survivalTime.textContent = `${minutes} min ${seconds.toString().padStart(2, '0')} sec`;

            // Set random death cause from a list of corporate-themed absurd failures
            const deathCauses = [
                "Productivity quota not met",
                "Unauthorized breathing of company air",
                "Failure to complete mandatory safety training",
                "Expired employee warranty",
                "Corporate restructuring (employee terminated)",
                "Insufficient monster profit margins",
                "Violation of company dress code (spacesuit breach)",
                "Unauthorized coffee break",
                "HR complaint from hostile alien entity",
                "Failure to fill out death report form in triplicate"
            ];

            // Set random analysis message
            const deathAnalyses = [
                "Next time try being less expendable.",
                "Your clone replacement is already en route.",
                "This failure will be noted in your permanent record.",
                "Death does not excuse you from tomorrow's shift.",
                "Funeral expenses will be deducted from final paycheck.",
                "Your remains are now company property.",
                "Termination was the most cost-effective solution.",
                "Productivity lost: incalculable. Paperwork generated: excessive.",
                "Error: Employee not found. You never existed.",
                "Please file a complaint with our afterlife department."
            ];

            // Set random death cause and analysis
            deathCause.textContent = deathCauses[Math.floor(Math.random() * deathCauses.length)];
            deathAnalysis.textContent = deathAnalyses[Math.floor(Math.random() * deathAnalyses.length)];

            // Show notification
            if (typeof showNotification === 'function') {
                showNotification("Employee termination process completed", notificationTypes.DANGER, 5000, "fa-skull");
            }
        }
    }

    // Add event listener for D key to show death screen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd' || e.key === 'D') {
            toggleDeathScreen();
        }
        // Add test for player death notification (press K key)
        if (e.key === 'k' || e.key === 'K') {
            const playerNames = ['CHEN, L.', 'RODRIGUEZ, M.', 'SMITH, J.', 'PATEL, R.', 'JOHNSON, K.', 'BROWN, T.', 'WILSON, A.'];
            const randomName = playerNames[Math.floor(Math.random() * playerNames.length)];
            if (typeof window.showNotification === 'function') {
                window.showNotification(`☠ ${randomName} has been eliminated`, window.notificationTypes.DEATH, 7000);
            }
        }
    });

    // Death screen restart button
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }

    // Notification system
    const notificationTypes = {
        INFO: 'info',
        WARNING: 'warning',
        DANGER: 'danger',
        SUCCESS: 'success',
        SYSTEM: 'system',
        DEATH: 'death'
    };
    
    // Make notification types globally accessible
    window.notificationTypes = notificationTypes;

    // Create notification container if it doesn't exist
    createNotificationContainer();

    // Notification sound objects
    const notificationSounds = {
        info: new Audio('audio/notification-info.mp3'),
        warning: new Audio('audio/notification-warning.mp3'),
        danger: new Audio('audio/notification-danger.mp3'),
        success: new Audio('audio/notification-success.mp3'),
        system: new Audio('audio/notification-system.mp3'),
        death: new Audio('audio/notification-danger.mp3') // Using danger sound for death
    };

    // Notification functions
    window.showNotification = function(message, type = notificationTypes.INFO, duration = 5000, icon = null) {
        const container = document.querySelector('.notification-container');

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        // Set icon
        let iconHTML = '';
        if (icon) {
            iconHTML = `<i class="fa-solid ${icon}"></i>`;
        } else {
            switch (type) {
                case notificationTypes.INFO:
                    iconHTML = '<i class="fa-solid fa-info-circle"></i>';
                    break;
                case notificationTypes.WARNING:
                    iconHTML = '<i class="fa-solid fa-exclamation-triangle"></i>';
                    break;
                case notificationTypes.DANGER:
                    iconHTML = '<i class="fa-solid fa-radiation"></i>';
                    break;
                case notificationTypes.SUCCESS:
                    iconHTML = '<i class="fa-solid fa-check-circle"></i>';
                    break;
                case notificationTypes.SYSTEM:
                    iconHTML = '<i class="fa-solid fa-microchip"></i>';
                    break;
                case notificationTypes.DEATH:
                    iconHTML = '<i class="fa-solid fa-skull-crossbones"></i>';
                    break;
            }
        }

        // Create notification content
        notification.innerHTML = `
            <div class="notification-icon">${iconHTML}</div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
                <div class="notification-progress"></div>
            </div>
            <div class="notification-scanline"></div>
        `;

        // Add to container
        container.appendChild(notification);

        // Add enter animation class
        notification.classList.add('notification-enter');

        // Play notification sound
        playNotificationSound(type);

        // Remove after duration
        setTimeout(() => {
            closeNotification(notification);
        }, duration);
    }

    // Helper functions
    function createNotificationContainer() {
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
    }

    function closeNotification(notification) {
        notification.classList.add('notification-exit');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }

    function playNotificationSound(type) {
        const sound = notificationSounds[type];
        if (sound) {
            sound.volume = 0.5;
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Audio play failed:", e));
        }
    }

    // Health/Stamina functions
    function updateHealth(value, showBar = true) {
        // Get health elements
        const healthContainer = document.querySelector('.vital-bar-container:first-child');
        const healthFill = document.querySelector('.health-fill');

        // Update health fill
        if (healthFill) {
            healthFill.style.width = `${value}%`;

            // Add critical class if health is low
            if (value < 30) {
                healthFill.classList.add('critical');
            } else {
                healthFill.classList.remove('critical');
            }
        }

        // Show/hide health bar
        if (showBar) {
            if (healthContainer) {
                healthContainer.classList.add('affected');
            }
        }
    }

    function updateStamina(value, showBar = true) {
        // Get stamina elements
        const staminaContainer = document.querySelector('.vital-bar-container:nth-child(2)');
        const staminaFill = document.querySelector('.stamina-fill');

        // Update stamina fill
        if (staminaFill) {
            staminaFill.style.width = `${value}%`;

            // Add low class if stamina is low
            if (value < 30) {
                staminaFill.classList.add('low');
            } else {
                staminaFill.classList.remove('low');
            }
        }

        // Show/hide stamina bar
        if (showBar) {
            if (staminaContainer) {
                staminaContainer.classList.add('affected');
            }
        }
    }

    // Objectives functions
    function showObjectiveNotification() {
        const notificationDot = document.querySelector('.notification-dot');
        if (notificationDot) {
            document.querySelector('.objectives-hint').classList.add('has-update');
        }
    }

    function clearObjectiveNotification() {
        document.querySelector('.objectives-hint').classList.remove('has-update');
    }

    function toggleObjectivesPanel() {
        const panel = document.getElementById('objectives-panel');
        panel.classList.toggle('visible');

        // Clear notification dot when panel is opened
        if (panel.classList.contains('visible')) {
            clearObjectiveNotification();
        }
    }

    // Equipment functions
    function toggleFlashlight() {
        flashlightOn = !flashlightOn;

        // Update flashlight slot appearance
        if (flashlightOn) {
            flashlightSlot.classList.remove('off');
            flashlightSlot.classList.add('on');
            flashlightBeam.classList.add('visible');
            
            // Clear fog for better visibility
            document.body.classList.add('flashlight-on');

            // Drain battery
            startFlashlightDrain();
        } else {
            flashlightSlot.classList.remove('on');
            flashlightSlot.classList.add('off');
            flashlightBeam.classList.remove('visible');
            
            // Restore fog
            document.body.classList.remove('flashlight-on');

            // Stop battery drain
            stopFlashlightDrain();
        }
    }

    let flashlightDrainInterval;

    function startFlashlightDrain() {
        // Clear existing interval
        if (flashlightDrainInterval) clearInterval(flashlightDrainInterval);

        // Drain battery every second
        flashlightDrainInterval = setInterval(() => {
            flashlightBattery = Math.max(0, flashlightBattery - 0.5);
            updateFlashlightBattery(flashlightBattery);

            // Turn off flashlight if battery is empty
            if (flashlightBattery === 0 && flashlightOn) {
                toggleFlashlight();
                showNotification('Flashlight drained!', notificationTypes.WARNING, 3000);
            }

            // Show low battery warning
            if (flashlightBattery === 20 || flashlightBattery === 10) {
                showBatteryNotification('flashlight');
            }
        }, 1000);
    }

    function stopFlashlightDrain() {
        if (flashlightDrainInterval) {
            clearInterval(flashlightDrainInterval);
            flashlightDrainInterval = null;
        }
    }

    function toggleRadio() {
        // For the stuck radio, make it flicker but not fully turn on/off
        if (radioSlot.classList.contains('stuck')) {
            flickerRadio();
            playRadioStaticSound();
            showNotification('Radio malfunction: replacement required', notificationTypes.WARNING, 3000);
            return;
        }

        radioOn = !radioOn;

        // Update radio slot appearance
        if (radioOn) {
            radioSlot.classList.remove('off');
            radioSlot.classList.add('on');
            radioTransmission.classList.add('visible');

            // Drain battery
            startRadioDrain();

            // Play radio static sound
            playRadioStaticSound();
        } else {
            radioSlot.classList.remove('on');
            radioSlot.classList.add('off');
            radioTransmission.classList.remove('visible');

            // Stop battery drain
            stopRadioDrain();
        }
    }

    function flickerRadio() {
        const radioLight = document.querySelector('.stuck-light');

        if (radioLight) {
            radioLight.style.opacity = '1';
            setTimeout(() => {
                radioLight.style.opacity = '0.2';
                setTimeout(() => {
                    radioLight.style.opacity = '0.7';
                    setTimeout(() => {
                        radioLight.style.opacity = '0.3';
                    }, 100);
                }, 200);
            }, 50);
        }
    }

    function playRadioStaticSound() {
        const staticSound = new Audio('audio/radio-static.mp3');
        staticSound.volume = 0.3;
        staticSound.play().catch(e => console.log("Audio play failed:", e));

        // Stop sound after a short time
        setTimeout(() => {
            staticSound.pause();
            staticSound.currentTime = 0;
        }, 1000);
    }

    let radioDrainInterval;

    function startRadioDrain() {
        // Clear existing interval
        if (radioDrainInterval) clearInterval(radioDrainInterval);

        // Drain battery every second
        radioDrainInterval = setInterval(() => {
            radioBattery = Math.max(0, radioBattery - 0.3);
            updateRadioBattery(radioBattery);

            // Turn off radio if battery is empty
            if (radioBattery === 0 && radioOn) {
                toggleRadio();
                showNotification('Radio drained!', notificationTypes.WARNING, 3000);
            }

            // Show low battery warning
            if (radioBattery === 20 || radioBattery === 10) {
                showBatteryNotification('radio');
            }
        }, 1000);
    }

    function stopRadioDrain() {
        if (radioDrainInterval) {
            clearInterval(radioDrainInterval);
            radioDrainInterval = null;
        }
    }

    // Battery functions
    function updateFlashlightBattery(value) {
        const batteryFill = document.querySelector('.flashlight-slot .battery-fill');
        if (batteryFill) {
            batteryFill.style.width = `${value}%`;

            // Add low battery class
            if (value < 20) {
                batteryFill.classList.add('low');
            } else {
                batteryFill.classList.remove('low');
            }
        }
    }

    function updateRadioBattery(value) {
        const batteryFill = document.querySelector('.radio-battery-fill');
        if (batteryFill) {
            batteryFill.style.width = `${value}%`;

            // Add low battery class
            if (value < 20) {
                batteryFill.classList.add('low');
            } else {
                batteryFill.classList.remove('low');
            }
        }
    }

    function showBatteryNotification(device) {
        let message, icon;

        switch (device) {
            case 'flashlight':
                message = 'Flashlight: low battery';
                icon = 'fa-lightbulb';
                break;
            case 'radio':
                message = 'Radio: low battery';
                icon = 'fa-walkie-talkie';
                break;
        }

        showNotification(message, notificationTypes.WARNING, 3000, icon);
    }

    // Interaction functions
    function hideInteractionHints() {
        regularInteraction.style.display = 'none';
        holdInteraction.style.display = 'none';
    }

    // Simulation for interaction hints - now controlled by I key
    function setupInteractionSimulation() {
        const interactionObjects = [
            { name: "ANOMALOUS TERMINAL", status: "CONNECTION DEGRADED", interactType: "regular" },
            { name: "DATA CUBE", status: "ENCRYPTED", interactType: "regular" },
            { name: "BIOLOGICAL SAMPLE", status: "HAZARDOUS MATERIAL", interactType: "hold" },
            { name: "SECURITY DOOR", status: "POWER DISCONNECTED", interactType: "hold" },
            { name: "GENERATOR UNIT", status: "CRITICALLY DAMAGED", interactType: "regular" },
            { name: "ALIEN ARTIFACT", status: "UNKNOWN ORIGIN", interactType: "hold" },
            { name: "COMMAND CONSOLE", status: "AWAITING AUTHORIZATION", interactType: "regular" },
            { name: "SPECIMEN CONTAINER", status: "BIOHAZARD LEVEL 4", interactType: "hold" }
        ];

        let currentInteractionIndex = 0;
        let isInteractionVisible = false;

        // Toggle interaction hints with I key
        document.addEventListener('keydown', e => {
            if (e.key === 'i' || e.key === 'I') {
                toggleInteractionHint();
            }
        });

        function toggleInteractionHint() {
            if (isInteractionVisible) {
                // Hide current hint
                hideInteractionHints();
                isInteractionVisible = false;
            } else {
                // Show next hint
                showNextInteraction();
                isInteractionVisible = true;
            }
        }

        function showNextInteraction() {
            // Hide any currently visible hints
            hideInteractionHints();

            // Get the next object in rotation
            const interactionObject = interactionObjects[currentInteractionIndex];

            // Update index for next time
            currentInteractionIndex = (currentInteractionIndex + 1) % interactionObjects.length;

            // Set up the hint
            const hintElement = interactionObject.interactType === "hold" ? holdInteraction : regularInteraction;
            const nameText = hintElement.querySelector('.name-text');
            const statusText = hintElement.querySelector('.object-status');

            // Update content with random glitches
            if (nameText) {
                nameText.textContent = interactionObject.name;
                nameText.setAttribute('data-text', interactionObject.name);
            }

            if (statusText) {
                // Small chance of showing a glitched status
                if (Math.random() < 0.1) {
                    statusText.textContent = interactionObject.status.replace(/[A-Z]/g, char =>
                        Math.random() < 0.3 ? '█' : char);
                } else {
                    statusText.textContent = interactionObject.status;
                }
            }

            // Show the hint with a glitch effect
            hintElement.style.display = 'block';
            hintElement.classList.add('visible');

            // Add pulse effect occasionally
            if (Math.random() < 0.3) {
                hintElement.classList.add('pulse');
                setTimeout(() => {
                    hintElement.classList.remove('pulse');
                }, 2000);
            }
        }
    }

    // Simulate interaction when E or Hold E is pressed
    function handleInteractionKeys() {
        let eKeyPressed = false;
        let eKeyHoldTimer = null;
        let interactionInProgress = false;

        // Track E key state
        document.addEventListener('keydown', e => {
            if ((e.key === 'e' || e.key === 'E') && !eKeyPressed && !interactionInProgress) {
                eKeyPressed = true;
                const regularVisible = regularInteraction.classList.contains('visible');
                const holdVisible = holdInteraction.classList.contains('visible');

                // If hold interaction is visible, start the hold timer
                if (holdVisible) {
                    eKeyHoldTimer = setTimeout(() => {
                        // Hold completed, trigger hold interaction
                        if (eKeyPressed && holdVisible) {
                            simulateHoldInteraction();
                            eKeyHoldTimer = null;
                        }
                    }, 1000); // 1 second hold time
                } else if (regularVisible) {
                    // Regular interaction - trigger immediately
                    simulateRegularInteraction();
                }
            }
        });

        document.addEventListener('keyup', e => {
            if (e.key === 'e' || e.key === 'E') {
                eKeyPressed = false;

                // Clear hold timer if it exists
                if (eKeyHoldTimer) {
                    clearTimeout(eKeyHoldTimer);
                    eKeyHoldTimer = null;
                }
            }
        });

        function simulateRegularInteraction() {
            interactionInProgress = true;

            // Get the object name
            const objectName = regularInteraction.querySelector('.name-text').textContent;

            // Add interaction effect
            const keyButton = regularInteraction.querySelector('.key-button');
            if (keyButton) {
                keyButton.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    keyButton.style.transform = 'scale(1)';
                }, 200);
            }

            // Show notification about the interaction
            const messages = [
                `ACCESS GRANTED: ${objectName}`,
                `SYSTEM RESPONSE: Connecting to ${objectName}`,
                `INTERFACE LINKED: ${objectName} activated`,
                `SCAN COMPLETE: ${objectName} analyzed`
            ];

            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showNotification(randomMessage, notificationTypes.INFO, 3000, 'fa-plug');

            // Hide the interaction hint
            setTimeout(() => {
                regularInteraction.classList.remove('visible');
                setTimeout(() => {
                    regularInteraction.style.display = 'none';
                    interactionInProgress = false;
                }, 500);
            }, 500);
        }

        function simulateHoldInteraction() {
            interactionInProgress = true;

            // Get the object name
            const objectName = holdInteraction.querySelector('.name-text').textContent;

            // Activate hold progress
            const holdProgress = holdInteraction.querySelector('.hold-progress');
            if (holdProgress) {
                holdProgress.classList.add('active');

                // Complete after animation duration (3s)
                setTimeout(() => {
                    // Show success notification
                    const messages = [
                        `OVERRIDE COMPLETE: ${objectName}`,
                        `SECURITY BYPASSED: ${objectName} compromised`,
                        `EXTRACTION SUCCESSFUL: ${objectName} data retrieved`,
                        `CONTAINMENT FIELD: ${objectName} secured`
                    ];

                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    showNotification(randomMessage, notificationTypes.SUCCESS, 3000, 'fa-key');

                    // Hide the interaction hint
                    holdInteraction.classList.remove('visible');
                    setTimeout(() => {
                        holdInteraction.style.display = 'none';
                        holdProgress.classList.remove('active');
                        interactionInProgress = false;
                    }, 500);
                }, 3000);
            }
        }
    }

    // Add interaction toggle to hints panel
    function updateHintsPanel() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const hintsContent = document.querySelector('.hints-content');

            if (hintsContent) {
                // Check if the interaction toggle hint already exists
                if (!document.querySelector('[data-action="toggle-interaction"]')) {
                    // Find the Interface Controls section
                    const interfaceDivider = Array.from(document.querySelectorAll('.hint-divider'))
                        .find(div => div.textContent.includes('Interface'));

                    if (interfaceDivider) {
                        // Create the new hint item
                        const interactionHintItem = document.createElement('div');
                        interactionHintItem.className = 'hint-item';
                        interactionHintItem.setAttribute('data-action', 'toggle-interaction');
                        interactionHintItem.innerHTML = `
                            <div class="key-button small">I</div>
                            <span>Toggle Interaction</span>
                        `;

                        // Insert after the interface divider and before the next divider
                        let nextElement = interfaceDivider.nextElementSibling;
                        while (nextElement && !nextElement.classList.contains('hint-divider')) {
                            nextElement = nextElement.nextElementSibling;
                        }

                        hintsContent.insertBefore(interactionHintItem, nextElement);
                    }
                }
            }
        }, 500);
    }

    // Initialize interaction simulation and key handlers
    setupInteractionSimulation();
    handleInteractionKeys();
    updateHintsPanel();

    // Hints Panel function
    function toggleHintsPanel() {
        buttonHints.classList.toggle('expanded');

        // Hide the press H hint when expanded
        if (buttonHints.classList.contains('expanded')) {
            if (pressHHint) pressHHint.classList.remove('visible');
        } else {
            // Only show the hint again if we're toggling from expanded to collapsed
            // by user action (not when auto-hiding)
            if (pressHHint && pressHHint.dataset.autoHidden !== 'true') {
                pressHHint.classList.add('visible');
            }
        }
    }

    // Low health notification
    function notifyLowHealth() {
        showNotification('Critical condition: medical assistance required!', notificationTypes.DANGER, 4000, 'fa-heart');
    }

    // Function to add random glitches and Soviet aesthetic touches
    function setupRandomGlitches() {
        // Random noise fluctuation
        setInterval(() => {
            const noise = document.querySelector('.noise');
            if (noise && Math.random() < 0.1) {
                noise.style.opacity = (0.02 + Math.random() * 0.06).toFixed(3);
                setTimeout(() => {
                    noise.style.opacity = '0.035';
                }, 200);
            }
        }, 2000);

        // Random screen wobble
        setInterval(() => {
            if (Math.random() < 0.05) {
                document.body.style.transform = `translateX(${Math.random() * 2 - 1}px)`;
                setTimeout(() => {
                    document.body.style.transform = 'none';
                }, 100);
            }
        }, 5000);
    }

    // Setup draggable element functionality
    function setupDraggableElement() {
        const draggableElement = document.getElementById('draggableElement');
        const dragHint = document.getElementById('dragHint');
        const dragInitialContent = document.getElementById('dragInitialContent');
        const dragActiveContent = document.getElementById('dragActiveContent');

        if (!draggableElement || !dragHint) return;

        // Element will be visible only on hover through CSS, no need to add visible class here

        // Show hint on hover
        draggableElement.addEventListener('mouseenter', () => {
            dragHint.classList.add('visible');
            dragHint.style.animation = 'drag-hint-appear 0.3s forwards, drag-hint-glitch 5s infinite';

            // Make sure the correct content is shown
            if (!isDragging) {
                dragInitialContent.style.display = 'flex';
                dragActiveContent.style.display = 'none';
            }
        });

        draggableElement.addEventListener('mouseleave', () => {
            if (!isDragging) {
                dragHint.classList.remove('visible');
            }
        });

        let isDragging = false;
        let offsetX, offsetY;

        // Mouse down event to start dragging
        draggableElement.addEventListener('mousedown', (e) => {
            // Only respond to left mouse button (button 0)
            if (e.button !== 0) return;

            e.preventDefault();
            isDragging = true;

            // Store initial mouse position relative to element
            const rect = draggableElement.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            // Change cursor style
            draggableElement.style.cursor = 'grabbing';

            // Stop any ongoing animations
            draggableElement.style.animation = 'none';

            // Switch the drag hint to "release to drop" mode
            if (dragHint.classList.contains('visible')) {
                dragInitialContent.style.display = 'none';
                dragActiveContent.style.display = 'flex';
            }

            // Add glitch effect when grabbing
            if (Math.random() < 0.3) {
                const glitchEffect = () => {
                    draggableElement.style.transform = `scale(1.1) translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                    setTimeout(() => {
                        draggableElement.style.transform = 'scale(1.1)';
                    }, 50);
                };

                glitchEffect();
                const glitchInterval = setInterval(glitchEffect, 300);

                // Clear interval when mouse is released
                const clearGlitch = () => {
                    clearInterval(glitchInterval);
                    document.removeEventListener('mouseup', clearGlitch);
                };

                document.addEventListener('mouseup', clearGlitch);
            }
        });

        // Mouse move event to handle dragging
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            // Show drag hint with "release to drop" if not already visible
            if (!dragHint.classList.contains('visible')) {
                dragHint.classList.add('visible');
                dragHint.style.animation = 'drag-hint-appear 0.3s forwards, drag-hint-glitch 5s infinite';
                dragInitialContent.style.display = 'none';
                dragActiveContent.style.display = 'flex';
            }

            // Calculate new position
            const container = draggableElement.parentElement;
            const containerRect = container.getBoundingClientRect();

            let newX = e.clientX - containerRect.left - offsetX;
            let newY = e.clientY - containerRect.top - offsetY;

            // Set new position
            draggableElement.style.position = 'absolute';
            draggableElement.style.left = `${newX}px`;
            draggableElement.style.top = `${newY}px`;

            // Add trailing effect while dragging
            const trail = document.createElement('div');
            trail.className = 'drag-trail';
            trail.style.position = 'absolute';
            trail.style.width = '10px';
            trail.style.height = '10px';
            trail.style.background = 'rgba(194, 176, 28, 0.3)';
            trail.style.borderRadius = '50%';
            trail.style.left = `${e.clientX - containerRect.left}px`;
            trail.style.top = `${e.clientY - containerRect.top}px`;
            trail.style.zIndex = '1';
            trail.style.pointerEvents = 'none';
            container.appendChild(trail);

            // Remove trail after animation
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 300);
        });

        // Mouse up event to stop dragging
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;

            isDragging = false;

            // Reset cursor style
            draggableElement.style.cursor = 'grab';

            // Resume animation
            draggableElement.style.animation = 'dragPulse 3s infinite ease-in-out';

            // Reset the drag hint content and hide it
            dragInitialContent.style.display = 'flex';
            dragActiveContent.style.display = 'none';
            dragHint.classList.remove('visible');

            // No notifications needed for dragging
        });
    }

    // Setup broken equipment visual effects
    function setupBrokenEquipment() {
        // Flickering flashlight
        const brokenGlass = document.querySelector('.broken-glass');
        if (brokenGlass) {
            setInterval(() => {
                if (Math.random() < 0.2) {
                    brokenGlass.style.opacity = (0.2 + Math.random() * 0.3).toFixed(2);
                    setTimeout(() => {
                        brokenGlass.style.opacity = '0.1';
                    }, 150);
                }
            }, 2000);
        }

        // Error slot blinking text
        const errorText = document.querySelector('.error-text');
        if (errorText) {
            setInterval(() => {
                errorText.style.opacity = errorText.style.opacity === '0.3' ? '1' : '0.3';
            }, 800);
        }

        // Stuck radio light
        const stuckLight = document.querySelector('.stuck-light');
        if (stuckLight) {
            setInterval(() => {
                stuckLight.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
            }, 500);
        }
    }

    // Initialize draggable element
    setupDraggableElement();

    // Battery charging functions
    let flashlightChargingInterval = null;
    let radioChargingInterval = null;

    function startChargingBattery(device) {
        // Check if already fully charged
        const isFull = device === 'flashlight' ? flashlightBattery >= 100 : radioBattery >= 100;

        if (isFull) {
            showNotification(`${device.charAt(0).toUpperCase() + device.slice(1)} battery already full`, notificationTypes.INFO, 2000, device === 'flashlight' ? 'fa-lightbulb' : 'fa-walkie-talkie');
            return;
        }

        // Check if already charging
        if ((device === 'flashlight' && flashlightChargingInterval) ||
            (device === 'radio' && radioChargingInterval)) {
            showNotification(`${device.charAt(0).toUpperCase() + device.slice(1)} already charging`, notificationTypes.INFO, 2000, device === 'flashlight' ? 'fa-lightbulb' : 'fa-walkie-talkie');
            return;
        }

        // Remove charging initiated notification (as requested)

        // Add visual feedback for charging
        const slot = device === 'flashlight' ? flashlightSlot : radioSlot;
        const batteryIndicator = slot.querySelector('.battery-indicator');

        // Add charging class
        if (batteryIndicator) {
            batteryIndicator.classList.add('charging');
        }

        // Start the charging interval
        if (device === 'flashlight') {
            // Turn off flashlight during charging if it's on
            if (flashlightOn) {
                toggleFlashlight();
                showNotification('Flashlight powered down for charging', notificationTypes.WARNING, 2000, 'fa-lightbulb');
            }

            flashlightChargingInterval = setInterval(() => {
                flashlightBattery = Math.min(100, flashlightBattery + 2);
                updateFlashlightBattery(flashlightBattery);

                // Check if fully charged
                if (flashlightBattery >= 100) {
                    stopChargingBattery('flashlight');
                    showNotification('Flashlight fully charged', notificationTypes.SUCCESS, 3000, 'fa-lightbulb');
                }
            }, 50); // Charge at a rate of 2% every 50ms
        } else {
            // Turn off radio during charging if it's on
            if (radioOn) {
                toggleRadio();
                showNotification('Radio powered down for charging', notificationTypes.WARNING, 2000, 'fa-walkie-talkie');
            }

            radioChargingInterval = setInterval(() => {
                radioBattery = Math.min(100, radioBattery + 2);
                updateRadioBattery(radioBattery);

                // Check if fully charged
                if (radioBattery >= 100) {
                    stopChargingBattery('radio');
                    showNotification('Radio fully charged', notificationTypes.SUCCESS, 3000, 'fa-walkie-talkie');
                }
            }, 50); // Charge at a rate of 2% every 50ms
        }
    }

    function stopChargingBattery(device) {
        const slot = device === 'flashlight' ? flashlightSlot : radioSlot;
        const batteryIndicator = slot.querySelector('.battery-indicator');

        // Remove charging class
        if (batteryIndicator) {
            batteryIndicator.classList.remove('charging');
        }

        // Clear charging interval
        if (device === 'flashlight' && flashlightChargingInterval) {
            clearInterval(flashlightChargingInterval);
            flashlightChargingInterval = null;
        } else if (device === 'radio' && radioChargingInterval) {
            clearInterval(radioChargingInterval);
            radioChargingInterval = null;
        }
    }

    // Add teammate status functionality
    const teammateStatus = document.getElementById('teammateStatus');
    let teammateHealth = 35; // Default starting health
    let isHealingTeammate = false;

    function showTeammateStatus() {
        if (!teammateStatus) return;

        // Update health display
        updateTeammateHealthDisplay();

        // Show the teammate status with animation
        teammateStatus.classList.add('visible');

        // Update the message randomly
        updateTeammateMessage();
    }

    function hideTeammateStatus() {
        if (!teammateStatus) return;
        teammateStatus.classList.remove('visible');
    }

    function updateTeammateHealthDisplay() {
        const healthFill = teammateStatus.querySelector('.mate-health-fill');
        const healthValue = teammateStatus.querySelector('.vital-value');
        const healthLabel = teammateStatus.querySelector('.vital-label');

        if (healthFill) healthFill.style.width = `${teammateHealth}%`;
        if (healthValue) healthValue.textContent = `${teammateHealth}%`;

        // Update health status label
        if (healthLabel) {
            if (teammateHealth < 25) {
                healthLabel.textContent = "CRITICAL";
                healthLabel.style.animation = "vital-flash 0.5s infinite alternate";
            } else if (teammateHealth < 50) {
                healthLabel.textContent = "POOR";
                healthLabel.style.animation = "vital-flash 1s infinite alternate";
            } else if (teammateHealth < 75) {
                healthLabel.textContent = "STABLE";
                healthLabel.style.animation = "none";
                healthLabel.style.color = "var(--text-color)";
            } else {
                healthLabel.textContent = "GOOD";
                healthLabel.style.animation = "none";
                healthLabel.style.color = "var(--primary-color)";
            }
        }
    }

    function updateTeammateMessage() {
        const messages = [
            "\"Productivity levels decreasing... need assistance.\"",
            "\"Requesting unscheduled break due to blood loss.\"",
            "\"My status? Still operational. How unfortunate.\"",
            "\"Tell HR... I won't be making the 5PM meeting.\"",
            "\"Please delete my browser history if I expire.\"",
            "\"This wouldn't happen with Premium Healthcare Plan!\"",
            "\"Not injured... just experiencing downtime.\"",
            "\"Your first aid certification... is valid, right?\"",
            "\"All systems normal! *coughs synthetic lubricant*\"",
            "\"Just a flesh wound. Covered by company insurance.\""
        ];

        const statusMessage = teammateStatus.querySelector('.status-message');
        if (statusMessage) {
            statusMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
        }
    }

    function healTeammate() {
        if (isHealingTeammate || teammateHealth >= 100) return;

        isHealingTeammate = true;

        // Visual effect for first aid usage
        const firstaidSlot = document.querySelector('.firstaid-slot');
        if (firstaidSlot) {
            firstaidSlot.classList.add('active');

            // Add use animation
            const icon = firstaidSlot.querySelector('.icon-main');
            if (icon) {
                icon.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
        }

        // Increase teammate health
        const oldHealth = teammateHealth;
        teammateHealth = Math.min(100, teammateHealth + 25);

        // Update display
        updateTeammateHealthDisplay();

        // Show healing notification with corporate humor
        const healMessages = [
            "Employee patched up! Return to work immediately!",
            "Healthcare applied! Productivity restored!",
            "Treatment complete! Billing department notified!",
            "Life preserved! As per company policy!",
            "Medical aid deployed! Back to your shift!",
            "Recovery successful! Absence time deducted!"
        ];

        const messageIndex = Math.floor(Math.random() * healMessages.length);
        showNotification(healMessages[messageIndex], notificationTypes.SUCCESS, 3000, 'fa-first-aid');

        // Update teammate message to reflect healing
        setTimeout(() => {
            updateTeammateMessage();
            isHealingTeammate = false;
        }, 1000);
    }

    // Check if it's midnight in the game time to trigger the launch
    function checkForMidnightLaunch() {
        const gameTimeElement = document.getElementById('game-time');
        if (gameTimeElement && gameTimeElement.textContent === '12:00' && document.querySelector('.time-period').textContent === 'AM') {
            // It's midnight - trigger instant launch
            initiateLaunchSequence();
        }
    }

    // ==========================
    // ENHANCED ESC MENU SYSTEM WITH UX IMPROVEMENTS
    // ==========================
    
    const escMenu = document.getElementById('escMenu');
    const resumeButton = document.getElementById('resumeButton');
    const logoutButton = document.getElementById('logoutButton');
    const optionsButton = document.getElementById('optionsButton');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const quitConfirmModal = document.getElementById('quitConfirmModal');
    const cancelQuitBtn = document.getElementById('cancelQuit');
    const confirmQuitBtn = document.getElementById('confirmQuit');

    // Volume sliders
    const volumeSliders = document.querySelectorAll('.volume-slider');
    const volumeFills = document.querySelectorAll('.volume-fill');

    // Microphone toggle buttons
    const microphoneIcons = document.querySelectorAll('.microphone-icon');

    // Settings toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch');

    // Initialize ESC menu (hidden by default)
    if (escMenu) {
        escMenu.classList.remove('visible');
    }

    // Track if we're in quit confirmation
    let isInQuitConfirmation = false;

    // Toggle ESC menu visibility with focus management
    function toggleEscMenu() {
        if (escMenu) {
            const isOpening = !escMenu.classList.contains('visible');
            escMenu.classList.toggle('visible');

            // If opening, focus the resume button for accessibility
            if (isOpening) {
                setTimeout(() => {
                    if (resumeButton) {
                        resumeButton.focus();
                    }
                }, 100);

                // Add glitch effect to menu content when opening
                const menuContent = escMenu.querySelector('.menu-content');

                // Simulate system scanning effect
                setTimeout(() => {
                    menuContent.style.borderColor = 'rgba(162, 52, 48, 0.8)';
                    setTimeout(() => {
                        menuContent.style.borderColor = 'rgba(194, 176, 28, 0.8)';
                        setTimeout(() => {
                            menuContent.style.borderColor = 'var(--primary-color)';

                            // Occasionally add data corruption effect
                            if (Math.random() < 0.3) {
                                const playerNames = document.querySelectorAll('.player-item .name-text');
                                const randomPlayerIndex = Math.floor(Math.random() * playerNames.length);

                                if (playerNames[randomPlayerIndex]) {
                                    const originalName = playerNames[randomPlayerIndex].textContent;
                                    playerNames[randomPlayerIndex].textContent = originalName.replace(/[A-Z]/g, char =>
                                        Math.random() < 0.3 ? '█' : char);

                                    setTimeout(() => {
                                        playerNames[randomPlayerIndex].textContent = originalName;
                                    }, 1000);
                                }
                            }
                        }, 100);
                    }, 100);
                }, 50);
            } else {
                // When closing, hide quit confirmation if open
                if (quitConfirmModal) {
                    quitConfirmModal.classList.remove('visible');
                    isInQuitConfirmation = false;
                }
            }
        }
    }

    // Tab switching functionality with keyboard shortcuts
    function switchTab(tabElement) {
        if (!tabElement) return;

        // Remove active class from all tabs and contents
        menuTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to selected tab
        tabElement.classList.add('active');
        tabElement.setAttribute('aria-selected', 'true');

        // Get corresponding content and activate it
        const tabId = tabElement.getAttribute('data-tab');
        const content = document.getElementById(`${tabId}Tab`);
        if (content) {
            content.classList.add('active');

            // Add glitch effect when switching tabs
            content.style.opacity = '0.7';
            setTimeout(() => {
                content.style.transform = 'translateX(2px)';
                setTimeout(() => {
                    content.style.transform = 'translateX(-2px)';
                    setTimeout(() => {
                        content.style.transform = 'translateX(0)';
                        content.style.opacity = '1';
                    }, 50);
                }, 50);
            }, 50);
        }
    }

    // Tab click handlers
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
        
        // Keyboard navigation for tabs
        tab.addEventListener('keydown', (e) => {
            let targetTab = null;
            const currentIndex = Array.from(menuTabs).indexOf(tab);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetTab = menuTabs[(currentIndex + 1) % menuTabs.length];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetTab = menuTabs[(currentIndex - 1 + menuTabs.length) % menuTabs.length];
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTab(tab);
            }
            
            if (targetTab) {
                targetTab.focus();
                switchTab(targetTab);
            }
        });
    });

    // Quit confirmation modal functions
    function showQuitConfirmation() {
        if (quitConfirmModal) {
            quitConfirmModal.classList.add('visible');
            isInQuitConfirmation = true;
            
            // Focus cancel button by default (safer option)
            setTimeout(() => {
                if (cancelQuitBtn) {
                    cancelQuitBtn.focus();
                }
            }, 100);
        }
    }

    function hideQuitConfirmation() {
        if (quitConfirmModal) {
            quitConfirmModal.classList.remove('visible');
            isInQuitConfirmation = false;
            
            // Return focus to logout button
            if (logoutButton) {
                logoutButton.focus();
            }
        }
    }

    function performQuit() {
        // Show a flicker effect before redirecting
        document.body.style.opacity = '0.5';
        setTimeout(() => {
            document.body.style.opacity = '1';
            setTimeout(() => {
                document.body.style.opacity = '0.2';
                setTimeout(() => {
                    document.body.style.opacity = '1';
                    // Redirect to main menu
                    window.location.href = 'main-menu.html';
                }, 100);
            }, 100);
        }, 100);
    }

    // Global keyboard handler for ESC menu
    document.addEventListener('keydown', e => {
        // If in quit confirmation
        if (isInQuitConfirmation) {
            if (e.key === 'Escape') {
                e.preventDefault();
                hideQuitConfirmation();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                // Check which button has focus
                if (document.activeElement === confirmQuitBtn) {
                    performQuit();
                } else {
                    hideQuitConfirmation();
                }
            }
            return;
        }

        // If menu is open
        if (escMenu && escMenu.classList.contains('visible')) {
            // Tab switching with number keys
            if (e.key === '1') {
                e.preventDefault();
                switchTab(menuTabs[0]);
            } else if (e.key === '2') {
                e.preventDefault();
                switchTab(menuTabs[1]);
            }
            // Options shortcut
            else if (e.key === 'o' || e.key === 'O') {
                e.preventDefault();
                if (optionsButton) optionsButton.click();
            }
            // Quit shortcut
            else if (e.key === 'q' || e.key === 'Q') {
                e.preventDefault();
                showQuitConfirmation();
            }
            // Resume/Close menu
            else if (e.key === 'Escape') {
                e.preventDefault();
                toggleEscMenu();
            }
        }
        // If menu is closed, ESC opens it
        else if (e.key === 'Escape') {
            e.preventDefault();
            toggleEscMenu();
        }
    });

    // Resume button handler
    if (resumeButton) {
        resumeButton.addEventListener('click', toggleEscMenu);
    }

    // Options button handler
    if (optionsButton) {
        optionsButton.addEventListener('click', () => {
            // Add glitch effect before redirecting
            const menuContent = document.querySelector('.menu-content');
            if (menuContent) {
                menuContent.style.opacity = '0.8';
                menuContent.style.transform = 'scale(0.98) translateY(5px)';

                setTimeout(() => {
                    // Flash effect
                    document.body.style.backgroundColor = 'rgba(194, 176, 28, 0.1)';
                    setTimeout(() => {
                        document.body.style.backgroundColor = '';
                        // Redirect to options page
                        window.location.href = 'options.html';
                    }, 100);
                }, 200);
            } else {
                // Fallback if no animation is possible
                window.location.href = 'options.html';
            }
        });
    }

    // Logout button handler - now shows confirmation
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            showQuitConfirmation();
        });
    }

    // Quit confirmation handlers
    if (cancelQuitBtn) {
        cancelQuitBtn.addEventListener('click', hideQuitConfirmation);
    }

    if (confirmQuitBtn) {
        confirmQuitBtn.addEventListener('click', performQuit);
    }

    // Volume slider functionality
    volumeSliders.forEach((slider, index) => {
        // Set initial volume fill based on slider value
        if (volumeFills[index]) {
            volumeFills[index].style.width = `${slider.value}%`;
        }

        // Update volume fill when slider value changes
        slider.addEventListener('input', () => {
            if (volumeFills[index]) {
                volumeFills[index].style.width = `${slider.value}%`;
            }

            // Simulate interference at very low or high volumes
            if (slider.value < 10 || slider.value > 90) {
                const playerItem = slider.closest('.player-item');
                if (playerItem) {
                    playerItem.style.opacity = '0.7';
                    setTimeout(() => {
                        playerItem.style.opacity = '1';
                    }, 100);
                }
            }
        });
    });

    // Microphone icon toggle functionality
    microphoneIcons.forEach(icon => {
        // Skip disabled microphones
        if (icon.classList.contains('disabled')) return;

        icon.addEventListener('click', () => {
            // Toggle active class
            icon.classList.toggle('active');

            // Update icon
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                if (icon.classList.contains('active')) {
                    if (iconElement.classList.contains('fa-volume-slash')) {
                        iconElement.classList.remove('fa-volume-slash');
                        iconElement.classList.add('fa-volume-high');
                    } else if (iconElement.classList.contains('fa-microphone-slash')) {
                        iconElement.classList.remove('fa-microphone-slash');
                        iconElement.classList.add('fa-microphone');
                    }
                } else {
                    if (iconElement.classList.contains('fa-volume-high')) {
                        iconElement.classList.remove('fa-volume-high');
                        iconElement.classList.add('fa-volume-slash');
                    } else if (iconElement.classList.contains('fa-microphone')) {
                        iconElement.classList.remove('fa-microphone');
                        iconElement.classList.add('fa-microphone-slash');
                    }
                }
            }

            // For host microphone (your own mic)
            if (icon.closest('.player-item.host')) {
                const controlLabel = icon.previousElementSibling;
                if (controlLabel) {
                    controlLabel.textContent = icon.classList.contains('active') ? 'OUTPUT' : 'MUTED';
                }
            }
        });
    });

    // Settings toggle switch functionality
    toggleSwitches.forEach(toggle => {
        const indicator = toggle.querySelector('.toggle-indicator');
        const valueDisplay = toggle.nextElementSibling;

        // Check if it's the mandatory corporate messages toggle
        const settingItem = toggle.closest('.setting-item');
        const isMandatory = settingItem && settingItem.querySelector('.setting-name').textContent.includes('CORPORATE');

        if (!isMandatory) {
            toggle.addEventListener('click', () => {
                if (indicator) {
                    indicator.classList.toggle('active');

                    // Update value text
                    if (valueDisplay) {
                        if (indicator.classList.contains('active')) {
                            valueDisplay.textContent = 'ON';
                        } else {
                            valueDisplay.textContent = 'OFF';
                        }
                    }
                }
            });
        } else {
            // For the mandatory setting, clicking does nothing but show a glitch
            toggle.addEventListener('click', () => {
                if (indicator && valueDisplay) {
                    // Visual glitch effect
                    indicator.style.backgroundColor = 'var(--secondary-color)';
                    setTimeout(() => {
                        indicator.style.backgroundColor = 'var(--primary-color)';
                    }, 300);

                    // Text flicker effect
                    valueDisplay.style.opacity = '0.5';
                    setTimeout(() => {
                        valueDisplay.textContent = "OVERRIDE DENIED";
                        setTimeout(() => {
                            valueDisplay.style.opacity = '1';
                            valueDisplay.style.color = 'var(--secondary-color)';
                            setTimeout(() => {
                                valueDisplay.style.color = 'var(--text-color)';
                                valueDisplay.textContent = "MANDATORY";
                            }, 1000);
                        }, 100);
                    }, 100);
                }
            });
        }
    });

    // Modifiers Tab Functionality
    function initializeModifiersTab() {
        const modifierFilter = document.getElementById('modifierFilter');
        const categoryTabs = document.querySelectorAll('.category-tab[data-category]');
        const modifierSections = document.querySelectorAll('.modifier-section');
        const selectButtons = document.querySelectorAll('.select-modifier-button');

        // Handle modifier filter changes
        if (modifierFilter) {
            modifierFilter.addEventListener('change', (e) => {
                const filterValue = e.target.value;
                const modifierCards = document.querySelectorAll('.modifier-card');

                modifierCards.forEach(card => {
                    const type = card.querySelector('.modifier-type').classList.contains('buff') ? 'buff' : 'debuff';
                    if (filterValue === 'all' || filterValue === type) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Handle category tab switching
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and sections
                categoryTabs.forEach(t => t.classList.remove('active'));
                modifierSections.forEach(s => s.classList.remove('active'));

                // Add active class to clicked tab and corresponding section
                tab.classList.add('active');
                const category = tab.getAttribute('data-category');
                document.getElementById(`${category}-modifiers`).classList.add('active');

                // Update active modifiers if switching to view tab
                if (category === 'view') {
                    updateActiveModifiers();
                }
            });
        });

        // Handle modifier selection
        selectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.closest('.modifier-card');
                const modifierName = card.querySelector('.modifier-name').textContent;
                const modifierType = card.querySelector('.modifier-type').classList.contains('buff') ? 'buff' : 'debuff';

                // Toggle selection
                if (button.textContent === 'SELECT MODIFIER') {
                    if (canSelectMoreModifiers()) {
                        button.textContent = 'SELECTED';
                        button.classList.add('selected');
                        addModifierToActive(modifierName, modifierType, card);
                        showNotification(`Modifier "${modifierName}" selected`, notificationTypes.SUCCESS);
                    } else {
                        showNotification('Maximum number of modifiers reached', notificationTypes.WARNING);
                    }
                } else {
                    button.textContent = 'SELECT MODIFIER';
                    button.classList.remove('selected');
                    removeModifierFromActive(modifierName);
                    showNotification(`Modifier "${modifierName}" removed`, notificationTypes.INFO);
                }
            });
        });
    }

    function canSelectMoreModifiers() {
        const activeModifiers = document.querySelectorAll('.active-modifiers .modifier-card');
        return activeModifiers.length < 3; // Maximum 3 modifiers allowed
    }

    function addModifierToActive(name, type, card) {
        const activeModifiers = document.querySelector('.active-modifiers');
        const newCard = card.cloneNode(true);
        const selectButton = newCard.querySelector('.select-modifier-button');

        selectButton.textContent = 'REMOVE';
        selectButton.classList.add('selected');

        // Add remove functionality
        selectButton.addEventListener('click', () => {
            newCard.remove();
            const originalButton = document.querySelector(`.modifier-card:not(.active-modifiers .modifier-card) .modifier-name:contains('${name}')`)
                .closest('.modifier-card')
                .querySelector('.select-modifier-button');
            if (originalButton) {
                originalButton.textContent = 'SELECT MODIFIER';
                originalButton.classList.remove('selected');
            }
            showNotification(`Modifier "${name}" removed`, notificationTypes.INFO);
        });

        activeModifiers.appendChild(newCard);
    }

    function removeModifierFromActive(name) {
        const activeModifier = document.querySelector(`.active-modifiers .modifier-name:contains('${name}')`)
            ?.closest('.modifier-card');
        if (activeModifier) {
            activeModifier.remove();
        }
    }

    function updateActiveModifiers() {
        const activeModifiers = document.querySelector('.active-modifiers');
        const availableModifiers = document.querySelector('.available-modifiers');

        // Clear existing modifiers
        activeModifiers.innerHTML = '';
        availableModifiers.innerHTML = '';

        // Get all modifier cards
        const allModifiers = document.querySelectorAll('.modifier-card');

        allModifiers.forEach(card => {
            const isSelected = card.querySelector('.select-modifier-button').classList.contains('selected');
            const newCard = card.cloneNode(true);

            if (isSelected) {
                const selectButton = newCard.querySelector('.select-modifier-button');
                selectButton.textContent = 'REMOVE';
                selectButton.classList.add('selected');

                // Add remove functionality
                selectButton.addEventListener('click', () => {
                    newCard.remove();
                    const originalButton = document.querySelector(`.modifier-card:not(.active-modifiers .modifier-card) .modifier-name:contains('${card.querySelector('.modifier-name').textContent}')`)
                        ?.closest('.modifier-card')
                        .querySelector('.select-modifier-button');
                    if (originalButton) {
                        originalButton.textContent = 'SELECT MODIFIER';
                        originalButton.classList.remove('selected');
                    }
                    showNotification(`Modifier "${card.querySelector('.modifier-name').textContent}" removed`, notificationTypes.INFO);
                });

                activeModifiers.appendChild(newCard);
            } else {
                availableModifiers.appendChild(newCard);
            }
        });
    }
});

// Common notification types object
const notificationTypes = {
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger',
    SUCCESS: 'success',
    SYSTEM: 'system'
};

// Enhanced Visual Upgrade Indicators for Health/Stamina Bars

// Function to update visual upgrade indicators
function updateVitalUpgradeIndicators() {
    const vitalsContainer = document.querySelector('.vitals-container');
    const healthContainer = document.querySelector('.health-container');
    const staminaContainer = document.querySelector('.stamina-container');
    const healthBar = document.querySelector('.health-bar');
    const staminaBar = document.querySelector('.stamina-bar');

    // Check if any upgrades are available
    const healthUpgradable = healthUpgradeLevel < 3;
    const staminaUpgradable = staminaUpgradeLevel < 3;
    const anyUpgradable = healthUpgradable || staminaUpgradable;

    // Update vitals container
    if (vitalsContainer) {
        if (anyUpgradable) {
            vitalsContainer.classList.add('upgradable');
        } else {
            vitalsContainer.classList.remove('upgradable');
        }
    }

    // Update health container
    if (healthContainer) {
        if (healthUpgradable) {
            healthContainer.classList.add('upgradable');
            healthContainer.classList.add('has-upgrade');
            healthContainer.classList.remove('max-level');

            // Add tooltip
            const cost = upgradeCosts.health[healthUpgradeLevel];
            const benefit = upgradeBenefits.health[healthUpgradeLevel];
            healthContainer.setAttribute('data-upgrade-tooltip',
                `Health Upgrade Lv.${healthUpgradeLevel + 1} - +${benefit} Max HP - Cost: ${cost} Credits`);
        } else {
            healthContainer.classList.remove('upgradable');
            healthContainer.classList.remove('has-upgrade');
            healthContainer.classList.add('max-level');
            healthContainer.setAttribute('data-upgrade-tooltip', 'Health Fully Upgraded');
        }
    }

    // Update stamina container
    if (staminaContainer) {
        if (staminaUpgradable) {
            staminaContainer.classList.add('upgradable');
            staminaContainer.classList.add('has-upgrade');
            staminaContainer.classList.remove('max-level');

            // Add tooltip
            const cost = upgradeCosts.stamina[staminaUpgradeLevel];
            const benefit = upgradeBenefits.stamina[staminaUpgradeLevel];
            staminaContainer.setAttribute('data-upgrade-tooltip',
                `Stamina Upgrade Lv.${staminaUpgradeLevel + 1} - +${benefit} Max Stamina - Cost: ${cost} Credits`);
        } else {
            staminaContainer.classList.remove('upgradable');
            staminaContainer.classList.remove('has-upgrade');
            staminaContainer.classList.add('max-level');
            staminaContainer.setAttribute('data-upgrade-tooltip', 'Stamina Fully Upgraded');
        }
    }

    // Update health bar
    if (healthBar) {
        if (healthUpgradable) {
            healthBar.classList.add('upgradable');
        } else {
            healthBar.classList.remove('upgradable');
        }
    }

    // Update stamina bar
    if (staminaBar) {
        if (staminaUpgradable) {
            staminaBar.classList.add('upgradable');
        } else {
            staminaBar.classList.remove('upgradable');
        }
    }

    // Update upgrade segments
    updateUpgradeSegments('health');
    updateUpgradeSegments('stamina');
}

// Function to add upgrade segments to bars
function addUpgradeSegments() {
    const healthBar = document.querySelector('.health-bar');
    const staminaBar = document.querySelector('.stamina-bar');

    // Add segments to health bar
    if (healthBar && !healthBar.querySelector('.upgrade-segments')) {
        const healthSegments = document.createElement('div');
        healthSegments.className = 'upgrade-segments';

        for (let i = 1; i <= 3; i++) {
            const segment = document.createElement('div');
            segment.className = 'upgrade-segment';
            segment.setAttribute('data-upgrade', i);
            healthSegments.appendChild(segment);
        }

        healthBar.appendChild(healthSegments);
    }

    // Add segments to stamina bar
    if (staminaBar && !staminaBar.querySelector('.upgrade-segments')) {
        const staminaSegments = document.createElement('div');
        staminaSegments.className = 'upgrade-segments';

        for (let i = 1; i <= 3; i++) {
            const segment = document.createElement('div');
            segment.className = 'upgrade-segment';
            segment.setAttribute('data-upgrade', i);
            staminaSegments.appendChild(segment);
        }

        staminaBar.appendChild(staminaSegments);
    }
}

// Function to add upgrade buttons
function addUpgradeButtons() {
    const healthContainer = document.querySelector('.health-container');
    const staminaContainer = document.querySelector('.stamina-container');

    // Add health upgrade button
    if (healthContainer && !healthContainer.querySelector('.upgrade-btn')) {
        const healthUpgradeBtn = document.createElement('div');
        healthUpgradeBtn.className = 'upgrade-btn health-upgrade-btn';
        healthUpgradeBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        healthUpgradeBtn.setAttribute('title', 'Upgrade Health');
        healthUpgradeBtn.setAttribute('tabindex', '0');
        healthUpgradeBtn.setAttribute('role', 'button');
        healthUpgradeBtn.setAttribute('aria-label', 'Upgrade health capacity');

        // Add click handler
        healthUpgradeBtn.addEventListener('click', () => {
            if (healthUpgradeBtn.classList.contains('available')) {
                upgradeHealth();
            }
        });

        // Add keyboard support
        healthUpgradeBtn.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && healthUpgradeBtn.classList.contains('available')) {
                e.preventDefault();
                upgradeHealth();
            }
        });

        healthContainer.appendChild(healthUpgradeBtn);
    }

    // Add stamina upgrade button
    if (staminaContainer && !staminaContainer.querySelector('.upgrade-btn')) {
        const staminaUpgradeBtn = document.createElement('div');
        staminaUpgradeBtn.className = 'upgrade-btn stamina-upgrade-btn';
        staminaUpgradeBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        staminaUpgradeBtn.setAttribute('title', 'Upgrade Stamina');
        staminaUpgradeBtn.setAttribute('tabindex', '0');
        staminaUpgradeBtn.setAttribute('role', 'button');
        staminaUpgradeBtn.setAttribute('aria-label', 'Upgrade stamina capacity');

        // Add click handler
        staminaUpgradeBtn.addEventListener('click', () => {
            if (staminaUpgradeBtn.classList.contains('available')) {
                upgradeStamina();
            }
        });

        // Add keyboard support
        staminaUpgradeBtn.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && staminaUpgradeBtn.classList.contains('available')) {
                e.preventDefault();
                upgradeStamina();
            }
        });

        staminaContainer.appendChild(staminaUpgradeBtn);
    }
}

// Function to update upgrade button availability
function updateUpgradeButtons() {
    const healthUpgradeBtn = document.querySelector('.health-upgrade-btn');
    const staminaUpgradeBtn = document.querySelector('.stamina-upgrade-btn');

    // Update health upgrade button
    if (healthUpgradeBtn) {
        if (healthUpgradeLevel < 3) {
            healthUpgradeBtn.classList.add('available');
            const cost = upgradeCosts.health[healthUpgradeLevel];
            const benefit = upgradeBenefits.health[healthUpgradeLevel];
            healthUpgradeBtn.setAttribute('title',
                `Upgrade Health Lv.${healthUpgradeLevel + 1} - +${benefit} Max HP - Cost: ${cost} Credits`);
        } else {
            healthUpgradeBtn.classList.remove('available');
            healthUpgradeBtn.setAttribute('title', 'Health Fully Upgraded');
        }
    }

    // Update stamina upgrade button
    if (staminaUpgradeBtn) {
        if (staminaUpgradeLevel < 3) {
            staminaUpgradeBtn.classList.add('available');
            const cost = upgradeCosts.stamina[staminaUpgradeLevel];
            const benefit = upgradeBenefits.stamina[staminaUpgradeLevel];
            staminaUpgradeBtn.setAttribute('title',
                `Upgrade Stamina Lv.${staminaUpgradeLevel + 1} - +${benefit} Max Stamina - Cost: ${cost} Credits`);
        } else {
            staminaUpgradeBtn.classList.remove('available');
            staminaUpgradeBtn.setAttribute('title', 'Stamina Fully Upgraded');
        }
    }
}

// Function to add click handlers to vital bars for upgrades
function makeVitalBarsUpgradable() {
    const healthContainer = document.querySelector('.health-container');
    const staminaContainer = document.querySelector('.stamina-container');

    // Make health bar clickable for upgrades
    if (healthContainer) {
        healthContainer.style.cursor = 'pointer';
        healthContainer.addEventListener('click', (e) => {
            if (healthContainer.classList.contains('upgradable') && !e.target.closest('.upgrade-btn')) {
                upgradeHealth();
            }
        });

        // Add keyboard support
        healthContainer.setAttribute('tabindex', '0');
        healthContainer.setAttribute('role', 'button');
        healthContainer.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && healthContainer.classList.contains('upgradable')) {
                e.preventDefault();
                upgradeHealth();
            }
        });
    }

    // Make stamina bar clickable for upgrades
    if (staminaContainer) {
        staminaContainer.style.cursor = 'pointer';
        staminaContainer.addEventListener('click', (e) => {
            if (staminaContainer.classList.contains('upgradable') && !e.target.closest('.upgrade-btn')) {
                upgradeStamina();
            }
        });

        // Add keyboard support
        staminaContainer.setAttribute('tabindex', '0');
        staminaContainer.setAttribute('role', 'button');
        staminaContainer.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && staminaContainer.classList.contains('upgradable')) {
                e.preventDefault();
                upgradeStamina();
            }
        });
    }
}

// Initialize visual upgrade system
function initializeVitalUpgradeVisuals() {
    // Add upgrade segments to bars
    addUpgradeSegments();

    // Add upgrade buttons
    addUpgradeButtons();

    // Make vital bars clickable
    makeVitalBarsUpgradable();

    // Update all visual indicators
    updateVitalUpgradeIndicators();
    updateUpgradeButtons();

    console.log('Visual upgrade indicators initialized');
}

// Enhanced upgrade functions with better visual feedback
function upgradeHealthEnhanced() {
    if (healthUpgradeLevel >= 3) {
        showNotification('Health already at maximum upgrade level', notificationTypes.INFO, 3000, 'fa-heart');
        return false;
    }

    const cost = upgradeCosts.health[healthUpgradeLevel];
    // TODO: Check if player has enough credits

    const oldMaxHealth = maxHealth;
    healthUpgradeLevel++;
    maxHealth += upgradeBenefits.health[healthUpgradeLevel - 1];

    // Update health bar with enhanced visuals
    updateHealth(health, true);
    updateVitalUpgradeIndicators();
    updateUpgradeButtons();

    // Visual feedback
    const healthContainer = document.querySelector('.health-container');
    if (healthContainer) {
        healthContainer.style.animation = 'upgrade-success-flash 0.6s ease-out';
        setTimeout(() => {
            healthContainer.style.animation = '';
        }, 600);
    }

    // Show notification with more details
    showNotification(
        `Health upgraded to Level ${healthUpgradeLevel}! Max HP: ${oldMaxHealth} → ${maxHealth}`,
        notificationTypes.SUCCESS,
        5000,
        'fa-heart-pulse'
    );

    // Trigger haptic feedback
    if (window.triggerHapticFeedback) {
        window.triggerHapticFeedback('success');
    }

    // Screen reader announcement
    if (window.announceToScreenReader) {
        window.announceToScreenReader(
            `Health upgraded to level ${healthUpgradeLevel}. Maximum health increased from ${oldMaxHealth} to ${maxHealth}.`
        );
    }

    return true;
}

function upgradeStaminaEnhanced() {
    if (staminaUpgradeLevel >= 3) {
        showNotification('Stamina already at maximum upgrade level', notificationTypes.INFO, 3000, 'fa-running');
        return false;
    }

    const cost = upgradeCosts.stamina[staminaUpgradeLevel];
    // TODO: Check if player has enough credits

    const oldMaxStamina = maxStamina;
    staminaUpgradeLevel++;
    maxStamina += upgradeBenefits.stamina[staminaUpgradeLevel - 1];

    // Update stamina bar with enhanced visuals
    updateStamina(stamina, true);
    updateVitalUpgradeIndicators();
    updateUpgradeButtons();

    // Visual feedback
    const staminaContainer = document.querySelector('.stamina-container');
    if (staminaContainer) {
        staminaContainer.style.animation = 'upgrade-success-flash 0.6s ease-out';
        setTimeout(() => {
            staminaContainer.style.animation = '';
        }, 600);
    }

    // Show notification with more details
    showNotification(
        `Stamina upgraded to Level ${staminaUpgradeLevel}! Max Stamina: ${oldMaxStamina} → ${maxStamina}`,
        notificationTypes.SUCCESS,
        5000,
        'fa-bolt'
    );

    // Trigger haptic feedback
    if (window.triggerHapticFeedback) {
        window.triggerHapticFeedback('success');
    }

    // Screen reader announcement
    if (window.announceToScreenReader) {
        window.announceToScreenReader(
            `Stamina upgraded to level ${staminaUpgradeLevel}. Maximum stamina increased from ${oldMaxStamina} to ${maxStamina}.`
        );
    }

    return true;
}

// Override the original upgrade functions
window.upgradeHealth = upgradeHealthEnhanced;
window.upgradeStamina = upgradeStaminaEnhanced;

// Add CSS for upgrade success animation
const upgradeStyle = document.createElement('style');
upgradeStyle.textContent = `
    @keyframes upgrade-success-flash {
        0% { transform: scale(1); }
        25% { transform: scale(1.05); box-shadow: 0 0 20px var(--primary-bright); }
        50% { transform: scale(1.02); }
        75% { transform: scale(1.05); box-shadow: 0 0 20px var(--primary-bright); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(upgradeStyle);

// Visual upgrade system initialized in main DOMContentLoaded event listener