import './gameManager';

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const gameData = startGame();
            console.log(gameData, "gamedata");
            res.status(200).json(gameData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
