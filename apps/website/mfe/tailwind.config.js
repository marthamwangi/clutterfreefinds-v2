const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    "./node_modules/flowbite/**/*.js"
  ],
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
        900:'#0e1c36',
        600:'#0e1c3699',
        300:'#0e1c364d',
        100:'#0e1c361a'
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend:{
      maxHeight: {
        '128': '32rem',
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio')],
};
