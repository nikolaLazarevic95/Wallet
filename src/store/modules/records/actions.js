export default {
  async getAllRecordsWithFilters(context, payload) {
    const response = await fetch(
      //`http://906y122.e2.mars-hosting.com/api/records/listRecords?sid=${payload.sid}&cat_id=${payload.cat_id}&act_id=${payload.act_id}&acc_id=${payload.acc_id}`
      'http://906y122.e2.mars-hosting.com/api/records/listRecords',
      {
        method: 'POST',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano
          acc_id: payload.acc_id,
          act_id: payload.act_id,
          cat_id: payload.cat_id,
          date: payload.date,
          sid: payload.sid,
          
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch last filtered records'
      );
      throw error;
    }
    context.commit('getAllRecordsWithFilters', responseData.data);
  },
  async deleteRecord(_, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/records/addRecord/add-record',
      {
        method: 'DELETE',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano

          rec_id: payload.rec_id,
          action_id:payload.action_id,
          sid: payload.sid,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch last filtered records'
      );
      throw error;
    }
  },
  async updateRecord(_, payload) {
    const response = await fetch(
      'http://906y122.e2.mars-hosting.com/api/records/addRecord/add-record',
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
          rec_id: payload.rec_id,
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
      const error = new Error(
        responseData.message || 'Failed to fetch last filtered records'
      );
      throw error;
    }
  },
};
