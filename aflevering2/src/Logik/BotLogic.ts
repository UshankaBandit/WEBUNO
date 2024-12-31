import type { Card } from "@/Logik/PlayingCard";
import { Deck } from "@/Logik/Deck";
import { PlayerHand } from "@/Logik/PlayerHand";
import { Hand } from "./Hand";

export class BotLogic {
  /**
   * Makes a decision for the bot to play a card.
   * @param player The bot's hand of cards.
   * @param topCard The current top card on the discard pile.
   * @returns The card the bot chooses to play, or null if it draws a card.
   */
  static chooseCardToPlay(player: PlayerHand, topCard: Card, deck: Deck): Card | null {
    // Filter valid cards based on Uno rules
    const hand = new Hand(player,topCard,deck)
    const playableCards = player.cards.filter((card) =>
      this.isValidPlay(card, topCard)
    );
    if (playableCards.length = 2) {
      hand.sayUno()

    }
    return(playableCards[0])

    
    

    // If no playable cards, return null to signify the bot will draw a card
    return null;
  }

  /**
   * Checks if a card is valid to play on the current top card.
   * @param card The card to check.
   * @param topCard The current top card.
   * @returns True if the card can be played, false otherwise.
   */
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

  /**
   * Makes the bot decide whether to say "Uno".
   * @returns True if the bot decides to say "Uno", false otherwise.
   */
  static shouldSayUno(): boolean {
    // 80% chance of saying Uno
    return Math.random() > 0.2;
  }

  /**
   * Makes the bot decide whether to catch another player for not saying "Uno".
   * @returns True if the bot decides to catch the player, false otherwise.
   */
  static shouldCatchUno(): boolean {
    // 50% chance of catching another player
    return Math.random() > 0.5;
  }

  /**
   * Handles the bot's turn logic.
   * @param bot The bot's PlayerHand object.
   * @param topCard The current top card on the discard pile.
   * @param deck The deck from which to draw cards.
   * @returns The card the bot plays, or null if it draws a card.
   */
  /*static takeTurn(bot: PlayerHand, topCard: Card, deck: Deck): Card | null {
    // Decide which card to play
    const cardToPlay = this.chooseCardToPlay(bot, topCard);

    if (cardToPlay) {
      // Play the card
      bot.removeCard(bot.cards.indexOf(cardToPlay));
      return cardToPlay;
    } else {
      // Draw a card if no valid plays
      const drawnCards = deck.draw(1);
      bot.addCards(drawnCards);
      return null;
    }
  }*/
}
