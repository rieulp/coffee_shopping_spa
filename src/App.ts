import Home from './pages/Home';
import { initRouter } from './router/index';
import 'C:/Users/rayou/Desktop/과제테스트/coffee_shopping_spa/style.css';
export default class App {
  private state = {};
  private router;

  constructor(private $app: Element) {
    this.router = initRouter($app, [
      { path: /^\/$/, view: Home },
      {
        path: /^\/products\/[0-9]+$/,
        view: () => console.log('detail'),
      },
      {
        path: /^\/cart$/,
        view: () => console.log('cart'),
      },
    ]);
  }
  setState(nextState: {}) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {}
}
