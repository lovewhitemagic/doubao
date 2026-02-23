(function () {
  const THEME_KEY = "md_theme_v1";
  const LANG_KEY = "md_lang_v1";

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

  function getLang() {
    return localStorage.getItem(LANG_KEY) || "en";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    const isZh = getLang() === "zh";
    document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
      btn.textContent = isZh
        ? theme === "dark"
          ? "浅色"
          : "深色"
        : theme === "dark"
          ? "Light"
          : "Dark";
    });
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    localStorage.setItem(LANG_KEY, lang);
    const theme = getTheme();
    document.querySelectorAll('[data-action="toggle-lang"]').forEach((btn) => {
      btn.textContent = lang === "zh" ? "English" : "中文";
    });
    document.querySelectorAll('[data-lang-title]').forEach((node) => {
      const val = node.getAttribute(lang === "zh" ? "data-title-zh" : "data-title-en");
      if (val) node.textContent = val;
    });
    applyTheme(theme);
    document.dispatchEvent(new CustomEvent("app:langchange", { detail: { lang } }));
  }

  function init() {
    applyLang(getLang());
    applyTheme(getTheme());

    document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        const next = getTheme() === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });

    document.querySelectorAll('[data-action="toggle-lang"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        const next = getLang() === "zh" ? "en" : "zh";
        applyLang(next);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
