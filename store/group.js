import http from '~/utilities/http.js';

export const state = () => ({
    loading: false,
    featuredGroups: [],
    groups: [],
});

export const mutations = {
    loading(state, payload) {
        state.loading = payload;
    },
    groups(state, payload) {
        state.groups = payload;
    },
    featuredGroups(state, payload) {
        state.featuredGroups = payload;
    },
    
    
};

export const getters = {
    loading(state){
        return state.loading
    },
    groups(state){
        return state.groups
    },
    featuredGroups(state){
        return state.featuredGroups
    },
    groupName(state){
        return state.groupName
    },
}
export const actions = {
    get({ commit }) {
            commit('loading', true);
            return new Promise((resolve, reject) => {
            http
            .get("group/list")
            .then(res => {
                commit('groups', res.data);
                commit('loading', false);
                resolve(res);
            })
            .catch(e => {
                commit('loading', false);
                reject(e.response.data);
            })
        })
    },
    featured({ commit }) {
        commit('loading', true);
        return new Promise((resolve, reject) => {
        http
        .get("group/list?featured=1")
        .then(res => {
            commit('featuredGroups', res.data);
            commit('loading', false);
            resolve(res);
        })
        .catch(e => {
            commit('loading', false);
            reject(e.response.data);
        })
    })
},
    
    find({} , payload) {
        return new Promise((resolve, reject) => {
        http
        .get(`group/find/${payload}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(e => {
            reject(e.response.data);
        })
    })
},
}
