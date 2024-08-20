const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, req.file.path);
    const fileContent = fs.readFileSync(filePath);

    const response = await fetch('https://api.github.com/repos/Hariz-Harisun/Hariz-Harisun.github.io/contents/reports/report.pdf', {
        method: 'PUT',
        headers: {
            'Authorization': `token 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`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'New report uploaded',
            content: fileContent.toString('base64')
        })
    });

    if (response.ok) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
