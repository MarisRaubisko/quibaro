import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
  	screens: {
  		xs: '500px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1440px',
  		'3xl': '1780px',
  		'4xl': '2160px'
  	},
  	extend: {
  		transitionDuration: {
  			'350': '350ms',
  			'600': '600ms'
  		},
  		colors: {
  			brand: 'rgb(var(--color-brand) / <alpha-value>)',
  			body: '#fcfcfc',
  			dark: '#0d0d0d',
  			'light-dark': '#0d0d0d',
  			'sidebar-body': '#F8FAFC',
  			'input-light-dark': 'hsl(240 3.7% 15.9%)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'13': '3.375rem'
  		},
  		margin: {
  			'1/2': '50%'
  		},
  		padding: {
  			full: '100%'
  		},
  		width: {
  			'calc-320': 'calc(100% - 320px)',
  			'calc-358': 'calc(100% - 358px)'
  		},
  		fontFamily: {
  			body: [
  				'Fira Code',
  				'monospace'
  			]
  		},
  		fontSize: {
  			'13px': [
  				'13px',
  				'18px'
  			]
  		},
  		borderWidth: {
  			'3': '3px'
  		},
  		boxShadow: {
  			main: '0px 6px 18px rgba(0, 0, 0, 0.04)',
  			light: '0px 4px 4px rgba(0, 0, 0, 0.08)',
  			large: '0px 8px 16px rgba(17, 24, 39, 0.1)',
  			card: '0px 2px 6px rgba(0, 0, 0, 0.06)',
  			transaction: '0px 8px 16px rgba(17, 24, 39, 0.06)',
  			expand: '0px 0px 50px rgba(17, 24, 39, 0.2)',
  			button: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)'
  		},
  		dropShadow: {
  			main: '0px 4px 8px rgba(0, 0, 0, 0.08)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
  		},
  		animation: {
  			blink: 'blink 1.4s infinite both;',
  			'move-up': 'moveUp 500ms infinite alternate',
  			'scale-up': 'scaleUp 500ms infinite alternate',
  			'drip-expand': 'expand 500ms ease-in forwards',
  			'drip-expand-large': 'expand-large 600ms ease-in forwards',
  			'move-up-small': 'moveUpSmall 500ms infinite alternate'
  		},
  		keyframes: {
  			blink: {
  				'0%': {
  					opacity: '0.2'
  				},
  				'20%': {
  					opacity: '1'
  				},
  				'100%': {
  					opacity: '0.2'
  				}
  			},
  			expand: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(1)'
  				},
  				'30%': {
  					opacity: '1'
  				},
  				'80%': {
  					opacity: '0.5'
  				},
  				'100%': {
  					transform: 'scale(30)',
  					opacity: '0'
  				}
  			},
  			'expand-large': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(1)'
  				},
  				'30%': {
  					opacity: '1'
  				},
  				'80%': {
  					opacity: '0.5'
  				},
  				'100%': {
  					transform: 'scale(96)',
  					opacity: '0'
  				}
  			},
  			moveUp: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			moveUpSmall: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'100%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			scaleUp: {
  				'0%': {
  					transform: 'scale(0)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'2xl': '1rem',
  			'3xl': '1.5rem'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require("tailwindcss-animate")
],
};
export default config;
