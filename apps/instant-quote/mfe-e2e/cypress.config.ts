import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run instant-quote:serve:development',
        production: 'nx run instant-quote:serve:production',
      },
      ciWebServerCommand: 'nx run instant-quote:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
