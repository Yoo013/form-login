// pages/api/users.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'Users list' });
    } else if (req.method === 'POST') {
        // Handle POST request
        const { name } = req.body;
        res.status(201).json({ message: `User ${name} created` });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
