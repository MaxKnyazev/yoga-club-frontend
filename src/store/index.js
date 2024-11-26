import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// 
export const useStoreOfProducts = create(
  devtools((set, get) => ({
    products: [
      {
        id: 1,
        title: "Apple BYZ S852I",
        price: 3527,
        discount: 2927,
        rate: 4.7,
        attribute: "landline",
        count: 0,
        isFavourite: false,
        description: `
        1111 The ultimate over-ear personal listening experience — now in fresh new colors. 
      `,
      },
      {
        id: 2,
        title: "Apple EarPods",
        price: 2327,
        discount: 0,
        rate: 4.5,
        attribute: "landline",
        count: 0,
        isFavourite: false,
        description: `
        1111 The ultimate over-ear personal listening experience — now in fresh new colors. 
      `,
      },
      {
        id: 3,
        title: "Apple EarPods",
        price: 2327,
        discount: 0,
        rate: 4.5,
        attribute: "landline",
        count: 0,
        isFavourite: false,
        description: `
        1111 The ultimate over-ear personal listening experience — now in fresh new colors. 
      `,
      },
    ],
    saveToSessionStorage: (data) => {
      sessionStorage.setItem('products', JSON.stringify(data));
    },
    editProductCount: (id, newCount) => {
      set((state) => ({
        products: state.products.map(product => {
          if (product.id === id) {
            product.count = newCount;
          }
          return product;
        })
      }))
    },
    loadFromSessionStorage: () => {
      const storedData = sessionStorage.getItem('products');
      const parsedData = storedData && JSON.parse(storedData);
      if (storedData) { set(state => ({products: [...parsedData]}))}
    }
    // toggleProductFavourite?: (id: number) => void,
  }))
);
