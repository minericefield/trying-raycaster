<template>
  <div class="ray-caster-checker">
    <transition name="active-fade">
      <div v-show="shouldBeActive" class="active" />
    </transition>
  </div>
</template>

<script>
// no setup
export default {
  props: ['shouldBeActive']
}
</script>

<style lang="scss" scoped>
.ray-caster-checker {
  position: fixed;
  mix-blend-mode: difference;
  .active-fade-enter-from, .active-fade-leave-to {
    transform: scale(0);
  }
  .active-fade-enter-active, .active-fade-leave-active {
    transition: transform .4s;
  }
  .active {
    position: absolute;
    top: -37.5vmin;
    left: -37.5vmin;
    width: 75vmin;
    height: 75vmin;
    border-radius: 50%;
    background-color: #FFFFFF;
  }
}
</style>
