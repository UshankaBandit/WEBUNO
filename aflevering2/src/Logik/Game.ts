import { Deck } from './Deck'
import { PlayerHand } from './PlayerHand';
import type { Card } from './PlayingCard';
import {Hand} from './Hand'
import { BotLogic } from './BotLogic';

export class Game {
  private deck: Deck
  private players: PlayerHand[]
  private currentPlayerIndex: number = 0
  private targetScore: number = 500
  private isReversed: boolean = false
  private winnerfound: boolean = false
  private hand: Hand | undefined 

  constructor(numPlayers: number, targetScore: number = 500) {
    this.deck = new Deck();
    this.players = Array.from({ length: numPlayers }, () => new PlayerHand());
    this.targetScore = targetScore;
  }

  start(): void {
 
    //7 start kort til hver spiller
    for (const player of this.players) {
      player.addCards(this.deck.draw(7));
    }

    //topcard of deck gets put in discardpile
    const firstCard = this.deck.draw(1)[0];

    //sikre at første kort ikke er et wild
    if (firstCard.type === "wild" || firstCard.type === "wildDrawFour") {
      this.deck.discard(firstCard);
      this.start(); // restart
    } else {
      this.deck.discard(firstCard);
    }

    while (this.winnerfound === false) {
        this.playTurn(this.currentPlayerIndex)
    }

  }



  playTurn(playerIndex: number): void {
    
    
    const player = this.players[playerIndex]
    const topCard = this.deck.topDiscard();
    if (player.isBot) {
      
      const cardToPlay = BotLogic.takeTurn(player, topCard, this.deck);
  
      if (cardToPlay) {
        this.deck.discard(cardToPlay);
  
        // If the card is a Wild, choose a new color
        if (cardToPlay.type === "wild" || cardToPlay.type === "wildDrawFour") {
          topCard.color = this.hand?.chooseColor() || "red"; // Default to red
        }
  
        // Check if the bot has won the round
        if (player.cards.length === 0) {
          this.calculateScores(playerIndex);
          this.checkWinner();
          this.resetForNextRound();
          return;
        }
      }
    }
    

    this.hand = new Hand(player, topCard, this.deck)
   
    if(this.checkSpecialTopcard(topCard, playerIndex))
    {
      if(!this.hand.hasLegalPlay(topCard)){
        player.addCards(this.deck.draw(1))
      }
      else{
        const chosencard = this.hand.chooseCardToPlay(topCard)

        if (chosencard.type === "reverse"){
          if(this.isReversed){
          this.isReversed = false
          }
          else{
            this.isReversed = true
          }
        }
        
        const indexOfCard = this.hand.playCard(chosencard)

        this.deck.discard(player.cards[indexOfCard])
        player.removeCard(indexOfCard)

        if (chosencard.type === "wild" || chosencard.type === "wildDrawFour"){
          topCard.color = this.hand.chooseColor()
        }

        if(this.checkRoundWinner(player)){
          this.calculateScores(this.currentPlayerIndex)
          this.checkWinner()
           this.resetForNextRound();
        }
        else this.advanceTurn(this.isReversed)
      }
    }
  }



checkRoundWinner(player: PlayerHand): boolean{
  if (player.cards.length = 0)
  {
    return true
    
  }
  else return false

}

  checkSpecialTopcard(topCard: Card, playerindex: number): boolean{
    const player = this.players[playerindex];
    if(topCard.type === "drawTwo"){
        const draw = this.deck.draw(2)[0]
        player.addCards([draw])
        
        return false
    }

    else if(topCard.type === "wildDrawFour"){
        const draw = this.deck.draw(4)[0];
        player.addCards([draw])
        
        return false
    }

    else if (topCard.type === "skip"){
        
        return false
    }

    else{
        return true
    }

  }

  //retunere null hvis der ikke er en vinder
  checkWinner(): void {
   for (let i = 0; i < this.players.length; i++) {
        if(this.players[i].score >= this.targetScore)
        this.winnerfound = true;   
    console.log("winner is: " + this.players[i])
   
   }
  }

  private calculateScores(winningPlayerIndex: number): void {
    const score = this.players.reduce((acc, player, index) => { //looper igennem alle spillerne
      if (index !== winningPlayerIndex) { //hvis spilleren ikke er vinderen
        return acc + player.cards.reduce((sum, card) => sum + this.getCardPoints(card), 0); //lopper igennem alle kortene og sum værdi
      }
      return acc; //acc = accumilated scorer
    }, 0);
    this.players[winningPlayerIndex].score += score
    
  }

  private getCardPoints(card: Card): number {
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
    this.players.forEach((player) => player.addCards(this.deck.draw(7)));
    const firstCard = this.deck.draw(1)[0];
    this.deck.discard(firstCard);
    this.currentPlayerIndex = 0;
  }

  private advanceTurn(isReversed: boolean): void {
    if(isReversed){
        this.currentPlayerIndex = (this.currentPlayerIndex - 1) % this.players.length;
    }

    else{
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
    
  }

  private penalizeUno(player: PlayerHand): boolean{
        
    if(player.cards.length === 1 && player.saidUno === false)
        {
        player.addCards(this.deck.draw(1))
   
        return true
    }
    else{
        return false
    }
}

getCurrentPlayerIndex():number{
  return this.currentPlayerIndex
}

getPlayers(): PlayerHand[] {
  return this.players;
}

getDeck(): Deck {
  return this.deck;
}

isWinnerFound(): boolean {
  return this.winnerfound;
}

getTargetScore():number{
  return this.targetScore
}



}