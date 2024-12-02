
    type Color = "red" | "blue" | "green" | "yellow" | "wild";
    type CardType = "number" | "reverse" | "skip" | "drawTwo" | "wild" | "wildDrawFour";
    

    interface Card {
      color: Color;
      type: CardType;
      value?: number; // Only for number cards
    }


