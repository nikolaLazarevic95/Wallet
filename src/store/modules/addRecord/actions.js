export default {
  async listCategoriesIncome(context) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/records/addRecord/list-categories-income'
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          ' Failed to fetch list of list of categories income'
      );
      throw error;
    }

    //console.log(responseData)
    context.commit('setListCategoriesIncome', responseData.data);
    // "cat_id": 83,
    // "cat_name": "Salary"
  },
  async listCategoriesExpense(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/records/addRecord/list-categories-expense'
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          ' Failed to fetch list of list of categories expense'
      );
      throw error;
    }

    context.commit('setListCategoriesExpense', responseData.data);
    // "cat_id": 83,
    // "cat_name": "Salary"
  },
  async listActions(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/records/addRecord/list-action'
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          ' Failed to fetch list of list of categories expense'
      );
      throw error;
    }

    context.commit('setListActions', responseData.data);
    // "cat_id": 1,
    // "cat_name": "Income"
  },
  async submitRecord(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/records/addRecord/add-record',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sid: payload.sid,
          acc_id: payload.acc_id,
          action_id: payload.action_id,
          rec_amount: payload.rec_amount,
          cat_id: payload.cat_id,
          rec_date: payload.rec_date,
          rec_description: payload.rec_description,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //console.log(responseData);
      const error = new Error(
        responseData.message || ' Failed to add a record'
      );
      throw error;
    }
  },
  async listSubExpenses(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/records/addRecord/list-subcategories-expense?cat_id=${payload.cat_id}`
    );

    const responseData = await response.json();
    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch sub list of expenses'
      );
      throw error;
    }

    context.commit('setSubCategoriesExpense', responseData.data);
    //   array like
    //   {
    //     "cat_id": 16,
    //     "cat_name": "Restaurant, fast-food"
    //    }
  },
};
