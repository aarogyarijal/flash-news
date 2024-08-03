const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { exec} = require('child_process');
const app = express();
const port = 5000; // You can change this port if needed

app.use(cors());

// Schedule the script to run every 5 minutes
cron.schedule('*/1 * * * *', () => {
    console.log('Running the scraper script...');
    exec('python ./NewsScraper/newsscraper.py ./NewsScraper/NewsPapers.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});

// Serve static files from the NewsScraper directory
app.get('/search', function (req, res) {
    const filePath = path.join(__dirname, 'scraped_articles.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
