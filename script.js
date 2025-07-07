document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    // Add accessibility attributes
    addAccessibilityFeatures();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Gallery initialized with full accessibility support');
}

function addAccessibilityFeatures() {
    const figures = document.querySelectorAll('figure');
    
    figures.forEach((figure, index) => {
        // Ensure tabindex is set
        if (!figure.hasAttribute('tabindex')) {
            figure.setAttribute('tabindex', '0');
        }
        
        // Add ARIA attributes
        figure.setAttribute('role', 'button');
        figure.setAttribute('aria-labelledby', `desc${index + 1}`);
        
        // Add keyboard event support
        figure.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleHighlight(this);
            }
        });
    });
}

function setupEventListeners() {
    const figures = document.querySelectorAll('figure');
    
    figures.forEach(figure => {
        // Mouse events
        figure.addEventListener('mouseenter', function() {
            toggleHighlight(this, true);
        });
        
        figure.addEventListener('mouseleave', function() {
            toggleHighlight(this, false);
        });
        
        // Focus events
        figure.addEventListener('focus', function() {
            toggleHighlight(this, true);
            console.log(`Focused on: ${this.querySelector('figcaption').textContent}`);
        });
        
        figure.addEventListener('blur', function() {
            toggleHighlight(this, false);
        });
        
        // Click/tap for all devices
        figure.addEventListener('click', function() {
            toggleHighlight(this);
        });
    });
}

function toggleHighlight(element, state) {
    if (typeof state === 'undefined') {
        // Toggle if no state provided
        element.classList.toggle('highlight');
    } else {
        // Set based on boolean state
        if (state) {
            element.classList.add('highlight');
        } else {
            element.classList.remove('highlight');
        }
    }
    
    // For demo purposes
    if (element.classList.contains('highlight')) {
        console.log(`Selected image: ${element.querySelector('figcaption').textContent}`);
    }
}

// Validation helper
function validateAccessibility() {
    const images = document.querySelectorAll('img');
    let allValid = true;
    
    images.forEach(img => {
        if (!img.alt || img.alt.trim() === '') {
            console.warn('Missing alt text for image:', img);
            allValid = false;
        }
    });
    
    if (allValid) {
        console.log('All images have proper alt text');
    }
    
    return allValid;
}

// Run validation on init
validateAccessibility();