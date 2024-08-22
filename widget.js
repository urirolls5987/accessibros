!(function () {
  // Toggles the accessibility menu and overlay display
  function toggleMenu() {
    const menu = document.querySelector(".asw-menu");
    const overlay = document.querySelector(".asw-overlay");
    const isMenuVisible = menu.style.display === "flex";

    menu.style.display = isMenuVisible ? "none" : "flex";
    overlay.style.display = menu.style.display;
    document.body.style.overflow = isMenuVisible ? "auto" : "hidden";
  }

  // Closes the accessibility menu and overlay
  function closeMenu() {
    const menu = document.querySelector(".asw-menu");
    const overlay = document.querySelector(".asw-overlay");

    menu.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Resets the accessibility settings to defaults
  function resetSettings() {
    settings = {};

    document.querySelectorAll(".asw-btn").forEach((btn) => {
      btn.classList.remove("asw-selected");
      btn.setAttribute("aria-pressed", "false");
    });

    document.querySelectorAll(".asw-amount").forEach((amount) => {
      amount.textContent = "100%";
    });

    applyFilter(null);
    applyStyles();
    updateTextAdjustments("font-size", 1);
    updateTextAdjustments("line-height", 1);
    updateTextAdjustments("letter-spacing", 0);
    updateBodyClasses();
    document.querySelector(".asw-reading-guide-overlay").style.display = "none";

    saveSettings();
  }

  // Handles button click events for accessibility features
  function handleButtonClick(event) {
    const btn = event.currentTarget;
    const key = btn.dataset.key;

    if (btn.classList.contains("asw-filter")) {
      document.querySelectorAll(".asw-filter").forEach((filterBtn) => {
        filterBtn.classList.remove("asw-selected");
        filterBtn.setAttribute("aria-pressed", "false");
      });

      settings.contrast = settings.contrast !== key ? key : null;
      if (settings.contrast) {
        btn.classList.add("asw-selected");
        btn.setAttribute("aria-pressed", "true");
      }

      applyFilter(settings.contrast);
    } else if (key === "reading-guide") {
      settings[key] = !settings[key];
      btn.classList.toggle("asw-selected", settings[key]);
      btn.setAttribute("aria-pressed", settings[key] ? "true" : "false");
      toggleReadingGuide();
    } else {
      settings[key] = !settings[key];
      btn.classList.toggle("asw-selected", settings[key]);
      btn.setAttribute("aria-pressed", settings[key] ? "true" : "false");
      applyStyles();
    }

    saveSettings();
  }

  // Handles adjustments for font-size, line-height, letter-spacing
  function handleAdjustment(event) {
    const control = event.currentTarget;
    const key = control.dataset.key;
    let value = parseFloat(settings[key]) || (key === "letter-spacing" ? 0 : 1);

    const step = key === "letter-spacing" ? 0.05 : 0.1;
    value += control.classList.contains("asw-minus") ? -step : step;
    
    // Set reasonable limits for each property
    const limits = {
      "font-size": { min: 0.8, max: 1.5 },
      "line-height": { min: 1, max: 2 },
      "letter-spacing": { min: -0.1, max: 0.5 }
    };
    
    value = Math.max(limits[key].min, Math.min(value, limits[key].max));
    value = parseFloat(value.toFixed(2));

    updateTextAdjustments(key, value);

    const percentage = key === "letter-spacing" 
      ? `${value > 0 ? "+" : ""}${Math.round(value * 100)}%`
      : `${Math.round(100 * value)}%`;
    control.closest(".asw-adjust-control").querySelector(".asw-amount").textContent = percentage;

    settings[key] = value;
    saveSettings();
  }

  // Updates text adjustments like font-size, line-height, letter-spacing
  function updateTextAdjustments(key, value) {
    document.querySelectorAll("body :not(.asw-widget):not(.asw-widget *)").forEach((element) => {
      if (key === "font-size") {
        let originalSize = element.getAttribute("data-asw-orgFontSize");
        if (!originalSize) {
          originalSize = parseFloat(window.getComputedStyle(element).getPropertyValue("font-size"));
          element.setAttribute("data-asw-orgFontSize", originalSize);
        }
        element.style.fontSize = originalSize * value + "px";
      } else if (key === "line-height") {
        element.style.lineHeight = value;
      } else if (key === "letter-spacing") {
        element.style.letterSpacing = value + "em";
      }
    });
  }

  // Applies the selected filter (contrast, monochrome, etc.)
  function applyFilter(filter) {
    let css = "";

    if (filter) {
      let filterStyle = "";
      switch (filter) {
        case "dark-contrast":
          filterStyle = "color: #fff !important; background-color: #000 !important;";
          break;
        case "light-contrast":
          filterStyle = "color: #000 !important; background-color: #FFF !important;";
          break;
        case "high-contrast":
          filterStyle = "-webkit-filter: contrast(125%); filter: contrast(125%);";
          break;
        case "monochrome":
          filterStyle = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
          break;
      }

      const elements = ["h1", "h2", "h3", "img", "p", "a", "button", "label", "li", "ol"];
      elements.forEach((element) => {
        css += `[data-asw-filter="${filter}"] ${element} { ${filterStyle} }`;
      });
    }

    updateStyles(css, "asw-filter-style");
    document.documentElement.setAttribute("data-asw-filter", filter || "");
  }

  // Applies additional styles based on user preferences
  function applyStyles() {
    let css = "";

    if (settings["dyslexic-font"]) {
      css += `
        @font-face {
          font-family: OpenDyslexic3;
          src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"),
               url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");
        }
        body.dyslexic-font {
          font-family: OpenDyslexic3, Comic Sans MS, Arial, sans-serif !important;
        }
      `;
    }

    if (settings["highlight-links"]) {
      css += `
        .highlight-links a[href] {
          outline: 2px solid #fde2aa !important;
        }
      `;
    }

    if (settings["highlight-titles"]) {
      css += `
        .highlight-titles h1, .highlight-titles h2, .highlight-titles h3, 
        .highlight-titles h4, .highlight-titles h5, .highlight-titles h6 {
          outline: 2px solid #fde2aa !important;
        }
      `;
    }

    if (settings["big-cursor"]) {
      css += `
        body.big-cursor {
          cursor: url("data:image/svg+xml,..."), auto !important;
        }
      `;
    }

    if (settings["stop-animations"]) {
      css += `
        body.stop-animations * {
          transition: none !important;
          animation: none !important;
        }
      `;
    }

    if (settings["font-weight"]) {
      css += `
        body.font-weight-bold * {
          font-weight: bold !important;
        }
      `;
    }

    css += `
      .asw-widget .asw-menu-footer {
        font-weight: bold;
      }
    `;

    updateStyles(css, "asw-content-style");
    updateBodyClasses();
  }

  // Toggles specific body classes based on settings
  function updateBodyClasses() {
    const features = ["dyslexic-font", "highlight-links", "highlight-titles", "big-cursor", "stop-animations", "font-weight-bold"];
    features.forEach((feature) => {
      document.body.classList.toggle(feature, !!settings[feature]);
    });
  }

  // Toggles the reading guide visibility and movement
  function toggleReadingGuide() {
    const overlay = document.querySelector(".asw-reading-guide-overlay");
    const isVisible = overlay.style.display === "block";

    overlay.style.display = isVisible ? "none" : "block";

    if (!isVisible) {
      const guideBar = overlay.querySelector(".asw-reading-guide-bar");
      guideBar.style.top = "50%";

      const moveGuide = (event) => {
        const topPosition = Math.max(0, Math.min(event.clientY - guideBar.offsetHeight / 2, window.innerHeight - guideBar.offsetHeight));
        guideBar.style.top = `${topPosition}px`;
      };

      document.addEventListener("mousemove", moveGuide);
    } else {
      document.removeEventListener("mousemove", moveGuide);
    }
  }

  // Updates the style element with new CSS
  function updateStyles(cssContent, styleId) {
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = cssContent;
  }

  // Saves the current settings to local storage
  function saveSettings() {
    localStorage.setItem("aswSettings", JSON.stringify(settings));
  }

  // Creates the widget HTML structure
  function createWidgetHTML() {
    return `
      <button class="asw-menu-btn" aria-label="Toggle Accessibility Menu">
        <span class="material-icons">accessibility_new</span>
      </button>
      <div class="asw-menu" style="display: none;">
        <button class="asw-menu-close" aria-label="Close Accessibility Menu">&times;</button>
        <h2>Accessibility Options</h2>
        <div class="asw-option-group">
          <h3>Text Adjustments</h3>
          <div class="asw-adjust-control" data-key="font-size">
            <span>Font Size</span>
            <div role="button" class="asw-minus" aria-label="Decrease Font Size">-</div>
            <span class="asw-amount">100%</span>
            <div role="button" class="asw-plus" aria-label="Increase Font Size">+</div>
          </div>
          <div class="asw-adjust-control" data-key="line-height">
            <span>Line Height</span>
            <div role="button" class="asw-minus" aria-label="Decrease Line Height">-</div>
            <span class="asw-amount">100%</span>
            <div role="button" class="asw-plus" aria-label="Increase Line Height">+</div>
          </div>
          <div class="asw-adjust-control" data-key="letter-spacing">
            <span>Letter Spacing</span>
            <div role="button" class="asw-minus" aria-label="Decrease Letter Spacing">-</div>
            <span class="asw-amount">0%</span>
            <div role="button" class="asw-plus" aria-label="Increase Letter Spacing">+</div>
          </div>
        </div>
        <div class="asw-option-group">
          <h3>Color Adjustments</h3>
          <button class="asw-btn asw-filter" data-key="dark-contrast">Dark Contrast</button>
          <button class="asw-btn asw-filter" data-key="light-contrast">Light Contrast</button>
          <button class="asw-btn asw-filter" data-key="high-contrast">High Contrast</button>
          <button class="asw-btn asw-filter" data-key="monochrome">Monochrome</button>
        </div>
        <div class="asw-option-group">
          <h3>Additional Options</h3>
          <button class="asw-btn" data-key="dyslexic-font">Dyslexic Font</button>
          <button class="asw-btn" data-key="highlight-links">Highlight Links</button>
          <button class="asw-btn" data-key="highlight-titles">Highlight Titles</button>
          <button class="asw-btn" data-key="big-cursor">Big Cursor</button>
          <button class="asw-btn" data-key="stop-animations">Stop Animations</button>
          <button class="asw-btn" data-key="reading-guide">Reading Guide</button>
          <button class="asw-btn" data-key="font-weight">Bold Text</button>
        </div>
        <button class="asw-menu-reset">Reset All</button>
        <div class="asw-menu-footer">Provided by Brightways Accessibility</div>
      </div>
      <div class="asw-overlay"></div>
      <div class="asw-reading-guide-overlay" style="display: none;">
        <div class="asw-reading-guide-bar"></div>
      </div>
    `;
  }

  // Initializes the widget and restores settings from local storage
  function initWidget() {
    const widget = document.createElement("div");
    widget.classList.add("asw-widget");
    widget.innerHTML = createWidgetHTML();
    document.body.appendChild(widget);

    // Restore settings from local storage
    const savedSettings = localStorage.getItem("aswSettings");
    if (savedSettings) {
      settings = JSON.parse(savedSettings);
      applySavedSettings();
    } else {
      settings = {}; // Initialize with empty settings if nothing is saved
    }

    // Set up event listeners
    setupEventListeners();

    // Apply initial styles
    applyStyles();
  }

  // Apply saved settings to the widget and document
  function applySavedSettings() {
    if (settings["font-size"]) {
      updateTextAdjustments("font-size", settings["font-size"]);
    }
    if (settings["line-height"]) {
      updateTextAdjustments("line-height", settings["line-height"]);
    }
    if (settings["letter-spacing"]) {
      updateTextAdjustments("letter-spacing", settings["letter-spacing"]);
    }

    if (settings.contrast) {
      applyFilter(settings.contrast);
    }

    applyStyles();

    // Update button states
    document.querySelectorAll(".asw-btn").forEach((btn) => {
      const key = btn.dataset.key;
      if (settings[key]) {
        btn.classList.add("asw-selected");
        btn.setAttribute("aria-pressed", "true");
      }
    });

    // Update adjustment control values
    ["font-size", "line-height", "letter-spacing"].forEach((key) => {
      if (settings[key]) {
        const control = document.querySelector(`.asw-adjust-control[data-key="${key}"]`);
        if (control) {
          const percentage = key === "letter-spacing" 
            ? `${settings[key] > 0 ? "+" : ""}${Math.round(settings[key] * 100)}%`
            : `${Math.round(100 * settings[key])}%`;
          control.querySelector(".asw-amount").textContent = percentage;
        }
      }
    });
  }

  // Set up all necessary event listeners
  function setupEventListeners() {
    const menuButton = document.querySelector(".asw-menu-btn");
    const closeButton = document.querySelector(".asw-menu-close");
    const resetButton = document.querySelector(".asw-menu-reset");
    const overlay = document.querySelector(".asw-overlay");
    const buttons = document.querySelectorAll(".asw-btn");
    const adjustmentControls = document.querySelectorAll('.asw-adjust-control div[role="button"]');

    menuButton.addEventListener("click", toggleMenu);
    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    resetButton.addEventListener("click", resetSettings);

    buttons.forEach((btn) => btn.addEventListener("click", handleButtonClick));
    adjustmentControls.forEach((control) => control.addEventListener("click", handleAdjustment));
  }

  let settings = {};

  // Initialize the widget when the DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})();