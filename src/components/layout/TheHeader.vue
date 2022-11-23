<template>
  <header>
    <nav>
      <div>
        <div>
        <img id="logo" src="../../../public/Logo_white.png" alt="">
      <h1><router-link to="/">Wallet</router-link></h1>
    </div>
      
        <ul>
          <li>
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/accounts">Accounts</router-link>
          </li>
          <!-- <li>
            <router-link to="/analytics">Analytics</router-link>
          </li> -->
          <li>
            <router-link to="/records">Records</router-link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <add-record></add-record>
          </li>
          <li>
            <user-acc></user-acc>
          </li>
          <li>
            <div id="imgLO"  @click="logout">
            <img id="logout" src="../../../public/logout.png" >
            <!-- <dropdown-dialog
            :show="logoutClicked"
            @close="handleLogoutClicked"
            >
              <base-button mode="outline" @click="handleLogoutClicked">Stay</base-button>
              <base-button @click="logout">Logout</base-button>
            </dropdown-dialog> -->
          </div>
            <!-- <base-button id="dropBut" @click="logout">Logout</base-button> -->
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import UserAcc from '../views/UserAcc.vue';
import AddRecord from '../views/AddRecord.vue';

export default {
  name: 'The Header',
  components: { UserAcc, AddRecord },

  data() {
    return {
      logoutClicked:false,
    };
  },
  methods: {
    toggleLogoutClick() {
      this.logoutClicked = !this.logoutClicked
    },
    handleLogoutClicked() {
      this.logoutClicked = false
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/auth');
    },
  },

  computed: {},
};
</script>

<style>
#logo{
  width: 50px;
  height: 50px;
  margin-left: 0.5rem;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #3a0061;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
   border: 1px solid transparent;
}
header nav div {
  display: flex;
}
a:active,
a:hover,
a.router-link-active {
  border: none;
  border-bottom: 3px solid white;
  
}


h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

#settings {
  color: #fafafa;
  border-color: transparent;
  text-decoration: none;
}
#logout{
  height: 30px;
  width: 30px;
}
#imgLO {
  background-color: #270041;
  padding: 0.5rem;
  border-radius: 30px;
}
#imgLO:hover {
  border-color: #270041;
  background-color: #541480;
}
</style>
