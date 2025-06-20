import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        k12: {
          blue: '#0066cc',
          'dark-blue': '#002B49',
          orange: '#FF6B00',
          gray: '#F5F7FA',
          text: '#333333'
        }
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    }
  },
  plugins: [],
  corePlugins: {
    container: true,
    display: true,
    gridTemplateColumns: true,
  }
};

export default config;
