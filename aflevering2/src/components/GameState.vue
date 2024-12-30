<template>
    <div class="game-state">
      <h1>Game State</h1>
      <ul>
        <li v-for="(score, player) in scores" :key="player">
          {{ player }}: {{ score }}
        </li>
      </ul>
      <button @click="nextHand">Start Next Hand</button>
    </div>
  </template>
  
  <script>
  import { useGameStore } from "@/store/gameStore";
  
  export default {
    computed: {
      scores() {
        const gameStore = useGameStore();
        return gameStore.scores; // Get scores from the store
      },
    },
    methods: {
      nextHand() {
        // Move to the next hand
        const gameStore = useGameStore();
        gameStore.startNextHand();
      },
    },
  };
  </script>
  