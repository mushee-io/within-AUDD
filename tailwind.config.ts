import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#050B1E",
          900: "#07112D",
          800: "#0B1C45",
          700: "#122A61",
          600: "#1A3B85"
        },
        ember: {
          600: "#FF2D55",
          500: "#FF3B30",
          400: "#FF5C7A"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,45,85,.25), 0 20px 80px rgba(5,11,30,.75)",
        ember: "0 0 50px rgba(255,45,85,.25)"
      },
      backgroundImage: {
        "heaven-radial":
          "radial-gradient(1200px circle at 25% 10%, rgba(255,45,85,.25), transparent 50%), radial-gradient(900px circle at 75% 25%, rgba(59,130,246,.18), transparent 45%), radial-gradient(900px circle at 50% 80%, rgba(255,255,255,.06), transparent 55%)",
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        sheen: "sheen 2.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
