const express = require('express');
const app = express();
const swagger = require('./swagger');


swagger(app);

app.listen(3000, () => console.log('Server started on port 3000'));
