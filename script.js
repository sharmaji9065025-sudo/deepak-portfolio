/* ===== Easy-to-edit settings ===== */
const RESUME_PATH = "Deepak_Kumar_Resume.pdf"; // change if you rename/move your resume
const GITHUB_PROFILE = "https://github.com/sharmaji9065025-sudo";

const TITLES = ["Python Developer", "Cybersecurity Enthusiast", "IT Support Fresher"];

const SKILLS = [
  { group: "Programming", items: ["Python", "Java", "C", "C++"] },
  { group: "Web Development", items: ["HTML", "CSS", "JavaScript", "Flask"] },
  { group: "Database", items: ["MySQL", "SQLite"] },
  { group: "Data Analysis", items: ["NumPy", "Pandas", "Matplotlib", "Streamlit"] },
  { group: "Operating Systems", items: ["Windows", "Linux", "Kali Linux"] },
  { group: "Cybersecurity Tools", items: ["Nmap", "Wireshark", "Metasploit"] },
  { group: "Tools", items: ["VS Code", "Git", "GitHub"] },
];

// placeholder: true => link is NOT a real repo yet. Replace url and set placeholder: false.
const PROJECTS = [
  {
    title: "Attendance Management System",
    desc: "Records and manages student attendance with a MySQL backend, and generates attendance reports and charts for quick analysis.",
    tech: ["Python", "MySQL", "Pandas", "Matplotlib"],
    url: GITHUB_PROFILE, placeholder: true,
  },
  {
    title: "Face Recognition Attendance System",
    desc: "Detects and recognises faces from a webcam feed using OpenCV and marks attendance automatically.",
    tech: ["Python", "OpenCV"],
    url: GITHUB_PROFILE, placeholder: true,
  },
  {
    title: "Sales Data Analysis Dashboard",
    desc: "Interactive dashboard that cleans and analyses sales data and visualises trends, top products and revenue.",
    tech: ["Python", "Pandas", "Streamlit"],
    url: GITHUB_PROFILE, placeholder: true,
  },
  {
    title: "Personal Portfolio Website",
    desc: "Responsive portfolio site with a Flask backend that stores contact form messages in SQLite.",
    tech: ["HTML", "CSS", "JavaScript", "Flask", "SQLite"],
    url: GITHUB_PROFILE, placeholder: true,
  },
  {
    title: "IT Support Ticket Management System",
    desc: "Lets users raise support tickets and helps staff track, prioritise and resolve them, with data stored in SQLite.",
    tech: ["Python", "SQLite"],
    url: GITHUB_PROFILE, placeholder: true,
  },
];

/* ===== Helpers ===== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

$("#year").textContent = new Date().getFullYear();
$$(".resume-link").forEach((a) => a.setAttribute("href", RESUME_PATH));

/* ===== Mobile nav ===== */
const toggle = $("#navToggle");
const links = $("#navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
$$("a", links).forEach((a) => a.addEventListener("click", () => {
  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

/* ===== Sticky nav, back-to-top, active link ===== */
const nav = $("#nav");
const toTop = $("#toTop");
const sections = $$("main section[id]");
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 20);
  toTop.classList.toggle("show", y > 500);
  let current = "";
  sections.forEach((s) => { if (y >= s.offsetTop - 120) current = s.id; });
  $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
onScroll();

/* ===== Typing effect ===== */
(function typing() {
  const el = $("#typed");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = TITLES.join(" | ");
    return;
  }
  let t = 0, i = 0, deleting = false;
  (function tick() {
    const word = TITLES[t];
    i += deleting ? -1 : 1;
    el.textContent = word.slice(0, i);
    let delay = deleting ? 45 : 90;
    if (!deleting && i === word.length) { deleting = true; delay = 1600; }
    else if (deleting && i === 0) { deleting = false; t = (t + 1) % TITLES.length; delay = 300; }
    setTimeout(tick, delay);
  })();
})();

/* ===== Render skills ===== */
$("#skillsGrid").innerHTML = SKILLS.map((s) => `
  <article class="skill-card reveal">
    <h3>${esc(s.group)}</h3>
    <ul class="chips">${s.items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul>
  </article>`).join("");

/* ===== Render projects + filters ===== */
const grid = $("#projectsGrid");
grid.innerHTML = PROJECTS.map((p) => `
  <article class="project reveal" data-tech="${esc(p.tech.join("|"))}">
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <ul class="chips">${p.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
    <a class="gh" href="${esc(p.url)}" target="_blank" rel="noopener">View on GitHub →${p.placeholder ? " <small>Placeholder</small>" : ""}</a>
  </article>`).join("");

const allTech = ["All", ...new Set(PROJECTS.flatMap((p) => p.tech))];
const filters = $("#filters");
filters.innerHTML = allTech.map((t, i) =>
  `<button type="button" class="filter${i === 0 ? " active" : ""}" aria-pressed="${i === 0}" data-filter="${esc(t)}">${esc(t)}</button>`
).join("");
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  $$(".filter", filters).forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
  btn.classList.add("active");
  btn.setAttribute("aria-pressed", "true");
  const f = btn.dataset.filter;
  $$(".project", grid).forEach((card) => {
    const show = f === "All" || card.dataset.tech.split("|").includes(f);
    card.classList.toggle("hide", !show);
    if (show) card.classList.add("visible");
  });
});

/* ===== Scroll reveal ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => io.observe(el));

/* ===== Contact form ===== */
const form = $("#contactForm");
const status = $("#formStatus");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";
  let valid = true;
  $$("input, textarea", form).forEach((f) => {
    const ok = f.value.trim() !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
    f.classList.toggle("invalid", !ok);
    f.setAttribute("aria-invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) { status.textContent = "Please fill in all fields with a valid email."; status.classList.add("err"); return; }

  if (form.action.includes("YOUR_FORM_ID")) {
    status.textContent = "Form backend not connected yet. Add your Formspree form ID in index.html (see README).";
    status.classList.add("err");
    return;
  }
  status.textContent = "Sending…";
  try {
    const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = "Thanks! Your message has been sent.";
    status.classList.add("ok");
  } catch {
    status.textContent = "Something went wrong. Please email me directly.";
    status.classList.add("err");
  }
});
