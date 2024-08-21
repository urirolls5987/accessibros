// Enhanced Accessibility Widget Script

(function () {
  // Initialize the widget
  function initAccessibilityWidget() {
    const widget = createWidgetElement();
    document.body.appendChild(widget);

    // Load saved settings
    loadSettings();

    // Apply initial styles
    applyStyles();

    // Set initial size
    resizeWidget();

    // Add resize event listener
    window.addEventListener('resize', resizeWidget);
  }

  // Create the widget element
  function createWidgetElement() {
    const widget = document.createElement("div");
    widget.classList.add("asw-widget");
    widget.innerHTML = `
      <button class="asw-menu-btn" aria-label="Toggle Accessibility Menu">
        <span class="material-icons md-36 white">accessibility_new</span>
      </button>
      <div class="asw-menu" style="display: none;">
        <div class="asw-menu-header">
          <div>Accessibility Options</div>
          <div>
            <div role="button" class="asw-menu-reset" title="Reset Settings">
              <span class="material-icons">restart_alt</span>
            </div>
            <div role="button" class="asw-menu-close" title="Close Accessibility Menu">
              <span class="material-icons">close</span>
            </div>
          </div>
        </div>
        <div class="asw-menu-content">
          <div class="asw-section">
            <h3>Text Editing</h3>
            <div class="asw-font-size-control">
              <button class="asw-btn asw-icon-btn" data-action="decreaseFontSize">
                <span class="material-icons">remove</span>
              </button>
              <div class="asw-font-size-bar">
                <div class="asw-font-size-value">100%</div>
              </div>
              <button class="asw-btn asw-icon-btn" data-action="increaseFontSize">
                <span class="material-icons">add</span>
              </button>
            </div>
            <div class="asw-text-controls">
              <button class="asw-btn" data-action="decreaseLineHeight">
                <span class="material-icons">format_line_spacing</span>
                <span class="asw-translate">Line -</span>
              </button>
              <button class="asw-btn" data-action="increaseLineHeight">
                <span class="material-icons">format_line_spacing</span>
                <span class="asw-translate">Line +</span>
              </button>
              <button class="asw-btn" data-action="decreaseLetterSpacing">
                <span class="material-icons">text_rotation_none</span>
                <span class="asw-translate">Spacing -</span>
              </button>
              <button class="asw-btn" data-action="increaseLetterSpacing">
                <span class="material-icons">text_rotation_none</span>
                <span class="asw-translate">Spacing +</span>
              </button>
            </div>
          </div>
          <div class="asw-section">
            <h3>Fonts</h3>
            <div class="asw-items">
              <button class="asw-btn" data-action="toggleFontWeight">
                <span class="material-icons">format_bold</span>
                <span class="asw-translate">Font Weight</span>
              </button>
              <button class="asw-btn" data-action="toggleHighlightURLs">
                <span class="material-icons">link</span>
                <span class="asw-translate">Highlight URLs</span>
              </button>
              <button class="asw-btn" data-action="toggleHighlightTitles">
                <span class="material-icons">title</span>
                <span class="asw-translate">Highlight Titles</span>
              </button>
              <button class="asw-btn" data-action="toggleDyslexicFont">
                <span class="material-icons">spellcheck</span>
                <span class="asw-translate">Dyslexic Font</span>
              </button>
            </div>
          </div>
          <div class="asw-section">
            <h3>Features</h3>
            <div class="asw-items">
              <button class="asw-btn" data-action="toggleBigCursor">
                <span class="material-icons">mouse</span>
                <span class="asw-translate">Big Cursor</span>
              </button>
              <button class="asw-btn" data-action="toggleScreenReader">
                <span class="material-icons">hearing</span>
                <span class="asw-translate">Screen Reader</span>
              </button>
              <button class="asw-btn" data-action="toggleStopAnimations">
                <span class="material-icons">animation</span>
                <span class="asw-translate">Stop Animations</span>
              </button>
              <button class="asw-btn" data-action="toggleReadingGuide">
                <span class="material-icons">remove_red_eye</span>
                <span class="asw-translate">Reading Guide</span>
              </button>
            </div>
          </div>
        </div>
        <a href="https://www.brightwaysaccess.com/" target="_blank" rel="noopener noreferrer" class="asw-banner">
          Provided by Brightways Accessibility
        </a>
      </div>
    `;

    addEventListeners(widget);
    return widget;
  }


  // Add event listeners to widget elements
  function addEventListeners(widget) {
    const toggleBtn = widget.querySelector(".asw-menu-btn");
    const menu = widget.querySelector(".asw-menu");
    const closeBtn = widget.querySelector(".asw-menu-close");
    const resetBtn = widget.querySelector(".asw-menu-reset");
    const actionBtns = widget.querySelectorAll(".asw-btn");

    toggleBtn.addEventListener("click", () => {
      menu.style.display = menu.style.display === "none" ? "block" : "none";
    });

    closeBtn.addEventListener("click", () => {
      menu.style.display = "none";
    });

    resetBtn.addEventListener("click", resetSettings);

    actionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        if (typeof window[action] === "function") {
          window[action]();
          btn.classList.toggle("asw-selected");
          saveSettings();
        }
      });
    });
  }

  // Accessibility Features

  // Increase font size
  window.increaseFontSize = function () {
    adjustFontSize(0.1);
  };

  // Decrease font size
  window.decreaseFontSize = function () {
    adjustFontSize(-0.1);
  };

  // Adjust font size
  function adjustFontSize(delta) {
    const currentSize = parseFloat(localStorage.getItem("fontSize") || 1);
    const newSize = Math.max(0.5, Math.min(2, currentSize + delta));
    document.documentElement.style.setProperty("--font-size-multiplier", newSize);
    localStorage.setItem("fontSize", newSize);
    updateFontSizeDisplay(newSize);
  }

  function updateFontSizeDisplay(size) {
    const fontSizeValue = document.querySelector(".asw-font-size-value");
    if (fontSizeValue) {
      fontSizeValue.textContent = `${Math.round(size * 100)}%`;
    }
  }

  // New function: Toggle Font Weight
  window.toggleFontWeight = function () {
      document.body.classList.toggle("bold-text");
      localStorage.setItem("boldText", document.body.classList.contains("bold-text"));
  };

  // // New function: Toggle Highlight Texts
  // window.toggleHighlightTexts = function () {
  //     document.body.classList.toggle("highlight-texts");
  //     localStorage.setItem("highlightTexts", document.body.classList.contains("highlight-texts"));
  // };

    // New function: Toggle Highlight URLs
window.toggleHighlightURLs = function () {
  document.body.classList.toggle("highlight-urls");
  localStorage.setItem("highlightURLs", document.body.classList.contains("highlight-urls"));
};

// New function: Toggle Highlight Titles
window.toggleHighlightTitles = function () {
  document.body.classList.toggle("highlight-titles");
  localStorage.setItem("highlightTitles", document.body.classList.contains("highlight-titles"));
};

  // Increase line height
  window.increaseLineHeight = function () {
    adjustLineHeight(0.1);
  };

  // Decrease line height
  window.decreaseLineHeight = function () {
    adjustLineHeight(-0.1);
  };

  // Adjust line height
  function adjustLineHeight(delta) {
    const currentHeight = parseFloat(localStorage.getItem("lineHeight") || 1);
    const newHeight = Math.max(1, Math.min(2, currentHeight + delta));
    document.documentElement.style.setProperty("--line-height-multiplier", newHeight);
    localStorage.setItem("lineHeight", newHeight);
  }

  // Increase letter spacing
  window.increaseLetterSpacing = function () {
    adjustLetterSpacing(0.5);
  };

  // Decrease letter spacing
  window.decreaseLetterSpacing = function () {
    adjustLetterSpacing(-0.5);
  };

  // Adjust letter spacing
  function adjustLetterSpacing(delta) {
    const currentSpacing = parseFloat(localStorage.getItem("letterSpacing") || 0);
    const newSpacing = Math.max(0, Math.min(5, currentSpacing + delta));
    document.documentElement.style.setProperty("--letter-spacing", `${newSpacing}px`);
    localStorage.setItem("letterSpacing", newSpacing);
  }

  // Toggle dyslexic font
  window.toggleDyslexicFont = function () {
    document.body.classList.toggle("dyslexic-font");
    localStorage.setItem("dyslexicFont", document.body.classList.contains("dyslexic-font"));
  };

  // Toggle high contrast
  window.toggleHighContrast = function () {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
  };

  // Toggle monochrome
  window.toggleMonochrome = function () {
    document.body.classList.toggle("monochrome");
    localStorage.setItem("monochrome", document.body.classList.contains("monochrome"));
  };

  // // Toggle highlight links
  // window.toggleHighlightLinks = function () {
  //   document.body.classList.toggle("highlight-links");
  //   localStorage.setItem("highlightLinks", document.body.classList.contains("highlight-links"));
  // };

  // Toggle big cursor
  window.toggleBigCursor = function () {
    document.body.classList.toggle("big-cursor");
    localStorage.setItem("bigCursor", document.body.classList.contains("big-cursor"));
  };

  // Screen Reader Toggle
  window.toggleScreenReader = function () {
    const isScreenReaderEnabled = document.body.classList.toggle("screen-reader-enabled");
    localStorage.setItem("screenReaderEnabled", isScreenReaderEnabled);

    if (isScreenReaderEnabled) {
      const utterance = new SpeechSynthesisUtterance(document.body.textContent);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  // Reading Guide Toggle
  window.toggleReadingGuide = function () {
    const isReadingGuideEnabled = document.body.classList.toggle("reading-guide-enabled");
    localStorage.setItem("readingGuideEnabled", isReadingGuideEnabled);

    if (isReadingGuideEnabled) {
      createReadingGuide();
    } else {
      removeReadingGuide();
    }
  };

  function createReadingGuide() {
    const readingGuide = document.createElement("div");
    readingGuide.classList.add("reading-guide");
    document.body.appendChild(readingGuide);

    document.addEventListener("mousemove", moveReadingGuide);
  }

  function removeReadingGuide() {
    const readingGuide = document.querySelector(".reading-guide");
    if (readingGuide) {
      readingGuide.remove();
    }
    document.removeEventListener("mousemove", moveReadingGuide);
  }

  function moveReadingGuide(e) {
    const readingGuide = document.querySelector(".reading-guide");
    if (readingGuide) {
      readingGuide.style.top = `${e.clientY}px`;
    }
  }

  // Stop Animations Toggle
  window.toggleStopAnimations = function () {
    const isStopAnimationsEnabled = document.body.classList.toggle("stop-animations");
    localStorage.setItem("stopAnimations", isStopAnimationsEnabled);

    const styleElement = document.getElementById("stop-animations-style");
    if (isStopAnimationsEnabled) {
      if (!styleElement) {
        const style = document.createElement("style");
        style.id = "stop-animations-style";
        style.textContent = `
          * {
            animation: none !important;
            transition: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    } else {
      if (styleElement) {
        styleElement.remove();
      }
    }
  };

  function resetSettings() {
      // Reset CSS custom properties
      document.documentElement.style.removeProperty("--font-size-multiplier");
      document.documentElement.style.removeProperty("--line-height-multiplier");
      document.documentElement.style.removeProperty("--letter-spacing");
    
      // Remove all accessibility-related classes from the body
      document.body.classList.remove(
        "dyslexic-font",
        "bold-text",
        "highlight-urls",
        "highlight-titles",
        "big-cursor",
        "screen-reader-enabled",
        "reading-guide-enabled",
        "stop-animations"
      );
    
      // Clear all localStorage items
      localStorage.clear();
    
      // Remove 'selected' class from all buttons
      document.querySelectorAll(".asw-btn").forEach((btn) => btn.classList.remove("asw-selected"));
    
      // Reset font size display
      updateFontSizeDisplay(1);
    
      // Remove reading guide if it exists
      removeReadingGuide();
    
      // Remove stop animations style if it exists
      const stopAnimationsStyle = document.getElementById("stop-animations-style");
      if (stopAnimationsStyle) {
        stopAnimationsStyle.remove();
      }
    
      // Reset screen reader (if it was enabled)
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }

  // Load settings
  function loadSettings() {
      const fontSize = localStorage.getItem("fontSize");
    if (fontSize) {
      document.documentElement.style.setProperty("--font-size-multiplier", fontSize);
      updateFontSizeDisplay(parseFloat(fontSize));
    }

    const lineHeight = localStorage.getItem("lineHeight");
    if (lineHeight) document.documentElement.style.setProperty("--line-height-multiplier", lineHeight);

    const letterSpacing = localStorage.getItem("letterSpacing");
    if (letterSpacing) document.documentElement.style.setProperty("--letter-spacing", `${letterSpacing}px`);

    if (localStorage.getItem("dyslexicFont") === "true") document.body.classList.add("dyslexic-font");
    if (localStorage.getItem("highContrast") === "true") document.body.classList.add("high-contrast");
    if (localStorage.getItem("monochrome") === "true") document.body.classList.add("monochrome");
  //   if (localStorage.getItem("highlightLinks") === "true") document.body.classList.add("highlight-links");
    if (localStorage.getItem("bigCursor") === "true") document.body.classList.add("big-cursor");
    if (localStorage.getItem("boldText") === "true") document.body.classList.add("bold-text");
    if (localStorage.getItem("highlightURLs") === "true") document.body.classList.add("highlight-urls");
    if (localStorage.getItem("highlightTitles") === "true") document.body.classList.add("highlight-titles");  
  //   if (localStorage.getItem("highlightTexts") === "true") document.body.classList.add("highlight-texts");  
    if (localStorage.getItem("screenReaderEnabled") === "true") document.body.classList.add("screen-reader-enabled");
    if (localStorage.getItem("readingGuideEnabled") === "true") {
      document.body.classList.add("reading-guide-enabled");
      createReadingGuide();
    }
    if (localStorage.getItem("stopAnimations") === "true") {
      document.body.classList.add("stop-animations");
      window.toggleStopAnimations();
    }

    document.querySelectorAll(".asw-btn").forEach((btn) => {
      const action = btn.dataset.action;
      if (localStorage.getItem(action) === "true") {
        btn.classList.add("asw-selected");
      }
    });
  }

  function resizeWidget() {
      const menu = document.querySelector('.asw-menu');
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      
      // Set max height to 90% of viewport height or 600px, whichever is smaller
      const maxHeight = Math.min(vh * 0.9, 600);
      menu.style.maxHeight = `${maxHeight}px`;
      
      // Set width to 25% of viewport width, with min 300px and max 450px
      const width = Math.max(300, Math.min(vw * 0.25, 450));
      menu.style.width = `${width}px`;
    }
// Apply styles
function applyStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap");
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

    :root {
      --font-size-multiplier: 1;
      --line-height-multiplier: 1;
      --letter-spacing: 0px;
      --text-contrast: 1;
      --widget-bg-color: #fff5e6;
      --widget-text-color: #333;
      --widget-border-color: #ffd699;
      --widget-highlight-color: #ffcc66;
    }

    body {
      font-size: calc(1rem * var(--font-size-multiplier));
      line-height: calc(1.5 * var(--line-height-multiplier));
      letter-spacing: var(--letter-spacing);
    }

    .asw-menu {
      font-family: "Inter", sans-serif;
      position: fixed;
      right: 20px;
      top: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
      opacity: 1;
      transition: 0.3s;
      z-index: 500000;
      background: var(--widget-bg-color);
      line-height: 1;
      font-size: 16px;
      letter-spacing: 0.015em;
      color: var(--widget-text-color);
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      overflow: hidden;
    }

    .asw-menu-content {
      overflow-y: auto;
      flex-grow: 1;
      padding: 15px;
    }

    .asw-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid var(--widget-border-color);
      background-color: var(--widget-highlight-color);
    }

    .asw-menu-header > div {
      display: flex;
    }

    .asw-menu-header div[role="button"] {
      padding: 8px;
      cursor: pointer;
      color: var(--widget-text-color);
    }

    .asw-menu-header div[role="button"]:hover {
      opacity: 0.8;
    }

    .asw-section {
      background-color: #fff;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
    }

    .asw-section h3 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 600;
    }

    .asw-items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .asw-btn {
      border-radius: 4px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      color: var(--widget-text-color);
      font-size: 14px !important;
      background: var(--widget-bg-color);
      border: 1px solid var(--widget-border-color);
      transition: all 0.3s ease;
      cursor: pointer;
      line-height: 1.2;
    }

    .asw-btn .material-icons {
      margin-bottom: 5px;
      font-size: 20px;
    }

    .asw-btn:hover {
      background-color: var(--widget-highlight-color);
    }

    .asw-btn.asw-selected {
      background-color: var(--widget-highlight-color);
      font-weight: bold;
    }

    .asw-menu-btn {
      position: fixed;
      z-index: 500000;
      right: 20px;
      bottom: 20px;
      background: var(--widget-highlight-color);
      box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
      transition: 0.3s;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
    }

    .asw-menu-btn:hover {
      transform: scale(1.1);
    }

    .material-icons.md-36.white {
      font-size: 36px;
      color: var(--widget-text-color);
    }

    .asw-font-size-control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;
    }

    .asw-font-size-bar {
      flex-grow: 1;
      height: 10px;
      background-color: var(--widget-border-color);
      border-radius: 5px;
      margin: 0 10px;
      position: relative;
    }

    .asw-font-size-value {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      font-weight: bold;
    }

    .asw-icon-btn {
      padding: 5px;
      width: 30px;
      height: 30px;
    }

    .asw-text-controls {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .asw-banner {
      background-color: var(--widget-highlight-color);
      color: var(--widget-text-color);
      text-align: center;
      padding: 10px;
      font-weight: bold;
      border-top: 1px solid var(--widget-border-color);
      text-decoration: none;
    }

    @font-face {
      font-family: "OpenDyslexic3";
      src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"),
           url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");
    }

    body.dyslexic-font {
      font-family: "OpenDyslexic3", sans-serif;
    }

    body.bold-text {
      font-weight: bold !important;
    }

    body.highlight-urls a {
      background-color: yellow;
      color: #000000;
    }

    body.highlight-titles h1, body.highlight-titles h2, body.highlight-titles h3, 
    body.highlight-titles h4, body.highlight-titles h5, body.highlight-titles h6 {
      background-color: #ffcc66;
      color: #000000;
      padding: 5px;
    }
      body.big-cursor,
    body.big-cursor * {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Cpath d='M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2' fill='%23000000' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E"), auto;
    }

    .reading-guide {
      position: fixed;
      left: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(255, 255, 0, 0.2);
      pointer-events: none;
      z-index: 9999;
    }

    @media only screen and (max-width: 600px) {
      .asw-menu {
        width: 90vw;
        left: 5vw;
        right: 5vw;
      }

      .asw-items {
        grid-template-columns: 1fr;
      }

      .asw-text-controls {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize the widget when the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAccessibilityWidget);
} else {
  initAccessibilityWidget();
}
})();