import { action, observable } from "mobx";

export interface TimerUIStoreModel {
  radius: number;
  circumference: number;
  circleRef: any;
}

class TimerUIStore {
  @observable circleRadius: number = 90;
  @observable circleCircumference: number = 565;

  //TODO - Convert to proper typings
  circleRef: any = null;

  constructor(initialState: TimerUIStoreModel) {
    this.circleRef = initialState.circleRef;
  }

  @action
  async prepareTimerUi() {}
}

export default TimerUIStore;
