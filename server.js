const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/data-endpoint', (req, res) => {
    const time = Date.now();
    const value = Math.random() * 100;
    res.json({time, value});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

