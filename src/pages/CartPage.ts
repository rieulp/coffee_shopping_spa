import { fetchProduct } from '@api/index';
import Cart, { ICartData } from '@components/Cart';
import Component from '@components/core/Component';
import { IProductInfo } from '@components/ProductDetail';
import { useRouter } from './../router/index';
import { getCart, removeCart } from './../store/index';

interface ICartPageState {
  cartData?: ICartData[];
}

export default class CartPage extends Component<ICartPageState> {
  private $cart?: Cart;
  private router = useRouter();

  init() {
    this.$element = document.createElement('div');
    this.$element.className = 'CartPage';
    this.$element.innerHTML = '<h1>장바구니</h1>';
    this.$target.appendChild(this.$element);
    this.$cart = new Cart({
      $target: this.$element,
      initialState: {
        cartData: this.state?.cartData || [],
        onChange: (idx) => {
          if (!this.state?.cartData) return;
          removeCart(this.state.cartData[idx].productId, this.state.cartData[idx].optionId);
          this.getCartData();
        },
      },
    });
    this.getCartData();
  }

  private async getCartData() {
    const cartData = await Promise.all(
      getCart().map(async ({ productId, optionId, quantity }) => {
        const info: IProductInfo = await fetchProduct(productId);
        const option = info.productOptions.find(({ id }) => id === optionId);
        const data: ICartData = {
          imageUrl: info.imageUrl,
          name: info.name,
          optionId,
          optionName: option?.name || '',
          optionPrice: option?.price || 0,
          price: info.price,
          productId,
          quantity,
        };
        return data;
      })
    );

    this.setState({ cartData });
  }

  render() {
    if (this.$cart && this.state?.cartData) {
      this.$cart.setState({ cartData: this.state.cartData });
      if (!this.state.cartData.length) {
        alert('장바구니가 비어 있습니다');
        this.router?.to('/');
      }
    }
  }
}
