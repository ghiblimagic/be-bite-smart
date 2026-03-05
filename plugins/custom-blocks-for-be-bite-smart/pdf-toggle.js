document.addEventListener("DOMContentLoaded", function () {
  // ── Read More text toggles (article-or-commentary block) ──────────────────
  document.querySelectorAll(".expandable-article-block").forEach((article) => {
    const toggle = article.querySelector(".read-more-toggle");
    const content = article.querySelector(".expandable-content");

    if (!toggle || !content) return;

    toggle.addEventListener("click", function () {
      const isExpanded = this.getAttribute("data-expanded") === "true";

      if (isExpanded) {
        content.classList.remove("expanded");
        this.setAttribute("data-expanded", "false");
        this.textContent = "Read More";
      } else {
        content.classList.add("expanded");
        this.setAttribute("data-expanded", "true");
        this.textContent = "Read Less";
      }
    });
  });

  // ── PDF toggles (with mutual exclusion per article) ───────────────────────
  const pdfToggles = document.querySelectorAll(".pdf-toggle");
  pdfToggles.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const group = this.getAttribute("data-group");
      const isOpen = this.getAttribute("data-expanded") === "true";

      // Close all buttons and viewers in the same group
      document
        .querySelectorAll(`.pdf-toggle[data-group="${group}"]`)
        .forEach((btn) => {
          btn.setAttribute("data-expanded", "false");
          btn.textContent = btn.textContent.replace("Hide", "View");
        });
      document
        .querySelectorAll(".pdf-viewer-container")
        .forEach((container) => {
          if (
            container.id &&
            container.id.includes(group.replace("pdf-group-", ""))
          ) {
            container.classList.remove("expanded");
          }
        });

      // If it wasn't already open, open it
      if (!isOpen) {
        const target = document.getElementById(targetId);
        if (target) {
          // Lazy-load the iframe src on first open
          const iframe = target.querySelector("iframe");
          if (iframe && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
          }
          target.classList.add("expanded");
        }
        this.setAttribute("data-expanded", "true");
        this.textContent = this.textContent.replace("View", "Hide");
      }
    });
  });
});
