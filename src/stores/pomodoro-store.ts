import { action, observable } from "mobx";

import TimerStore from "./timer-store";

class PomodoroStore {
  @observable workTimeDuration: number = 20;
  @observable breakTimeDuration: number = 5;
  @observable totalPomodoroSets: number | null = null;
  @observable elapsedPomodoroSets: number = 0;

  @observable activeTimer: TimerStore | null = null;

  @action
  startWork() {
    //initialize active timer with work time value
  }

  @action
  startBreak() {
    //initialize active timer with break time value
  }

  @action
  pauseTimer() {
    //pause active timer
  }

  @action
  stopTimer() {
    // current timer
  }

  @action
  incrementElapsedSets() {
    this.elapsedPomodoroSets++;
  }
}

export default PomodoroStore;
