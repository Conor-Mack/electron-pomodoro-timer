import TimerStore, { TimeInteval } from "./timer-store";
import { action, computed, observable } from "mobx";

class PomodoroStore {
  @observable workTimeDuration: number = 20;
  @observable breakTimeDuration: number = 5;
  @observable totalPomodoroSets: number | null = null;
  @observable elapsedPomodoroSets: number = 0;

  @observable activeTimer: TimerStore | null = null;

  //TODO remoe this
  @observable testValue: number = 0;
  @action.bound
  incrementTestVal() {
    this.testValue++;
  }

  @action
  instantiateTimer(isWorkTime: boolean) {
    let timeInterval: TimeInteval = isWorkTime
      ? { seconds: this.workTimeDuration }
      : { seconds: this.breakTimeDuration };
    this.activeTimer = new TimerStore(timeInterval);
  }

  @action
  startTimer() {
    const { timerExists, activeTimer } = this;
    if (timerExists) {
      activeTimer!.startTimer();
    }
  }

  @action
  pauseTimer() {
    const { activeTimer } = this;
    activeTimer!.pauseTimer();
  }

  @action
  stopTimer() {
    const { activeTimer } = this;
    activeTimer!.stopTimer();
  }

  @action
  incrementElapsedSets() {
    this.elapsedPomodoroSets++;
  }

  @computed
  get timerExists() {
    return this.activeTimer !== null;
  }
}

export default PomodoroStore;
