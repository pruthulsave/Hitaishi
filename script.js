// Audio Player Logic
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('theme-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    const iconPath = document.getElementById('audio-icon-path');

    // Play icon path
    const playPath = "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z";

    let isPlaying = false;

    function updateIcon(playing) {
        if (playing) {
            toggleBtn.style.opacity = '1';
            toggleBtn.style.transform = 'scale(1.1)';
        } else {
            toggleBtn.style.opacity = '0.6';
            toggleBtn.style.transform = 'scale(1)';
        }
    }

    function tryPlayAudio() {
        if (!isPlaying && audio) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Audio autoplay started.");
                    isPlaying = true;
                    updateIcon(true);
                    // Remove fallback listeners once playing
                    document.removeEventListener('click', tryPlayAudio);
                    document.removeEventListener('keydown', tryPlayAudio);
                }).catch(error => {
                    console.log("Autoplay prevented by browser. Waiting for interaction.");
                    // Keep listeners active to retry on first click
                });
            }
        }
    }

    if (toggleBtn && audio) {
        // Toggle Button Logic
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click listener from firing twice
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                updateIcon(false);
            } else {
                audio.play();
                isPlaying = true;
                updateIcon(true);
            }
        });

        // Attempt Autoplay immediately
        audio.volume = 0.5;
        tryPlayAudio();

        // Fallback: Try to play on first user interaction
        document.addEventListener('click', tryPlayAudio, { once: true });
        document.addEventListener('keydown', tryPlayAudio, { once: true });
    }
});





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
