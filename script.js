// RSVP Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const rsvpButton = document.getElementById('rsvpButton');
    const modal = document.getElementById('rsvpModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Open modal when RSVP button is clicked
    rsvpButton.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});

// Smooth scrolling for any internal links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to invitation card
    const invitationCard = document.querySelector('.invitation-card');
    if (invitationCard) {
        invitationCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        invitationCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add click animation to buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Google Sheets RSVP Form Integration
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = rsvpForm.querySelector('.submit-button');

    // Google Apps Script Web App URL - YOU NEED TO REPLACE THIS
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxss2n7qZj1Ts7CZwc0m2Wa3KcGM8CMlC0fO8CPS1fJcwhNqimRSIJIti00O59yRoXD/exec';

    rsvpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.style.display = 'none';
        loadingSpinner.style.display = 'flex';

        // Collect form data
        const formData = new FormData(rsvpForm);
        const data = {
            name: formData.get('guestName'),
            attendance: formData.get('attendance'),
            adults: formData.get('adults'),
            kids: formData.get('kids'),
            dogs: formData.get('dogs'),
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Since we're using no-cors mode, we can't read the response
            // but if no error is thrown, we assume success
            showSuccessMessage();
            
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            showErrorMessage();
        }
    });

    function showSuccessMessage() {
        rsvpForm.style.display = 'none';
        loadingSpinner.style.display = 'none';
        successMessage.innerHTML = '<img src="Pikachu.svg" alt="Pikachu success" />';
        successMessage.style.display = 'block';
        
        // Auto-close modal after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);
    }

    function showErrorMessage() {
        loadingSpinner.style.display = 'none';
        errorMessage.style.display = 'block';
    }

    function closeModal() {
        const modal = document.getElementById('rsvpModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
    }

    // Reset form function (global for retry button)
    window.resetForm = function() {
        rsvpForm.style.display = 'block';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        loadingSpinner.style.display = 'none';
        submitButton.style.display = 'inline-block';
        rsvpForm.reset();
    };

    // Enhanced modal close functionality
    const modal = document.getElementById('rsvpModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Pokeball Loader Functionality
document.addEventListener('DOMContentLoaded', function() {
    const pokeballLoader = document.getElementById('pokeballLoader');
    const mainContent = document.getElementById('mainContent');
    const mainPokeball = document.getElementById('mainPokeball');

    // Add click handler to pokeball loader
    pokeballLoader.addEventListener('click', function(e) {
        // Prevent multiple clicks
        if (pokeballLoader.classList.contains('clicked')) return;
        pokeballLoader.classList.add('clicked');
        
        // Create sparkle effects
        createSparkles(e.clientX, e.clientY);
        
        // Create energy wave effect
        createEnergyWave();
        
        // Add pop effect to pokeball
        mainPokeball.classList.add('clicked');
        
        // Add shake animation before revealing
        setTimeout(() => {
            mainPokeball.style.animation = 'shake 0.5s ease-in-out';
        }, 300);
        
        setTimeout(() => {
            // Fade out and shrink the loader
            pokeballLoader.classList.add('fade-out');
            
            // After fade animation, hide loader and show content
            setTimeout(() => {
                pokeballLoader.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Show the pokeball background animation
                const pokeballBackground = document.getElementById('pokeballBackground');
                if (pokeballBackground) {
                    pokeballBackground.style.display = 'block';
                }
                
                // Trigger the reveal animation
                mainContent.classList.add('revealed');
            }, 800); // Match the CSS transition duration
        }, 800); // Wait for pop and shake to complete
    });

    // Function to create energy wave effect
    function createEnergyWave() {
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        pokeballLoader.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 800);
    }

    // Function to create sparkle effects
    function createSparkles(x, y) {
        const sparkleCount = 12;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position around click point
            const angle = (360 / sparkleCount) * i;
            const distance = 50 + Math.random() * 30;
            const sparkleX = x + Math.cos(angle * Math.PI / 180) * distance;
            const sparkleY = y + Math.sin(angle * Math.PI / 180) * distance;
            
            sparkle.style.left = sparkleX + 'px';
            sparkle.style.top = sparkleY + 'px';
            sparkle.style.animationDelay = (Math.random() * 0.3) + 's';
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }

    // Add shake animation keyframes
    const shakeAnimation = `
        @keyframes shake {
            0%, 100% { transform: translateX(0) translateY(0); }
            10% { transform: translateX(-10px) translateY(-5px) rotate(-2deg); }
            20% { transform: translateX(10px) translateY(5px) rotate(2deg); }
            30% { transform: translateX(-8px) translateY(-3px) rotate(-1deg); }
            40% { transform: translateX(8px) translateY(3px) rotate(1deg); }
            50% { transform: translateX(-6px) translateY(-2px) rotate(-0.5deg); }
            60% { transform: translateX(6px) translateY(2px) rotate(0.5deg); }
            70% { transform: translateX(-4px) translateY(-1px); }
            80% { transform: translateX(4px) translateY(1px); }
            90% { transform: translateX(-2px) translateY(-0.5px); }
        }
    `;
    
    // Add the shake animation to existing styles
    const existingStyle = document.querySelector('style');
    if (existingStyle) {
        existingStyle.textContent += shakeAnimation;
    } else {
        const newStyle = document.createElement('style');
        newStyle.textContent = shakeAnimation;
        document.head.appendChild(newStyle);
    }
});

// Enhanced entrance animations for content elements
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance delays to elements for staggered effect
    const animatedElements = [
        { selector: '.invitation-card', delay: 200 },
        { selector: '.decoration', delay: 400 },
        { selector: '.event-details', delay: 600 },
        { selector: '.action-buttons', delay: 800 }
    ];

    // Set initial states for animated elements
    animatedElements.forEach(({ selector }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8) translateY(30px)';
        }
    });

    // Function to trigger entrance animations
    function triggerEntranceAnimations() {
        animatedElements.forEach(({ selector, delay }) => {
            setTimeout(() => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1) translateY(0)';
                }
            }, delay);
        });
    }

    // Listen for when main content becomes visible
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const target = mutation.target;
                if (target.id === 'mainContent' && target.style.display === 'block') {
                    triggerEntranceAnimations();
                }
            }
        });
    });

    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        observer.observe(mainContent, { attributes: true });
    }
});
