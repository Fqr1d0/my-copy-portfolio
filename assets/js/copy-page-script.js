window.addEventListener('DOMContentLoaded', function() {
  const el = document.getElementById('open-for-work');
  if (el) {
    setTimeout(() => {
      el.classList.add('active');
    }, 500); // Delay for smooth effect
  }
});