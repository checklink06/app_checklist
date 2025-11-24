import { defineStore } from 'pinia';

interface IUserStore {
  userId?: string;
  userName?: string;
  fullName?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUserStore
  }),
  persist: true,
  getters: {
    getUserInfo: (state) => state.user
  },
  actions: {
    setUserInfo(value: IUserStore) {
      this.user = value;
    }
  }
});
