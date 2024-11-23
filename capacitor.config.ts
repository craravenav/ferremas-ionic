import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter', // Ajusta según tu configuración
  appName: 'Ferremas',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // Desactiva el splash para pruebas rápidas
    },
  },
};

export default config;


