import { acceptHMRUpdate, defineStore } from 'pinia';
export const PreferensiStore = defineStore('preferensi', {
  state: () => {
    return { splash: true };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(PreferensiStore, import.meta.hot));
