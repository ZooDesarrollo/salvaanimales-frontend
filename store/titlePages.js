export const state = () => ({
    titlePage:'Home',
    titleColor:'secondary'
})

export const mutations = {

    setTitlePage(state, titlePage) {
        state.titlePage = titlePage.text
        state.titleColor = titlePage.color ?? state.titleColor
    },
}

export const actions = {
    setTitlePage({ commit }, titlePage) {
        commit('setTitlePage', titlePage)
    },

}

export const getters = {
    titlePage(state) {
        return state.titlePage
    },
    titleColor(state) {
        return state.titleColor
    }
}