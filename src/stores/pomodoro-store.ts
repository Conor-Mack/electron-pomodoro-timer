import TimerStore, { TimeInteval } from "./timer-store";
import { action, computed, observable } from "mobx";

import React from "react";
import { resolve } from "url";

class PomodoroStore {
  @observable workTimeDuration: number = 10;
  @observable breakTimeDuration: number = 5;
  @observable totalPomodoroSets: number | null = null;
  @observable elapsedPomodoroSets: number = 0;
  @observable timerIsPaused = false;

  @observable testClickBool = false; //TODO - REMOVE ME WHEN NO LONGER NEEDED

  @observable activeTimer: TimerStore | null = null;
  progressCircle: React.RefObject<SVGElement>;
  timerLabel: React.RefObject<SVGElement>;

  constructor() {
    this.instantiateTimer(true);
  }

  storeTimerRef(
    progressRef: React.RefObject<SVGElement>,
    timerRef: React.RefObject<SVGElement>
  ) {
    this.progressCircle = progressRef;
    this.timerLabel = timerRef;
  }

  //TODO - REMOVE ME WHEN NO LONGER NEEDED
  @action
  testClick() {
    this.testClickBool = !this.testClickBool;
    !this.testClickBool
      ? (this.progressCircle.current.style.opacity = 1)
      : (this.progressCircle.current.style.opacity = 0);
  }

  @action.bound
  async instantiateTimer(isWorkTime: boolean) {
    let timeInterval: TimeInteval = isWorkTime
      ? { seconds: this.workTimeDuration }
      : { seconds: this.breakTimeDuration };
    this.activeTimer = new TimerStore(timeInterval);
  }

  @action
  async managePomodoro() {
    await this.startWorkTimer();
    await this.startBreakTimer();
  }

  async prepareTimer() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.progressCircle.current.style.transition =
          "stroke-dashoffset 1s linear, opacity 0.5s ease-in";
        this.progressCircle.current.style.opacity = 1;
        this.timerLabel.current.style.transition = "opacity 0.5s ease-in";
        this.timerLabel.current.style.opacity = 1;
        resolve();
      }, 1000);
    });
  }

  @action
  async startWorkTimer() {
    await this.prepareTimer();
    if (!this.timerExists) {
      this.instantiateTimer(true);
    }
    await this.activeTimer!.startTimer();
    this.cleanUpTimer();
  }

  @action
  async startBreakTimer() {
    this.instantiateTimer(false);
    await this.prepareTimer();
    await this.activeTimer!.startTimer();
    this.cleanUpTimer();
  }

  cleanUpTimer() {
    this.progressCircle.current.style.transition = "none";
    this.progressCircle.current.style.opacity = 0;
    this.timerLabel.current.style.transition = "none";
    this.timerLabel.current.style.opacity = 0;
  }

  @action
  setTimerPausedState(pauseState: boolean | null) {
    if (pauseState == null) {
      this.timerIsPaused = !this.timerIsPaused;
    } else {
      this.timerIsPaused = pauseState;
    }
  }

  @action
  pauseTimer() {
    const { activeTimer } = this;
    activeTimer!.pauseTimer();
    this.timerIsPaused = true;
  }

  @action
  stopTimer() {
    const { activeTimer } = this;
    activeTimer!.stopTimer();
  }

  @action
  playTimer() {
    const { activeTimer } = this;
    activeTimer!.startTimer();
    this.timerIsPaused = false;
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
