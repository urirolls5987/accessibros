(function() {
    // Fetch and insert the entire HTML widget
    fetch('https://urirolls5987.github.io/accessibros_widget/index.html')
        .then(response => response.text())
        .then(data => {
            const widgetContainer = document.createElement('div');
            widgetContainer.innerHTML = data;
            document.body.appendChild(widgetContainer);

            // Check for the widget initialization function and call it
            if (window.AccessibilityWidget && typeof window.AccessibilityWidget.init === 'function') {
                console.log('Initializing widget...');
                window.AccessibilityWidget.init();
            } else {
                console.error('Accessibility widget initialization function not found.');
            }
        })
        .catch(error => console.error('Error loading the widget:', error));
})();
