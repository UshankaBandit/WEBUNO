import type { Card, Color, CardType } from "./PlayingCard";

export class Deck {
   
private drawPile: Card[] = [];
private discardPile: Card[] = [];
id: number = 0
      
constructor() {
    this.initializeDeck();
    this.shuffle();
}
      

private initializeDeck(): void {
   
    const colors: Color[] = ["red", "blue", "green", "yellow"];

    colors.forEach(color => {
    // 
    for (let i = 0; i <= 9; i++) {
        this.drawPile.push({ color, type: "number", value: i , id: this.id});
        this.id++
        //hvis det er over 0, gør det igen
        if (i > 0) {
            this.drawPile.push({ color, type: "number", value: i, id: this.id})
            this.id++
        }; 
    }

   
    ["reverse", "skip", "drawTwo"].forEach((type) => {
        this.id++
        this.drawPile.push({ color, type: type as CardType, id: this.id}); 
        this.id++
        this.drawPile.push({ color, type: type as CardType, id: this.id }); 
        this.id++
      });
    });
   
    for (let i = 0; i < 4; i++) {
        this.id++
    this.drawPile.push({ color: "wild", type: "wild", id: this.id});
    this.id++
    this.drawPile.push({ color: "wild", type: "wildDrawFour", id: this.id});
    this.id++
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