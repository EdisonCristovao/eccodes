/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000",
        white: "#fff",
        primary: "#011627",
        "primary-light-dark": "#011221",
        "primary-dark": "#01080E",

        "secondary-grey": "#607B96",
        "secondary-blue": "#4D5BCE",

        "accent-green": "#43D9AD",
        "accent-nude": "#E99287",

        lines: "#1E2D3D",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
