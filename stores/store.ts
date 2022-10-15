import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    openNav: false,
    showLinks: true,
  }),
  getters: {},
  actions: {
    openNavigation(){
      this.openNav = !this.openNav
      this.showLinks = false
      setTimeout(() => {
        
          this.showLinks = true
        
      }, 500);
    },

}
});
