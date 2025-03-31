module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "heading-desktop-h1": "var(--heading-desktop-h1-font-family)",
        "heading-desktop-h2": "var(--heading-desktop-h2-font-family)",
        "heading-desktop-h3": "var(--heading-desktop-h3-font-family)",
        "heading-desktop-h5": "var(--heading-desktop-h5-font-family)",
        "heading-desktop-h6": "var(--heading-desktop-h6-font-family)",
        "heading-desktop-tagline": "var(--heading-desktop-tagline-font-family)",
        "text-medium-normal": "var(--text-medium-normal-font-family)",
        "text-regular-normal": "var(--text-regular-normal-font-family)",
        "text-regular-semi-bold": "var(--text-regular-semi-bold-font-family)",
        "text-small-link": "var(--text-small-link-font-family)",
        "text-small-normal": "var(--text-small-normal-font-family)",
        "text-tiny-normal": "var(--text-tiny-normal-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "leaf-float-1": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(10px, 10px) rotate(5deg)" },
          "50%": { transform: "translate(20px, 20px) rotate(10deg)" },
          "75%": { transform: "translate(10px, 30px) rotate(5deg)" },
          "100%": { transform: "translate(0, 40px) rotate(0deg)" },
        },
        "leaf-float-2": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-15px, 15px) rotate(-5deg)" },
          "50%": { transform: "translate(-25px, 30px) rotate(-10deg)" },
          "75%": { transform: "translate(-15px, 45px) rotate(-5deg)" },
          "100%": { transform: "translate(0, 60px) rotate(0deg)" },
        },
        "leaf-float-3": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(12px, 15px) rotate(7deg)" },
          "50%": { transform: "translate(24px, 30px) rotate(14deg)" },
          "75%": { transform: "translate(12px, 45px) rotate(7deg)" },
          "100%": { transform: "translate(0, 60px) rotate(0deg)" },
        },
        "leaf-float-4": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-8px, 10px) rotate(-6deg)" },
          "50%": { transform: "translate(-16px, 20px) rotate(-12deg)" },
          "75%": { transform: "translate(-8px, 30px) rotate(-6deg)" },
          "100%": { transform: "translate(0, 40px) rotate(0deg)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "slide-in": "slide-in 0.6s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-delay": "fade-in 0.6s ease-out 0.3s forwards",
        "fade-in-delay-2": "fade-in 0.6s ease-out 0.6s forwards",
        "bounce-subtle": "bounce-subtle 3s ease-in-out infinite",
        "leaf-float-1": "leaf-float-1 15s linear infinite",
        "leaf-float-2": "leaf-float-2 18s linear infinite",
        "leaf-float-3": "leaf-float-3 20s linear infinite",
        "leaf-float-4": "leaf-float-4 17s linear infinite",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.perspective-component': {
          perspective: '1000px',
        },
        '.perspective-tilt': {
          transform: 'rotateX(5deg) rotateY(-5deg)',
          transformStyle: 'preserve-3d',
        },
        '.perspective-flat': {
          transform: 'rotateX(0deg) rotateY(0deg)',
        },
      }
      
      const leafComponents = {
        '.leaf': {
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: 'rgba(97, 233, 35, 0.15)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          opacity: '0.6',
        },
        '.leaf-1': {
          top: '15%',
          left: '10%',
          animation: 'leaf-float-1 15s linear infinite',
        },
        '.leaf-2': {
          top: '25%',
          right: '15%',
          width: '15px',
          height: '15px',
          animation: 'leaf-float-2 18s linear infinite',
        },
        '.leaf-3': {
          bottom: '30%',
          left: '20%',
          width: '12px',
          height: '12px',
          animation: 'leaf-float-3 20s linear infinite',
        },
        '.leaf-4': {
          bottom: '20%',
          right: '10%',
          width: '18px',
          height: '18px',
          animation: 'leaf-float-4 17s linear infinite',
        },
      }
      
      addUtilities(newUtilities)
      addComponents(leafComponents)
    },
  ],
  darkMode: ["class"],
};
