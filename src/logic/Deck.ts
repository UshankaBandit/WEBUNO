import type { Card, Color, CardType } from "./PlayingCard";

export class Deck {
   
private drawPile: Card[] = [];
private discardPile: Card[] = [];
      
constructor() {
    this.initializeDeck();
    this.shuffle();
}
      

private initializeDeck(): void {
    //for easy card generation
    const colors: Color[] = ["red", "blue", "green", "yellow"];

    colors.forEach(color => {
    // loop that creates the numbered cards for each color
    for (let i = 0; i <= 9; i++) {
        this.drawPile.push({ color, type: "number", value: i });

        //since we only need one card that is 0, we create this if statement that only dublicates numbers 1 - 9
        if (i > 0) this.drawPile.push({ color, type: "number", value: i }); 
    }

    //loop that creates 2 of each type
    ["reverse", "skip", "drawTwo"].forEach((type) => {
        this.drawPile.push({ color, type: type as CardType }); 
        this.drawPile.push({ color, type: type as CardType }); 
      });
    });
    //loop that creates 4 wild and 4 wilddrawfour
    for (let i = 0; i < 4; i++) {
    this.drawPile.push({ color: "wild", type: "wild" });
    this.drawPile.push({ color: "wild", type: "wildDrawFour" });
    }
}   
      
shuffle(): void {
    //using Math.randon to indroduce randomness to the shuffle function.
    this.drawPile.sort(() => Math.random() - 0.5);
}

// The draw method takes the amount of cards needed to be drawn, then splice that amount of cards from the top
//and returns it in the form af a Card[]
draw(count: number): Card[] {
    return this.drawPile.splice(0, count);
}
     
// this discard method takes a card and pushes it to the discardpile
discard(card: Card): void {
    this.discardPile.push(card);
}

// this method returns the last card that was pushed to the discardpile
topDiscard(): Card {
    return this.discardPile[this.discardPile.length - 1];
}
      
      

}