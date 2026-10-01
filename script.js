const contact = {
  email: "k2moat@gmail.com",
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

const messages = {
  en: {
    title: "SI Select — Curated .si Domains",
    description: "Eight distinctive .si domains available for acquisition. USDT accepted after an agreed quote.",
    ogDescription: "Eight distinctive .si domains. Price on request; USDT accepted by arrangement.",
    skipLink: "Skip to domains",
    brandLabel: "SI Select, view domains",
    headerCaption: "A CURATED .SI PORTFOLIO",
    getInTouch: "Get in touch",
    eyebrow: "ALL EIGHT NAMES, IN ONE PLACE",
    introTitle: "Find your next",
    introCopy: "Eight owner-held .si names. Enquire for pricing, USDT payment and transfer.",
    domainCount: "DOMAINS<br>FOR SALE",
    countLabel: "Eight domains available",
    collectionTitle: "The collection",
    sortLabel: "ALPHABETICAL ORDER",
    paymentLabel: "USDT accepted",
    contactKicker: "INTERESTED IN A NAME?",
    contactTitle: "Let’s talk about it.",
    contactDetail: " · Ask about price, USDT and transfer.",
    makeEnquiry: "Make an enquiry",
    footerNote: "Available only while unsold. Transfers are completed through a .si registrar.",
    dialogKicker: "DOMAIN ENQUIRY",
    dialogPrefix: "Let’s talk about ",
    dialogFallback: "a domain",
    dialogPeriod: ".",
    dialogDescription: "Reach out to discuss pricing and transfer details with the owner.",
    closeLabel: "Close enquiry",
    cardStatus: "For sale",
    cardPrice: "Price on request",
    emailOwner: "Email the owner ↗",
    copyEnquiry: "Copy enquiry",
    copied: "Copied ✓",
    copyUnavailable: "Copy unavailable",
    sentNote: "Your email or messaging app will open. No message is sent automatically.",
    pendingNote: "The sales contact is being set up. Enquiries cannot be sent from this page yet.",
    subjectGeneral: "Enquiry about .si domains",
    bodyGeneral: "Hello, I am interested in your .si domain portfolio. Please share pricing, the supported USDT network, and transfer details.",
  },
  zh: {
    title: "SI Select — 精选 .si 域名",
    description: "8 个精选 .si 域名出售中，价格面议；确认报价后可使用 USDT 付款。",
    ogDescription: "8 个精选 .si 域名，一页尽览；价格面议，支持 USDT。",
    skipLink: "跳转到域名列表",
    brandLabel: "SI Select，查看域名",
    headerCaption: "精选 .SI 域名",
    getInTouch: "联系咨询",
    eyebrow: "8 个域名 · 全部在此",
    introTitle: "找到你的下一个",
    introCopy: "8 个自有 .si 域名，价格面议；支持 USDT 付款与注册商过户。",
    domainCount: "域名<br>出售中",
    countLabel: "8 个域名正在出售",
    collectionTitle: "域名列表",
    sortLabel: "按字母排序",
    paymentLabel: "支持 USDT",
    contactKicker: "看中了某个域名？",
    contactTitle: "聊聊你的想法。",
    contactDetail: " · 咨询报价、USDT 付款和过户。",
    makeEnquiry: "发送询盘",
    footerNote: "售出即下架；域名过户由 .si 注册商办理。",
    dialogKicker: "域名询盘",
    dialogPrefix: "咨询 ",
    dialogFallback: "域名",
    dialogPeriod: "",
    dialogDescription: "邮件联系持有人，了解报价和域名过户详情。",
    closeLabel: "关闭询盘",
    cardStatus: "出售中",
    cardPrice: "价格面议",
    emailOwner: "发送邮件 ↗",
    copyEnquiry: "复制询盘",
    copied: "已复制 ✓",
    copyUnavailable: "复制失败",
    sentNote: "将打开邮件或通讯应用；网页不会自动发送消息。",
    pendingNote: "销售联系方式仍在设置中，暂时无法从本页发送询盘。",
    subjectGeneral: "咨询 .si 域名",
    bodyGeneral: "您好，我想了解您出售的 .si 域名。请提供报价、支持的 USDT 网络和过户方式。",
  },
};

const browserLanguage = (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
let language = browserLanguage;
try {
  const savedLanguage = window.localStorage.getItem("si-select-language");
  if (savedLanguage === "en" || savedLanguage === "zh") language = savedLanguage;
} catch { /* Local storage may be unavailable in a file preview. */ }

function renderGrid() {
  const t = messages[language];
  grid.innerHTML = domains.map((name, index) => {
    const label = name.slice(0, -3);
    const cardLabel = language === "zh" ? `咨询 ${name}` : `Enquire about ${name}`;
    return `<button class="domain-card" type="button" data-inquire="${name}" aria-label="${cardLabel}">
      <span class="card-top"><span class="card-number">${String(index + 1).padStart(2, "0")} / 08</span><span class="card-availability">${t.cardStatus}</span></span>
      <span class="domain-name">${label}<span class="tld">.si</span></span>
      <span class="card-bottom"><span class="card-price">${t.cardPrice}</span><span class="card-arrow" aria-hidden="true">↗</span></span>
    </button>`;
  }).join("");
}

function renderLanguage() {
  const t = messages[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  document.querySelector('meta[property="og:title"]').content = t.title;
  document.querySelector('meta[property="og:description"]').content = t.ogDescription;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t[element.dataset.i18nHtml];
  });
  document.querySelector(".brand").setAttribute("aria-label", t.brandLabel);
  document.querySelector(".collection-count").setAttribute("aria-label", t.countLabel);
  document.getElementById("dialog-close").setAttribute("aria-label", t.closeLabel);
  document.getElementById("dialog-prefix").textContent = t.dialogPrefix;
  document.getElementById("dialog-period").textContent = t.dialogPeriod;
  const toggle = document.getElementById("language-toggle");
  toggle.textContent = language === "zh" ? "EN" : "中文";
  toggle.lang = language === "zh" ? "en" : "zh-CN";
  toggle.setAttribute("aria-label", language === "zh" ? "切换到英文" : "Switch to Chinese");
  const emailLink = document.getElementById("contact-email");
  emailLink.textContent = contact.email;
  emailLink.href = `mailto:${contact.email}?subject=${encodeURIComponent(t.subjectGeneral)}`;
  renderGrid();
}

renderLanguage();

function inquiryText() {
  if (language === "zh") {
    return currentDomain
      ? `您好，我对 ${currentDomain} 感兴趣。请提供报价、支持的 USDT 网络和过户方式。`
      : messages.zh.bodyGeneral;
  }
  return currentDomain
    ? `Hello, I am interested in ${currentDomain}. Please share the asking price, supported USDT network, and transfer details.`
    : messages.en.bodyGeneral;
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
  const t = messages[language];
  currentDomain = domain;
  dialogDomain.textContent = domain || t.dialogFallback;
  dialogActions.replaceChildren();
  const subject = domain
    ? language === "zh" ? `咨询域名 ${domain}` : `Enquiry about ${domain}`
    : t.subjectGeneral;
  const body = inquiryText();

  if (contact.email) {
    addAction(t.emailOwner, `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }
  if (contact.whatsapp) {
    const number = contact.whatsapp.replace(/\D/g, "");
    addAction("WhatsApp ↗", `https://wa.me/${number}?text=${encodeURIComponent(body)}`);
  }

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "dialog-action secondary";
  copy.textContent = t.copyEnquiry;
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      copy.textContent = t.copied;
      window.setTimeout(() => { copy.textContent = t.copyEnquiry; }, 2200);
    } catch {
      copy.textContent = t.copyUnavailable;
    }
  });
  dialogActions.append(copy);

  dialogNote.textContent = contact.email || contact.whatsapp
    ? t.sentNote
    : t.pendingNote;
  if (cursor && pointerIsFine.matches) dialog.append(cursor);
  dialog.showModal();
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-inquire]");
  if (card) openEnquiry(card.dataset.inquire);
});
document.getElementById("language-toggle").addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  try { window.localStorage.setItem("si-select-language", language); } catch { /* Keep the selected language for this visit. */ }
  renderLanguage();
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
    cursor.classList.toggle("on-dark", event.target instanceof Element && event.target.closest(".contact-bar") !== null);
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
