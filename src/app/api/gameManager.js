// utils/gameManager.js
import { v4 as uuidv4 } from 'uuid';

const games = {}; // Store all game states

export function startGame() {
    const gameId = uuidv4();
    const emojis = ["🔥", "🔥", "😎", "😎", "😸", "😸", "🍔", "🍔", "🍟", "🍟", "🍪", "🍪", "❤️", "❤️", "🚀", "🚀"];
     emojis.sort(() => Math.random() - 0.5);
        const gameData = {
        gameId,
        board:emojis,
        openTiles: [],
        matchedPairs: [],
    };
    games[gameId] = gameData; // Save the new game state
    return gameData;
}

function makeMove(gameId, index) {
    let game = games[gameId];
    if (!game) {
        return { error: "Game not found" };
    }

    // Prevent flipping the same card twice or flipping already matched cards.
    if (game.matchedPairs.includes(index) || game.openTiles.includes(index)) {
        return { ...game, lastMoveMatched: false, moveAllowed: false };
    }

    game.openTiles.push(index);

    // Check if two tiles are selected
    if (game.openTiles.length === 2) {
        const [firstIndex, secondIndex] = game.openTiles;

        // Check if the selected tiles match
        if (game.board[firstIndex] === game.board[secondIndex]) {
            game.matchedPairs.push(firstIndex, secondIndex);
            game.openTiles = [];
            console.log(game.matchedPairs.length, "game.matchedPairs.length");
            console.log(game.board.length, "game.board.length");
            if (game.matchedPairs.length  === game.board.length) {
                return { ...game, lastMoveMatched: true, openTiles: [], isGameOver: true };
            }
        return { ...game, lastMoveMatched: true, openTiles: [] };
        } else {
            let tempopenTiles = [...game.openTiles]; 
            game.openTiles = [];
            // Return state with openTiles to show user, then clear
            return { ...game, lastMoveMatched: false, openTiles: tempopenTiles, resetNeeded: true };
        }
    }

    // Return the game state if only one tile is flipped or if no action is needed
    return { ...game, lastMoveMatched: false, moveAllowed: true };
}

   


module.exports = {startGame, makeMove, shuffleEmojis}