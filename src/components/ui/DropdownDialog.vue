<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
      <div id="wrapper">
        <dialog open v-if="show">   
        <section>
            <slot >
            </slot>
        </section>
        <menu v-if="!fixed">
        <slot name="actions">
        </slot>
      </menu>
        </dialog>
      </div>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {

        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
 
}



dialog {
  position: absolute;
  top: 15%;  
  left: 90%; 

  transform: translate(-50%, -50%);
  width: 10rem;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  margin-right: 8px;
  overflow: hidden;
  background-color: white;
}
dialog section {
    display: flex;
    flex-direction: column;
    justify-content: center;
}


header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}



section {
  padding: 0.5rem;
}




</style>