import { toComma } from '@util/index';
import { useRouter } from './../router/index';
import { removeCart } from './../store/index';
import Component from './core/Component';

export interface ICartData {
  imageUrl: string;
  name: string;
  optionName: string;
  quantity: number;
  productId: number;
  optionId: number;
  price: number;
  optionPrice: number;
}

interface ICartState {
  cartData: ICartData[];
  onChange: (idx: number) => void;
}

export default class Cart extends Component<ICartState> {
  private router = useRouter();

  private getTotalPrice() {
    if (this.state) {
      return this.state.cartData.reduce((a, { price, optionPrice, quantity }) => a + (price + optionPrice) * quantity, 0);
    }
    return 0;
  }

  init() {
    this.$element = document.createElement('div');
    this.$element.className = 'Cart';
    this.$target.appendChild(this.$element);

    this.$element.addEventListener('click', (e) => {
      const target = e.target as Element;

      if (target.nodeName === 'BUTTON') {
        if (target.classList.contains('deleteBtn')) {
          if (!this.state?.cartData) return;
          const li = target.closest('li');
          if (li?.dataset.idx !== undefined) {
            const idx = parseInt(li.dataset.idx, 10);
            this.state.onChange(idx);
          }
        } else if (target.classList.contains('OrderButton')) {
          removeCart();
          this.router?.to('/');
        }
      }
    });
  }

  render() {
    if (this.state && this.$element) {
      this.$element.innerHTML = `<ul>
            ${this.state.cartData
              .map(
                ({ quantity, imageUrl, name, optionName, price, optionPrice }, idx) =>
                  `<li class="Cart__item" data-idx="${idx}"><button class="deleteBtn">✖</button>
                <img src="${imageUrl}">
                <div class="Cart__itemDescription">
                  <div>${name} ${optionName} ${quantity}개</div>
                  <div>${toComma(quantity * (+price + optionPrice))}원</div>
                </div>
                </li>`
              )
              .join('')}
            </ul>
            <div class="Cart__totalPrice">총 상품가격 ${toComma(this.getTotalPrice())}원</div>
            <button class="OrderButton">주문하기</button>`;
    }
  }
}
