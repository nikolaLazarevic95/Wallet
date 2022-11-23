<template>
  <settings-popup :username="username"> </settings-popup>
</template>

<script>
import SettingsPopup from './SettingsPopup.vue';

export default {
  name: 'UserAcc',
  components: { SettingsPopup },
  data() {
    return {
      username: null,
    };
  },

  computed: {
    getUsername() {
      return this.$store.getters.userName;
    },
  },
  created() {
    this.username = this.getUsername;
  },
};
</script>

<style>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f1ecf0;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
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
#dropBut {
  color: #3d008d;
  background-color: white;
  border-color: white;
  margin-top: 0.1rem;
  margin-bottom: 0.1;
}
#dropBut:hover {
  background-color: #f0e6fd;
}
</style>
