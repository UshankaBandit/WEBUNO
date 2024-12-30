<template>
    <div class="play-hand-view">
     
      <HandPlay />
    </div>
  </template>
  
  <script>
  import HandPlay from "@/components/PlayerHand.vue";
  
  export default {
    name: "PlayHandView",
    components: {
      HandPlay,
    },
  };
  </script>
  
  <style>
  .play-hand-view {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  