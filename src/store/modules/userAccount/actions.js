export default {
  async showUserPicture(context, payload) {
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/users/showImage?sid=${payload.sid}`
    );
    const responseData = await response.json();

    //console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to fetch image url'
      );
      throw error;
    }

    context.commit('setImageUrl', responseData.img_url);
  },
  async updateUser(context, payload) {
    //! KADA SALJES FORM DATA / SLIKE NEMA HEADERA!!!!!!
    const response = await fetch(
      `http://906y122.e2.mars-hosting.com/api/users/update-Users`,
      {
        method: 'PUT',
        body: payload,
      }
    );
    const responseData = await response.json();

    console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to update the user'
      );
      throw error;
    }

    context.commit(
      'updateUser',
      {
        //calling from auth folder, root state update
        userName: payload.usr_name,
        pictureUrlPreview: payload.img_file,
      },
      { root: true }
    );
  },
};
