(function() {
    var widgetUrl = 'https://urirolls5987.github.io/accessibros_widget/index.html';
    
    function loadWidget() {
      var iframe = document.createElement('iframe');
      iframe.src = widgetUrl;
      iframe.style.position = 'fixed';
      iframe.style.bottom = '20px';
      iframe.style.right = '20px';
      iframe.style.width = '54px';
      iframe.style.height = '54px';
      iframe.style.border = 'none';
      iframe.style.zIndex = '999999';
      document.body.appendChild(iframe);
  
      window.addEventListener('message', function(event) {
        if (event.origin !== new URL(widgetUrl).origin) return;
        
        if (event.data.type === 'toggleMenu') {
          if (event.data.open) {
            iframe.style.width = '500px';
            iframe.style.height = 'calc(100% - 40px - 75px)';
          } else {
            iframe.style.width = '54px';
            iframe.style.height = '54px';
          }
        } else if (event.data.type === 'applyStyles') {
          document.body.style.cssText += event.data.styles;
        }
      });
    }
  
    if (document.readyState === 'complete') {
      loadWidget();
    } else {
      window.addEventListener('load', loadWidget);
    }
  })();