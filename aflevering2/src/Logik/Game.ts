import { Deck } from './Deck';
import { PlayerHand } from './PlayerHand';
import type { Card } from './PlayingCard';
import { Hand } from './Hand';
import { BotLogic } from './BotLogic';

export class Game {
  private deck: Deck;
  private players: PlayerHand[];
  private botPlayers: PlayerHand[];
  private currentPlayerIndex: number;
  private targetScore: number = 500;
  private isReversed: boolean = false;
  private winnerFound: boolean = false;

  constructor(numPlayers: number, numBots: number, targetScore: number = 500) {
    this.deck = new Deck();
    this.players = Array.from({ length: numPlayers }, () => new PlayerHand(false));
    this.botPlayers = Array.from({ length: numBots }, () => new PlayerHand(true));
    this.players = [...this.players, ...this.botPlayers]
    console.log(this.players)
    this.targetScore = targetScore
    this.currentPlayerIndex = 0
  }

  start(): void {


    // Distribute 7 cards to each player
    for (const player of this.players) {
      player.addCards(this.deck.draw(7));
    }
    
    let firstCard = this.deck.draw(1)[0];

      this.deck.discard(firstCard);

      if(firstCard.type === "wild" || firstCard.type === "wildDrawFour"){
        firstCard = this.deck.draw(1)[0]
        this.deck.discard(firstCard)
      }
  }

  playcard(playerIndex: number, card: Card){
    let player = this.players[playerIndex];
    const topCard = this.deck.topDiscard();
    const hand = new Hand(player, topCard, this.deck)
         
    hand.playCard(card)
      
    this.switchTurn(topCard);
  }

  switchTurn(topCard: Card): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

    const nextPlayer = this.players[this.currentPlayerIndex];
    if (nextPlayer.isBot) {
      this.botPlays(nextPlayer, topCard);
    }
  }

  botPlays(botPlayer: PlayerHand, topCard: Card): void {
    const hand = new Hand(botPlayer, topCard, this.deck)
    try {
      const cardToPlay  = BotLogic.chooseCardToPlay(botPlayer, topCard, this.deck)
      hand.playCard(cardToPlay!);
    } catch (error) {
      botPlayer.addCards(this.deck.draw(1))

    }
    

    // Delay for a smoother bot play experience
    this.switchTurn(topCard);
  }

 

  handleCardPlay(card: Card, player: PlayerHand, hand: Hand): void {
    hand.playCard(card);
    this.deck.discard(card);

    // Handle special cards
    if (card.type === "reverse") {
      this.isReversed = !this.isReversed;
    } else if (card.type === "skip") {
      this.advanceTurn();
    } else if (card.type === "wild" || card.type === "wildDrawFour") {
      const chosenColor = hand.chooseColor("red");
      if (chosenColor) {
        this.deck.topDiscard().color = chosenColor;
      }
    }

    // Check for round winner
    if (player.cards.length === 0) {
      console.log(player.cards.length)
      this.calculateScores(this.currentPlayerIndex);
      this.checkWinner();
      this.resetForNextRound();
    } else {
      this.advanceTurn();
    }
  }

  checkWinner(): void {
    for (const [index, player] of this.players.entries()) {
      if (player.score >= this.targetScore) {
        this.winnerFound = true;
        console.log(`Winner is Player ${index}!`);
        break;
      }
    }
  }

  calculateScores(winningPlayerIndex: number): void {
    const score = this.players.reduce((acc, player, index) => {
      if (index !== winningPlayerIndex) {
        return (
          acc +
          player.cards.reduce((sum, card) => sum + this.getCardPoints(card), 0)
        );
      }
      return acc;
    }, 0);

    this.players[winningPlayerIndex].score += score;
  }

  getCardPoints(card: Card): number {
    switch (card.type) {
      case "number":
        return card.value ?? 0;
      case "reverse":
      case "skip":
      case "drawTwo":
        return 20;
      case "wild":
      case "wildDrawFour":
        return 50;
      default:
        return 0;
    }
  }

  resetForNextRound(): void {
    this.deck = new Deck();
    for (const player of this.players) {
      player.addCards(this.deck.draw(7));
    }

    let firstCard = this.deck.draw(1)[0];
    while (firstCard.type === "wild" || firstCard.type === "wildDrawFour") {
      this.deck.discard(firstCard);
      firstCard = this.deck.draw(1)[0];
    }

    this.deck.discard(firstCard);
    this.currentPlayerIndex = 0;
  }

  advanceTurn(): void {
    if (this.isReversed) {
      this.currentPlayerIndex = (this.currentPlayerIndex - 1 + this.players.length) % this.players.length;
    } else {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }
  }


  getCurrentPlayerIndex(): number {
    return this.currentPlayerIndex;
  }

  getPlayers(): PlayerHand[] {
    return this.players;
  }

  getDeck(): Deck {
    return this.deck;
  }

  isWinnerFound(player: PlayerHand): boolean {
    if(player.cards.length === 0)
    {
      return true
    }
    else return false
  }

  getTargetScore(): number {
    return this.targetScore;
  }

  sayUno(){
    this.players[this.currentPlayerIndex].saidUno = true
  }
}
