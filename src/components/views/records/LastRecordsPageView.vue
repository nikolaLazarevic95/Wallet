<template lang="">
  <!-- LIST OF SINGLE RECORDS SA UBACENIM EDIT I DELETE -->

  <div>
      <base-card id="dashcard">
        <div id="container">
          <div id="leftDiv">
            <div id="left">
              <div id="first">
                <img :src="data.cat_img_url" />
              </div>
              <div id="2nd">
                <p>{{ data.cat_name }}</p>
                <p>{{ data.acc_name }}</p>
              </div>
            </div>
            <div id="description">
              <p>{{data.rec_description}}</p>
            </div>

            <div id="right">
              <div id="third">
                <div id="amount">
                  <p>{{ data.rec_amount }}</p>
                  <p>{{ data.cur_short }}</p>
                </div>
                <div id="dateDiv">
                  <p id="date">{{ data.datum }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="dugmad">
              <Edit
                :recordID="recordID"
                :recAmount="recAmount"
                :catNAme="catNAme"
                :accName="accName"
                :curShort="curShort"
                :recDate="recDate"
                :actionID="actionID"
                :acc_id="acc_id"
                :noteDesc="noteDesc"
                :cat_id="cat_id"
                :cat_parentID="cat_parentID"
              />
              <base-button class="dugme" @click="toggleDeleteClick">
                <base-dialog
                  :show="deleteClicked"
                  title="Are you sure?"
                  @close="handleDeleteClicked"
                >
                  <div>
                    <div id="paragh">
                      <div id="paraghinner">
                        <p>Do you really want to remove this record?</p>
                      </div>
                    </div>
                    <div id="deleteCoise">
                      <base-button
                        class="YES-NO"
                        mode="outline"
                        @click="handleDeleteClicked"
                        >NO</base-button
                      >
                      <base-button class="YES-NO" @click="deleteRecord"
                        >YES</base-button
                      >
                    </div>
                  </div>
                </base-dialog>
                Delete</base-button
              >
            </div>
          </div>
        </div>
      </base-card>
  </div>
</template>

<script>
import Edit from '../../views/records/EditRecord.vue';
import { useToast } from 'vue-toastification';


const toast = useToast();

export default {
  props: ['data'],
  components: {
    Edit,
  },

  setup() {
    // Get toast interface
    const toast = useToast();
  },
  data() {
    return {
      editClicked: false,
      deleteClicked: false,
      recordID: this.data.rec_id,
      recAmount: this.data.rec_amount,
      catNAme: this.data.cat_name,
      accName: this.data.acc_name,
      curShort: this.data.cur_short,
      recDate: this.data.rec_date,
      actionID: this.data.action_id,
      acc_id: this.data.acc_id,
      noteDesc: this.data.rec_description,
      cat_id: this.data.cat_id,
      cat_parentID: this.data.cat_parentid,
    };
  },
  methods: {
    toggleDeleteClick() {
      this.deleteClicked = !this.deleteClicked;
    },
    handleDeleteClicked() {
      this.deleteClicked = false;
    },
    async deleteRecord() {
      await this.$store.dispatch('records/deleteRecord', {
        sid: this.$store.getters.sid,
        rec_id: this.recordID,
        action_id:this.actionID
      });
      toast.success('Success!', {
        timeout: 700,
      });

      this.$router.go();
    },
  },
  computed: {},
  async created() {},
};
</script>
<style scoped>
#dashcard {
  padding: 1rem;
}
#container {
  display: flex;
  justify-content: space-between;
}
#left {
  display: flex;
}
.right {
  display: flex;
  width: 22%;
  justify-content: space-between;
}
#amount {
  display: flex;
  font-size: 1.2rem;
  justify-content: right;
}
img {
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  border-radius: 100%;
  overflow: hidden;
}
p {
  margin: 0.1rem;
  margin-right: 0.2rem;
  font-size: 1.1rem;
}
#date {
  font-size: 1.2em;
  color: #7f8fa4;
  display: flex;
  justify-content: right;
}
#first {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#third {
  display: flex;
  flex-direction: column;
  justify-content: right;
}
#description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dugme {
  width: 45%;
}
.dugmad {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
#dateDiv {
  display: flex;
  justify-content: right;
}
#leftDiv {
  display: flex;
  justify-content: space-between;
  width: 75%;
}
#paragh {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
}
#paraghinner {
  width: 90%;
}
#deleteCoise {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
.YES-NO {
  width: 30%;
  margin-top: 1rem;
}
</style>
