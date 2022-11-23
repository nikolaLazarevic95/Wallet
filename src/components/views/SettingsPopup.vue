<template>
  <base-button id="imgLO" @click="ToggleSettingsClicked">
    <base-dialog
      :show="settingsClicked"
      title="User Settings"
      @close="handleSettingsClicked"
    >
      <div id="wrapper">
        <div class="container">
          <div>
            <div id="avatar">
              <div>
                <p class="naslov">Username</p>
                <h4 for="">{{ activeUsername }}</h4>
                <p class="naslov">E-mail</p>
                <h4 for="">{{ userEmail }}</h4>
                <p class="naslov">Joined</p>
                <h4 for="">{{ dateRegistered }}</h4>
              </div>

              <input
                style="display: none"
                type="file"
                @change="onFileChanged"
                ref="fileInput"
              />
              <!-- <base-button @click="$refs.fileInput.click()"
                >Pick File</base-button
              > -->
              <div id="addImage">
              <img :src="getUserImg" @click="$refs.fileInput.click()" />
            </div>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="form-control">
            <!-- add/change pic -->
            <div
              class="form-control"
              :class="{ invalid: !changeUsername.isValid }"
            >
              <h3 for="changeUsername">Change username:</h3>

              <input
                type="text"
                id="changeUsername"
                v-model="changeUsername.val"
                @blur="clearValidity('changeUsername')"
              />
              <p v-if="!changeUsername.isValid">Can't use the same username.</p>
            </div>

            <br />
            <div>
              <h3>Password Settings:</h3>
              <div class="form-control" :class="{ invalid: !currPass.isValid }">
                <label for="currentPassword">Enter current password : </label>
                <input
                  type="password"
                  id="currentPassword"
                  v-model="currPass.val"
                  @blur="clearValidity('currPass')"
                />
                <p v-if="!currPass.isValid">Password doesn't match</p>
              </div>
              <div class="form-control" :class="{ invalid: !newPass.isValid }">
                <label for="newPassword">Enter the new password : </label>
                <input
                  type="password"
                  id="newPassword"
                  v-model="newPass.val"
                  @blur="clearValidity('newPass')"
                />
                <p v-if="!newPass.isValid">Passwords don't match</p>
              </div>
              <div
                class="form-control"
                :class="{ invalid: !repeatNewPass.isValid }"
              >
                <label for="repeatNewPass">Repeat the new password : </label>
                <input
                  type="password"
                  id="repeatNewPass"
                  v-model="repeatNewPass.val"
                  @blur="clearValidity('repeatNewPass')"
                />
                <p v-if="!repeatNewPass.isValid">Passwords don't match.</p>
                <div></div>
              </div>
              <br />
              <p v-if="!formIsValid">
                Please fix the above errors and submit again.
              </p>

              <base-button id="button">Submit changes</base-button>
            </div>
          </form>
        </div>
      </div>
    </base-dialog>
    <div class="clickkk">
      <img class="imgClick" :src="getUserImg" />
      <div class="click">
        <div class="click">
          {{ activeUsername }}
        </div>
      </div>
    </div>
  </base-button>
</template>

<script>
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  name: 'Settings PopOut',
  props: ['username'],
  components: {},
  data() {
    return {
      activeUsername: this.username,
      settingsClicked: false,
      imageIsClicked: false,
      changeUsername: { val: '', isValid: true },
      hasPicture: null,
      //password
      currPass: { val: '', isValid: true },
      newPass: { val: '', isValid: true },
      repeatNewPass: { val: '', isValid: true },
      isCurrPassOK: false,
      //
      formIsValid: true,
      imgFile: null,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    async validateForm() {
      this.formIsValid = true;

      if (this.changeUsername.val === this.activeUsername) {
        this.changeUsername.isValid = false;
        this.formIsValid = false;
      }

      if (
        this.changeUsername.val !== '' &&
        this.changeUsername.val !== this.activeUsername
      ) {
        this.activeUsername = this.changeUsername.val;
      }

      if (this.currPass.val !== '') {
        await this.checkPassword();

        // console.log(this.isCurrPassOK);
        if (!this.isCurrPassOK) {
          this.currPass.isValid = false;
          this.formIsValid = false;
          return;
        }
      }

      if (this.newPass.val !== this.repeatNewPass.val) {
        {
          this.newPass.isValid = false;
          this.repeatNewPass.isValid = false;
          this.formIsValid = false;
        }
      }
    },

    //Change img
    toggleImageClicked() {
      this.imageIsClicked = !this.imageIsClicked;
    },
    handleImgClicked() {
      this.imageIsClicked = false;
    },
    onFileChanged(event) {
      this.imgFile = event.target.files[0];
      console.log(this.imgFile);
    },
    //
    ToggleSettingsClicked() {
      this.settingsClicked = !this.settingsClicked;
    },
    handleSettingsClicked() {
      this.settingsClicked = false;
    },

    async checkPassword() {
      // console.log(this.currPass.val);
      const response = await fetch(
        `http://906y122.e2.mars-hosting.com/api/users/checkPass?sid=${localStorage.getItem(
          'sid'
        )}`,
        {
          method: 'POST',
          headers: {
            //mora header
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            //! ne treba stringify?
            usr_password: this.currPass.val,
          }),
        }
      );

      const responseData = await response.json(); // da li treba JSON?

      // console.log(responseData.passOk);
      if (!response.ok) {
        const error = new Error(
          responseData.message || ' Failed to check password'
        );
        throw error;
      }

      // return responseData.passOk;
      if (responseData.passOk) {
        this.isCurrPassOK = true;
      }
      // console.log('from check pass ' +  this.isCurrPassOK);
    },

    async submitForm() {
      await this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      let formDataSlika = new FormData();
      formDataSlika.append('img_file', this.imgFile);
      formDataSlika.append('sid', this.$store.getters.sid);

      let formDataNoUserName = new FormData();
      formDataNoUserName.append('usr_password', this.newPass.val);
      formDataNoUserName.append('sid', this.$store.getters.sid);

      let formDataNoPass = new FormData();
      formDataNoPass.append('usr_name', this.activeUsername)
      formDataNoPass.append('sid', this.$store.getters.sid);

      let formDataElse = new FormData();
      formDataElse.append('usr_name', this.activeUsername);
      formDataElse.append('sid', this.$store.getters.sid);
      formDataElse.append('usr_password', this.newPass.val);
      //formDataElse.append('img_file', this.imgFile);

      if (this.imgFile !== null ) {
        // console.log(formData.img_file);
        // console.log(formData);

        await this.$store.dispatch('userAccount/updateUser', formDataSlika);
      }

      if (this.changeUsername.val == '') {
        await this.$store.dispatch(
          'userAccount/updateUser',
          formDataNoUserName
        );
      } else if (this.currPass == '') {
        await this.$store.dispatch('userAccount/updateUser', formDataNoPass);
      } else {
        await this.$store.dispatch('userAccount/updateUser', formDataElse);
      }

      localStorage.setItem('userName', this.activeUsername); //da se promeni u headeru i da radi posle refresha
      // zato sto na f5 ide try login logika

      this.activeUsername = this.getUserName; //da se promeni u komponenti, ali posto refeshujemo stranu na kraju ne mora

      toast.success('Success!', {
        timeout: 1000,
      });

      //Closing the popup-going to dasboard
      this.$router.go();
    },
  },
  computed: {
    getUserName() {
      return this.$store.getters.userName;
    },
    getUserImg() {
      return this.$store.getters['userAccount/showUserImage'];
    },
    userEmail() {
      return this.$store.getters.userEmail;
    },
    dateRegistered() {
      return this.$store.getters.dateOfRegistrations;
    },
  },
  created() {
    this.$store.dispatch('userAccount/showUserPicture', {
      sid: this.$store.getters.sid,
    });
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  justify-content: center;
}
#avatar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: white;
  border: 3px solid #ccc;
  border-radius: 16px;
  padding: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.container {
  width: 90%;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  
  margin-left: 0rem;
  font-size: 0.8rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.2rem;
}

img {
  float: left;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  overflow: hidden;
  border: 2px solid #ccc;
  
 
}
img:hover {
  cursor: pointer;
  opacity: 0.4;
  
}


.imgUsername {
  float: left;
  width: 50;
  height: 50;
  border-radius: 100%;
  overflow: hidden;
  border: 2px solid #270041;
  height: 50px;
  width: 50px;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  border: 3px solid #ccc;
  border-radius: 24px;
  padding: 0.5rem;
  padding-left: 1rem;

  display: block;
  width: 100%;
  border: 3px solid #ccc;
  font: inherit;
  background-color: white;
  text-align: left;
}

input:focus,
textarea:focus {
  background-color: white;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
  width: 50%;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0;
  font-size: 1rem;
  margin-left: 0rem;
  font-size: 1.2rem;
}
h4 {
  margin: 0;
  font-size: 1.1rem;
}
.naslov {
  margin-bottom: 0.1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
#button {
  width: 100%;
}

.butt {
  background-color: #270041;
}
.butt:hover {
  border: 1px solid #270041;
  background-color: #541480;
}

.imgClick {
  height: 35px;
  width: 35px;
  padding: 0;
}

#imgLO {
  background-color: #270041;
  border-radius: 30px;
  width: auto;
}

#imgLO:hover {
  
  background-color: #541480;
}
.click {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0.2rem;
}
</style>
