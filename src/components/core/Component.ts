export interface IComponentProps<StateType> {
  $target: Element;
  initialState: StateType;
}

export default abstract class Component<StateType> {
  protected $target;
  protected $element: Element | null;
  protected state?;
  constructor({ $target, initialState }: IComponentProps<StateType>) {
    this.$target = $target;
    this.state = initialState;
    this.$element = null;

    this.init();
    this.render();
  }

  abstract template(): string;

  // 컴포넌트 생성시 컴포넌트 기본값 설정
  abstract init(): void;

  abstract render(): void;
  /** SetState */
  // 컴포넌트의 상태 변경 로직
  setState<K extends keyof StateType>(newState: Pick<StateType, K> | StateType): void {
    if (!this.checkNeedUpdate(newState)) return;
    if (this.state) {
      this.state = { ...this.state, ...newState };
    } else {
      this.state = { ...newState } as StateType;
    }
    this.render();
  }

  // 컴포넌트 상태 유효성 검사
  checkNeedUpdate<K extends keyof StateType>(newState: Pick<StateType, K> | StateType): boolean {
    const prevState = JSON.stringify({ ...this.state });
    const currentState = JSON.stringify({ ...this.state, ...newState });
    return prevState !== currentState;
  }
}
