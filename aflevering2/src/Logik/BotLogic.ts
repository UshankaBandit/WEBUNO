import type { Card } from "@/Logik/PlayingCard";
import { Deck } from "@/Logik/Deck";
import { PlayerHand } from "@/Logik/PlayerHand";
import { Hand } from "./Hand";

export class BotLogic {
  
  static chooseCardToPlay(player: PlayerHand, topCard: Card, deck: Deck): Card | null {
    // Filter valid cards based on Uno rules
    const hand = new Hand(player,topCard,deck)
    const playableCards = player.cards.filter((card) =>
      this.isValidPlay(card, topCard)
    );
    console.log(playableCards.length)
    if (playableCards.length = 2) {
      hand.sayUno()

    }
    if(playableCards.length < 0 || playableCards.length == null){
      return null

    }
    
    return(playableCards[0])
  }

 
  static isValidPlay(card: Card, topCard: Card): boolean {
    if (card.type === 'wild' || card.type === 'wildDrawFour'||card.color === topCard.color) {
      return true;
    }
    else if (card.type === "number" && card.value === topCard.value){
        return true
    }
    else if (!card.value && card.type === topCard.type && card.value != 0){
        return true
    }
    else {
      console.log("not valid card")
      return false;
    } 

    
  }

  
  static shouldSayUno(): boolean {
    // 80% chance of saying Uno
    return Math.random() > 0.2;
  }

  
  static shouldCatchUno(): boolean {
    // 50% chance of catching another player
    return Math.random() > 0.5;
  }

}
