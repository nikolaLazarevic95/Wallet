<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
    <dialog open v-if="show">
      <header>
        <slot id="head" name="header">
          <h2>{{ title }}</h2>
        </slot>
        <base-button class="gg-close" @click="tryClose"></base-button>
      </header>
      <section>
        <slot></slot>
      </section>
      <!-- <menu v-if="!fixed">
        <slot name="actions">   
        </slot>
      </menu> -->
    </dialog>
  </transition>
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
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
}


.gg-close {
  background-color: #3a0061;
  color: white;
  
}
.gg-close {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 5px solid transparent;
    border-radius: 40px
}
.gg-close:hover{
  color:white;
  background-color: #270041;
  
  
}
.gg-close::after,
.gg-close::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 5px;
    top: 12px;
    right: 16px;
}
.gg-close::after {
    transform: rotate(-45deg)
}

dialog {
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 80%;
  z-index: 40;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

header h2 {
  margin: 0;
  margin-left: 2rem;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 15rem);
    width: 30rem;
  }
}
</style>