import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.farm.app',
  appName: 'agro-pastoral',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
