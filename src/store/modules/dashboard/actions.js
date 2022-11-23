export default {
  async listAccounts(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/list-accounts?sid=${payload.sid}`
    );
    const responseData = await response.json();
    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch list of accounts'
      );
      throw error;
    }

    //console.log(responseData)
    context.commit('setListAccounts', responseData.data);
    //  "acc_name"
    // "acc_amount"
    // "cur_short"
  },
  async lastFiveRecords(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/last-records?sid=${payload.sid}`
    );
    const responseData = await response.json();
    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch list of accounts'
      );
      throw error;
    }

    context.commit('setLastFiveRecords', responseData.data);
    // rec_amount: 300.0,
    // cur_short: 'RSD',
    // rec_date: '2022-10-16',
    // acc_name: 'Prvi Acc',
    // cat_name: 'Loans',
    // rec_description: 'Pozajmica',
    // img_parent: null,
    // cat_img_url: URL NEKI,
    //rec_id
  },

  async cashFlow(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/cash-flow?sid=${payload.sid}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch list of accounts'
      );
      throw error;
    }

    //console.log(responseData);
    context.commit('setCashFlow', responseData.data);
    //
  },
  async cashFlowSingleAcc(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/cash-flow-singleacc?sid=${payload.sid}&acc_id=${payload.acc_id}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          ' Failed to fetch list of cash flow for particular account'
      );
      throw error;
    }
    // console.log(responseData.data);
    context.commit('setCashFlowSingleAcc', responseData.data);
  },
  async lastRecordSingleAcc(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/last-records-singleacc?sid=${payload.sid}&acc_id=${payload.acc_id}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          ' Failed to fetch list of cash flow for particular account'
      );
      throw error;
    }
    // console.log(responseData.data);

    context.commit('setLastFiveRecordsSingleAcc', responseData.data);
  },
  async sumExpenseCategories(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/sumExpenseCategories?sid=${payload.sid}&acc_id=${payload.acc_id}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          ' Failed to fetch list of cash flow for particular account'
      );
      throw error;
    }
    context.commit('setSumExpenseCategories', responseData.data);
  },
  async expenseChart(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/dashboard/dateChart?sid=${payload.sid}&acc_id=${payload.acc_id}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch some expense'
      );
      throw error;
    }
    context.commit('expenseChart', responseData.data)
  },
};
