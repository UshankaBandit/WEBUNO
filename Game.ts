class Game  {
    private deck: Deck;
    private players: PlayerHand[];
    private currentPlayerIndex: number = 0;
    private scores: number[] = [];
    private targetScore: number = 500;
  
    constructor(numPlayers: number, targetScore: number = 500) {
      this.deck = new Deck();
      this.players = Array.from({ length: numPlayers }, () => new PlayerHand());
      this.scores = Array(numPlayers).fill(0);
      this.targetScore = targetScore;
    }
  
    start(): void {
        //shuffle the deck
      this.deck.shuffle();
      //each player get 7 cards from the drawdeck
      for (const player of this.players) {
        player.addCards(this.deck.draw(7));
      }
  
      //topcard of deck gets put in discardpile
      const firstCard = this.deck.draw(1)[0];

      //makes sure the first card isnt a wild card
      if (firstCard.type === "wild" || firstCard.type === "wildDrawFour") {
        this.deck.discard(firstCard);
        this.start(); // Restart the game with a valid card
      } else {
        this.deck.discard(firstCard);
      }
  
      console.log("Game started!");
    }
  
    playTurn(playerIndex: number): void {
      const player = this.players[playerIndex];
      const topCard = this.deck.topDiscard();
  
      // checks if the player can play
      if (player.hasLegalPlay(topCard)) {
        
        const playableCard = // method for choosing card
        );
        if (playableCard) {
          console.log(`Player ${playerIndex} played:`, playableCard);
          this.deck.discard(playableCard);
          player.penalizeForNotSayingUno();
        }
      } else {
        // Draw a card if player has no playable card
        const drawnCard = this.deck.draw(1)[0];
        player.addCards([drawnCard]);
      }
  
      // chech to see if player has won
      if (player.cards.length === 0) {
        this.calculateScores(playerIndex);
        console.log(`Player ${playerIndex} wins the hand!`);
        this.resetForNextHand();
      } else {
        this.advanceTurn();
      }
    }
  
    checkWinner(): number | null {
      return this.scores.findIndex((score) => score >= this.targetScore) ?? null;
    }
  
    private calculateScores(winningPlayerIndex: number): void {
      const score = this.players.reduce((acc, player, index) => {
        if (index !== winningPlayerIndex) {
          return acc + player.cards.reduce((sum, card) => sum + this.getCardPoints(card), 0);
        }
        return acc;
      }, 0);
  
      this.scores[winningPlayerIndex] += score;
    }
  
    private getCardPoints(card: Card): number {
      switch (card.type) {
        case "number":
          return card.value ?? 0;
        case "reverse":
        case "skip":
        case "drawTwo":
          return 20;
        case "wild":
        case "wildDrawFour":
          return 50;
        default:
          return 0;
      }
    }
  
    private resetForNextHand(): void {
      this.deck = new Deck();
      this.players.forEach((player) => player.addCards(this.deck.draw(7)));
      const firstCard = this.deck.draw(1)[0];
      this.deck.discard(firstCard);
      this.currentPlayerIndex = 0;
    }
  
    private advanceTurn(): void {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  }
  