import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Nueva versión disponible');
  },
  onOfflineReady() {
    console.log('App lista para usarse offline');
  }
});