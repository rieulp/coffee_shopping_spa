import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import { initRouter } from './router/index';
import 'C:/Users/rayou/Desktop/과제테스트/coffee_shopping_spa/style.css';
export default class App {
  private state = {};
  private router;

  constructor(private $app: Element) {
    this.router = initRouter($app, [
      { path: /^\/$/, view: HomePage },
      {
        path: /^\/products\/[0-9]+$/,
        view: ProductDetailPage,
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
