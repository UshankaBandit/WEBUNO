import { defineStore } from "pinia";
import { Game } from "@/Logik/Game"; // Adjust this path to match your structure
import type { Card } from "@/Logik/PlayingCard";


export const useGameStore = defineStore("game", {
  state: () => ({
    game: null as Game | null, // The main game instance
    playerName: "",
    numBots: 0,
    currentPlayerIndex: 0,
    gameOver: false,
    winner: "",
  }),
  actions: {
    initializeGame(playerName: string, numBots: number) {

      this.playerName = playerName;
      this.numBots = numBots;
    
      this.game = new Game(1, numBots); 
      this.game.start();
      
      this.currentPlayerIndex = this.game.getCurrentPlayerIndex();
    },

    playTurn(card: Card) {
      if (!this.game) return;

      const players = this.game.getPlayers();
      const currentPlayer = players[this.currentPlayerIndex];

      if (!currentPlayer) {
        throw new Error("Invalid player index");
      }       
        this.game.playcard(this.currentPlayerIndex,card);
        this.game.advanceTurn
       

        //Check if the game has a winner
        if (this.game.isWinnerFound(currentPlayer)) {
          this.gameOver = true;
          this.winner = this.getWinnerName();
        }
      
    },
    saidUno(){
      this.game?.sayUno()
      
    },

    drawCard() {
      if (!this.game) return;

      const players = this.game.getPlayers();
      const currentPlayer = players[this.currentPlayerIndex];

      if (!currentPlayer) {
        throw new Error("Invalid player index");
      }

      // Player draws a card
      const drawnCards = this.game.getDeck().draw(1);
      currentPlayer.addCards(drawnCards);
    },

    nextRound() {
      if (!this.game) return;

      // Reset for the next round
      this.game.resetForNextRound();
      this.gameOver = false;
    },

    getWinnerName(): string {
      if (!this.game) return "";

      const winnerPlayer = this.game
        .getPlayers()
        .find((player) => player.score >= this.game!.getTargetScore());

      return winnerPlayer ? this.playerName : `Bot ${this.currentPlayerIndex}`;
    },

    checkwinner():boolean{
      return! this.game?.checkWinner()
    }
  },

  
  getters: {
    getTopCard: (state) => {
        console.log(state)
        if (!state.game) return null;
        const topCard = state.game.getDeck().topDiscard();
        console.log("Top Card:", topCard); // Debugging output
    
        return topCard;
      },

    getPlayerHand: (state) => {
      const players = state.game?.getPlayers();
      if (!players) return [];
      const currentPlayer = players[state.currentPlayerIndex];
      return currentPlayer ? currentPlayer.cards : [];
    },

    getScores: (state) => {
      return (
        state.game?.getPlayers().map((player, index) => ({
          name: index === 0 ? state.playerName : `Bot ${index}`,
          score: player.score,
        })) || []
      );
    },
    getBotCardCount: (state) => {
      const botCardCount: number[] = [];
      const players = state.game?.getPlayers();
      if (!players) return [];
      for (let i = 1; i < players.length; i++) {
        let tempCount = players[i].cards.length
        botCardCount.push(tempCount)
      }
      return botCardCount ? botCardCount : [];
    },
  },
});
