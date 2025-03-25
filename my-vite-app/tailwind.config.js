/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.css",
    ],
    theme: {
        extend: {
            fontFamily: {
                'heading-desktop-h1': ['var(--heading-desktop-h1-font-family)'],
                'heading-desktop-h2': ['var(--heading-desktop-h2-font-family)'],
                'text-medium-normal': ['var(--text-medium-normal-font-family)'],
                'text-regular-normal': ['var(--text-regular-normal-font-family)'],
                'text-regular-link': ['var(--text-regular-link-font-family)'],
                'text-small-normal': ['var(--text-small-normal-font-family)'],
            },
            colors: {
                primary: '#61e923',
                'primary-hover': '#50d012',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
  