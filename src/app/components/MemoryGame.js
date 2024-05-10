import { useState, useEffect } from 'react';
import styles from './MemoryGame.module.css';

export default function MemoryGame() {
    const emojis = ["🔥", "🔥", "😎", "😎", "😸", "😸", "🍔", "🍔", "🍟", "🍟", "🍪", "🍪", "❤️", "❤️", "🚀", "🚀"];
    const [shuffledEmojis, setShuffledEmojis] = useState([]);
    const [openTiles, setOpenTiles] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const shuffled = emojis.sort(() => Math.random() - 0.5);
        setShuffledEmojis([...shuffled]);
        setOpenTiles([]);
        setMatchedPairs([]);
        setIsProcessing(false); 
    };

    const handleTileClick = index => {
        if (openTiles.includes(index) || matchedPairs.includes(index) || isProcessing) {
            return; 
        }

        const newOpenTiles = [...openTiles, index];
        setOpenTiles(newOpenTiles); // Always update open tiles first

        if (newOpenTiles.length === 2) {
            setIsProcessing(true);
            // Check for match
            const [firstIdx, secondIdx] = newOpenTiles;
            if (shuffledEmojis[firstIdx] === shuffledEmojis[secondIdx]) {
                const newMatches = [...matchedPairs, firstIdx, secondIdx];
                setMatchedPairs(newMatches); // Update matched pairs
                if (newMatches.length === emojis.length) {
                    setTimeout(() => alert('Congratulations! You have matched all pairs!'), 500);
                }
                setOpenTiles([]);
                setIsProcessing(false); // Clear tiles
            } else {
                // No match, reset open tiles after a delay
                setTimeout(() => {
                    setOpenTiles([]);
                    setIsProcessing(false);

                }, 1000);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.h2Text}>Memory Game</h2>
            <div className={styles.game}>
                {shuffledEmojis.map((emoji, index) => (
                    <div
                        key={index}
                        className={`${styles.item} 
                                    ${openTiles.includes(index) ? styles.boxOpen : ''}
                                    ${matchedPairs.includes(index) ? styles.boxMatch : ''}`}
                        onClick={() => handleTileClick(index)}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
            <button className={styles.reset} onClick={resetGame}>Reset Game</button>
        </div>
    );
}
