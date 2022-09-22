const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ extented: false }));
app.use(cors());

// ROUTES
app.use(express.static(__dirname));
app.use('', require('./routes/page_router'));
app.use('/api/url', require('./routes/url_router'))

const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));