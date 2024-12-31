import type { Card } from "./PlayingCard";

var uno_cards_url = "src/assets/uno_cards/"

export function getCardImgUrl(card: Card) : string {
    switch(card.type){
        case "number": {
            return uno_cards_url + card.color + "_" + card.value + ".jpg";
        }
        case "drawTwo": {
            return uno_cards_url + card.color + "_draw_2.jpg"
        }
        case "skip": {
            return uno_cards_url + card.color + "_skip.jpg"    
        }
        case "reverse": {
            return uno_cards_url + card.color + "_reverse.jpg"
        }
        case "wild": {
            return uno_cards_url + "wild.jpg"
        }
        case "wildDrawFour": {
            return uno_cards_url + "wild_draw_4.jpg"
        }
        default: {
            return uno_cards_url + "back.png"
        }
    }
}
export function isValidPlay(card: Card, topCard: Card): boolean {
    try{
    if (card.type === 'wild' || card.type === 'wildDrawFour'||card.color === topCard.color) {
      return true;
    }
    else if (card.type === "number" && card.value === topCard.value){
        return true
    }
    else if (!card.value && card.type === topCard.type && card.value != 0){
        return true
    }
    
    else return false
}
catch(e)
{
    console.log(e)
    return false;
}
  }