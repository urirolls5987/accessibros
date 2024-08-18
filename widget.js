(function() {
    var widgetUrl = 'https://urirolls5987.github.io/accessibros_widget/index.html';
    var cssUrl = 'https://urirolls5987.github.io/accessibros_widget/style.css';
    
    function loadCSS(url) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
    }

    function loadWidget() {
        var iframe = document.createElement('iframe');
        iframe.src = widgetUrl;
        iframe.style.position = 'fixed';
        iframe.style.bottom = '20px';
        iframe.style.right = '20px';
        iframe.style.width = '320px';
        iframe.style.height = '60px';
        iframe.style.border = 'none';
        iframe.style.zIndex = '999999';
        document.body.appendChild(iframe);

        window.addEventListener('message', function(event) {
            if (event.origin !== new URL(widgetUrl).origin) return;
            
            if (event.data.type === 'toggleMenu') {
                iframe.style.height = event.data.open ? '100%' : '60px';
            } else if (event.data.type === 'applyStyles') {
                document.body.style.cssText += event.data.styles;
            }
        });
    }

    loadCSS(cssUrl);
    if (document.readyState === 'complete') {
        loadWidget();
    } else {
        window.addEventListener('load', loadWidget);
    }
})();