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
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#38b000',
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#38b000',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                secondary: '#0077b6',
                accent: '#ffc107',
                dark: '#1e293b',
                light: '#f8fafc',
            },
            boxShadow: {
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            transitionDuration: {
                '400': '400ms',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
  