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
    // Check if any card in hand is a valid play
    return this.player.cards.some((card) => this.isValidPlay(card, topCard));
  }

  sayUno(): boolean {
    return true;
  }

  callUnoOnPlayer(): boolean {
    return true;
  }

  private isValidPlay(card: Card, topCard: Card): boolean {
    if (card.type === 'wild' || card.type === 'wildDrawFour') {
      return true;
    }
    return card.color === topCard.color || card.type === topCard.type;
  }

  getPlayableCards(topCard: Card): Card[] {
    // Return all playable cards
    return this.player.cards.filter((card) => this.isValidPlay(card, topCard));
  }

  playCard(card: Card): number {
    // Find the index of the card in the player's hand and remove it
    const index = this.player.cards.findIndex(
      (c) =>
        c.color === card.color &&
        c.type === card.type &&
        c.value === card.value
    );

    if (index >= 0) {
      this.player.cards.splice(index, 1); // Remove the card from hand
      this.deck.discard(card); // Add the card to the discard pile
    }

    return index;
  }

  chooseCard(index: number, topCard: Card): Card | null {
    // Choose a card based on the provided index
    const playableCards = this.getPlayableCards(topCard);

    if (index >= 0 && index < playableCards.length) {
      return playableCards[index];
    }

    console.error('Invalid card index');
    return null;
  }

  chooseColor(inputColor: string): Color | null {
    // Choose a color based on input from the UI
    const color = inputColor.toLowerCase();
    if (['red', 'blue', 'green', 'yellow'].includes(color)) {
      return color as Color;
    }

    console.error('Invalid color');
    return null;
  }
}
