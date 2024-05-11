import './gameManager';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { gameId, index } = req.body;
        try {
            const game = makeMove(gameId, index);
            console.log(game, "game from MakeMove");
            res.status(200).json(game);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}