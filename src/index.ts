
import express, {Request, Response, Application} from 'express';
const bodyParser = require('body-parser')
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const app:Application = express();

const PORT = process.env.PORT || 8001;

const connection = require('./config/db.config');


//middleware
app.use(express.json());
app.use(bodyParser.json());


app.get("/", (req:Request, res:Response): void => {
    res.send("Hello typescrpt")
})


app.use('/tasks', tasks);
app.use('/users', users)


app.listen(PORT, (): void => {
    console.log(`Server running on: localhost:/${PORT}`)
})