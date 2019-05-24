import { observable } from "mobx";

export interface TimerUIStoreModel {
  radius: number;
  circumference: number;
}

class TimerUIStore {
  @observable circleRadius: number = 0;
  @observable circleCircumference: number = 0;

  constructor(initialState: TimerUIStoreModel) {
    this.circleRadius = initialState.radius;
    this.circleCircumference = initialState.circumference;
  }
}

export default TimerUIStore;
