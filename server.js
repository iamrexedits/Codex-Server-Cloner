const express = require('express');
const path = require('path');

const app = express();
const PORT = 3101;

// Serve static files (like CSS, JS, or images) from the 'web' folder
app.use(express.static(path.join(__dirname, 'web')));
// API endpoint to serve webconfig.json
app.get('/config', (req, res) => {
    const configPath = path.join(__dirname, 'web', 'webconfig.json');
    fs.readFile(configPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading webconfig.json:', err);
            return res.status(500).json({ error: 'Failed to load configuration' });
        }
        res.json(JSON.parse(data));
    });
});
// Routes for each page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'services.html'));
});

app.get('/bots', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'bots.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'contact.html'));
});

// Handle 404 errors (page not found)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'web', 'index.html')); // Fallback to index.html or create a custom 404 page
});

// Export the server start function
module.exports = function startServer() {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};