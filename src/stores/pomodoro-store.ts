import TimerStore, { TimeInteval } from "./timer-store";
import { action, computed, observable } from "mobx";

class PomodoroStore {
  @observable workTimeDuration: number = 20;
  @observable breakTimeDuration: number = 5;
  @observable totalPomodoroSets: number | null = null;
  @observable elapsedPomodoroSets: number = 0;

  @observable activeTimer: TimerStore | null = null;

  constructor() {
    this.instantiateTimer(true);
  }

  @action.bound
  instantiateTimer(isWorkTime: boolean) {
    let timeInterval: TimeInteval = isWorkTime
      ? { seconds: this.workTimeDuration }
      : { seconds: this.breakTimeDuration };
    this.activeTimer = new TimerStore(timeInterval);
  }

  @action
  async managePomodoro() {
    //FIX ME - I don't work. Instantiating both times at at the same time instead of waiting
    // Could use separate methods like in the web version
    if (!this.timerExists) {
      this.instantiateTimer(true);
    }
    await this.activeTimer!.startTimer();
    this.instantiateTimer(false);
    await this.activeTimer!.startTimer();
  }

  @action
  async startTimer() {
    const { timerExists, activeTimer } = this;
    if (timerExists) {
      await activeTimer!.startTimer();
      return true;
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
