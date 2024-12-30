
export type Color = "red" | "blue" | "green" | "yellow" | "wild";
export type CardType = "number" | "reverse" | "skip" | "drawTwo" | "wild" | "wildDrawFour";


export interface Card {
  color: Color;
  type: CardType;
  value?: number; 
}
