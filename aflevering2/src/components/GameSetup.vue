<template>
  <div class="game-setup">
    <h1>Uno Game Setup</h1>

    <!-- Player Name Input -->
    <label for="player-name">Enter your name:</label>
    <input
      v-model="playerName"
      id="player-name"
      type="text"
      placeholder="Your Name"
    />

    <!-- Number of Bots Selection -->
    <label for="num-bots">Number of Bots:</label>
    <select v-model="numBots" id="num-bots">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <!-- Start Game Button -->
    <button @click="startGame" :disabled="!playerName">
      Start Game
    </button>
  </div>
</template>

<script>
export default {
  name: "GameSetup",
  data() {
    return {
      playerName: "", // Player's name
      numBots: 1, // Number of bots
    };
  },
  methods: {
    startGame() {
      if (!this.playerName) {
        alert("Please enter your name!");
        return;
      }

      console.log("Navigating to /play with:", this.playerName, this.numBots);
      this.$router.push({
        path: "/play",
        query: {
          playerName: this.playerName,
          numBots: this.numBots,
        },
      });
    },
  },
};
</script>

<style>
.game-setup {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
