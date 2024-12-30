<template>
    <div class="game-over-view">
      <h1>Game Over</h1>
      <GameOver />
    </div>
  </template>
  
  <script>
  import GameOver from "@/components/GameOver.vue";
  
  export default {
    name: "GameOverView",
    components: {
      GameOver,
    },
  };
  </script>
  
  <style>
  .game-over-view {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  