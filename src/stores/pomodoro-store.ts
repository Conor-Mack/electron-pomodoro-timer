import TimerStore, { TimeInteval } from "./timer-store";
import { action, computed, observable } from "mobx";

class Settings {
  @observable task: string = "Test task";
  @observable setsHaveLimit: boolean = false;
  @observable maxSets: number = 3;
  @observable workTime: number = 45;
  @observable breakTime: number = 15;
}

class PomodoroStore {
  @observable workTimeDuration: number = 10;
  @observable breakTimeDuration: number = 5;
  @observable totalPomodoroSets: number | null = 3;
  @observable elapsedPomodoroSets: number = 0;
  @observable timerIsPaused = false;

  @observable testClickBool = false; //TODO - REMOVE ME WHEN NO LONGER NEEDED

  @observable activeTimer: TimerStore | null = null;
  progressCircle: React.RefObject<SVGElement>;
  timerLabel: React.RefObject<SVGElement>;

  @observable settings: Settings = new Settings();

  @action.bound
  setSettingsValue(key: keyof Settings, value: string | number | boolean) {
    this.settings[key] = value;
  }

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

  @action.bound
  async instantiateTimer(isWorkTime: boolean) {
    let timeInterval: TimeInteval = isWorkTime
      ? { minutes: this.settings.workTime }
      : { minutes: this.settings.breakTime };
    this.activeTimer = new TimerStore(timeInterval);
  }

  @action
  async managePomodoro() {
    while (this.elapsedPomodoroSets < this.totalPomodoroSets!) {
      await this.startWorkOrBreakTimer(true);
      await this.startWorkOrBreakTimer(false);
      this.elapsedPomodoroSets++;
    }
  }

  async prepareTimer() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.progressCircle.current!.style.transition =
          "stroke-dashoffset 1s linear, opacity 0.5s ease-in";
        this.progressCircle.current!.style.opacity = "1";
        this.timerLabel.current!.style.transition = "opacity 0.5s ease-in";
        this.timerLabel.current!.style.opacity = "1";
        resolve();
      }, 1000);
    });
  }

  @action
  async startWorkOrBreakTimer(isWorkTime: boolean) {
    this.instantiateTimer(isWorkTime);
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
