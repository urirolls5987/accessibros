(function() {
    // Function to load and append CSS
    function loadCSS(url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  
    // Function to load and execute JavaScript
    function loadScript(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
  
    // Load CSS
    loadCSS('https://urirolls5987.github.io/accessibros_widget/styles.css');
    loadCSS('https://fonts.googleapis.com/icon?family=Material+Icons&text=ads_click,text_rotation_none,text_fields,format_size,blind,restart_alt,close,link,local_parking,contrast,spellcheck,local_library,format_bold,format_line_spacing');
  
    // Fetch and insert HTML
    fetch('https://urirolls5987.github.io/accessibros_widget/index.html')
      .then(response => response.text())
      .then(data => {
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = data;
        document.body.appendChild(widgetContainer);
  
        // Load and execute JavaScript after HTML is inserted
        return loadScript('https://urirolls5987.github.io/accessibros_widget/script.js');
      })
      .then(() => {
        // Initialize the widget
        if (typeof onPageLoad === 'function') {
          onPageLoad();
        }
      })
      .catch(error => console.error('Error loading the widget:', error));
  })();