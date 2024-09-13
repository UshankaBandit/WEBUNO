export enum ECardColor {
    red,
    green,
    blue,
    yellow,
}

export enum ECardValue {
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    reverse,
    skip,
    draw2,
    draw4,
    wildCard,
}

export interface ICard {
    cardValue: ECardValue;
}

export interface IColorCard extends ICard {
    cardColor: ECardColor
}

export class NumberCard implements IColorCard {
    
    cardValue: ECardValue;
    cardColor: ECardColor;

    constructor(cardValue : ECardValue, cardColor : ECardColor) {
        if (cardValue !== undefined && cardColor !== undefined) {
            this.cardValue = cardValue;
            this.cardColor = cardColor;
        }
    }
}

export class SpecialColorCard implements IColorCard {
    
    cardColor: ECardColor;
    cardValue: ECardValue;

    constructor(cardValue : ECardValue, cardColor : ECardColor) {
        if (cardValue !== undefined && cardColor !== undefined) {
            this.cardValue = cardValue;
            this.cardColor = cardColor;
        }
    }
}

export class SpecialCard implements ICard {

    cardValue: ECardValue;

    constructor (cardValue : ECardValue) {
        if (cardValue !== undefined)  {
            this.cardValue = cardValue;
        }
    }
}

