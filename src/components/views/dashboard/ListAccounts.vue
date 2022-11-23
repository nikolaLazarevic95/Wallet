<template>
  <base-card
    class="cardinner"
    :class="{ selected: isHighlighted }"
    @click="getID(data.acc_id)"
  >
    <!-- sa ovim sam sjebao styling vrv -->
    <div class="noselected">
      
        <div id="sekcija">
          <div>
            <img id="accImg" :src="data.act_img_url" />
          </div>
          <div class="leftsideacc">
            <h3>{{ data.acc_name }}</h3>
            <span>
              <h4>{{ data.acc_amount }}</h4>
              <h4>{{ data.cur_short }}</h4>
            </span>
          </div>
        </div>
      
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['data', 'selectedID'],
  emits: ['selected-account'],
  name: 'List Accounts',
  data() {
    return {};
  },
  methods: {
    getID(id) {
      this.$emit('selected-account', id);
    },
  },
  computed: {
    isHighlighted() {
      return this.selectedID == this.data.acc_id ? true : false;
    },
  },
  created() {},
};
</script>

<style scoped>
section {
  margin: 0.2rem;
  margin-right: 0.5rem;
  margin-left: 1rem;
  /* border: 1px solid #424242; */
  border-radius: 12px;
  padding: 0.2rem;
  display: inline;
}

h3 {
  font-size: 18px;
}

h3,
h4 {
  margin: 0.2rem;
}

div {
  margin: 0.2rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
span {
  display: flex;
  justify-content: left;
}
.cardinner {
  padding: 0.1rem;
  margin: 0.5rem;
  margin-right: 1rem;
  width: 15rem;
  background-color: white;
}
.cardinner:hover {
  border-top: 15px solid #3a0061;
}
.selected {
  padding: 0%;
  margin: 0;
  border: 0;
  border-top: 15px solid #3a0061;
}

.noselected {
  padding: 0;
  margin: 0;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#accImg {
  width: 54px;
  height: 54px;
  border-radius: 100%;
  overflow: hidden;
}

.leftsideacc {
  margin-left: 2rem;
}

#sekcija {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: left;
}
</style>
