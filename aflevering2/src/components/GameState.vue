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
  import { useGameStore } from "@/Store/GameStore";
  
  export default {
    data() {
      return {
        gameStore: null, // Initialize gameStore as null
      };
    },
    computed: {
      scores() {
        return this.gameStore ? this.gameStore.scores : []; // Get scores from the store
      },
    },
    methods: {
      nextHand() {
        // Move to the next hand
        if (this.gameStore) {
          this.gameStore.startNextHand();
        }
      },
    },
    mounted() {
      // Initialize gameStore when the component is mounted
      this.gameStore = useGameStore();
    },
  };
  </script>
  
  <style>
  .game-state {
    text-align: center;
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    font-size: 18px;
    margin: 5px 0;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  