<template>
    <div class="play-hand-view">
      <h1>Play Uno</h1>
      <HandPlay />
    </div>
  </template>
  
  <script>
  import HandPlay from "@/components/PlayerHand.vue";
  
  export default {
    components: {
      HandPlay,
    },
  };
  </script>
  