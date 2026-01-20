// Audio Player Logic
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('theme-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    const iconPath = document.getElementById('audio-icon-path');

    // Play icon path
    const playPath = "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    // Pause icon path (already in HTML default, but good to have handy)
    const pausePath = "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"; // This is actually a speaker icon, let's just toggle mute style

    let isPlaying = false;

    if (toggleBtn && audio) {
        toggleBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                toggleBtn.style.opacity = '0.6';
                toggleBtn.style.transform = 'scale(1)';
            } else {
                audio.play().catch(e => console.log("Audio play failed:", e)); // Autoplay policy might block
                toggleBtn.style.opacity = '1';
                toggleBtn.style.transform = 'scale(1.1)';
            }
            isPlaying = !isPlaying;
        });

        // Try auto-play on low volume
        audio.volume = 0.4;
    }
});

// Sparkle Cursor Effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) { // Only create sparkles sometimes to save performance
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // Randomize position slightly
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;

    document.body.appendChild(sparkle);

    // Remove after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}



// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const p = toast.querySelector('p');
    if (p) p.textContent = message;

    toast.classList.remove('hidden');

    // Simple fade in loop handled by CSS or standard display
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('2026-01-16T10:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    if (distance < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// CTA Button
const ctaMain = document.getElementById('cta-main');
if (ctaMain) {
    ctaMain.addEventListener('click', () => {
        showToast('EVENT SCHEDULE COMING SOON!');
    });
}
