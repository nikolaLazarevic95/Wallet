export default {
    setListCategoriesIncome(state, payload) {
        state.listCategoriesIncome = payload
    },
    setListCategoriesExpense(state, payload) {
        state.listCategoriesExpense = payload
    },
    setListActions(state, payload) {
        state.listActions = payload
    },
    setSubCategoriesExpense(state,payload) {
        state.listSubExpenseCategories = payload
    }
    

}