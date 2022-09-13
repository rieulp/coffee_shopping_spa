import { toComma } from '@util/index';
import Component from './core/Component';

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface IProductListState {
  products: IProduct[];
  onClick: (productId: number) => void;
}

export default class ProductList extends Component<IProductListState> {
  template(): string {
    throw new Error('Method not implemented.');
  }

  init(): void {
    this.$element = document.createElement('ul');
    this.$target.appendChild(this.$element);

    this.$element.addEventListener('click', (e) => {
      if (e.target instanceof Element) {
        const $li = e.target.closest('li');
        if ($li && $li.dataset.id) this.state?.onClick(parseInt($li.dataset.id, 10));
      }
    });
  }

  render() {
    if (this.state && this.$element) {
      this.$element.innerHTML =
        this.state.products
          ?.map(
            ({ id, name, imageUrl, price }: IProduct) =>
              `<li class="Product" data-id="${id}">
            <img src="${imageUrl}">
            <div class="Product__info">
                <div>${name}</div>
                <div>${toComma(price)}원</div>
            </div>
            </li>`
          )
          .join('') || '';
    }
  }
}
