/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    safelist: [
        {
            pattern: /grid-cols-\d+/
        }
    ],
    theme: {
        extend: {
            minHeight: {
                40: '40px',
                300: '300px'
            },
            maxWidth: {
                400: '400px'
            },
            spacing: {
                420: '420px'
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
            },
            fontFamily: {
                main: ['Unbounded'],
                manrope: ['Manrope']
            },
            aspectRatio: {
                card: '16 / 14'
            }
        }
    },
    plugins: []
};
