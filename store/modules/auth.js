// tất cả các biến trong store đều được dùng
const state = {
    isAuthenticated: false,
};

//
const getters = {};

// những hành động được người dùng reactive(chứa các hàm như method)
const actions = {
    verifyAuth(context) {
        context.commit("VERIFY_AUTH")
    }
};

// thay đổi các biến trong state
const mutations = {
    "VERIFY_AUTH"(state) {
        state.isAuthenticated = true
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};