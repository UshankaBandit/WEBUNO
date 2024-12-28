import { resolve } from "path"
import { Card, createDeck, initialiseDeck, shuffleDeck } from "./deck"
import { Player } from "./player"
import * as readline from 'readline'

const game = (players: Player[]) => {

    // Initialise the deck
    const deck = createDeck()
    initialiseDeck(deck.drawPile)
    shuffleDeck(deck.drawPile)

    // Placing first card in discard pile
    const card = deck.drawPile.pop()
    if (card) {
        deck.discardPile.push(card)
    }

    players.forEach((player) => {
        while (player.hand.length < 7) {
            player.hand.push(
                deck.drawPile.pop()!
            )
        }
    })

    // Starting the game. <---- THIS DOES CURRENTLY ALLOW FOR DRAWING AS MANY CARDS AS ONE WANTS. ---->
    players.forEach(async (player) => {
        while (!player.finishTurn) {

            const turn = await getTurn(player) // Stand in for an api call.
            const action = turn.action

            if (action == "draw") {
                giveCard(deck.drawPile.pop()!, player)

            } else if (action == "discard") {
                if (isValidMove(turn.card!)) {
                    deck.discardPile.push(turn.card!)
                    player.finishTurn = true
                } else {
                    giveCard(turn.card!, player)

                }
            } else {
                player.finishTurn = true

            }

            if (isWinning(player)) break;
        }
    })

    const isValidMove = (card: Card): boolean => {
        const topCard: Card = deck.discardPile[deck.discardPile.length - 1]

        return card.color == topCard.color || card.amount == topCard.amount || topCard.type == "wild" || topCard.type == "wildDrawFour"
    }
}

const isWinning = (player: Player) : boolean => {
    return player.hand.length === 0
}

const giveCard = (card: Card, player: Player) => {
    player.hand.push(card)
}

const getTurn = async (player: Player): Promise<{action: string; card: Card | null}> => {

    const hand = player.hand

    hand.forEach((card, index) => (console.log("%d: {Amount: %d, Color: %s, type: %s}", index+1, card.amount, card.color, card.type)))
    console.log("Pick card")

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const askQuestion = (question: string): Promise<string> => {
        return new Promise((resolve) => {
            rl.question(question, (answer) => resolve(answer))
        })
    }

    const action = await askQuestion("Please choose an action\n|discard|draw|")

    if (action === "discard") {
        const answer2 = await askQuestion("Pick a card to discard")
        const index = Number.parseInt(answer2)-1

        rl.close()

        if (index >= 0 && index < player.hand.length) {
            return {
                action: "discard",
                card: player.hand[index]
            }
        }
    } else {
        rl.close()
    }

    return {
        action: "draw",
        card: null
    }
}