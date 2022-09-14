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
  order: () => void;
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
      const target = e.target as Element;
      if (target.nodeName === 'BUTTON') this.state?.order();
    });
  }

  render() {
    if (!this.state || !this.$element) return;
    this.$element.innerHTML = `<h3>선택된 상품</h3><ul>
            ${
              this.state?.selectedOptions
                ?.map(
                  ({ optionId, name, optionName, price, stock, quantity }) =>
                    `<li data-id="${optionId}">${name} ${optionName} ${toComma(
                      price
                    )} <div><input type="number" value="${quantity}" min="1" max="${stock}">개</div><li>`
                )
                .join('') || ''
            }
        </ul>
        <div class="ProductDetail__totalPrice">${toComma(this.state.totalPrice)}원</div>
        <button class="OrderButton" ${this.state.selectedOptions?.length ? '' : 'disabled'}>주문하기</button>
        </div>`;
  }
}
