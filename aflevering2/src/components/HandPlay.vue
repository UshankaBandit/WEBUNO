<template>
    <div class="hand-play">
      <h1>Play Uno</h1>
      <div>
        <div v-if="topCard" class="card">
          {{ topCard.color }} {{ topCard.type }} {{ topCard.value || "" }}
        </div>
        <div v-else>
          <p>No top card available!</p>
        </div>
      </div>
      <div>
        <h2>Your Cards:</h2>
        <ul>
          <li v-for="(card, index) in playerHand" :key="index">
            <button @click="playCard(index)">
              {{ card.color }} {{ card.type }} {{ card.value || "" }}
            </button>
          </li>
        </ul>
      </div>
      <button @click="drawCard">Draw Card</button>
    </div>
  </template>
  
  <script>
  import { useGameStore } from "@/store/gameStore";
  
  export default {
    setup() {
      const gameStore = useGameStore();
      const topCard = gameStore.getTopCard;
      const playerHand = gameStore.getPlayerHand;
  
      const playCard = (index) => {
        gameStore.playTurn(index);
      };
  
      const drawCard = () => {
        gameStore.drawCard();
      };
  
      return {
        topCard,
        playerHand,
        playCard,
        drawCard,
      };
    },
  };
  </script>
  
  <style>
  .card {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px 0;
    width: 100px;
    text-align: center;
  }
  </style>
  