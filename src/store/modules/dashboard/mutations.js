export default {
    setListAccounts(state,payload) {
        state.listOfAccounts = payload
        
    },
    setLastFiveRecords (state, payload) {
        state.lastFiveRecords= payload
    },
    setCashFlow(state, payload) {
        state.cashFlow = payload
    },
    setCashFlowSingleAcc(state, payload) {
        state.cashFlowSingle=payload
    },
    setLastFiveRecordsSingleAcc(state,payload) {
        state.lastFiveRecordsSingle = payload
    },
    setSumExpenseCategories(state,payload) {
        state.sumExpenseCategories = payload
    },
    expenseChart(state, payload){
        state.expenseChart = payload
    }
}