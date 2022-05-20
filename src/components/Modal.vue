<template>
  <teleport to="body">
    <template v-if="modelValue">
      <div
        class="modal"
        @click="offModal">
        <div
          class="modal__inner"
          @click.stop>
          <button
            v-if="closeable"
            class="modal__close"
            @click="offModal">
            X
          </button>
          <slot></slot>
        </div>
      </div>
    </template>
  </teleport>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    closeable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue(newValue){
      if(newValue){
        window.addEventListener('keyup', this.keyupHandler);
      }else {
        window.removeEventListener('keyup', this.keyupHandler);
      }
    }
  },
  methods: {
    keyupHandler(event){
      if (event.key === 'Escape'){
        console.log('ESC!!');
        this.offModal();
      }
    },
    offModal(){
      this.$emit('update:modelValue', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
  background-color: rgba(black, .5);
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right:0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  &__inner {
    max-width: 60%;
    background-color: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 10px 10px rgba(black, .2);
    button.modal__close {
      cursor: pointer;
    }
  }
}
</style>