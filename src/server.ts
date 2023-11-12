import fs from 'fs';
import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const htmltemplate = fs.readFileSync(path.resolve(__dirname, '../htmltemplate.html'), 'utf8');

    res.send(htmltemplate);
});

app.use(express.static('public'));
// app.use('/images', express.static('images'));
// app.use('/fonts', express.static('fonts'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
