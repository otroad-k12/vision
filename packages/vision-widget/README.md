# K12 Vision Test Widget

A reusable vision test widget that can be embedded in WordPress sites or React applications.

## Installation

```bash
npm install @k12/vision-widget
```

## Usage

### In WordPress

Add the following code to your WordPress theme or plugin:

```html
<!-- Add the widget container -->
<div id="k12-vision-test"></div>

<!-- Add the widget script -->
<script src="path/to/@k12/vision-widget/dist/index.js"></script>
<script>
  // Initialize the widget
  window.k12VisionWidget.mount('k12-vision-test', {
    theme: 'light', // or 'dark'
    brandColor: '#0066cc', // K12 blue
    onComplete: function(results) {
      console.log('Test completed:', results);
    }
  });
</script>
```

### In React Applications

```jsx
import { VisionWidget } from '@k12/vision-widget';

function App() {
  const handleComplete = (results) => {
    console.log('Test completed:', results);
  };

  return (
    <VisionWidget
      theme="light"
      brandColor="#0066cc"
      onComplete={handleComplete}
    />
  );
}
```

## Props

- `theme`: 'light' | 'dark' (default: 'light')
- `brandColor`: string (default: '#0066cc')
- `distance`: number (default: 3) - Distance in meters
- `onComplete`: (results: { left: string; right: string }) => void
- `containerClassName`: string - Additional CSS classes for the container

## WordPress Events

The widget dispatches a custom event when the test is completed:

```javascript
document.getElementById('k12-vision-test').addEventListener('k12VisionTestComplete', (event) => {
  console.log('Test results:', event.detail);
});
```
