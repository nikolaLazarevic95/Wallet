<template>
  <div class="form-control">
    <div id="input">
      <input
        v-for="data in actions"
        :key="data.cat_id"
        type="radio"
        :name="data.cat_name"
        :id="data.cat_name"
        :value="data.cat_id"
        @change="actionType"
        v-model="type"
      />
    </div>
    <div id="labels">
      <label
        class="label"
        v-for="data in actions"
        :for="data.cat_name"
        :id="data.cat_name"
        :key="data.cat_id"
      >
        {{ data.cat_name }}
      </label>
    </div>

   
  </div>
</template>

<script>
export default {
  emits: ['action-type'],
  props: ['actionID'],
  name: 'ListActions Form Help',
  data() {
    return {
      type: this.actionID,
      actions: null,
    };
  },
  methods: {
    actionType() {
      //console.log(this.type);
      this.$emit('action-type', this.type);
    },
  },
  computed: {},
  created() {
    this.actions = this.$store.getters['addRecord/listActions'];
    //this.type = this.actions[1].cat_id;
    // this.type = this.actionID;
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.form-control {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
}

#input {
  display: flex;
  flex-direction: column;
}

#labels {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.label {
  margin: 0.2rem;
}

.form-control + .form-control {
  margin-top: 1em;
}
input[type='radio'] {
  appearance: none;
  background-color: #fff;
  margin: 0.2rem;
  
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
}
input[type='radio'] {
  display: grid;
  place-content: center;
}
input[type='radio']::before {
  content: '';
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #3e0267;
}

input[type='radio']:checked::before {
  transform: scale(1);
}
input[type='radio']::before {
  background-color: CanvasText;
}
input[type='radio']:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
.form-control:focus-within {
  color: var(--form-control-color);
}
</style>
