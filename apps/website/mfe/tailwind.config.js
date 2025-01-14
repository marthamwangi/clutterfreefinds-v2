const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    "./node_modules/flowbite/**/*.js"  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': {
        900:'#7a23d3',
        600:'#7a23d399',
        300:'#7a23d34d',
        100:'#7a23d31a'
      },
      'secondary': {
        900:'#00b428',
        600:'#00b42899',
        300:'#00b4284d',
        100:'#00b4281a'
      },
      'tertiary': {
        900:'#f1cd0e',
        600:'#f1cd0e99',
        300:'#f1cd0e4d',
        100:'#f1cd0e1a'
      },
      'danger': {
        900:'#eb0f26',
        600:'#eb0f2699',
        300:'#eb0f264d',
        100:'#eb0f261a'
      },
      'light': {
        900:'#ffffff',
        600:'#ffffff99',
        300:'#ffffff4d',
        100:'#ffffff1a'
      },
      'dark': {
        900:'#191D23',
        600:'#191D2399',
        300:'#191D234d',
        100:'#191D231a'
      },
    'gray':{
      100:'#F8F8F8'
    }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend:{
      maxHeight: {
        '128': '32rem',
      },
      minHeight: {
        '128': '32rem',
        '144':'36rem'
      },
      lineHeight: {
        'extra-loose': '130%'
       },
       height:{
        '128': '32rem',
        '40-p':'40%'
       },
       width:{
        '128': '32rem',
        '44-p':'44%'
       },
       animation: {
        'infinite-scroll': 'infinite-scroll 50s linear infinite',
        'infinite-scroll-y': 'infinite-scroll-y 80s linear infinite',
        'infinite-scroll-y-reverse': 'infinite-scroll-y-reverse 80s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'infinite-scroll-y': {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(-70%)' },
        },
        'infinite-scroll-y-reverse': {
          from: { transform: 'translateY(-70%)' },
          to: { transform: 'translateY(0)' },
        },
      },   
    }
  },
  plugins: [
    function ({addUtilities}) {
      const extendUnderline = {
          '.underline': {
              'textDecoration': 'underline',
              'text-decoration-color': '#7a23d3',
          },
      }
      addUtilities(extendUnderline)
  },
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio')],
};
