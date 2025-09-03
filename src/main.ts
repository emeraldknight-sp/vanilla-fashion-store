// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``;

import { products } from './mock/products';

// NAVIGATION TO FILTER PRODUCTS BY CATEGORY

const collectionFilterNav = document.getElementById('collection-filter')!;
const collectionOptions = ['todos', 'blusas', 'jeans', 'calçados', 'acessórios'];

collectionOptions.forEach((option, index) => {
  const button = document.createElement('button');
  const span = document.createElement('span');

  if (index === 0) {
    button.classList.remove('border-neutral-50');
    button.classList.add('border-neutral-900');
    button.ariaSelected = 'true';
    button.setAttribute('selected', '');
    localStorage.setItem('collection-category', option);
  }

  span.innerText = option;
  span.classList.add('text-base', 'text-neutral-900', 'capitalize');

  button.id = option;
  button.setAttribute('aria-label', option);
  button.classList.add(
    'bg-neutral-50',
    'border-b-2',
    'border-neutral-50',
    'px-2',
    'collection-menu-btn',
    'transition-all',
    'duration-500',
    'hover:cursor-pointer',
    'hover:border-neutral-900'
  );

  button.appendChild(span);
  collectionFilterNav.appendChild(button);
});

collectionFilterNav.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const selectedButton = target.closest('button');

  if (!selectedButton) return;

  document.querySelectorAll('.collection-menu-btn').forEach((button) => {
    button.classList.remove('border-neutral-900');
    button.classList.add('border-neutral-50');
    button.removeAttribute('selected');
  });

  selectedButton.classList.remove('border-neutral-50');
  selectedButton.classList.add('border-neutral-900');
  selectedButton.setAttribute('selected', '');
  filterProductsByCategory(selectedButton.id);
});

// RENDER COLLECTION BY CATEGORY

const collectionContainer = document.getElementById('collection-container')!;

const renderProducts = (products: Product[]) => {
  collectionContainer.innerHTML = '';

  if (products.length > 0) {
    products.forEach((product, index) => {
      const collectionCard = document.createElement('div');
      collectionCard.classList.add('flex', 'flex-col', 'gap-4', 'w-[200px]');
      collectionCard.id = `${index}`;

      collectionCard.innerHTML = `
          <img
            src=${product.image}
            class="max-w-[200px] aspect-1/1 object-cover rounded-md"
            alt="${product.name}"
          />
          <div class="flex flex-col gap-4">
            <div>
              <h4 class="text-neutral-900 text-sm font-bold font-content uppercase">
                ${product.name}
              </h4>
              <p class="text-neutral-800 text-sm font-content">Tamanhos: P, M e G</p>
              <span class="flex flex-col flex-1">
                <p class="text-base font-normal line-through">R$ 69,90</p>
                <p class="text-lg font-bold">R$ 19,90</p>
              </span>
            </div>
            <div class="flex flex-col gap-1">
              <button
                type="button"
                class="bg-neutral-900 px-3 py-2 transition-all duration-300 hover:bg-neutral-900/90 cursor-pointer"
              >
                <span class="text-neutral-50 text-lg font-bold uppercase">Comprar</span>
              </button>
              <button
                type="button"
                class="bg-neutral-50 border-3 border-neutral-900 px-3 py-2 transition-all duration-300 hover:bg-neutral-200 cursor-pointer"
              >
                <span class="text-neutral-900 text-lg font-bold uppercase">Saber mais</span>
              </button>
            </div>
          </div>
      `;

      collectionContainer.appendChild(collectionCard);
    });
  } else {
    const warningElement = document.createElement('span');
    warningElement.classList.add('text-neutral-900', 'text-lg', 'text-center', 'font-bold', "w-full");

    warningElement.innerText = 'Sem produtos nessa categoria.';
    collectionContainer.appendChild(warningElement);
  }
};

const filterProductsByCategory = (category: string) => {
  const checkProductCategory = (product: Product) => product.category.includes(category);

  const filteredProducts =
    category === 'todos' ? products : products.filter((product) => checkProductCategory(product));

  renderProducts(filteredProducts);
};

renderProducts(products);
