let timer;

export default {
  //LOGIN
  async login(context, payload) {
    const response = await fetch(
      ' http://906y122.e2.mars-hosting.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano
          usr_email: payload.usr_email,
          usr_password: payload.usr_password,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || ' Failed to authenticate'
      );
      throw error;
    }

    const expiresIn = 3600000; //1h za sid da je aktivan
    //const expiresIn = 5000;      //! za test i demo AUTOLOGOUT-A
    const expirationDate = new Date().getTime() + 3600000;

    localStorage.setItem('userId', responseData.sessionUser.usr_id);
    localStorage.setItem('sid', responseData.sid);
    localStorage.setItem('sidExpiration', expirationDate);
    localStorage.setItem('userName', responseData.sessionUser.usr_name); //?
    localStorage.setItem('userEmail', responseData.sessionUser.usr_email); //?
    localStorage.setItem(
      'dateReg',
      responseData.sessionUser.usr_dateregistration
    ); //?

    timer = setTimeout(function () {
      context.dispatch('autoLogout'); //! ne radi jel nemas lougout
    }, expiresIn);

    context.commit('setUser', {
      userId: responseData.usr_id, //newId je u bazi
      sid: responseData.sid,
      userName: responseData.sessionUser.usr_name,
      userEmail: responseData.sessionUser.usr_email,
      accCreationDate: responseData.sessionUser.usr_dateregistration,
    });
  },

  //TRYLOGIN
  tryLogin(context) {
    const sid = localStorage.getItem('sid');
    const userId = localStorage.getItem('userId');
    const sidExpiration = localStorage.getItem('sidExpiration');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const accCreationDate = localStorage.getItem('dateReg');

    //koliko je sid jos validan
    const expiresIn = +sidExpiration - new Date().getTime();

    //ako je sid istekao, ako nije vise validan nemoj da login automatski
    if (expiresIn < 0) {
      return;
    }

    //ako je validan setuj timer za autoLogout za onoliko koliko je jos valid

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (sid && userId) {
      context.commit('setUser', {
        sid: sid,
        userId: userId,
        userName: userName, // da bi nam posle refresh-a i dalje vukao username
        userEmail: userEmail,
        accCreationDate: accCreationDate,
      });
    }
  },

  //LOGOUT
  //   clearTimeout(timer) pre commit-a kada se user manuelno logiutovanje, imas ss u goggle notes kako treba da izgleda kostur
  logout(context) {
    localStorage.removeItem('sid'),
      localStorage.removeItem('userId'),
      localStorage.removeItem('sidExpiration'),
      localStorage.removeItem('userEmail'),
      localStorage.removeItem('dateReg'),
      clearTimeout(timer);

    //setujemo vuex na defalt posle logouta
    context.commit('setUser', {
      sid: null,
      userId: null,
      userName: null,
      userEmail: null,
    });
  },

  //SIGNUP
  async signup(context, payload) {
    const response = await fetch(
      ' http://906y122.e2.mars-hosting.com/api/auth/registration',
      {
        method: 'POST',
        headers: {
          //mora header
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          //! mora isto i sa leve i sa desne, onako kako je u bazi imenovano
          usr_email: payload.usr_email,
          usr_password: payload.usr_password,
          usr_name: payload.usr_name,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      //console.log(responseData);
      const error = new Error(
        responseData.message || ' Failed to authenticate'
      );
      throw error;
    }

    //console.log(responseData);
    context.commit('setUser', {
      userId: responseData.newId, //newId je u bazi
    });
  },

  // AUTOLOGOUT za watcher u App.vue, da bi redirect na auth
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
