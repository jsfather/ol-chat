<script setup>
defineProps({
  progress: {
    type: Number,
    required: true,
    default: 0
  },
  size: String
});
</script>
<template>
  <div class="circular-progress">
    <svg :width="size" :height="size" viewBox="0 0 36 36" class="circular-chart">
      <path
          class="circle-bg stroke-slate-900"
          d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
          class="circle stroke-primary"
          :stroke-dasharray="`${progress}, 100`"
          d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
  </div>
</template>

<style scoped>
.circular-progress {
  display: inline-block;
}

.circular-chart {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease;
}
</style>
