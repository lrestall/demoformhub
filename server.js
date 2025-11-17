const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from the root directory

// API endpoint to handle form submissions
app.post('/api/submit-form', async (req, res) => {
    try {
        console.log('Form submission received:', req.body);
        
        // Determine the target endpoint based on lp_campaign_id
        const isDebtLoanLead = req.body.lp_campaign_id === '19';
        const targetUrl = isDebtLoanLead 
            ? 'https://learn.leadspediatrack.com/post.do'  // Endpoint for debt/loan leads
            : 'https://leads.leadspediatrack.com/post.do'; // Default endpoint for other leads
        
        console.log(`Forwarding to: ${targetUrl} (${isDebtLoanLead ? 'Debt/Loan Lead' : 'Standard Lead'})`);
        
        // Forward to the appropriate endpoint
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(req.body).toString()
        });
        
        const responseData = await response.text();
        console.log('API Response:', responseData);
        
        // You can modify the response as needed before sending it back to the client
        res.json({
            success: true,
            message: 'Form submitted successfully',
            data: responseData,
            targetEndpoint: targetUrl
        });
        
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing form submission',
            error: error.message
        });
    }
});

// Serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
