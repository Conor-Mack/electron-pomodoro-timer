import TimerUIStore, { TimerUIStoreModel } from "./timer-ui-store";
import { action, computed, observable } from "mobx";

export interface TimeInteval {
  hours?: number;
  minutes?: number;
  seconds: number;
}

class TimerStore {
  @observable timerUIStore: TimerUIStore;
  @observable startTime: number = 0;
  @observable elapsedTime: number = 0;
  timerFn: () => {};

  constructor(
    timeInteral: TimeInteval,
    uiState: TimerUIStoreModel = { radius: 90, circumference: 565 }
  ) {
    this.startTime = this.convertToSeconds(timeInteral);
    this.elapsedTime = this.startTime;
    this.timerUIStore = new TimerUIStore(uiState);
    this.startTimer = this.startTimer.bind(this);
    this.startTimer();
  }

  @action
  private convertToSeconds(interval: TimeInteval): number {
    const { hours, minutes, seconds } = interval;
    let durationInSeconds = hours || 0 * 60 * 60;
    durationInSeconds += minutes || 0 * 60;
    durationInSeconds += seconds;
    return durationInSeconds;
  }

  @action.bound
  startTimer() {
    return new Promise(resolve => {
      this.timerFn = setInterval(() => {
        if (this.elapsedTime > 1) {
          this.elapsedTime--;
        } else {
          this.stopTimer();
          resolve();
        }
      }, 1000);
    });
  }

  @action
  stopTimer() {
    clearInterval(this.timerFn);
    if (this.elapsedTime !== 0) {
      this.elapsedTime = 0;
    }
  }

  @action
  pauseTimer() {
    clearInterval(this.timerFn);
  }

  @computed
  get getDashValue() {
    const { startTime, elapsedTime, timerUIStore } = this;
    const { circleCircumference } = timerUIStore;
    //Slight hack to make timer consistant with readable time - need better way
    let startTimeMod = startTime - 1;
    let elapsedTimeMod = elapsedTime - 1;
    let dash =
      ((startTimeMod - elapsedTimeMod) / startTimeMod) * circleCircumference;
    if (dash <= circleCircumference) {
      return dash;
    }
  }

  @computed
  get getReadableTime(): string {
    const { elapsedTime } = this;
    let elTime = elapsedTime;
    let hours = Math.floor(elTime / 3600);
    let minutes = Math.floor((elTime / 60) % 60);
    let seconds = elTime % 60;
    let timerArr = hours > 0 ? [hours, minutes, seconds] : [minutes, seconds];
    return this.constructReadableTime(timerArr);
  }

  constructReadableTime(timerArr: number[]): string {
    return timerArr.map(x => this.returnDoubleDigit(x)).join(":");
  }

  returnDoubleDigit(digit: number): string {
    return digit < 10 ? `0${digit}` : digit.toString();
  }
}

export default TimerStore;
