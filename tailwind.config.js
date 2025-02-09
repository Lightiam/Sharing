/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#6B46C1",
        'primary-hover': "#805AD5",
        dark: "#1F2937",
        'dark-bg': "#111827",
        'body-color': "#637381",
      },
      boxShadow: {
        'primary-hover': '0px 3px 15px rgba(107, 70, 193, 0.4)',
        'features': '0px 4px 30px rgba(0, 0, 0, 0.08)',
        'features-hover': '0px 5px 35px rgba(0, 0, 0, 0.12)',
        'testimonial': '0px 4px 25px rgba(0, 0, 0, 0.08)',
        'sticky': '0px 2px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  darkMode: 'class',
  prefix: 'ud-',
  plugins: [],
}
