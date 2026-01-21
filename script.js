// Audio Player Logic
document.addEventListener("DOMContentLoaded", () => {
  // --- Magical Cursor ---
  const cursor = document.createElement("div");
  cursor.classList.add("magic-cursor");
  document.body.appendChild(cursor);

  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  document.body.appendChild(cursorDot);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";

    // Create sparkles
    if (Math.random() < 0.1) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.left = e.clientX + "px";
      sparkle.style.top = e.clientY + "px";
      sparkle.style.width = Math.random() * 5 + 2 + "px";
      sparkle.style.height = sparkle.style.width;
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  });

  // Cursor Hover Effect
  const interactables = document.querySelectorAll(
    "a, button, .magic-card, input, textarea",
  );
  interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
  });

  // --- 3D Tilt Effect for Magic Cards ---
  const cards = document.querySelectorAll(".magic-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Original Audio Logic ---
  const audio = document.getElementById("theme-audio");
  const toggleBtn = document.getElementById("audio-toggle");
  const iconPath = document.getElementById("audio-icon-path");

  let isPlaying = false;

  function updateIcon(playing) {
    if (playing) {
      toggleBtn.style.opacity = "1";
      toggleBtn.style.transform = "scale(1.1)";
    } else {
      toggleBtn.style.opacity = "0.6";
      toggleBtn.style.transform = "scale(1)";
    }
  }

  function tryPlayAudio() {
    if (!isPlaying && audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio autoplay started.");
            isPlaying = true;
            updateIcon(true);
            document.removeEventListener("click", tryPlayAudio);
            document.removeEventListener("keydown", tryPlayAudio);
          })
          .catch((error) => {
            console.log(
              "Autoplay prevented by browser. Waiting for interaction.",
            );
          });
      }
    }
  }

  if (toggleBtn && audio) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
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

    audio.volume = 0.5;
    tryPlayAudio();
    document.addEventListener("click", tryPlayAudio, { once: true });
    document.addEventListener("keydown", tryPlayAudio, { once: true });
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const p = toast.querySelector("p");
  if (p) p.textContent = message;

  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

// Countdown Timer (Only runs if elements exist)
function updateCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl) return;

  const eventDate = new Date("2026-01-16T10:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance < 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
