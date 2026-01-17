const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Runtime config endpoint so the frontend can read environment-specific values
app.get('/config.json', function(request, response) {
  const config = {
    API_URL: process.env.API_URL || 'http://localhost:5000/v1/notes'
  };
  response.json(config);
});

app.get('/', function(request, response) {
  // Inject runtime config into index.html by inlining small script before sending
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const fs = require('fs');
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) return response.sendFile(indexPath); // fallback
    const config = { API_URL: process.env.API_URL || 'http://localhost:5000/v1/notes' };
    const injected = data.replace('</head>', `  <script>window.__RUNTIME_CONFIG__ = ${JSON.stringify(config)}</script>\n</head>`);
    response.send(injected);
  });
});

// Serve static assets (after routes) so asset requests still get served from /dist
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));