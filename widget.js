(function() {
    fetch('https://urirolls5987.github.io/accessibros_widget/index.html')
      .then(response => response.text())
      .then(data => {
        // 3. Inject the HTML into the body
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = data;
        document.body.appendChild(widgetContainer);
      })
      .catch(error => console.error('Error loading the widget:', error));
  })();
  