console.log("Accessibility script loaded");

window.AccessibilityWidget = {
  toggleMenu: function () {
    console.log("Toggle menu called");
    var menu = document.getElementById("aswMenu");
    if (menu.style.display === "none") {
      menu.style.display = "block";
      window.parent.postMessage({ type: "toggleMenu", open: true }, "*");
    } else {
      menu.style.display = "none";
      window.parent.postMessage({ type: "toggleMenu", open: false }, "*");
    }
  },

  applyStyles: function (styles) {
    window.parent.postMessage({ type: "applyStyles", styles: styles }, "*");
  },

  adjustFontSize: function (multiply = 0) {
    console.log("Adjusting font size");
    const storedPercentage = parseFloat(localStorage.getItem("fontPercentage"));
    if (multiply) {
      if (storedPercentage) {
        const newPercentage = storedPercentage + multiply;
        localStorage.setItem("fontPercentage", newPercentage);
      } else {
        const newPercentage = 1 + multiply;
        localStorage.setItem("fontPercentage", newPercentage);
      }
    }
    const percentage = parseFloat(localStorage.getItem("fontPercentage")) || 1;
    this.applyStyles(`* { font-size: ${percentage * 100}% !important; }`);
  },

  adjustLetterSpacing: function (increment = 0) {
    console.log("Adjusting letter spacing");
    let isLetterSpacingEnabled = parseInt(
      localStorage.getItem("isLetterSpacingEnabled")
    );
    if (!increment) {
      isLetterSpacingEnabled = !isLetterSpacingEnabled;
      increment = 0.1;
    }
    if (!isLetterSpacingEnabled) {
      this.applyStyles(`* { letter-spacing: ${increment}em !important; }`);
      localStorage.setItem("isLetterSpacingEnabled", 1);
    } else {
      this.applyStyles(`* { letter-spacing: normal !important; }`);
      localStorage.setItem("isLetterSpacingEnabled", 0);
    }
  },

  enableDyslexicFont: function (load = false) {
    console.log("Toggling dyslexic font");
    let isDyslexicFontEnabled = parseInt(
      localStorage.getItem("isDyslexicFontEnabled")
    );
    if (load) {
      isDyslexicFontEnabled = !isDyslexicFontEnabled;
    }
    if (!isDyslexicFontEnabled) {
      this.applyStyles(
        `* { font-family: OpenDyslexic3, sans-serif !important; }`
      );
      localStorage.setItem("isDyslexicFontEnabled", 1);
    } else {
      this.applyStyles(`* { font-family: inherit !important; }`);
      localStorage.setItem("isDyslexicFontEnabled", 0);
    }
  },

  enableBigCursor: function (load = false) {
    console.log("Toggling big cursor");
    let isBigCursorEnabled = parseInt(
      localStorage.getItem("isBigCursorEnabled")
    );
    if (load) {
      isBigCursorEnabled = !isBigCursorEnabled;
    }
    if (!isBigCursorEnabled) {
      this.applyStyles(
        `* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default !important; }`
      );
      localStorage.setItem("isBigCursorEnabled", 1);
    } else {
      this.applyStyles(`* { cursor: default !important; }`);
      localStorage.setItem("isBigCursorEnabled", 0);
    }
  },

  enableHighlightLinks: function (load = false) {
    console.log("Toggling highlight links");
    let isHighlightLinks = parseInt(localStorage.getItem("isHighlightLinks"));
    if (load) {
      isHighlightLinks = !isHighlightLinks;
    }
    if (!isHighlightLinks) {
      this.applyStyles(
        `a, button { text-decoration: underline !important; font-weight: 800 !important; font-size: 110% !important; color: #ff0000 !important; }`
      );
      localStorage.setItem("isHighlightLinks", 1);
    } else {
      this.applyStyles(
        `a, button { text-decoration: inherit !important; font-weight: inherit !important; font-size: inherit !important; color: inherit !important; }`
      );
      localStorage.setItem("isHighlightLinks", 0);
    }
  },

  enableHighlightHeadings: function (load = false) {
    console.log("Toggling highlight headings");
    let isHighlightHeadings = parseInt(
      localStorage.getItem("isHighlightHeadings")
    );
    if (load) {
      isHighlightHeadings = !isHighlightHeadings;
    }
    if (!isHighlightHeadings) {
      this.applyStyles(
        `h1, h2, h3, heading1 { color: #ff0000 !important; text-decoration: underline !important; }`
      );
      localStorage.setItem("isHighlightHeadings", 1);
    } else {
      this.applyStyles(
        `h1, h2, h3, heading1 { color: inherit !important; text-decoration: inherit !important; }`
      );
      localStorage.setItem("isHighlightHeadings", 0);
    }
  },

  adjustLineHeight: function (increment = 0) {
    console.log("Adjusting line height");
    let isLineHeightEnabled = parseInt(
      localStorage.getItem("isLineHeightEnabled")
    );
    if (!increment) {
      isLineHeightEnabled = !isLineHeightEnabled;
      increment = 1;
    }
    if (!isLineHeightEnabled) {
      this.applyStyles(`* { line-height: ${1.5 + increment} !important; }`);
      localStorage.setItem("isLineHeightEnabled", 1);
    } else {
      this.applyStyles(`* { line-height: normal !important; }`);
      localStorage.setItem("isLineHeightEnabled", 0);
    }
  },

  adjustFontWeight: function (increment = 100) {
    console.log("Adjusting font weight");
    let isFontWeightEnabled = parseInt(
      localStorage.getItem("isFontWeightEnabled")
    );
    if (increment === 100) {
      isFontWeightEnabled = !isFontWeightEnabled;
      increment = 400;
    }
    if (!isFontWeightEnabled) {
      this.applyStyles(`* { font-weight: ${400 + increment} !important; }`);
      localStorage.setItem("isFontWeightEnabled", 1);
    } else {
      this.applyStyles(`* { font-weight: normal !important; }`);
      localStorage.setItem("isFontWeightEnabled", 0);
    }
  },

  adjustContrast: function (load = false) {
    console.log("Adjusting contrast");
    let isContrastEnabled = parseInt(localStorage.getItem("isContrastEnabled"));
    if (load) {
      isContrastEnabled = !isContrastEnabled;
    }
    if (!isContrastEnabled) {
      this.applyStyles(
        `* { color: #ffff00 !important; background-color: #0000ff !important; }`
      );
      localStorage.setItem("isContrastEnabled", 1);
    } else {
      this.applyStyles(
        `* { color: inherit !important; background-color: inherit !important; }`
      );
      localStorage.setItem("isContrastEnabled", 0);
    }
  },

  reset: function () {
    console.log("Resetting all settings");
    localStorage.clear();
    this.onPageLoad();
  },

  onPageLoad: function () {
    console.log("Running onPageLoad function");
    this.adjustFontSize();
    this.adjustLetterSpacing();
    this.enableDyslexicFont(true);
    this.enableBigCursor(true);
    this.enableHighlightLinks(true);
    this.enableHighlightHeadings(true);
    this.adjustLineHeight();
    this.adjustFontWeight();
    this.adjustContrast(true);
  },

  attachEventListeners: function () {
    console.log("Attaching event listeners");
    document
      .querySelector(".asw-menu-btn")
      .addEventListener("click", this.toggleMenu.bind(this));
    document
      .querySelector(".asw-menu-close")
      .addEventListener("click", this.toggleMenu.bind(this));
    document
      .querySelector(".asw-menu-reset")
      .addEventListener("click", this.reset.bind(this));
    document
      .getElementById("increaseFontSize")
      .addEventListener("click", () => this.adjustFontSize(0.1));
    document
      .getElementById("decreaseFontSize")
      .addEventListener("click", () => this.adjustFontSize(-0.1));
    document
      .getElementById("adjustLineHeight")
      .addEventListener("click", () => this.adjustLineHeight(1));
    document
      .getElementById("adjustLetterSpacing")
      .addEventListener("click", () => this.adjustLetterSpacing(0.1));
    document
      .getElementById("enableDyslexicFont")
      .addEventListener("click", () => this.enableDyslexicFont());
    document
      .getElementById("enableHighlightHeadings")
      .addEventListener("click", () => this.enableHighlightHeadings());
    document
      .getElementById("enableHighlightLinks")
      .addEventListener("click", () => this.enableHighlightLinks());
    document
      .getElementById("adjustFontWeight")
      .addEventListener("click", () => this.adjustFontWeight(400));
    document
      .getElementById("enableBigCursor")
      .addEventListener("click", () => this.enableBigCursor());
    document
      .getElementById("adjustContrast")
      .addEventListener("click", () => this.adjustContrast());
  },

  init: function () {
    console.log("Initializing accessibility widget");
    this.onPageLoad();
    this.attachEventListeners();
    // Notify the parent window that the widget is ready
    window.parent.postMessage({ type: "widgetReady" }, "*");
  },
};

// Initialize the widget when the script loads
window.AccessibilityWidget.init();
