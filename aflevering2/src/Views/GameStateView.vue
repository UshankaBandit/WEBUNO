<template>
    <div class="game-state-view">
      <h1>Game State</h1>
      <GameState />
    </div>
  </template>
  
  <script>
  import GameState from "@/components/GameState.vue";
  
  export default {
    name: "GameStateView",
    components: {
      GameState,

    },
  };
  </script>
  
  <style>
  .game-state-view {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  