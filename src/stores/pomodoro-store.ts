import TimerStore, { TimeInteval } from "./timer-store";
import { action, computed, observable } from "mobx";

import { createRef } from "react";

class Settings {
  @observable task: string = "Test task";
  @observable setsHaveLimit: boolean = false;
  @observable maxSets: number = 3;
  @observable workTime: number = 0.25;
  @observable breakTime: number = 0.5;
}

class PomodoroStore {
  @observable workTimeDuration: number = 10;
  @observable breakTimeDuration: number = 5;
  @observable totalPomodoroSets: number | null = 3;
  @observable elapsedPomodoroSets: number = 0;
  @observable timerIsPaused = false;
  @observable isWorkTime: boolean = true;

  @observable activeTimer: TimerStore | null = null;
  progressCircle: React.RefObject<SVGElement>;
  timerLabel: React.RefObject<SVGElement>;
  workBreakLabel: React.RefObject<SVGElement>;

  @observable settings: Settings = new Settings();
  @observable intermediarySettings: Settings = new Settings();

  @observable checkResetConfirmation = false;
  @observable checkSaveConfirmation = false;

  constructor() {
    this.createComponentRefs();
    this.instantiateTimer(true);
  }

  @computed
  get currentSetText() {
    return `Set ${this.elapsedPomodoroSets + 1}`;
  }

  @action.bound
  async resetAllPomodoros() {
    this.elapsedPomodoroSets = 0;
    this.checkResetConfirmation = false;
    this.stopTimer();
  }

  @action.bound
  loadIntermediarySettings() {
    Object.assign(this.intermediarySettings, this.settings);
  }

  @action.bound
  mergeSettings() {
    Object.assign(this.settings, this.intermediarySettings);
    this.intermediarySettings = new Settings();
  }

  @computed
  get settingsHaveChanged() {
    const { settings, intermediarySettings } = this;
    let hasChanged = false;
    for (let key in intermediarySettings) {
      if (settings[key] !== intermediarySettings[key]) hasChanged = true;
      if (hasChanged) break;
    }
    return hasChanged;
  }

  @action.bound
  setSettingsValue(key: keyof Settings, value: string | number | boolean) {
    this.intermediarySettings[key] = value;
  }

  @action.bound
  validateTimings(key: string) {
    if (this.settings[key] < 1) {
      this.settings[key] = 1;
    } else if (this.settings[key] > 60) {
      this.settings[key] = 60;
    }
  }

  createComponentRefs() {
    this.progressCircle = createRef<SVGElement>();
    this.timerLabel = createRef<SVGElement>();
    this.workBreakLabel = createRef<SVGElement>();
  }

  @action.bound
  instantiateTimer(isWorkTime: boolean) {
    let timeInterval: TimeInteval = isWorkTime
      ? { minutes: this.settings.workTime }
      : { minutes: this.settings.breakTime };
    this.activeTimer = new TimerStore(timeInterval);
  }

  @computed
  get setLimitNotReached() {
    return this.elapsedPomodoroSets < this.settings.maxSets!;
  }

  @action
  async managePomodoro() {
    if (this.settings.setsHaveLimit) {
      while (this.setLimitNotReached) {
        await this.runPomodoroSet();
      }
    } else {
      while (!this.settings.setsHaveLimit) {
        await this.runPomodoroSet();
      }
    }
  }

  @action
  async runPomodoroSet() {
    if (this.isWorkTime) {
      await this.startWorkOrBreakTimer(true);
    }
    await this.startWorkOrBreakTimer(false);
    this.elapsedPomodoroSets++;
  }

  async toggleTimerUITransition(isVisible: boolean) {
    return new Promise(resolve => {
      let { getDashValue } = this.activeTimer;
      let transString = "opacity 0.5s ease-in";
      this.progressCircle.current!.style.transition = transString;
      this.timerLabel.current!.style.transition = transString;
      this.workBreakLabel.current!.style.transition = transString;
      //cast bool to number then string 🤮
      this.progressCircle.current!.style.opacity = `${Number(isVisible)}`;
      this.progressCircle.current!.style.strokeDashoffset =
        getDashValue !== undefined ? getDashValue : 0;

      this.timerLabel.current!.style.opacity = `${Number(isVisible)}`;
      this.workBreakLabel.current!.style.opacity = `${Number(isVisible)}`;
      setTimeout(() => {
        //reapply stroke-dashoffset transition attribute
        this.progressCircle.current!.style.transition =
          "stroke-dashoffset 1s linear, opacity 0.5s ease-in";
        resolve();
      }, 1000);
    });
  }

  @computed
  get timerAlreadyInProgress() {
    return (
      this.activeTimer !== null &&
      (this.activeTimer!.elapsedTime < this.activeTimer!.startTime &&
        this.activeTimer.elapsedTime !== 0)
    );
  }

  @action
  async startWorkOrBreakTimer(isWorkTime: boolean) {
    this.isWorkTime = isWorkTime;
    if (!this.timerAlreadyInProgress) {
      this.instantiateTimer(isWorkTime);
    }
    await this.toggleTimerUITransition(true);
    this.timerIsPaused = false;
    await this.activeTimer!.startTimer();
    await this.toggleTimerUITransition(false);
    if (!isWorkTime) this.isWorkTime = true;
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
  async stopTimer() {
    const { activeTimer, isWorkTime } = this;
    activeTimer!.stopTimer();
    // this.cleanUpTimer();
    await this.toggleTimerUITransition(false);
    this.instantiateTimer(isWorkTime);
    this.toggleTimerUITransition(true);
    this.pauseTimer();
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

  @computed
  get setsCompleteText() {
    const { elapsedPomodoroSets, settings } = this;
    return settings.setsHaveLimit
      ? `${elapsedPomodoroSets} of ${settings.maxSets} Sets Complete`
      : `${elapsedPomodoroSets} ${
          elapsedPomodoroSets === 1 ? "Set Complete" : "Sets Complete"
        }`;
  }
}

export default PomodoroStore;
