<template>
  <div class="play-hand">
    <h1>Play Uno</h1>
    <p>Welcome, {{ playerName }}</p>
    <p>Number of Bots: {{ numBots }}</p>

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
        <a>{{ index }}</a>
        <!-- Show the Play button only if the card is playable -->
         <br>
        <button v-if="isValidPlay(card, topCard)" @click="playCard(index)">Play</button>
      </div>
    </div>

    <button @click="drawCard">Draw Card</button>
  </div>
</template>

<script>
import { useGameStore } from "@/Store/GameStore"
import { useRoute } from "vue-router"
import { getCardImgUrl } from "@/Logik/utils"
import {isValidPlay} from "@/Logik/utils"

export default {
  data() {
    return {
      gameStore: null,
      playerName: "",
      numBots: 1,
      showColorPicker: false, // To control the visibility of the color picker
      wildCard: null, // To store the currently played wild card
      colors: ["red", "blue", "green", "yellow"], // Available colors
    };
  },
  computed: {
    topCard() {
      return this.gameStore?.getTopCard || null;
    },
    playerHand() {
      return this.gameStore?.getPlayerHand || [];
    },
  },
  methods: {
    playCard(index) {
      if (this.gameStore) {
        const handTemp = this.playerHand[index]
        const colorPicked = ""
        
        if (handTemp.type === "wild" || handTemp.type === "wildDrawFour") {
          let color = prompt('Choose color', 'yellow, red, green, blue')
          handTemp.color = color

          this.gameStore.playTurn(handTemp)
          return; 
        }

          this.gameStore.playTurn(handTemp)
        }
      },
    drawCard() {
      if (this.gameStore) {
        this.gameStore.drawCard();
      }
    },
    initializeGame() {
      const route = useRoute();
      this.playerName = route.query.playerName || "Player";
      this.numBots = parseInt(route.query.numBots) || 1;

      console.log("Initializing game with:", this.playerName, this.numBots);

      if (this.gameStore) {
        this.gameStore.initializeGame(this.playerName, this.numBots);
      }
    },
    getCardImgUrl,
    isValidPlay,
  },
  mounted() {
    // Initialize the game without triggering gameplay logic prematurely
    this.gameStore = useGameStore();
    this.initializeGame();

    // Log that the game is ready
    console.log("Game initialized and ready!");
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
