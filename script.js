const contact = {
  email: "gvinteir@gmail.com",
  whatsapp: "", // International digits only, for example 38640123456.
};

const domains = [
  "avtv.si",
  "bitstock.si",
  "buysi.si",
  "defipay.si",
  "qbz.si",
  "qvr.si",
  "rwapay.si",
  "zfi.si",
];

const grid = document.getElementById("domain-grid");
const dialog = document.getElementById("enquiry-dialog");
const dialogDomain = document.getElementById("dialog-domain");
const dialogActions = document.getElementById("dialog-actions");
const dialogNote = document.getElementById("dialog-note");
const pointerIsFine = window.matchMedia("(hover: hover) and (pointer: fine)");
const cursor = document.getElementById("site-cursor");
let currentDomain = "";

grid.innerHTML = domains.map((name, index) => {
  const label = name.slice(0, -3);
  return `<button class="domain-card" type="button" data-inquire="${name}" aria-label="Enquire about ${name}">
    <span class="card-top"><span class="card-number">${String(index + 1).padStart(2, "0")} / 08</span><span class="card-availability">For sale</span></span>
    <span class="domain-name">${label}<span class="tld">.si</span></span>
    <span class="card-bottom"><span class="card-price">Price on request</span><span class="card-arrow" aria-hidden="true">↗</span></span>
  </button>`;
}).join("");

function inquiryText() {
  return currentDomain
    ? `Hello, I am interested in ${currentDomain}. Please share the asking price and transfer details.`
    : "Hello, I am interested in your .si domain portfolio. Please share pricing and transfer details.";
}

function addAction(label, href, secondary = false) {
  const link = document.createElement("a");
  link.className = `dialog-action${secondary ? " secondary" : ""}`;
  link.href = href;
  link.textContent = label;
  if (href.startsWith("https:")) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  dialogActions.append(link);
}

function openEnquiry(domain = "") {
  currentDomain = domain;
  dialogDomain.textContent = domain || "a domain";
  dialogActions.replaceChildren();
  const subject = domain ? `Enquiry about ${domain}` : "Enquiry about .si domains";
  const body = inquiryText();

  if (contact.email) {
    addAction("Email the owner ↗", `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }
  if (contact.whatsapp) {
    const number = contact.whatsapp.replace(/\D/g, "");
    addAction("WhatsApp ↗", `https://wa.me/${number}?text=${encodeURIComponent(body)}`);
  }

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "dialog-action secondary";
  copy.textContent = "Copy enquiry";
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      copy.textContent = "Copied ✓";
      window.setTimeout(() => { copy.textContent = "Copy enquiry"; }, 2200);
    } catch {
      copy.textContent = "Copy unavailable";
    }
  });
  dialogActions.append(copy);

  dialogNote.textContent = contact.email || contact.whatsapp
    ? "Your email or messaging app will open. No message is sent automatically."
    : "The sales contact is being set up. Enquiries cannot be sent from this page yet.";
  if (cursor && pointerIsFine.matches) dialog.append(cursor);
  dialog.showModal();
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-inquire]");
  if (card) openEnquiry(card.dataset.inquire);
});
document.getElementById("header-enquiry").addEventListener("click", () => openEnquiry());
document.getElementById("general-enquiry").addEventListener("click", () => openEnquiry());
document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => { if (cursor) document.body.append(cursor); });
document.getElementById("year").textContent = new Date().getFullYear();

if (cursor) {
  document.addEventListener("pointermove", (event) => {
    if (!pointerIsFine.matches) return;
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    cursor.classList.add("is-visible");
    cursor.classList.toggle("is-active", event.target instanceof Element && event.target.closest("a, button") !== null);
  }, { passive: true });
  const hideCursor = () => cursor.classList.remove("is-visible");
  document.addEventListener("pointerleave", hideCursor);
  window.addEventListener("blur", hideCursor);
  pointerIsFine.addEventListener("change", () => {
    document.documentElement.classList.toggle("cursor-enabled", pointerIsFine.matches);
    hideCursor();
  });
  document.documentElement.classList.toggle("cursor-enabled", pointerIsFine.matches);
}
