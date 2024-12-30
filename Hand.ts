import { Deck } from './Deck'
import { PlayerHand } from './PlayerHand';
import type { Card, Color } from './PlayingCard';

export class Hand{

deck: Deck
player: PlayerHand
topCard: Card

 
constructor(currentPlayer: PlayerHand, topCard: Card, deck: Deck ){
    this.player = currentPlayer
    this.topCard = topCard
    this.deck = deck
}

    
    
    hasLegalPlay(topCard: Card): boolean {

        //går igennem all kort, og tjekker om bare et er godt nok
      return this.player.cards.some((card) => this.isValidPlay(card, topCard))
    }
  
    sayUno(): boolean{
        return true
    }

    callUnoOnPlayer(): boolean{
        return true;
    }
  
    private isValidPlay(card: Card, topCard: Card): boolean {
     
        if(card.type === "wild" || card.type === "wildDrawFour")
        {
            return true;
        }
      return (
        card.color === topCard.color ||
        card.type === topCard.type
      )
    }
  

    chooseCardToPlay(topCard: Card): Card {
        // Filtrer mulige kort
        const playableCards = this.player.cards.filter((card) =>
            this.isValidPlay(card, topCard)
        );

        // List alle mulige kort
        console.log("Your playable cards:");
        playableCards.forEach((card, index) => {
        console.log(`${index}: ${card.color} ${card.type} ${card.value ?? ""}`);
        });

        
        
        const chosenIndex = this.promptForCard(playableCards.length);

        return playableCards[chosenIndex];
    }

    // prompt for at vælge kort
    private promptForCard(maxIndex: number): number {
        let chosenIndex: number;
        do {
            const input = prompt(`Choose a card index (0 to ${maxIndex - 1}):`);
            chosenIndex = parseInt(input ?? "", 10);
        } while (isNaN(chosenIndex) || chosenIndex < 0 || chosenIndex >= maxIndex);
        return chosenIndex;
    }

    playCard(card: Card): number {
        //finder index a kortet ved at sammenligne med hånden
        const index = this.player.cards.findIndex(
          (c) => c.color === card.color && c.type === card.type && c.value === card.value
        );    
          return index
          
    }

    

    chooseColor(): Color {
        // Prompts the player to choose a color
        let chosenColor: Color | undefined; // Allow undefined initially

        do {
            const input = prompt(`Choose a card color (red, blue, green, yellow):`)?.toLowerCase(); // Convert input to lowercase
            if (input === "red" || input === "blue" || input === "green" || input === "yellow") {
                chosenColor = input as Color; // Assert input is of type Color
            } else {
                alert("Invalid color. Please choose a valid color.");
            }
        } while (!chosenColor);

        return chosenColor;
    }
    

}














