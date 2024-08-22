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

    // Add event listeners
    addEventListeners();
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
          Accessibility Options
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
          <div class="asw-card">
            <div class="asw-card-title">Text Adjustments</div>
            <div class="asw-adjust-control">
              <div class="asw-minus" data-key="font-size" role="button" aria-pressed="false">
                <span class="material-icons">remove</span>
              </div>
              <div class="asw-control-label">
                <span class="material-icons">format_size</span>
                <span class="asw-amount">100%</span>
              </div>
              <div class="asw-plus" data-key="font-size" role="button" aria-pressed="false">
                <span class="material-icons">add</span>
              </div>
            </div>
            <div class="asw-adjust-control">
              <div class="asw-minus" data-key="line-height" role="button" aria-pressed="false">
                <span class="material-icons">remove</span>
              </div>
              <div class="asw-control-label">
                <span class="material-icons">format_line_spacing</span>
                <span class="asw-amount">100%</span>
              </div>
              <div class="asw-plus" data-key="line-height" role="button" aria-pressed="false">
                <span class="material-icons">add</span>
              </div>
            </div>
            <div class="asw-adjust-control">
              <div class="asw-minus" data-key="letter-spacing" role="button" aria-pressed="false">
                <span class="material-icons">remove</span>
              </div>
              <div class="asw-control-label">
                <span class="material-icons">format_letter_spacing</span>
                <span class="asw-amount">100%</span>
              </div>
              <div class="asw-plus" data-key="letter-spacing" role="button" aria-pressed="false">
                <span class="material-icons">add</span>
              </div>
            </div>
            <div class="asw-items">
              <div class="asw-btn" role="button" aria-pressed="false" data-key="dyslexic-font">
                <span class="material-icons">spellcheck</span>Dyslexic Font
              </div>
              <div class="asw-btn" role="button" aria-pressed="false" data-key="font-weight">
                <span class="material-icons">format_bold</span>Bold Text
              </div>
              <div class="asw-btn" role="button" aria-pressed="false" data-key="highlight-links">
                <span class="material-icons">link</span>Highlight Links
              </div>
              <div class="asw-btn" role="button" aria-pressed="false" data-key="highlight-titles">
                <span class="material-icons">title</span>Highlight Titles
              </div>
            </div>
          </div>
          <div class="asw-divider"></div>
          <div class="asw-card">
            <div class="asw-card-title">Color Adjustments</div>
            <div class="asw-items">
              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="monochrome">
                <span class="material-icons">filter_b_and_w</span>Monochrome
              </div>
              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="high-contrast">
                <span class="material-icons">contrast</span>High Contrast
              </div>
              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="light-contrast">
                <span class="material-icons">brightness_5</span>Light Contrast
              </div>
              <div class="asw-btn asw-filter" role="button" aria-pressed="false" data-key="dark-contrast">
                <span class="material-icons">nightlight</span>Dark Contrast
              </div>
            </div>
          </div>
          <div class="asw-divider"></div>
          <div class="asw-card">
            <div class="asw-card-title">Tools</div>
            <div class="asw-items">
              <div class="asw-btn asw-tools" role="button" aria-pressed="false" data-key="big-cursor">
                <span class="material-icons">mouse</span>Big Cursor
              </div>
              <div class="asw-btn asw-tools" role="button" aria-pressed="false" data-key="stop-animations">
                <span class="material-icons">motion_photos_off</span>Stop Animations
              </div>
              <div class="asw-btn asw-tools" role="button" aria-pressed="false" data-key="reading-guide">
                <span class="material-icons">remove_red_eye</span>Reading Guide
              </div>
            </div>
          </div>
        </div>
        <div class="asw-footer">
          <a href="https://www.brightwaysaccess.com/" target="_blank" rel="noopener noreferrer">
            Provided by Brightways Accessibility
          </a>
        </div>
      </div>
      <div class="asw-overlay"></div>
    `;

    return widget;
  }

  // Add event listeners to widget elements
  function addEventListeners() {
    const menuBtn = document.querySelector('.asw-menu-btn');
    const menu = document.querySelector('.asw-menu');
    const closeBtn = document.querySelector('.asw-menu-close');
    const resetBtn = document.querySelector('.asw-menu-reset');
    const overlay = document.querySelector('.asw-overlay');
    const buttons = document.querySelectorAll('.asw-btn');
    const adjustControls = document.querySelectorAll('.asw-adjust-control div[role="button"]');

    menuBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    resetBtn.addEventListener('click', resetSettings);

    buttons.forEach(btn => btn.addEventListener('click', toggleSetting));
    adjustControls.forEach(btn => btn.addEventListener('click', adjustTextProperty));
  }

  // Toggle menu visibility
  function toggleMenu() {
    const menu = document.querySelector('.asw-menu');
    const overlay = document.querySelector('.asw-overlay');
    const isVisible = menu.style.display === 'block';

    menu.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = menu.style.display;
  }

  // Close menu
  function closeMenu() {
    const menu = document.querySelector('.asw-menu');
    const overlay = document.querySelector('.asw-overlay');

    menu.style.display = 'none';
    overlay.style.display = 'none';
  }

  // Reset all settings
  function resetSettings() {
    // Reset all states
    states = {};

    // Reset UI
    document.querySelectorAll('.asw-btn').forEach(btn => {
      btn.classList.remove('asw-selected');
      btn.setAttribute('aria-pressed', 'false');
    });

    document.querySelector('.asw-amount').textContent = 'Default';

    // Reset applied styles
    resetAppliedStyles();

    // Save settings
    saveSettings();
  }

  // Toggle individual setting
  function toggleSetting(event) {
    const button = event.currentTarget;
    const key = button.dataset.key;

    if (button.classList.contains('asw-filter')) {
      // Handle filter buttons (only one can be active at a time)
      document.querySelectorAll('.asw-filter').forEach(btn => {
        btn.classList.remove('asw-selected');
        btn.setAttribute('aria-pressed', 'false');
      });

      states.contrast = states.contrast !== key ? key : null;
      
      if (states.contrast) {
        button.classList.add('asw-selected');
        button.setAttribute('aria-pressed', 'true');
      }

      applyContrast(states.contrast);
    } else {
      // Handle other toggleable settings
      states[key] = !states[key];
      button.classList.toggle('asw-selected', states[key]);
      button.setAttribute('aria-pressed', states[key] ? 'true' : 'false');
      
      applyContentAdjustments();
    }

    saveSettings();
  }

  function adjustTextProperty(event) {
    const button = event.currentTarget;
    const key = button.dataset.key;
    let value = parseFloat(states[key]) || 1;

    if (button.classList.contains('asw-minus')) {
      value -= 0.1;
    } else {
      value += 0.1;
    }

    value = Math.max(0.5, Math.min(value, 2));
    value = parseFloat(value.toFixed(2));

    applyTextProperty(key, value);

    const displayText = value === 1 ? '100%' : `${Math.round(value * 100)}%`;
    button.parentElement.querySelector('.asw-amount').textContent = displayText;
    states[key] = value;
    saveSettings();
  }

  // Apply text property changes
  function applyTextProperty(property, value) {
    const elements = document.querySelectorAll('body :not(.asw-widget):not(.asw-widget *)');
    elements.forEach(element => {
      if (property === 'font-size') {
        let originalSize = element.getAttribute('data-asw-orgFontSize');
        if (!originalSize) {
          originalSize = parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'));
          element.setAttribute('data-asw-orgFontSize', originalSize);
        }
        element.style.fontSize = (originalSize * value) + 'px';
      } else if (property === 'line-height') {
        element.style.lineHeight = value;
      } else if (property === 'letter-spacing') {
        element.style.letterSpacing = (value - 1) + 'em';
      }
    });
  }


  // Adjust font size
  function adjustFontSize(event) {
    const button = event.currentTarget;
    let fontSize = parseFloat(states.fontSize) || 1;

    if (button.classList.contains('asw-minus')) {
      fontSize -= 0.1;
    } else {
      fontSize += 0.1;
    }

    fontSize = Math.max(0.1, Math.min(fontSize, 2));
    fontSize = parseFloat(fontSize.toFixed(2));

    applyFontSize(fontSize);

    let displayText = 'Default';
    if (fontSize !== 1) {
      displayText = fontSize > 1 ? '+' : '-';
      displayText += Math.abs(Math.round((fontSize - 1) * 100)) + '%';
    }

    document.querySelector('.asw-amount').textContent = displayText;
    states.fontSize = fontSize;
    saveSettings();
  }

  // Apply font size changes
  function applyFontSize(size) {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, dl, dt, li, ol, th, td, span').forEach(element => {
      if (!element.classList.contains('material-icons')) {
        let originalSize = element.getAttribute('data-asw-orgFontSize');
        if (!originalSize) {
          originalSize = parseInt(window.getComputedStyle(element, null).getPropertyValue('font-size'));
          element.setAttribute('data-asw-orgFontSize', originalSize);
        }
        element.style.fontSize = (originalSize * size) + 'px';
      }
    });
  }

  // Apply contrast changes
  function applyContrast(contrastType) {
    let style = '';
    if (contrastType) {
      let filterStyle = '';
      switch (contrastType) {
        case 'dark-contrast':
          filterStyle = 'color: #fff !important; fill: #FFF !important; background-color: #000 !important;';
          break;
        case 'light-contrast':
          filterStyle = 'color: #000 !important; fill: #000 !important; background-color: #FFF !important;';
          break;
        case 'high-contrast':
          filterStyle = '-webkit-filter: contrast(125%); filter: contrast(125%);';
          break;
        case 'monochrome':
          filterStyle = '-webkit-filter: grayscale(100%); filter: grayscale(100%);';
          break;
      }

      const selectors = (contrastType === 'dark-contrast' || contrastType === 'light-contrast') 
        ? ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'p', 'i', 'svg', 'a', 'button', 'label', 'li', 'ol']
        : [''];

      selectors.forEach(selector => {
        style += `[data-asw-filter="${contrastType}"] ${selector} { ${filterStyle} }`;
      });
    }

    applyStyle(style, 'asw-filter-style');
    document.documentElement.setAttribute('data-asw-filter', contrastType || '');
  }

  // Apply content adjustments
  function applyContentAdjustments() {
    let style = '';

    if (states['readable-font']) {
      style += `
        @font-face {
          font-family: OpenDyslexic3;
          src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"),
               url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");
        }
        .readable-font, .readable-font * {
          font-family: OpenDyslexic3, Comic Sans MS, Arial, Helvetica, sans-serif !important;
        }
      `;
    }

    if (states['highlight-links']) {
      style += `
        .highlight-links a[href] {
          outline: 2px solid #0048ff !important;
          outline-offset: 2px !important;
        }
      `;
    }

    if (states['highlight-titles']) {
      style += `
        .highlight-titles h1, .highlight-titles h2, .highlight-titles h3,
        .highlight-titles h4, .highlight-titles h5, .highlight-titles h6 {
          outline: 2px solid #0048ff !important;
          outline-offset: 2px !important;
        }
      `;
    }

    if (states['big-cursor']) {
      style += `
        body.big-cursor, body.big-cursor * {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24'%3E%3Cpath d='M7,2l12,11.2l-5.8,0.5l3.3,7.3l-2.2,1l-3.2-7.4L7,18.5V2' fill='%23000000' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E"), auto !important;
        }
      `;
    }

    if (states['stop-animations']) {
      style += `
        body.stop-animations * {
          transition: none !important;
          animation: none !important;
        }
      `;
    }

    applyStyle(style, 'asw-content-style');
    updateBodyClasses();
  }

  // Update body classes based on current states
  function updateBodyClasses() {
    const classes = ['readable-font', 'highlight-links', 'highlight-titles', 'big-cursor', 'stop-animations'];
    classes.forEach(className => {
      document.body.classList.toggle(className, !!states[className]);
    });
  }

  // Apply a style to the document
  function applyStyle(css, id) {
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement('style');
      style.id = id;
      document.head.appendChild(style);
    }
    style.textContent = css;
  }

  // Reset all applied styles
  function resetAppliedStyles() {
    applyContrast(null);
    applyContentAdjustments();
    applyFontSize(1);
    updateBodyClasses();
  }

  // Load settings from localStorage
  function loadSettings() {
    const savedSettings = localStorage.getItem('aswSettings');
    if (savedSettings) {
      states = JSON.parse(savedSettings);
      applyLoadedSettings();
    }
  }

  // Save settings to localStorage
  function saveSettings() {
    localStorage.setItem('aswSettings', JSON.stringify(states));
  }

// Apply loaded settings
function applyLoadedSettings() {
  if (states.fontSize) {
    applyFontSize(states.fontSize);
    updateFontSizeDisplay(states.fontSize);
  }

  if (states.contrast) {
    applyContrast(states.contrast);
    const contrastButton = document.querySelector(`.asw-filter[data-key="${states.contrast}"]`);
    if (contrastButton) {
      contrastButton.classList.add('asw-selected');
      contrastButton.setAttribute('aria-pressed', 'true');
    }
  }

  applyContentAdjustments();

  // Update UI to reflect loaded settings
  Object.keys(states).forEach(key => {
    const button = document.querySelector(`.asw-btn[data-key="${key}"]`);
    if (button && states[key]) {
      button.classList.add('asw-selected');
      button.setAttribute('aria-pressed', 'true');
    }
  });
}

// Update font size display
function updateFontSizeDisplay(size) {
  const display = document.querySelector('.asw-amount');
  if (display) {
    if (size === 1) {
      display.textContent = 'Default';
    } else {
      const percentage = Math.round((size - 1) * 100);
      display.textContent = `${percentage > 0 ? '+' : ''}${percentage}%`;
    }
  }
}

// Apply styles
function applyStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

    .asw-widget {
      font-family: 'Nunito', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .asw-menu, .asw-menu-btn {
      position: fixed;
      right: 20px;
      transition: 0.3s;
      z-index: 500000;
    }

    .asw-menu-btn {
      bottom: 20px;
      background: #FFD54F !important;
      box-shadow: 0 5px 15px 0 rgba(37, 44, 97, 0.15), 0 2px 4px 0 rgba(93, 100, 148, 0.2);
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      display: flex;
      cursor: pointer;
      border: none;
    }

    .asw-menu-btn:hover {
      transform: scale(1.05);
    }

    .asw-menu {
      display: none;
      top: 0;
      bottom: 0;
      right: 0;
      border-radius: 8px 0 0 8px;
      box-shadow: -1px 0 20px -14px #000;
      background: #FFF9C4;
      width: 400px;
      max-width: 90vw;
      line-height: 1;
      font-size: 16px;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .asw-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FFD54F;
      color: #333;
      padding: 20px;
      font-weight: 600;
      font-size: 20px;
    }

    .asw-menu-header > div {
      display: flex;
    }

    .asw-menu-header div[role="button"] {
      padding: 8px;
      cursor: pointer;
    }

    .asw-menu-content {
      flex-grow: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .asw-card {
      margin-bottom: 30px;
    }

    .asw-card-title {
      font-size: 22px;
      margin-bottom: 20px;
      font-weight: 600;
      color: #333;
    }

    .asw-adjust-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      background: #FFF176;
      padding: 15px;
      border-radius: 8px;
    }

    .asw-control-label {
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    .asw-control-label .material-icons {
      margin-right: 10px;
    }

    .asw-adjust-control div[role="button"] {
      background: #FFD54F;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      cursor: pointer;
    }

    .asw-items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .asw-btn {
      width: 100%;
      height: 120px;
      border-radius: 8px;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      color: #333;
      background: #FFF176;
      border: 2px solid #FFF176;
      transition: all 0.3s ease;
      cursor: pointer;
      font-weight: 600;
    }

    .asw-btn .material-icons {
      margin-bottom: 10px;
      font-size: 32px;
    }

    .asw-btn:hover {
      border-color: #FFD54F;
    }

    .asw-btn.asw-selected {
      background: #FFD54F;
      color: #333;
      border-color: #FFD54F;
    }

    .asw-divider {
      height: 2px;
      background: #FFD54F;
      margin: 30px 0;
    }

    .asw-footer {
      background: #FFD54F;
      padding: 20px;
      text-align: center;
    }

    .asw-footer a {
      color: #333;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
    }

    .asw-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 499999;
      display: none;
    }

    @media only screen and (max-width: 480px) {
      .asw-menu {
        width: 100%;
        max-width: 100%;
        border-radius: 0;
      }

      .asw-items {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize variables
let states = {};

// Initialize the widget
initAccessibilityWidget();
})();