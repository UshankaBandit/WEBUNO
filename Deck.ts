import type { Card, Color, CardType } from "./PlayingCard";

export class Deck {
   
private drawPile: Card[] = [];
private discardPile: Card[] = [];
      
constructor() {
    this.initializeDeck();
    this.shuffle();
}
      

private initializeDeck(): void {
   
    const colors: Color[] = ["red", "blue", "green", "yellow"];

    colors.forEach(color => {
    // 
    for (let i = 0; i <= 9; i++) {
        this.drawPile.push({ color, type: "number", value: i });

        //hvis det er over 0, gør det igen
        if (i > 0) this.drawPile.push({ color, type: "number", value: i }); 
    }

   
    ["reverse", "skip", "drawTwo"].forEach((type) => {
        this.drawPile.push({ color, type: type as CardType }); 
        this.drawPile.push({ color, type: type as CardType }); 
      });
    });
   
    for (let i = 0; i < 4; i++) {
    this.drawPile.push({ color: "wild", type: "wild" });
    this.drawPile.push({ color: "wild", type: "wildDrawFour" });
    }
}   
      
shuffle(): void {
    
    this.drawPile.sort(() => Math.random() - 0.5);
}


draw(count: number): Card[] {
    return this.drawPile.splice(0, count);
}
     

discard(card: Card): void {
    this.discardPile.push(card);
}


topDiscard(): Card {
    return this.discardPile[this.discardPile.length - 1];
}
      
      

}