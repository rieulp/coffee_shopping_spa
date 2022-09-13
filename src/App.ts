import ProductListPage from './pages/ProductListPage';
import { initRouter } from './router/index';
import 'C:/Users/rayou/Desktop/과제테스트/coffee_shopping_spa/style.css';
export default class App {
  private state = {};
  private router;

  constructor(private $app: Element) {
    this.router = initRouter($app, [
      { path: /^\/$/, view: ProductListPage },
      {
        path: /^\/products\/[0-9]+$/,
        view: () => console.log('detail'),
      },
      {
        path: /^\/cart$/,
        view: () => console.log('cart'),
      },
    ]);

    // const homePage = new ProductListPage({ $target: $app, initialState: { products: [] } });
    // this.router.router();
  }
  setState(nextState: {}) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {}
}
