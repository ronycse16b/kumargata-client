/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient': 'linear-gradient(to top left, #48BB78, #38B2AC, #4299E1)',
      },
    },
  },

  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f8f4f3",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
}
