import TimerUIStore, { TimerUIStoreModel } from "./timer-ui-store";

import { observable } from "mobx";

class TimerStore {
  @observable timerUIStore: TimerUIStore;

  constructor(uiState: TimerUIStoreModel) {
    this.timerUIStore = new TimerUIStore(uiState);
  }
}

export default TimerStore;
