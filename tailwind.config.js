/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        muted: "#6b7280",
        background: "#f8fafc",
      },
    },
  },
  plugins: [],
}

