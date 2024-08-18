(function() {
    // 1. Dynamically load external CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://github.com/urirolls5987/accessibros_widget/blob/main/styles.css';
    document.head.appendChild(link);
  
    // 2. Fetch the HTML structure from the hosted HTML file
    fetch('https://github.com/urirolls5987/accessibros_widget/blob/main/index.html')
      .then(response => response.text())
      .then(data => {
        // 3. Inject the HTML into the body
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = data;
        document.body.appendChild(widgetContainer);
      })
      .catch(error => console.error('Error loading the widget:', error));
  })();
  