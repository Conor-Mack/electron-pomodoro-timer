import { action, computed, observable } from "mobx";

export interface TimeInteval {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

class TimerStore {
  @observable startTime: number = 0;
  @observable elapsedTime: number = 0;
  @observable circleRadius: number = 120;
  @observable circleCircumference: number = 754;
  timerFn: () => {};

  constructor(timeInteral: TimeInteval) {
    this.startTime = this.convertToSeconds(timeInteral);
    this.elapsedTime = this.startTime;
    this.startTimer = this.startTimer.bind(this);
  }

  @action
  private convertToSeconds(interval: TimeInteval): number {
    const { hours, minutes, seconds } = interval;
    let durationInSeconds = !!hours ? hours * 60 * 60 : 0;
    durationInSeconds += !!minutes ? minutes * 60 : 0;
    durationInSeconds += !!seconds ? seconds : 0;
    return durationInSeconds;
  }

  @action.bound
  startTimer() {
    return new Promise(resolve => {
      this.timerFn = setInterval(() => {
        if (this.elapsedTime > 0) {
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

  @action
  playTimer() {
    //todo - implement this
  }

  @computed
  get getDashValue() {
    const { startTime, elapsedTime, circleCircumference } = this;
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
