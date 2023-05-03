/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // keyframes: {
      //   ping: {
      //     "75%, 100%": {
      //       transform: "scale(2)",
      //       opacity: 0,
      //     },
      //   },
      // },
      // animation: {
      //   ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      // },
      fontFamily: {
        body: "var(--font-dm-sans)",
        heading: "var(--font-dm-serif)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // Add other plugins if required
  ],
};
