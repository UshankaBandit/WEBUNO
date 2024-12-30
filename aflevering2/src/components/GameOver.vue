<template>
    <div class="game-over">
      <h1>Game Over</h1>
      <h2>Winner: {{ winner }}</h2>
      <ul>
        <li v-for="(score, player) in scores" :key="player">
          {{ player }}: {{ score }}
        </li>
      </ul>
      <button @click="restartGame">Restart Game</button>
    </div>
  </template>
  
  <script>
  import { useGameStore } from "@/store/gameStore";
  
  export default {
    computed: {
      winner() {
        const gameStore = useGameStore();
        return gameStore.getWinner(); // Compute the winner
      },
      scores() {
        const gameStore = useGameStore();
        return gameStore.scores;
      },
    },
    methods: {
      restartGame() {
        this.$router.push("/"); // Go back to the game setup screen
      },
    },
  };
  </script>
  