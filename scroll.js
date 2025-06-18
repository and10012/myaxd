  window.addEventListener("DOMContentLoaded", () => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY !== null) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
    // Reveal body after scroll is done
    document.body.style.visibility = "visible";
  });

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollY", window.scrollY);
  });
