import React from 'react';
import { VisionWidget } from './VisionWidget';

declare global {
  interface Window {
    k12VisionWidget?: {
      mount: (elementId: string, props?: any) => void;
    };
  }
}

// WordPress integration
export function initializeWordPressWidget() {
  window.k12VisionWidget = {
    mount: (elementId: string, props = {}) => {
      const container = document.getElementById(elementId);
      if (!container) {
        console.error(`Element with id "${elementId}" not found`);
        return;
      }

      const root = document.createElement('div');
      root.className = 'k12-vision-widget-root';
      container.appendChild(root);

      // Create a shadow root for style isolation
      const shadowRoot = root.attachShadow({ mode: 'open' });
      
      // Create a container for the widget
      const widgetContainer = document.createElement('div');
      shadowRoot.appendChild(widgetContainer);

      // Inject required styles
      const styles = document.createElement('style');
      styles.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');
        
        :host {
          display: block;
          font-family: 'Source Sans Pro', sans-serif;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `;
      shadowRoot.appendChild(styles);

      // Handle test completion
      const handleComplete = (results: { left: string; right: string }) => {
        // Create a custom event for WordPress integration
        const event = new CustomEvent('k12VisionTestComplete', {
          detail: results,
          bubbles: true,
          composed: true
        });
        container.dispatchEvent(event);
        
        if (props.onComplete) {
          props.onComplete(results);
        }
      };

      // Render the widget
      ReactDOM.createRoot(widgetContainer).render(
        <VisionWidget
          {...props}
          onComplete={handleComplete}
        />
      );
    }
  };
}

// React component wrapper for other React applications
export function WordPressVisionWidget(props: any) {
  return <VisionWidget {...props} />;
}
