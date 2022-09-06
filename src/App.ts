export default class App {
  private state = {};

  constructor(private $app: HTMLDivElement) {
    this.render();
  }
  setState(nextState: {}) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$app.innerHTML = '<h1>blah</h1>';
  }
}
