const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
function scrollToTop() {
  if (!isBrowser()) return;
  setTimeout(() => {
    window.document.body.scrollIntoView({ behavior: "smooth" });
  }, 500);
}

export default scrollToTop;
