import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts_Mut(state, products) {
      console.log(products)
      state.products = products;
    },
    loadBag_Mut(state, products){
      state.productsInBag = products;
    },
    addToBag_Mut(state, product) {
      state.productsInBag.push(product)
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
    },
    removeFromBag_Mut(state, productId) {
      if (confirm('Are you sure you want to remove the item from the bag?')) {
        var updatedBag = state.productsInBag.filter(item => productId != item.id);
        state.productsInBag = updatedBag;
        localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
      }
    }
  },
  actions: {
    loadProducts_Act({ commit }) {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts_Mut', response.data)
        })
    },
    loadBag_Act({ commit }) {
      if(localStorage.getItem('productsInBag')){
        commit('loadBag_Mut', JSON.parse(localStorage.getItem('productsInBag')))
      }
    },
    addToBag_Act({ commit }, product) {
      commit('addToBag_Mut', product);
    },
    removeFromBag_Act({ commit }, productId) {
      commit('removeFromBag_Mut', productId)
    }
  },
  modules: {
  }
})
