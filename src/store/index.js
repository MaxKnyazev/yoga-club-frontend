import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { BASE_URL } from '../constants';
import { sendDeleteRequest, sendPutRequest, sendPostRequest, sendGetRequest } from '../utils';

export const useStoreOfYogaClub = create(devtools(immer((set) => ({
  clients: {
    result: [],
    error: ''
  },
  cardtypes: {
    result: [],
    error: ''
  },
  clubcards: {
    result: [],
    error: ''
  },
  membershiptypes: {
    result: [],
    error: ''
  },
  memberships: {
    result: [],
    error: ''
  },
  instructors: {
    result: [],
    error: ''
  },
  sessions: {
    result: [],
    error: ''
  },
  logs: [],
}))))


export const getAllClientsSelector = (state) => state.clients.result;
export const getAllCardtypesSelector = (state) => state.cardtypes.result;
export const getAllClubcardsSelector = (state) => state.clubcards.result;
export const getAllMembershiptypesSelector = (state) => state.membershiptypes.result;
export const getAllMembershipsSelector = (state) => state.memberships.result;
export const getAllInstructorsSelector = (state) => state.instructors.result;
export const getAllSessionsSelector = (state) => state.sessions.result;
export const getAllLogsSelector = (state) => state.logs;


export const getEntityes = async (endpoint) => {
  try {
    const entitys = await sendGetRequest(`${BASE_URL}/${endpoint}`);
    useStoreOfYogaClub.setState((state) => {
      state[`${endpoint}`] = entitys;
    });
    console.log(`*** Response ${endpoint} +--->`)
    console.log(entitys)
  } catch (error) {
    console.error(`Ошибка при отправке запроса /${endpoint}:`, error);
    throw error; // Пробрасываем ошибку дальше
  }
}

/**
 * 
 * @param {*} idTitle  - название id сущности, например "card_type_id"
 * @param {*} endpoint - например "cardtypes" 
 * @param {*} data     - данные формы
 */
export const addNewEntity = async (idTitle, endpoint, data) => {
  try {
    // console.log('data .....................')
    // console.log(data)
    const response = await sendPostRequest(`${BASE_URL}/${endpoint}`, data);
    // console.log('response .....................')
    // console.log(response)
    let entity = {...data, [`${idTitle}`]: response.result}
    // console.log('addNewClient .....................')
    // console.log(client)
    useStoreOfYogaClub.setState((state) => {
      state[`${endpoint}`].result.push(entity);
    });
  } catch (error) {
    console.error(`Ошибка при отправке запроса addNewEntity -- /${endpoint}:`, error);
    throw error; // Пробрасываем ошибку дальше
  }
}

/**
 * @param {*} entityId - id сущности
 * @param {*} idTitle  - название id сущности, например "card_type_id"
 * @param {*} endpoint - например "cardtypes" 
 */
export const deleteEntity = async (entityId, idTitle, endpoint) => {
  try {
    const response = await sendDeleteRequest(`${BASE_URL}/${endpoint}`, entityId);
  
    console.log('response deleteEntity.....................')
    console.log(response.error)

    if (response.error !== 'null') {
      throw new Error(response.error);
    }
    
    const id = response.result;
    // console.log('id .....................')
    // console.log(id)
    const state = useStoreOfYogaClub.getState();
    // console.log('state .....................')
    // console.log(state)
  
      const filteredResult = state[`${endpoint}`].result.filter((client) => +client[`${idTitle}`] !== id);
      // console.log('filteredResult .....................')
      // console.log(filteredResult)
      useStoreOfYogaClub.setState(
        // {clients: {result: filteredResult, error:''}}
        (state) => { 
          return {...state, [`${endpoint}`]: {result: filteredResult}, error: ''}
        }
      )
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @param {*} entityId - id сущности
 * @param {*} idTitle  - название id сущности, например "card_type_id"
 * @param {*} endpoint - например "cardtypes" 
 * @param {*} data     - данные формы
 */
export const editEntity = async (entityId, idTitle, endpoint, data) => {
  // console.log('id .....................')
  // console.log(id)
  // console.log('data .....................')
  // console.log(data)
  const response = await sendPutRequest(`${BASE_URL}/${endpoint}`, entityId, data);
  // console.log('response .....................')
  // console.log(response)
  if (response.result[0] === 1) {
    const entity = {...data, [`${idTitle}`]: entityId};
    // console.log('client .....................')
    // console.log(client)
    const state = useStoreOfYogaClub.getState();
    // console.log('state .....................')
    // console.log(state)
    const updatedEntitys = state[`${endpoint}`].result.map((e) => (e[`${idTitle}`] === entityId? entity : e));
    // console.log('updatedClients .....................')
    // console.log(updatedClients)
    // useStoreOfYogaClub.setState({clients: {result: updatedClients, error: ''}});
    useStoreOfYogaClub.setState(
      (state) => { 
        return {...state, [`${endpoint}`]: {result: updatedEntitys}, error: ''}
      }
    );
  }
}






/*


// export const editClient = async (id, data) => {
//   // console.log('id .....................')
//   // console.log(id)
//   // console.log('data .....................')
//   // console.log(data)
//   const response = await sendPutRequest(`${BASE_URL}/clients`, id, data);
//   // console.log('response .....................')
//   // console.log(response)
//   if (response.result[0] === 1) {
//     const client = {...data, client_id: id};
//     // console.log('client .....................')
//     // console.log(client)
//     const state = useStoreOfYogaClub.getState();
//     // console.log('state .....................')
//     // console.log(state)
//     const updatedClients = state.clients.result.map((c) => (c.client_id === id? client : c));
//     // console.log('updatedClients .....................')
//     // console.log(updatedClients)
//     // useStoreOfYogaClub.setState({clients: {result: updatedClients, error: ''}});
//     useStoreOfYogaClub.setState(
//       (state) => { 
//         return {...state, clients: {result: updatedClients}, error: ''}
//       }
//     );
//   }
// }


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
