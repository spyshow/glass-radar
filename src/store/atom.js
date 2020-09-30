import { atom } from "recoil";


export const sidebarCollapsedState = atom({
  key: "sidebarCollapsedState",
  default: true,
});

export const feathersApp = atom({
  key: "feathersApp",
  default: {},
});
