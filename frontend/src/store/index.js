import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userInfo: {},
        organisationInfo: {}
    },
    getters: {
        USERINFO: state => {
            return state.userInfo;
        },
        ORGANISATIONINFO: state => {
            return state.organisationInfo
        }
    },
    mutations: {
        SET_USERINFO: (state, payload) => {
            state.userInfo = payload
        },
        SET_ORGANISATIONINFO: (state, payload) => {
            state.organisationInfo = payload
        },
        ADD_USERINFO: (state, payload) => {
            state.userInfo.push(payload)
        },
    },
    actions: {
        SAVE_USERINFO: (context, payload) => {
            context.commit('SET_USERINFO', payload)
        },
        SAVE_ORGANISATIONINFO:(context, payload) => {
          context.commit('SET_ORGANISATIONINFO', payload)  
        },
        GET_USERINFO: (context, payload) => {
            context.commit('ADD_USERINFO', payload)
        },
    },
})