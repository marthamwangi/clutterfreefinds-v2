import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run website-mfe:serve:development',
        production: 'nx run website-mfe:serve:production',
      },
      ciWebServerCommand: 'nx run website-mfe:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
