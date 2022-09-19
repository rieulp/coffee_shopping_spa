import { toComma } from '@util/index';
import { addCart } from './../store/index';
import { useRouter } from './../router/index';
import Component from './core/Component';
import SelectedOption, { ISelectedOption } from './SelectedOption';

export interface IProductInfo {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  productOptions: {
    id: number;
    name: string;
    price: number;
    stock: number;
  }[];
}
export interface IProductDetailState extends IProductInfo {
  selectedOptions: ISelectedOption[];
}

export default class ProductDetail extends Component<IProductDetailState> {
  private isInit = false;
  private router = useRouter();
  private $selectedOption?: SelectedOption;
  init() {
    this.$element = document.createElement('div');
    this.$element.className = 'ProductDetail';
    this.$target.appendChild(this.$element);

    this.$element.addEventListener('change', (e) => {
      const target = e.target as Element;
      if (!target || !this.state) return;

      const selectedOptions = [...(this.state.selectedOptions || [])];

      if (target.nodeName === 'SELECT') {
        const $select = target as HTMLSelectElement;
        const optionId = $select[$select.selectedIndex].dataset.id;

        if (optionId && selectedOptions.findIndex(({ optionId: id }) => parseInt(optionId, 10) === id) < 0) {
          const option = this.state.productOptions.find(({ id }) => id === parseInt(optionId, 10));

          if (option) {
            const { name: optionName, price: opPrice, stock } = option;

            selectedOptions.push({
              optionId: parseInt(optionId, 10),
              name: this.state.name,
              optionName,
              price: opPrice + this.state.price,
              stock,
              quantity: 1,
            });

            this.setState({ selectedOptions });
          }
        }
      }
    });

    this.$element.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (target.nodeName === 'BUTTON' && target.classList.contains('OrderButton')) {
        if (this.state) {
          addCart(this.state.id, this.state.selectedOptions);
          this.router?.to('/cart');
        }
      }
    });
  }

  private getTotalPrice() {
    return this.state?.selectedOptions?.reduce((pre, { price, quantity }) => pre + price * quantity, 0) || 0;
  }

  render() {
    if (!this.state || !this.$element) return;
    if (!this.isInit) {
      const { name, price, imageUrl, productOptions } = this.state;

      this.$element.innerHTML = `<img src="${imageUrl}">
            <div class="ProductDetail__info">
                <h2>${name}</h2>
                <div class="ProductDetail__price">${toComma(price)}원</div>
                <select>
                <option>선택하세요.</option>
                ${productOptions
                  .map(
                    ({ id, name: opName, price: opPrice, stock }, index) =>
                      `<option data-index="${index}" data-id="${id}" value="${opPrice}" ${stock === 0 ? 'disabled' : ''}>${
                        stock === 0 ? '(품절) ' : ''
                      }${name} ${opName}${opPrice !== 0 ? ` (+${toComma(opPrice)}원)` : ''}</option>`
                  )
                  .join('')}
                </select>
            </div>`;

      const $selectedOptionTarget = this.$element.querySelector('.ProductDetail__info');
      if ($selectedOptionTarget) {
        this.$selectedOption = new SelectedOption({
          $target: $selectedOptionTarget,
          initialState: {
            onChange: (optionId, value) => {
              const selectedOptions = [...(this.state?.selectedOptions || [])];
              const index = selectedOptions.findIndex(({ optionId: id }) => optionId === id);
              if (value === 0) {
                selectedOptions.splice(index, 1);
              } else {
                selectedOptions[index] = { ...selectedOptions[index], quantity: Math.min(selectedOptions[index].stock, value) };
              }
              this.setState({ selectedOptions });
            },
            selectedOptions: this.state.selectedOptions,
            totalPrice: this.getTotalPrice(),
          },
        });

        $selectedOptionTarget.insertAdjacentHTML(
          'beforeend',
          `<button class="OrderButton" ${this.state.selectedOptions?.length ? '' : 'disabled'}>주문하기</button>`
        );
      }

      this.isInit = true;
    } else {
      this.$selectedOption?.setState({ selectedOptions: this.state.selectedOptions, totalPrice: this.getTotalPrice() });
    }
  }
}
