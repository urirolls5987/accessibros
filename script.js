console.log("Accessibility script loaded");

window.AccessibilityWidget = {
  toggleMenu: function () {
    console.log("Toggle menu called");
    var menu = document.getElementById("aswMenu");
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
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
    document.querySelectorAll("*").forEach((el) => {
      if (!el.classList.contains("material-icons")) {
        let orgFontSize = parseFloat(el.getAttribute("data-asw-orgFontSize"));
        if (!orgFontSize) {
          orgFontSize = parseFloat(
            window.getComputedStyle(el).getPropertyValue("font-size")
          );
          el.setAttribute("data-asw-orgFontSize", orgFontSize);
        }
        let adjustedFontSize =
          orgFontSize *
          (parseFloat(localStorage.getItem("fontPercentage")) || 1);
        el.style["font-size"] = adjustedFontSize + "px";
      }
    });
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
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          let orgLetterSpacing = el.getAttribute("data-asw-orgLetterSpacing");
          if (!orgLetterSpacing) {
            orgLetterSpacing = el.style["letter-spacing"];
            el.setAttribute("data-asw-orgLetterSpacing", orgLetterSpacing);
            if (!orgLetterSpacing) {
              orgLetterSpacing = 0;
            }
            orgLetterSpacing = parseFloat(orgLetterSpacing);
            let newLetterSpacing = orgLetterSpacing + increment;
            el.style["letter-spacing"] = newLetterSpacing + "em";
          }
        }
      });
      localStorage.setItem("isLetterSpacingEnabled", 1);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          let orgLetterSpacing = el.getAttribute("data-asw-orgLetterSpacing");
          if (orgLetterSpacing) {
            el.style["letter-spacing"] = orgLetterSpacing;
            el.removeAttribute("data-asw-orgLetterSpacing");
          } else {
            el.style.removeProperty("letter-spacing");
          }
        }
      });
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
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          orgFontFamily = el.style["font-family"];
          el.setAttribute("data-asw-orgFontFamily", orgFontFamily);
          el.style["font-family"] = "OpenDyslexic3";
        }
      });
      localStorage.setItem("isDyslexicFontEnabled", 1);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          orgFontFamily = el.getAttribute("data-asw-orgFontFamily");
          if (orgFontFamily) {
            el.style["font-family"] = orgFontFamily;
            el.removeAttribute("data-asw-orgFontFamily");
          } else {
            el.style.removeProperty("font-family");
          }
        }
      });
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
      document.querySelectorAll("*").forEach((el) => {
        el.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default`;
      });
      localStorage.setItem("isBigCursorEnabled", 1);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        el.style.cursor = "default";
      });
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
      document.querySelectorAll("a,button").forEach((anchor) => {
        const orgTextDecoration = window
          .getComputedStyle(anchor)
          .getPropertyValue("text-decoration");
        const orgFontWeight = window
          .getComputedStyle(anchor)
          .getPropertyValue("font-weight");
        const orgFontSize = window
          .getComputedStyle(anchor)
          .getPropertyValue("font-size");
        const orgLinkColor = window
          .getComputedStyle(anchor)
          .getPropertyValue("color");
        anchor.setAttribute(
          "data-asw-orgLinkTextDecoration",
          orgTextDecoration
        );
        anchor.setAttribute("data-asw-orgLinkFontWeight", orgFontWeight);
        anchor.setAttribute("data-asw-orgLinkFontSize", orgFontSize);
        anchor.setAttribute("data-asw-orgLinkColor", orgLinkColor);
        anchor.style.textDecoration = "underline";
        anchor.style.fontWeight = "800";
        anchor.style["font-size"] = parseInt(orgFontSize) * 1.1 + "px";
        anchor.style["color"] = "#ff0000";
      });
      localStorage.setItem("isHighlightLinks", 1);
    } else {
      document.querySelectorAll("a,button").forEach((anchor) => {
        const orgTextDecoration = anchor.getAttribute(
          "data-asw-orgLinkTextDecoration"
        );
        const orgFontWeight = anchor.getAttribute("data-asw-orgLinkFontWeight");
        const orgFontSize = anchor.getAttribute("data-asw-orgLinkFontSize");
        const orgLinkColor = anchor.getAttribute("data-asw-orgLinkColor");
        anchor.style.color = orgLinkColor;
        anchor.style.fontSize = orgFontSize;
        anchor.style.textDecoration = orgTextDecoration;
        anchor.style.fontWeight = orgFontWeight;
      });
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
      document.querySelectorAll("h1, h2, h3,heading1").forEach((heading) => {
        const orgTextDecoration = window
          .getComputedStyle(heading)
          .getPropertyValue("text-decoration");
        const orgHighlightColor = window
          .getComputedStyle(heading)
          .getPropertyValue("color");
        heading.setAttribute(
          "data-asw-orgHighlightTextDecoration",
          orgTextDecoration
        );
        heading.setAttribute("data-asw-orgHighlightColor", orgHighlightColor);
        heading.style.color = "#ff0000";
        heading.style.textDecoration = "underline";
      });
      localStorage.setItem("isHighlightHeadings", 1);
    } else {
      document.querySelectorAll("h1, h2, h3,heading1").forEach((heading) => {
        const orgTextDecoration = heading.getAttribute(
          "data-asw-orgHighlightTextDecoration"
        );
        const orgHighlightColor = heading.getAttribute(
          "data-asw-orgHighlightColor"
        );
        heading.style.textDecoration = orgTextDecoration;
        heading.style.color = orgHighlightColor;
      });
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
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          let orgLineHeight = el.getAttribute("data-asw-orgLineHeight");
          if (!orgLineHeight) {
            orgLineHeight = el.style["line-height"];
            el.setAttribute("data-asw-orgLineHeight", orgLineHeight);
            if (!orgLineHeight) {
              orgLineHeight = 1.1;
            }
            orgLineHeight = parseFloat(orgLineHeight);
            let newLineHeight = orgLineHeight + increment;
            el.style["line-height"] = newLineHeight;
          }
        }
      });
      localStorage.setItem("isLineHeightEnabled", 1);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          let orgLineHeight = el.getAttribute("data-asw-orgLineHeight");
          if (orgLineHeight) {
            el.style["line-height"] = orgLineHeight;
            el.removeAttribute("data-asw-orgLineHeight");
          } else {
            el.style.removeProperty("line-height");
          }
        }
      });
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
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          let orgBoldFontWeight = window
            .getComputedStyle(el)
            .getPropertyValue("--org-bold-font-weight");
          if (!orgBoldFontWeight) {
            orgBoldFontWeight = window
              .getComputedStyle(el)
              .getPropertyValue("font-weight");
            el.style.setProperty("--org-bold-font-weight", orgBoldFontWeight);
          }
          let newFontWeight = parseInt(orgBoldFontWeight) + increment;
          el.style.setProperty("font-weight", newFontWeight);
        }
      });
      localStorage.setItem("isFontWeightEnabled", 1);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        if (!el.classList.contains("material-icons")) {
          let orgBoldFontWeight = window
            .getComputedStyle(el)
            .getPropertyValue("--org-bold-font-weight");
          if (orgBoldFontWeight) {
            el.style["font-weight"] = orgBoldFontWeight;
          } else {
            el.style.removeProperty("font-weight");
          }
          el.style.removeProperty("--org-bold-font-weight");
        }
      });
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
      document.querySelectorAll("*").forEach((el) => {
        let orgColor = el.getAttribute("data-asw-orgContrastColor");
        let orgBgColor = el.getAttribute("data-asw-orgContrastBgColor");
        if (!orgColor) {
          orgColor = el.style.color;
          el.setAttribute("data-asw-orgContrastColor", orgColor);
        }
        if (!orgBgColor) {
          orgBgColor = window
            .getComputedStyle(el)
            .getPropertyValue("background-color");
          el.setAttribute("data-asw-orgContrastBgColor", orgBgColor);
        }
        el.style["color"] = "#ffff00";
        el.style["background-color"] = "#0000ff";
      });
      localStorage.setItem("isContrastEnabled", 1);
    } else {
      document.querySelectorAll("*").forEach((el) => {
        let orgContrastColor = el.getAttribute("data-asw-orgContrastColor");
        let orgContrastBgColor = el.getAttribute("data-asw-orgContrastBgColor");
        if (orgContrastColor) {
          el.style.color = orgContrastColor;
        } else {
          el.style.removeProperty("color");
        }
        if (orgContrastBgColor) {
          el.style.backgroundColor = orgContrastBgColor;
        } else {
          el.style.removeProperty("background-color");
        }
        el.removeAttribute("data-asw-orgContrastColor");
        el.removeAttribute("data-asw-orgContrastBgColor");
      });
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
      .querySelector('button[onclick="adjustFontSize(0.1)"]')
      .addEventListener("click", () => this.adjustFontSize(0.1));
    document
      .querySelector('button[onclick="adjustFontSize(-0.1)"]')
      .addEventListener("click", () => this.adjustFontSize(-0.1));
    document
      .querySelector('button[onclick="adjustLineHeight(1)"]')
      .addEventListener("click", () => this.adjustLineHeight(1));
    document
      .querySelector('button[onclick="adjustLetterSpacing(0.1)"]')
      .addEventListener("click", () => this.adjustLetterSpacing(0.1));
    document
      .querySelector('button[onclick="enableDyslexicFont()"]')
      .addEventListener("click", () => this.enableDyslexicFont());
    document
      .querySelector('button[onclick="enableHighlightHeadings()"]')
      .addEventListener("click", () => this.enableHighlightHeadings());
    document
      .querySelector('button[onclick="enableHighlightLinks()"]')
      .addEventListener("click", () => this.enableHighlightLinks());
    document
      .querySelector('button[onclick="adjustFontWeight(400)"]')
      .addEventListener("click", () => this.adjustFontWeight(400));
    document
      .querySelector('button[onclick="enableBigCursor()"]')
      .addEventListener("click", () => this.enableBigCursor());
    document
      .querySelector('button[onclick="adjustContrast()"]')
      .addEventListener("click", () => this.adjustContrast());
  },

  init: function () {
    console.log("Initializing accessibility widget");
    this.onPageLoad();
    this.attachEventListeners();
  },
};

// Initialize the widget when the script loads
window.AccessibilityWidget.init();