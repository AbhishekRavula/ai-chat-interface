/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "chat-bg": "var(--chat-bg)",

        "user-message-bg": "var(--user-message-bg)",
        "ai-message-bg": "var(--ai-message-bg)",
       
        "user-message-text": "var(--user-message-text)",
        "ai-message-text": "var(--ai-message-text)",

        "surface": "var(--surface)",

        "message-input-bg": "var(--message-input-bg)",

        "paper": "var(--paper)"
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out'
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
            borderRadius: '3px',
            transition: 'background-color 0.3s ease',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.gray.300', 'rgba(0, 0, 0, 0.2)'),
          },
          'scrollbar-width': 'thin',
          'scrollbar-color': 'transparent transparent',
          '&:hover': {
            'scrollbar-color': `${theme('colors.gray.300', 'rgba(0, 0, 0, 0.2)')} transparent`,
          },
        },
        '.dark .custom-scrollbar': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'transparent',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.gray.600', 'rgba(255, 255, 255, 0.3)'),
          },
          'scrollbar-color': 'transparent transparent',
          '&:hover': {
            'scrollbar-color': `${theme('colors.gray.600', 'rgba(255, 255, 255, 0.3)')} transparent`,
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'dark']);
    }),
  ],
  
}

