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

      //the ...cards unpack the card[] that is given, and pushes it to the playerhands card[]
      this.cards.push(...cards);
    }

    removeCard(index: number){
      this.cards.splice(index,1)
    }
  }