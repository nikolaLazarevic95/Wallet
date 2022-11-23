export default {
    userId(state) {
        return state.userId
    },
    sid(state) {
        return state.sid
    },
    userName(state) {
        return state.userName
    },
    userEmail(state) {
        return state.userEmail
    },
    dateOfRegistrations(state) {
        return state.accCreationDate
    },
    isAuthenticated(state) {
        return !!state.sid
    },
    didAutoLogout(state) {
        return state.didAutoLogout
    },
}