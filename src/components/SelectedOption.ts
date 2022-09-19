import { toComma } from '@util/index';
import Component from './core/Component';

export interface ISelectedOption {
  name: string;
  optionId: number;
  optionName: string;
  price: number;
  stock: number;
  quantity: number;
}

interface ISelectedOptionState {
  selectedOptions: ISelectedOption[];
  totalPrice: number;
  onChange: (optionId: number, value: number) => void;
}
export default class SelectedOption extends Component<ISelectedOptionState> {
  init() {
    this.$element = document.createElement('div');
    this.$element.className = 'ProductDetail__selectedOptions';
    this.$target.appendChild(this.$element);

    this.$element.addEventListener('change', (e) => {
      if (!e.target) return;
      const target = e.target as HTMLInputElement;
      const optionId = target.closest('li')?.dataset.id;
      optionId !== undefined && this.state?.onChange(parseInt(optionId, 10), parseInt(target.value, 10));
    });

    this.$element.addEventListener('click', (e) => {
      if (!e.target) return;
      const target = e.target as HTMLButtonElement;
      if (target.nodeName !== 'BUTTON' && !target.classList.contains('deleteBtn')) return;
      const optionId = target.closest('li')?.dataset.id;
      optionId !== undefined && this.state?.onChange(parseInt(optionId, 10), 0);
    });
  }

  render() {
    if (!this.state || !this.$element) return;
    if (!this.state.selectedOptions.length) {
      this.$element.innerHTML = '';
      return;
    }
    this.$element.innerHTML = `<ul>
            ${this.state.selectedOptions
              .map(
                ({ optionId, name, optionName, price, stock, quantity }) =>
                  `<li data-id="${optionId}"><div><span class="itemName">${name} ${optionName}</span><input type="number" value="${quantity}" min="1" max="${stock}"><span class="itemPrice">${toComma(
                    price * quantity
                  )}원</span></div><button class="deleteBtn">✖</button><li>`
              )
              .join('')}
        </ul>
        <div class="ProductDetail__totalPrice">총 상품 금액 <span class="totalPrice"><span>${toComma(this.state.totalPrice)}</span>원</span></div>`;
  }
}
