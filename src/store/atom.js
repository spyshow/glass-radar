import { atom } from "recoil";

export const sidebarCollapsedState = atom({
  key: "sidebarCollapsedState",
  default: true,
});

export const loginAlarmState = atom({
  key: "loginAlarm",
  default: "",
});

export const machinesStatusState = atom({
  key: "machineStatus",
  default: [],
});

export const chartDataState = atom({
  key: "chartDataState",
  default: [],
});

export const authState = atom({
  key: "authState",
  default: "",
});
