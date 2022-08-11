export const state = () => ({
  coins: 0,
})

export const mutations = {
  setCoins(state, coins) {
    state.coins = coins
  }
}


export const getters = {
  getCoins(state) {
    return state.coins
  }
}
