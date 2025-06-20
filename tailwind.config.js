/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
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
        },
    },
    plugins: [],
}
