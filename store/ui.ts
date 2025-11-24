import { defineStore } from 'pinia';
export const useUiStore = defineStore('ui', {
  state: () => ({ isExpandMenu: false as boolean }),
  persist: true,
  getters: {
    getIsExpandMenu: (state) => state.isExpandMenu
  },
  actions: {
    setIsExpandMenu(value: boolean) {
      this.isExpandMenu = value;
    },
    toggleExpandMenu() {
      this.isExpandMenu = !this.isExpandMenu;
    }
  }
});
