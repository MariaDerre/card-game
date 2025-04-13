import { generateCards } from "../module/playing-field";

describe("generateCards", () => {
    test("should generate 36 cards with correct format", () => {
        const cards = generateCards();

        expect(cards.length).toBe(36);

        const suits = ["черви", "пики", "бубны", "крести"];
        const ranks = [
            "туз",
            "король",
            "дама",
            "валет",
            "10",
            "9",
            "8",
            "7",
            "6",
        ];

        suits.forEach((suit) => {
            ranks.forEach((rank) => {
                const expectedCard = `cards/${rank}%20${suit}.png`;
                expect(cards).toContain(expectedCard);
            });
        });
    });
});
