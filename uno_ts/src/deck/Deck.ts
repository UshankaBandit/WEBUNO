import { ICard, ECardValue, NumberCard, SpecialCard, SpecialColorCard, ECardColor } from "../card/card"
import { Stack } from "../stack/stack"
import { getRandomInt } from "../util/util"

// INTERFACES
interface IDeck {
    cardQueue: Stack<ICard>
}   

export interface GameDeck extends IDeck {
    draw(): ICard | null
    shuffle(): GameDeck
}

export interface DiscardPile extends IDeck {
    place: () => ICard
    peek: () => ICard
}

export interface PlayerHand {
    cardList: Array<ICard>

    removeCard: () => ICard
    addCard: () => void
}

// CLASSES
export class GameDeck implements GameDeck {
    
    constructor () {

    }

    shuffle(): GameDeck{
        // Create a new stack for the deck
        this.cardQueue = new Stack<ICard>

        // Create an Array with all the values in it

        let cardArray: ICard[] = [] 
        for (let i = 0; i>2; i++) {
            for (let key in ECardValue) {
                if (isNaN(Number(key))) { // Skip numeric values from the enum
                    const cardValue = ECardValue[key as keyof typeof ECardValue]
                    switch(cardValue) {
                        case ECardValue.one: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break
                        }
                        case ECardValue.two: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.three: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.four: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.five: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.six: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.seven: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.nine: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.zero: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.skip: {
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.red))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.blue))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.green))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.yellow))
                            break
                        }
                        case ECardValue.draw2: {
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.red))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.blue))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.green))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.yellow))
                            break
                        }
                        case ECardValue.draw4: {
                            cardArray.push(new SpecialCard(cardValue))
                            cardArray.push(new SpecialCard(cardValue))
                            cardArray.push(new SpecialCard(cardValue))
                            cardArray.push(new SpecialCard(cardValue))
                            break

                        }
                        case ECardValue.eight: {
                            cardArray.push(new NumberCard(cardValue, ECardColor.red))
                            cardArray.push(new NumberCard(cardValue, ECardColor.blue))
                            cardArray.push(new NumberCard(cardValue, ECardColor.green))
                            cardArray.push(new NumberCard(cardValue, ECardColor.yellow))
                            break;

                        }
                        case ECardValue.reverse: {
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.red))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.blue))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.green))
                            cardArray.push(new SpecialColorCard(cardValue, ECardColor.yellow))
                            break

                        }
                        case ECardValue.wildCard: {
                            cardArray.push(new SpecialCard(cardValue))
                            cardArray.push(new SpecialCard(cardValue))
                            cardArray.push(new SpecialCard(cardValue))
                            cardArray.push(new SpecialCard(cardValue))
                        }
                    }
                }
            }
        }
        // Select at random which card gets picked to go into the stack
        while (cardArray.length > 0) {
            let randomInt = getRandomInt(0, cardArray.length-1)
            this.cardQueue.push(
                cardArray[randomInt]
            )
            delete cardArray[randomInt]
        }

        return this
    }

    draw(): ICard | null{
        let card = this.cardQueue.pop()
        return card !== undefined ? card : null
    }

}
