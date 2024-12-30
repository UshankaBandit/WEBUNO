<template>
    <div class="game-setup">
      <h1>Uno Game Setup</h1>
      <label for="player-name">Enter your name:</label>
      <input v-model="playerName" id="player-name" type="text" placeholder="Your Name" />
  
      <label for="num-bots">Number of Bots:</label>
      <select v-model="numBots" id="num-bots">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
  
      <button @click="startGame">Start Game</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        playerName: "",
        numBots: 1,
      };
    },
    methods: {

        
      startGame() {
        if (!this.playerName) {
          alert("Please enter your name!");
          return;
        }
        console.log("going to playerhand")
        this.$router.push({ path: "/play", query: { playerName: this.playerName, numBots: this.numBots } });
      },
    },
  };
  </script>
  