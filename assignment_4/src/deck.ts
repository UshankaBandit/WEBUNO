const color = ["red", "yellow", "green", "blue"]
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
type CardType = "number" | "reverse" | "skip" | "drawTwo" | "wild" | "wildDrawFour";

export type Card = {
    color: string;
    type: string;
    amount: number | null;
};

const createCard = (color: string, type: CardType, amount: number | null = null): Card => ({
    color,
    type,
    amount
})

export const createDeck = () => ({
    drawPile: [] as Card[],
    discardPile: [] as Card[]
})

export const initialiseDeck = (deck: Card[]) => {
    color.forEach((color) => {
        number.forEach((amount) => {
            deck.push(createCard(color, "number", amount))
            deck.push(createCard(color, "number", amount))
            deck.push(createCard(color, "number", amount))
            deck.push(createCard(color, "number", amount))
        })

        deck.push(createCard(color, "reverse"))
        deck.push(createCard(color, "reverse"))
        deck.push(createCard(color, "reverse"))
        deck.push(createCard(color, "reverse"))

        deck.push(createCard(color, "skip"))
        deck.push(createCard(color, "skip"))
        deck.push(createCard(color, "skip"))
        deck.push(createCard(color, "skip"))

        deck.push(createCard(color, "drawTwo"))
        deck.push(createCard(color, "drawTwo"))
        deck.push(createCard(color, "drawTwo"))
        deck.push(createCard(color, "drawTwo"))

        deck.push(createCard(color, "wild")) // Doesn't need four dupes, as it creates one for each color and wild cards inheritly doesn't have a color.
        deck.push(createCard(color, "wildDrawFour")) // Doesn't need four dupes, as it creates one for each color and wild cards inheritly doesn't have a color.
    })
}

export const shuffleDeck = (deck: any[]) => (
    deck.sort(() => Math.random() - 0.5) // Got this from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
)