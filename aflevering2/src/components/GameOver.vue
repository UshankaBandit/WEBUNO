<template>
    <div class="game-over">
     
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
    data() {
      return {
        gameStore: null, // Initialize gameStore to null
      };
    },
    computed: {
      /*winner() {
        return this.gameStore.getWinner(); // Compute the winner from the store
      },
      scores() {
        return this.gameStore.scores; // Access scores from the store
      },*/
    },
    methods: {
      restartGame() {
        this.$router.push("/"); // Navigate back to the game setup screen
      },
    },
    mounted() {
      // Initialize the gameStore when the component is mounted
      this.gameStore = useGameStore();
    },
  };
  </script>
  
  <style>
  /* Add styles for better presentation */
  .game-over {
    text-align: center;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  