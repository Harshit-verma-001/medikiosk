/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kiosk: {
          bg: "#F4F7F6",
          card: "#FFFFFF",
          text: "#1E293B",
          subtext: "#64748B",
          primary: "#0D9488", // Teal 600
          primaryDark: "#0F766E", // Teal 700
          primaryLight: "#CCFBF1", // Teal 100
          emerald: "#10B981", // Emerald 500
          emeraldLight: "#D1FAE5",
          accent: "#4F46E5", // Indigo 600
          accentLight: "#E0E7FF",
          alert: "#EF4444", // Red 500
          alertBg: "#FEF2F2",
          warn: "#F59E0B", // Amber 500
          warnBg: "#FEF3C7",
          ayush: "#059669", // Ayurvedic Green
          ayushLight: "#ECFDF5",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'kiosk-sm': '0 2px 8px -2px rgba(13, 148, 136, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'kiosk-card': '0 10px 25px -5px rgba(15, 118, 110, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'kiosk-active': '0 12px 30px -4px rgba(13, 148, 136, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
