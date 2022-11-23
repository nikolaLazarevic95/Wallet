export default {
  async listAccTypes(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/accounts/list-acc-type'
    );
    const responseData = await response.json();
    // console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch list of account types'
      );
      throw error;
    }
    context.commit('setListOfAccounts', responseData.data);
  },
  async listAccCurrencies(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/accounts/list-curr'
    );
    const responseData = await response.json();
    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch list of account currencies'
      );
      throw error;
    }
    context.commit('setListOfCurrencies', responseData.data);
  },
  async submitNewAcc(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/accounts/add-account',
      {
        method: 'POST',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano
          sid: payload.sid,
          acc_name: payload.acc_name,
          act_id: payload.act_id,
          cur_id: payload.cur_id,
        }),
      }
    );
    const responseData = await response.json();
    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to create a new account'
      );
      throw error;
    }
  },
  async deleteAcc(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/accounts/add-account',
      {
        method: 'DELETE',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano
          sid: payload.sid,
          acc_id: payload.acc_id,
        }),
      }
    );
    const responseData = await response.json();
    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to create a new account'
      );
      throw error;
    }
  },
  async editAcc(context, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/accounts/add-account',
      {
        method: 'PUT',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano
          sid: payload.sid,
          acc_id: payload.acc_id,
          acc_name: payload.acc_name,
          act_id:payload.act_id
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to edit a account'
      );
      throw error;
    }
  },
};
