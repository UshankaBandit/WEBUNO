class PlayerHand {

    cards: Card[] = [];
    private saidUno: boolean = false;
  
    addCards(cards: Card[]): void {

      //the ...cards unpack the card[] that is given, and pushes it to the playerhands card[]
      this.cards.push(...cards);
    }
  
    playCard(card: Card, topCard: Card): boolean {
      // Check if the card is valid to play
      if (this.isValidPlay(card, topCard)) {
        // finds the index of that card, bu comparing the card to alle the cards in the hand
        const index = this.cards.findIndex(
          (c) => c.color === card.color && c.type === card.type && c.value === card.value
        );
        //if index is not -1 then the card will be removed with the .splice method
        if (index !== -1) {
          this.cards.splice(index, 1);
          return true;
        }
        if (index === -1){
            throw new Error("Card not found in hand");          
      } 
    }
        console.log("Invalid play: card does not match the top card.");
        return false;
    }
    
    //Checks if any of the cards in hand is legal and returns true if any is
    hasLegalPlay(topCard: Card): boolean {
      return this.cards.some((card) => this.isValidPlay(card, topCard));
    }
  

    sayUno(): boolean {
      if (this.cards.length === 2) {
        this.saidUno = true;
        return true;
      }
      return false;
    }
  
    private isValidPlay(card: Card, topCard: Card): boolean {
     
      return (
        card.color === topCard.color ||
        card.type === topCard.type ||
        card.color === "wild"
      );
    }
  
    penalizeForNotSayingUno(): void {
      if (!this.saidUno && this.cards.length === 1) {
        console.log("Penalty: Player didn't say UNO! Drawing 4 cards.");
        // penalty for not saying uno
        this.addCards(new Array(4).fill({ color: "wild", type: "wild" })); // Replace with actual draw logic
      }
      this.saidUno = false; // Reset the UNO status
    }

    chooseCardToPlay(topCard: Card): Card | null {
        // Filter playable cards
        const playableCards = this.cards.filter((card) =>
            this.isValidPlay(card, topCard)
        );

        // if there arent any playyable cards
        if (playableCards.length === 0) {
            return null
        }

        // List all possible cards
        console.log("Your playable cards:");
        playableCards.forEach((card, index) => {
            console.log(`${index}: ${card.color} ${card.type} ${card.value ?? ""}`);
        });

        
        // returns chosen card
        const chosenIndex = this.promptForCard(playableCards.length);

        return playableCards[chosenIndex];
    }

    // pick a valid card
    private promptForCard(maxIndex: number): number {
        let chosenIndex: number;
        do {
            const input = prompt(`Choose a card index (0 to ${maxIndex - 1}):`);
            chosenIndex = parseInt(input ?? "", 10);
        } while (isNaN(chosenIndex) || chosenIndex < 0 || chosenIndex >= maxIndex);
        return chosenIndex;
    }
  }
  