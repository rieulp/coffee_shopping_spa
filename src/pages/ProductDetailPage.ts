import { fetchProduct } from '@api/index';
import Component from '@components/core/Component';
import ProductDetail, { IProductInfo } from '@components/ProductDetail';

interface IProductDetailPageState extends IProductInfo {}

export default class ProductDetailPage extends Component<IProductDetailPageState> {
  private $productDetail?: ProductDetail;

  init(): void {
    this.$element = document.createElement('div');
    this.$element.className = 'ProductDetailPage';

    this.$target.appendChild(this.$element);

    const id = location.pathname.split('/').pop();
    if (id) this.setState({ id: parseInt(id, 10) }, true);

    this.getProduct().then((info) => {
      this.setState(info);
    });
  }

  render() {
    if (this.state && this.state.name && this.$element) {
      this.$element.innerHTML = '<h1><a href="/" class="logo">Coffee Shop❤</a></h1>';
      if (!this.$productDetail) {
        this.$productDetail = new ProductDetail({
          $target: this.$element,
          initialState: { ...this.state, selectedOptions: [] },
        });
      } else {
        this.$productDetail.setState(this.state);
      }
    } else if (this.$element) this.$element.innerHTML = 'Loading';
  }

  private async getProduct() {
    if (this.state?.id) {
      const info = await fetchProduct(this.state.id);
      return info;
    }
    return {};
  }
}
