// =====================================
//  PORTFOLIO MODULE
//  Renders the Skills and Projects sections, and wires up
//  the in-page navigation, theme toggle, scroll-reveal
//  animations, and contact-form validation.
//
//  Flow: render content -> set up the interactions.
// =====================================

import { skills, projects } from "./data.js";

// The dashboard's scrollable area. Used as the "root" for the
// scroll observers so they track scrolling inside the content,
// not the whole window.
const scrollRoot = document.querySelector(".content");

// -------------------------------------
//  RENDER: Skills
// -------------------------------------
function renderSkills() {
  const list = document.getElementById("pf-skills-list");
  if (!list) return;

  list.innerHTML = skills
    .map((skill) => `<span class="pf-skill">${skill}</span>`)
    .join("");
}

// -------------------------------------
//  RENDER: Projects
//  One reusable function builds a single project card.
// -------------------------------------
function renderProjectCard(project) {
  const tags = project.tech
    .map((tag) => `<span class="pf-tag">${tag}</span>`)
    .join("");

  return `
    <article class="pf-project">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="pf-tags">${tags}</div>
      <div class="pf-project-links">
        <a href="${project.live}" target="_blank" rel="noopener">Live</a>
        <a href="${project.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </article>
  `;
}

function renderProjects() {
  const list = document.getElementById("pf-projects-list");
  if (!list) return;

  list.innerHTML = projects.map(renderProjectCard).join("");
}

// -------------------------------------
//  ACTIVE-LINK HIGHLIGHT ON SCROLL
//  Highlights the nav link of the section currently in view.
// -------------------------------------
function initActiveLinks() {
  const links = [...document.querySelectorAll(".pf-link")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          )
        );
      });
    },
    { root: scrollRoot, rootMargin: "-45% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// -------------------------------------
//  SCROLL-REVEAL ANIMATIONS
//  Fades sections in as they enter the viewport.
// -------------------------------------
function initScrollReveal() {
  const portfolio = document.querySelector(".portfolio");
  if (!portfolio) return;

  // Only now (with JS running) do we hide the sections,
  // so content is never stuck invisible if JS fails.
  portfolio.classList.add("js-ready");

  const items = [...document.querySelectorAll(".reveal")];

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // reveal once
        }
      });
    },
    { root: scrollRoot, threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));

  // Safety net: if the observer hasn't revealed everything
  // shortly after load, show it anyway.
  setTimeout(() => items.forEach((item) => item.classList.add("visible")), 1200);
}

// -------------------------------------
//  MOBILE NAV TOGGLE (hamburger)
// -------------------------------------
function initMobileNav() {
  const toggle = document.getElementById("pf-nav-toggle");
  const links = document.getElementById("pf-nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => links.classList.toggle("open"));

  // Close the menu after picking a section on mobile.
  links.querySelectorAll(".pf-link").forEach((link) =>
    link.addEventListener("click", () => links.classList.remove("open"))
  );
}

// -------------------------------------
//  CONTACT FORM VALIDATION (client-side only)
//  Shows inline error messages; no backend submission.
// -------------------------------------
function initContactForm() {
  const form = document.getElementById("pf-contact-form");
  if (!form) return;

  const success = document.getElementById("pf-form-success");

  function setError(field, message) {
    const error = form.querySelector(`[data-error-for="${field}"]`);
    if (error) error.textContent = message;
    return message === "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    success.textContent = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validate each field and collect the results.
    const okName = setError("name", name ? "" : "Please enter your name.");
    const okEmail = setError(
      "email",
      !email
        ? "Please enter your email."
        : !isValidEmail(email)
          ? "Please enter a valid email."
          : ""
    );
    const okMessage = setError(
      "message",
      message ? "" : "Please enter a message."
    );

    if (okName && okEmail && okMessage) {
      form.reset();
      success.textContent = "Thanks! Your message has been validated. ✅";
    }
  });
}

// -------------------------------------
//  INIT
// -------------------------------------
function initPortfolio() {
  renderSkills();
  renderProjects();
  initActiveLinks();
  initScrollReveal();
  initMobileNav();
  initContactForm();
}

initPortfolio();
