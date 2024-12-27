import type { Card } from "./game/PlayingCard";

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
        default: {
            return uno_cards_url + "wild_draw_4.jpg"
        }
    }
}