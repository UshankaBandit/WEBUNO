import type { Card } from "./PlayingCard";

//selve spilleren
export class PlayerHand {

    cards: Card[] = [];
     saidUno: boolean = false;
     score: number = 0
public isBot: boolean = false;
  
constructor(isbot: boolean){
  this.isBot = isbot
}
    addCards(cards: Card[]): void {

   
      this.cards.push(...cards);
    }

    removeCard(index: number){
      this.cards.splice(index,1)
    }
  }