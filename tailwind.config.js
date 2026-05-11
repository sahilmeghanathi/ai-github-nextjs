/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },

      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(8px)",
          },

          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },

        orbDrift: {
          "0%,100%": {
            transform: "translate(0,0) scale(1)",
          },

          "33%": {
            transform: "translate(28px,-38px) scale(1.07)",
          },

          "66%": {
            transform: "translate(-18px,18px) scale(0.95)",
          },
        },

        blink: {
          "0%,80%,100%": {
            opacity: ".2",
            transform: "scale(.8)",
          },

          "40%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        spinCW: {
          to: {
            transform: "rotate(360deg)",
          },
        },

        spinCCW: {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },

      animation: {
        "fade-in-up": "fadeInUp 0.4s ease forwards",
        orb: "orbDrift 12s ease-in-out infinite",
        blink: "blink 1.2s ease-in-out infinite",
        "spin-cw": "spinCW 0.9s linear infinite",
        "spin-ccw": "spinCCW 1.4s linear infinite",
      },

      backgroundImage: {
        grid:
          "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
      },

      backgroundSize: {
        grid: "56px 56px",
      },
    },
  },

  plugins: [],
};