export const state = () => ({
    showBottomBar:false,
})

export const mutations = {

    setShowBottomBar(state, showBottomBar) {
        state.showBottomBar = showBottomBar
    },
}

export const actions = {
    setShowBottomBar({ commit }, showBottomBar) {
        commit('setShowBottomBar', showBottomBar)
    },

}

export const getters = {
    showBottomBar(state) {
        return state.showBottomBar
    },
}