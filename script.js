// Add at least one sales channel before publishing the enquiry flow.
const contact = {
  email: "",
  whatsapp: "", // International digits only, for example 38640123456.
};

const domains = [
  { name: "avtv.si", tag: "MEDIA / BRANDABLE", description: "A concise four-letter name with room for a media identity.", groups: ["short"] },
  { name: "bitstock.si", tag: "FINANCE / COMMERCE", description: "A memorable pairing of digital and market language.", groups: ["commerce"] },
  { name: "buysi.si", tag: "COMMERCE", description: "A direct, purchase-focused name with a natural .si ending.", groups: ["commerce"] },
  { name: "defipay.si", tag: "FINANCE / COMMERCE", description: "A clear name at the intersection of DeFi and payments.", groups: ["commerce"] },
  { name: "qbz.si", tag: "THREE LETTERS", description: "Three letters with flexibility for a future brand.", groups: ["short"] },
  { name: "qvr.si", tag: "THREE LETTERS", description: "Compact, distinctive, and open to interpretation.", groups: ["short"] },
  { name: "rwapay.si", tag: "FINANCE / COMMERCE", description: "A name shaped around real-world assets and payments.", groups: ["commerce"] },
  { name: "zfi.si", tag: "THREE LETTERS", description: "A short name with a modern finance feel.", groups: ["short"] },
];

const grid = document.getElementById("domain-grid");
const search = document.getElementById("domain-search");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const resultCount = document.getElementById("result-count");
const emptyState = document.getElementById("empty-state");
const dialog = document.getElementById("enquiry-dialog");
const dialogDomain = document.getElementById("dialog-domain");
const dialogActions = document.getElementById("dialog-actions");
const dialogNote = document.getElementById("dialog-note");
let activeFilter = "all";
let currentDomain = "";

function cardMarkup(domain, index) {
  const [label] = domain.name.split(".si");
  return `<article class="domain-card">
    <div>
      <div class="card-top"><span class="card-tag">${domain.tag}</span><span class="card-number">${String(index + 1).padStart(2, "0")} / 08</span></div>
      <h3>${label}<span class="tld">.si</span></h3>
      <p>${domain.description}</p>
    </div>
    <div class="card-bottom"><span class="card-price">Price on request</span><button class="card-enquire" type="button" data-inquire="${domain.name}" aria-label="Enquire about ${domain.name}">Enquire <span aria-hidden="true">↗</span></button></div>
  </article>`;
}

function renderDomains() {
  const query = search.value.trim().toLowerCase();
  const visible = domains.filter((domain) => {
    const matchesQuery = `${domain.name} ${domain.tag} ${domain.description}`.toLowerCase().includes(query);
    const matchesFilter = activeFilter === "all" || domain.groups.includes(activeFilter);
    return matchesQuery && matchesFilter;
  });
  grid.innerHTML = visible.map((domain) => cardMarkup(domain, domains.indexOf(domain))).join("");
  resultCount.textContent = `Showing ${visible.length} ${visible.length === 1 ? "domain" : "domains"}`;
  emptyState.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
}

function setFilter(value) {
  activeFilter = value;
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === value;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderDomains();
}

function inquiryText() {
  return currentDomain
    ? `Hello, I am interested in ${currentDomain}. Please share the asking price and transfer details.`
    : "Hello, I am interested in your .si domain portfolio. Please share the available names, pricing, and transfer details.";
}

function linkButton(label, href, extra = "") {
  const a = document.createElement("a");
  a.className = `button ${extra}`;
  a.href = href;
  a.textContent = label;
  if (href.startsWith("https:")) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  return a;
}

function openEnquiry(domain = "") {
  currentDomain = domain;
  dialogDomain.textContent = domain || "a domain";
  dialogActions.replaceChildren();

  const subject = domain ? `Enquiry about ${domain}` : "Enquiry about .si domains";
  const body = inquiryText();
  if (contact.email) {
    dialogActions.append(linkButton("Email the owner ↗", `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "button-primary"));
  }
  if (contact.whatsapp) {
    const number = contact.whatsapp.replace(/\D/g, "");
    dialogActions.append(linkButton("WhatsApp ↗", `https://wa.me/${number}?text=${encodeURIComponent(body)}`, "button-primary"));
  }

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "button button-outline";
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
    ? "Your enquiry opens in your email or messaging app. No message is sent automatically."
    : "The sales contact is being set up. Enquiries cannot be sent from this page yet.";
  dialog.showModal();
}

filterButtons.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
search.addEventListener("input", renderDomains);
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-inquire]");
  if (button) openEnquiry(button.dataset.inquire);
});
document.getElementById("general-enquiry").addEventListener("click", () => openEnquiry());
document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
document.getElementById("clear-filters").addEventListener("click", () => {
  search.value = "";
  setFilter("all");
  search.focus();
});
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (dialog.open) dialog.close();
    search.focus();
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
renderDomains();
