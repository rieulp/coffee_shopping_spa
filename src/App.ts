import { router } from "./router/index";

export default class App {
  private state = {};

  constructor(private $app: HTMLDivElement) {
    this.render();
    router.init([{ path: "/", view: () => console.log("home") }]);
  }
  setState(nextState: {}) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$app.innerHTML = "<h1>blah</h1>";

    // fetchProductList().then((data) => console.log(data));
  }
}
