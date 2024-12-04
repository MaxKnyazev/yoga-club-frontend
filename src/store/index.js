import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { BASE_URL } from '../constants';

export const useStoreOfYogaClub = create(devtools(immer((set) => ({
  clients: {
    result: [],
    error: ''
  },
}))))

export const deleteClient = (clientId) => {
    const state = useStoreOfYogaClub.getState();
    const filteredResult = state.clients.result.filter((client) => client.client_id !== clientId);
    useStoreOfYogaClub.setState({clients: {result: filteredResult, error:''}})
}

export const getClients = async () => {
    // const state = useStoreOfYogaClub.getState();
    const response = await fetch(`${BASE_URL}/clients`);
    const clients = await response.json();
    useStoreOfYogaClub.setState({clients});
    console.log('*** Response clients --->')
    console.log(clients)
}

export const getAllClientsSelector = (state) => state.clients.result;

// export const deleteClientByIdSelector = (state) => state.clients.................







/**
 * 
 * 
 *   // clients: {
  //   "result": [
  //     {
  //       "client_id": "1",
  //       "first_name": "Иван",
  //       "last_name": "Петров",
  //       "phone_number": "+7(920)753-89-56",
  //       "email": "ivan@mail.ru",
  //       "date_of_birth": "2024-10-01T13:32:51.000Z",
  //       "registration_date": "2024-10-08T13:32:58.000Z",
  //       "status": "активный",
  //       "createdAt": "2024-10-16T13:32:02.000Z",
  //       "updatedAt": "2024-10-16T13:32:05.000Z"
  //     },
  //     {
  //       "client_id": "2",
  //       "first_name": "Марк",
  //       "last_name": "Ливанов",
  //       "phone_number": "+7(997)363-27-55",
  //       "email": "livanov.mark@mail.com",
  //       "date_of_birth": "2024-10-01T13:32:51.000Z",
  //       "registration_date": "2024-10-08T13:32:58.000Z",
  //       "status": "активный",
  //       "createdAt": "2024-10-16T13:32:02.000Z",
  //       "updatedAt": "2024-10-16T13:32:05.000Z"
  //     },
  //     {
  //       "client_id": "4",
  //       "first_name": "Анна",
  //       "last_name": "Сидорова",
  //       "phone_number": "+7(987)654-32-10",
  //       "email": "sidorova.anna@gmail.com",
  //       "date_of_birth": "2024-10-01T13:32:51.000Z",
  //       "registration_date": "2024-10-08T13:32:58.000Z",
  //       "status": "активный",
  //       "createdAt": "2024-10-16T13:32:02.000Z",
  //       "updatedAt": "2024-10-16T13:32:05.000Z"
  //     },
  //     {
  //       "client_id": "3",
  //       "first_name": "Елена2 ",
  //       "last_name": "Вольская",
  //       "phone_number": "+7(912)345-67-89",
  //       "email": "volskaya@mail.com",
  //       "date_of_birth": "2024-10-01T13:32:51.000Z",
  //       "registration_date": "2024-10-08T13:32:58.000Z",
  //       "status": null,
  //       "createdAt": "2024-10-16T13:32:02.000Z",
  //       "updatedAt": "2024-10-16T13:32:05.000Z"
  //     },
  //     {
  //       "client_id": "46",
  //       "first_name": "F00000000",
  //       "last_name": "L000000000000",
  //       "phone_number": "+7(777) 111-11-22",
  //       "email": "test@test.com",
  //       "date_of_birth": "2023-10-01T02:32:51.000Z",
  //       "registration_date": "2024-10-01T02:32:51.000Z",
  //       "status": "active",
  //       "createdAt": "2024-11-06T08:14:02.455Z",
  //       "updatedAt": "2024-11-06T09:05:41.232Z"
  //     },
  //     {
  //       "client_id": "41",
  //       "first_name": "F00000000",
  //       "last_name": "L000000000000",
  //       "phone_number": "+7(777) 111-11-22",
  //       "email": "test@test.com",
  //       "date_of_birth": "2023-10-01T02:32:51.000Z",
  //       "registration_date": "2024-10-01T02:32:51.000Z",
  //       "status": "active",
  //       "createdAt": "2024-10-16T13:32:02.000Z",
  //       "updatedAt": "2024-11-06T09:16:53.985Z"
  //     }
  //   ],
  //   "error": ""
  // },

 * 
 * 
 * 
 * Access-Control-Allow-Origin: *
 * 
 * 
 * import axios from "axios";
const useStore = create(set => ({
  pokemons: [],
  getPokemons: async ()=> {
    const response = await axios.get('')
    set({ pokemons: response.data })
  }
}))


let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer,
  // или URL с текущего источника
  referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController, чтобы прервать запрос
  window: window // null
});



 */







// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

/*


import create from "zustand";
const useStore = create((set) => ({
pokemons: [{ id: 1, name: "Bulbasaur" },
 { id: 2, name: "Ivysaur" },
 { id: 3, name: "Venusaur" },
 { id: 4, name: "Charmander" },
 { id: 5, name: "Charmeleon" },
],
addPokemons: (pokemon) =>
set((state) => ({
 pokemons: [
 { name: pokemon.name, id: Math.random() * 100 },
  ...state.pokemons,
 ]})),
removePokemon: (id) =>
 set((state) => ({
   pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
 })),
}));
export default useStore;


*/


// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
// // 
// export const useStoreOfProducts = create(
//   devtools((set, get) => ({
//     products: [
//       {
//         id: 1,
//         title: "Apple BYZ S852I",
//         price: 3527,
//         discount: 2927,
//         rate: 4.7,
//         attribute: "landline",
//         count: 0,
//         isFavourite: false,
//         description: `
//         1111 The ultimate over-ear personal listening experience — now in fresh new colors. 
//       `,
//       },
//       {
//         id: 2,
//         title: "Apple EarPods",
//         price: 2327,
//         discount: 0,
//         rate: 4.5,
//         attribute: "landline",
//         count: 0,
//         isFavourite: false,
//         description: `
//         1111 The ultimate over-ear personal listening experience — now in fresh new colors. 
//       `,
//       },
//       {
//         id: 3,
//         title: "Apple EarPods",
//         price: 2327,
//         discount: 0,
//         rate: 4.5,
//         attribute: "landline",
//         count: 0,
//         isFavourite: false,
//         description: `
//         1111 The ultimate over-ear personal listening experience — now in fresh new colors. 
//       `,
//       },
//     ],
//     saveToSessionStorage: (data) => {
//       sessionStorage.setItem('products', JSON.stringify(data));
//     },
//     editProductCount: (id, newCount) => {
//       set((state) => ({
//         products: state.products.map(product => {
//           if (product.id === id) {
//             product.count = newCount;
//           }
//           return product;
//         })
//       }))
//     },
//     loadFromSessionStorage: () => {
//       const storedData = sessionStorage.getItem('products');
//       const parsedData = storedData && JSON.parse(storedData);
//       if (storedData) { set(state => ({products: [...parsedData]}))}
//     }
//     // toggleProductFavourite?: (id: number) => void,
//   }))
// );
