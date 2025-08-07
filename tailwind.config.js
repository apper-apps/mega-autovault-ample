/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        charcoal: '#1a1a1a',
        crimson: '#c0392b',
        gold: '#f39c12',
        slate: '#2c3e50',
        pearl: '#ecf0f1',
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db',
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
        'gradient-dark': 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        'gradient-hero': 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(44,62,80,0.6) 100%)',
      },
      boxShadow: {
        'premium': '0 8px 32px rgba(0,0,0,0.12)',
        'elevated': '0 4px 16px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(243,156,18,0.3)',
      }
    },
  },
  plugins: [],
}