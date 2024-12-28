import { Card } from "./deck";

export type Player = {
    isBot: boolean,
    hand: Card[],
    finishTurn: boolean,
};