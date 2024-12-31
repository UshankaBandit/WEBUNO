import { Deck } from './Deck';
import { PlayerHand } from './PlayerHand';
import type { Card, Color } from './PlayingCard';

export class Hand {
  deck: Deck;
  player: PlayerHand;
  topCard: Card;

  constructor(currentPlayer: PlayerHand, topCard: Card, deck: Deck) {
    this.player = currentPlayer;
    this.topCard = topCard;
    this.deck = deck;
  }

  hasLegalPlay(topCard: Card): boolean {
   
    return this.player.cards.some((card) => this.isValidPlay(card, topCard));
  }

  sayUno(): boolean {
    return true;
  }

  callUnoOnPlayer(): boolean {
    return true;
  }

  isValidPlay(card: Card, topCard: Card): boolean {
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

  getPlayableCards(topCard: Card): Card[] {
   
    return this.player.cards.filter((card) => this.isValidPlay(card, topCard));
  }

  playCard(card: Card): number {
    let index = 0
    console.log("hand.ts playCard")
   
    for (let i = 0; i < this.player.cards.length; i++) {
      if(card === this.player.cards[i]) {
        index = i
      } 
    }
        
    this.player.cards.splice(index, 1); 
    this.deck.discard(card); 
    
    return index;
  }

  chooseCard(index: number, topCard: Card): Card {

    const playableCards = this.getPlayableCards(topCard);

    
      return playableCards[index];
  }

  chooseColor(inputColor: string): Color | null {
    
    const color = inputColor.toLowerCase();
    if (['red', 'blue', 'green', 'yellow'].includes(color)) {
      return color as Color;
    }

    console.error('Invalid color');
    return null;
  }
}