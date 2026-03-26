// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Simple reveal animation on scroll-in
const revealItems = document.querySelectorAll(
  ".card, .intro-card, .hero-content, .hero-banner, .issue-hero-card, .issue-hero-panel, .page-header"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  setTimeout(() => item.classList.add("show"), 120 + index * 80);
});

// Typing text effect in the hero title
const heroTitle = document.querySelector(".hero-title");
const typingText = document.querySelector(".typing-text");

if (heroTitle && typingText) {
  const phraseAttr = heroTitle.getAttribute("data-phrases") || "";
  const phrases = phraseAttr
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  typingText.textContent = "";

  const typeSpeed = 75;
  const deleteSpeed = 35;
  const pauseAfterType = 1400;
  const pauseAfterDelete = 400;

  const longest = phrases.reduce((max, p) => Math.max(max, p.length), 0);
  if (window.innerWidth > 700 && longest) {
    typingText.style.minHeight = "2.6em";
  }

  function tick() {
    const current = phrases[phraseIndex] || "";
    if (!deleting) {
      typingText.textContent = current.slice(0, charIndex);
      charIndex += 1;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
    } else {
      typingText.textContent = current.slice(0, charIndex);
      charIndex -= 1;
      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
    }

    const speed = deleting ? deleteSpeed : typeSpeed;
    setTimeout(tick, speed);
  }

  setTimeout(tick, 300);
}
