export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#137fec", // Electric Blue
          hover: "#0b6bcb",
          light: "rgba(19, 127, 236, 0.1)",
          glow: "rgba(19, 127, 236, 0.5)",
        },
        background: {
          light: "#f8fafc",
          dark: "#0f161e", // Deeper dark
          cardish: "#18212f", // Slightly lighter for cards
          subtle: "#131b26",
        },
        sidebar: {
          active: "#1f2e41",
          hover: "rgba(31, 46, 65, 0.6)",
        },
        border: {
          light: "rgba(0,0,0,0.1)",
          dark: "rgba(255, 255, 255, 0.08)", // Subtler border
        },
        accent: {
          cyan: "#06b6d4",
          fuchsia: "#d946ef",
          violet: "#8b5cf6",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'card-shine': 'linear-gradient(110deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 70%)',
      }
    },
  },
  plugins: [],
}
