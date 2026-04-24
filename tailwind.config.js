/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        'primary-deep': '#1A0800',
        'primary-deeper': '#2D1000',
        orange: {
          DEFAULT: '#FF6B1A',
          light: '#FF8C42',
          dark: '#FF4500',
          glow: '#FF4500',
        },
        peach: '#FFD4A8',
        card: '#111111',
        'card-deep': '#1C0D00',
        border: '#FF6B1A',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A0800 60%, #2D1000 100%)',
        'card-gradient': 'linear-gradient(145deg, #111111, #1C0D00)',
        'button-gradient': 'linear-gradient(90deg, #FF6B1A, #FF4500)',
        'section-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #1A0800 100%)',
      },
      boxShadow: {
        'orange-sm': '0 0 10px rgba(255, 107, 26, 0.3)',
        'orange-md': '0 0 20px rgba(255, 107, 26, 0.4)',
        'orange-lg': '0 0 40px rgba(255, 107, 26, 0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(255, 107, 26, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-orange': 'pulseOrange 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseOrange: { '0%,100%': { boxShadow: '0 0 10px rgba(255,107,26,0.3)' }, '50%': { boxShadow: '0 0 30px rgba(255,107,26,0.7)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
};
