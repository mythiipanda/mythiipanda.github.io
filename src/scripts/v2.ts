const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

const peek = document.getElementById("peek") as HTMLImageElement | null;
if (peek && fine && !calm) {
  let x = 0, y = 0, tx = 0, ty = 0, raf = 0, on = false;
  const place = () => { peek.style.transform = `translate(${tx + 20}px,${ty - 60}px)`; };
  const tick = () => {
    tx += (x - tx) * 0.22;
    ty += (y - ty) * 0.22;
    place();
    raf = on && (Math.abs(x - tx) > 0.3 || Math.abs(y - ty) > 0.3) ? requestAnimationFrame(tick) : 0;
  };
  addEventListener("mousemove", (e) => {
    x = e.clientX; y = e.clientY;
    if (on && !raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  document.querySelectorAll<HTMLElement>("[data-thumb]").forEach((a) => {
    const src = a.dataset.thumb ?? "";
    new Image().src = src;
    a.addEventListener("mouseenter", () => { peek.src = src; tx = x; ty = y; place(); on = true; peek.classList.add("on"); });
    a.addEventListener("mouseleave", () => { on = false; peek.classList.remove("on"); });
  });
}

const vic = document.getElementById("vic");
if (vic) {
  if (fine && !calm) {
    addEventListener("mousemove", (e) => {
      const r = vic.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      vic.style.setProperty("--tilt", Math.max(-6, Math.min(6, dx / 90)).toFixed(2) + "deg");
    }, { passive: true });
    vic.addEventListener("mouseenter", () => vic.classList.add("happy"));
    vic.addEventListener("mouseleave", () => vic.classList.remove("happy"));
  }
  vic.addEventListener("focus", () => vic.classList.add("happy"));
  vic.addEventListener("blur", () => vic.classList.remove("happy"));
  let hopTimer: ReturnType<typeof setTimeout>;
  vic.addEventListener("click", () => {
    if (calm) return;
    vic.classList.add("hop");
    clearTimeout(hopTimer);
    hopTimer = setTimeout(() => vic.classList.remove("hop"), 160);
  });
}

const copyBtn = document.getElementById("copy-email");
const toast = document.getElementById("toast");
let toastTimer: ReturnType<typeof setTimeout>;
copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.getAttribute("data-email") ?? "");
    if (!toast) return;
    toast.textContent = "Copied";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1400);
  } catch {}
});
