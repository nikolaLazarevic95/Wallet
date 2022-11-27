<template>
  <div id="wrapper">
    <div id="left-side">
      <div id="left-side-inner">
        <div id="left-top">
          <h1>Control your finance in one place</h1>
        </div>
        <div id="left-bottom">
          <div class="element">
            <div>
              <h2>Manually Input and Categorize</h2>
            </div>
            <div>
              <h2>Control Your Cash Flow</h2>
            </div>
            <div>
              <h2>Stay on Track</h2>
            </div>
          </div>
          <div class="element">
            <div>
              <img
                class="icon"
                src="../../../public/1564491_add_create_new_plus_icon.png"
              />
            </div>
            <div>
              <img class="zoom" src="../../../public/cashflow.png" />
            </div>
            <div>
              <img
                class="icon"
                src="../../../public/7830785_analytics_graph_bar_icon.png"
              />
            </div>
          </div>
          <div class="element">
            <div>
              <p>
                You can manually input cash transactions, and correct automatic
                categorizations.
              </p>
            </div>
            <div>
              <p>
                Wallet will show you your expected cash balances net of planned
                payments so you can plan ahead.
              </p>
            </div>
            <div>
              <p>
                Get a quick overview whenever you need to keep your spending on
                track
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="right-side">
      <base-dialog
        :show="!!error"
        title="An error occurred"
        @close="handleError"
      >
        <p>{{ error }}</p>
      </base-dialog>
      <!-- <base-dialog :show="isLoading" fixed title="Authenticating...">
        <base-spinner></base-spinner>
      </base-dialog> -->
      <form @submit.prevent="submitForm">
        <div id="newLogo">
          <img id="newlogoimg" src="../../../public/logo.png" />
          <div>
            <h1>Wallet</h1>
          </div>
        </div>
        <div id="auth">
          <h1 v-if="mode === 'signup'">Create Wallet Account</h1>
          <h1 v-else>Login</h1>
          <div class="form-control" v-if="mode === 'signup'">
            <label for="username">Username</label>
            <input type="text" id="username" v-model.trim="username" />
            <p class="error" v-if="!formIsValid && this.username == ''">
              Please enter a username.
            </p>
          </div>
          <div class="form-control">
            <label for="email">E-Mail</label>
            <input type="email" id="email" v-model.trim="email" />
            <p class="error" v-if="!formIsValid && this.email == ''">
              Please enter a valid email.
            </p>
          </div>
          <div class="form-control">
            <label for="password">Password</label>
            <!-- <p id="mala">(must be at least 6 characters long,  have Uppercase letters and numbers)</p> -->
            <input type="password" id="password" v-model.trim="password" />
          </div>
          <p class="error" v-if="!formIsValid">
            Please enter a valid password (at least 6 characters long, have
            Uppercase letters and numbers)
          </p>
          <div id="buttons">
            <base-button>{{ submitButtonCaption }}</base-button>
            <div id="buttonsInner">
              <p v-if="mode === 'login'">Don't have account?</p>
              <p v-else>Already have account?</p>
              <p id="signup" type="button" mode="flat" @click="switchAuthMode">
                {{ switchModeButtonCaption }}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAuth',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'SignUp';
      }
    },

    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign Up';
      } else {
        return 'Log In';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (this.mode === 'signup') {
        if (this.username === '') {
          this.formIsValid = false;
          console.log('aooo'); //misli? da treba da gleda i to
          return;
        }
      }
      if (
        this.password.search(/[0-9]/) < 0 ||
        this.password.search(/[A-Z]/) < 0
      ) {
        console.log('fail');
        this.formIsValid = false;
        return;
      }
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length <= 6
      ) {
        this.formIsValid = false;
        console.log('drugi ');
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', {
            usr_email: this.email,
            usr_password: this.password,
          });
        } else {
          await this.$store.dispatch('signup', {
            usr_email: this.email,
            usr_password: this.password,
            usr_name: this.username,
          });
        }
        //kada se signup da te prebaci na login, da samo kliknes login
        if (this.mode === 'signup') {
          this.mode = 'login';
        }
        //ako si se login da te baci na pocetnu stranu
        this.$router.replace('/dashboard');
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
}
#left-side,
#right-side {
  display: inline;
  justify-content: center;
  position: relative;
}
#left-side {
  background-image: linear-gradient(to right, #270041 50%, #3a0061);
  /* background-color: #270041; */
  width: 60%;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
}
#left-side-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-image: linear-gradient(to right, #270041, #3a0061);
  width: 100%;
  align-items: center;
}
#right-side {
  background-color: white;
  width: 40%;
}

.error {
  font-size: 15px;
  color: red;
  width: 100%;
  margin-left: 0.5rem;
}

#left-side h1 {
  margin: 0;
  font-size: 75px;
  text-align: left;
  margin-top: 4rem;
}

h1 {
  margin-bottom: 2rem;
  font-size: 31px;
  text-align: center;
}

#newlogoimg {
  height: 100px;
  width: 100px;
}

#newLogo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 5rem;
}
#newLogo div h1 {
  font-size: 55px;
  margin: 0;
  text-align: center;
  color: #3a0061;
}
#newLogo div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#auth {
  margin-bottom: 6rem;
}
.icon {
  height: 4rem;
  width: 4rem;
  margin-top: 0.5rem;
}
.zoom {
  height: 5rem;
  width: 5rem;
}

form {
  /*  width: 100%; */
  margin: 1rem;
  padding: 1rem;
  margin: 0;
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#buttons {
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: none;
}

#signup {
  padding-left: 0.1rem;
  text-decoration: underline;
  cursor: pointer;
}
#buttonsInner {
  margin-top: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.form-control {
  margin: 0.5rem 0;
}

.element div {
  width: 30%;
}

#email,
#password,
#username {
  height: 2.5rem;
  font-size: 16px;
}

#left-top {
  width: 60%;
  display: flex;
  justify-content: center;
  text-align: center;
}
#left-top h1 {
  text-align: center;
}

#left-bottom {
  width: 70%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: first baseline;
}
.element {
  width: 100%;
  margin-left: 1.5%;
  margin-right: 1.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
label {
  font-size: 12px;
  margin-bottom: 0.5rem;
  display: block;
  padding-left: 0.75rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem 1.5rem;
  margin-bottom: 20px;
  border-radius: 30px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
