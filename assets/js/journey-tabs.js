// journey-tabs.js
// Accessible tab behavior for the "Water Journey" section

(() => {
  const tabs = Array.from(document.querySelectorAll(".j-step"));
  const panels = Array.from(document.querySelectorAll(".j-panel"));

  // Exit quietly if this page doesn't have a Journey block
  if (!tabs.length || !panels.length) return;

  function activate(tab) {
    const targetId = tab.getAttribute("aria-controls");

    tabs.forEach(t =>
      t.setAttribute("aria-selected", String(t === tab))
    );

    panels.forEach(p =>
      p.setAttribute("aria-hidden", String(p.id !== targetId))
    );
  }

  tabs.forEach(tab => {
    // Mouse / touch
    tab.addEventListener("click", () => activate(tab));

    // Keyboard navigation
    tab.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        tabs[(i + 1) % tabs.length].focus();
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(tab);
      }
    });
  });
})();
