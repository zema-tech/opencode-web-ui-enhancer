// ==UserScript==
// @name         OpenCode Web UI Enhancer
// @namespace    https://github.com/zema-tech/opencode-web-ui-enhancer
// @version      0.1.0
// @description  Inject Claude+Grok inspired styles into opencode web without modifying OpenCode source.
// @author       zema-tech
// @match        http://127.0.0.1:*/*
// @match        http://localhost:*/*
// @match        http://0.0.0.0:*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const STYLE_ID = "ocx-web-ui-enhancer";

  const CSS = `
:root {
  --ocx-bg: #0a0a0a;
  --ocx-surface: #141414;
  --ocx-surface-2: #1c1c1c;
  --ocx-border: rgba(255, 255, 255, 0.08);
  --ocx-text: #e8e6e3;
  --ocx-muted: #8a8680;
  --ocx-accent: #d97757;
  --ocx-accent-soft: rgba(217, 119, 87, 0.15);
  --ocx-radius-sm: 8px;
  --ocx-radius-md: 14px;
  --ocx-radius-lg: 20px;
  --ocx-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

html, body {
  background: var(--ocx-bg) !important;
  color: var(--ocx-text) !important;
}

body, #root, #app, main, [data-page] {
  background-color: var(--ocx-bg) !important;
  color: var(--ocx-text) !important;
}

aside, [class*="sidebar" i], [class*="Sidebar"], nav[class] {
  background: var(--ocx-surface) !important;
  border-color: var(--ocx-border) !important;
}

[class*="card" i], [class*="panel" i], [class*="Panel"], [role="dialog"] {
  background: var(--ocx-surface-2) !important;
  border-color: var(--ocx-border) !important;
  border-radius: var(--ocx-radius-md) !important;
  box-shadow: var(--ocx-shadow);
}

textarea, [contenteditable="true"], [class*="composer" i], [class*="prompt" i] {
  background: var(--ocx-surface-2) !important;
  color: var(--ocx-text) !important;
  border: 1px solid var(--ocx-border) !important;
  border-radius: var(--ocx-radius-lg) !important;
  box-shadow: var(--ocx-shadow);
}

textarea:focus, [contenteditable="true"]:focus {
  outline: none !important;
  border-color: color-mix(in srgb, var(--ocx-accent) 55%, var(--ocx-border)) !important;
  box-shadow: 0 0 0 3px var(--ocx-accent-soft), var(--ocx-shadow) !important;
}

button, [role="button"] {
  border-radius: var(--ocx-radius-sm) !important;
}

pre {
  background: #0f0f0f !important;
  border-radius: var(--ocx-radius-sm) !important;
}

a { color: var(--ocx-accent) !important; }

*::-webkit-scrollbar { width: 10px; height: 10px; }
*::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.14);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: content-box;
}
`;

  function inject() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  inject();

  // Re-inject if the app replaces head/root aggressively
  const obs = new MutationObserver(() => inject());
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
