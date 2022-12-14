import { fetchProductList } from '@api/index';
import Component from '@components/core/Component';
import ProductList, { IProduct } from '@components/ProductList';
import { useRouter } from '../router/index';

interface IHomePageState {
  products: IProduct[];
}
export default class HomePage extends Component<IHomePageState> {
  private $productList?: ProductList;
  private router = useRouter();

  init() {
    this.$element = document.createElement('div');
    this.$target.appendChild(this.$element);
    this.$element.className = 'ProductListPage';
    this.$element.innerHTML = `<h1 class="logo">Coffee Shop❤</h1>`;
    this.getProductList().then((products) => this.setState({ products }));
    this.$productList = new ProductList({
      $target: this.$element,
      initialState: {
        onClick: (id) => {
          this.router?.to(`/products/${id}`);
        },
        products: [],
      },
    });
  }
  render() {
    if (this.state?.products) {
      const { products } = this.state;
      this.$productList?.setState({ products });
    }
  }

  private async getProductList() {
    return await fetchProductList();
  }
}
