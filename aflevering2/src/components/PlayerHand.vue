<template>
    <div class="play-hand">
      <h1>Play Uno</h1>
      <p>Welcome, {{ gameStore.playerName }}</p>
      <p>Number of Bots: {{ gameStore.numBots }}</p>
  
      <!-- Display the Top Card -->
      <div v-if="topCard" class="card">
        <h2>Top Card:</h2>
        <img :src="getCardImgUrl(topCard)" alt="Top Card" />
      </div>
      <div v-else>
        <p>No top card available!</p>
      </div>
  
      <!-- Display Player's Cards -->
      <h2>Your Cards:</h2>
      <div class="player-hand">
        <div
          v-for="(card, index) in playerHand"
          :key="index"
          class="card"
        >
          <img :src="getCardImgUrl(card)" :alt="'Card ' + card.type" />
          <button @click="playCard(index)">Play</button>
        </div>
      </div>
  
      <button @click="drawCard">Draw Card</button>
    </div>
  </template>
  
  <script>
  import { useGameStore } from "@/store/gameStore";
  import { computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getCardImgUrl } from "@/utils/cardUtils";
  
  export default {
    setup() {
      const gameStore = useGameStore();
      const route = useRoute();
  
      // Reactive properties for top card and player's hand
      const topCard = computed(() => gameStore.getTopCard);
      const playerHand = computed(() => gameStore.getPlayerHand);
  
      // Play a card
      const playCard = (index) => {
        gameStore.playTurn(index);
      };
  
      // Draw a card
      const drawCard = () => {
        gameStore.drawCard();
      };
  
      onMounted(() => {
        const playerName = route.query.playerName || "Player";
        const numBots = parseInt(route.query.numBots) || 1;
  
        console.log("Initializing game with:", playerName, numBots);
  
        // Initialize the game
        gameStore.initializeGame(playerName, numBots);
      });
  
      return {
        topCard,
        playerHand,
        playCard,
        drawCard,
        getCardImgUrl, // Provide function to template
      };
    },
  };
  </script>
  
  <style>
  .card {
    text-align: center;
    margin: 10px;
  }
  
  .card img {
    width: 100px;
    height: auto;
    margin: 5px;
  }
  
  .player-hand {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  button {
    margin-top: 5px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  