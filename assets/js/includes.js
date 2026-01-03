(async () => {
  const nodes = document.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(nodes).map(async (el) => {
      const res = await fetch(el.dataset.include, { cache: "no-cache" });
      el.outerHTML = await res.text();
    })
  );
})();
