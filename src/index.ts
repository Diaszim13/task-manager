
import express, {Request, Response, Application} from 'express';
const bodyParser = require('body-parser')
const cors = require('cors')
const tasks = require('./routes/tasks');
const users = require('./routes/users');
const app:Application = express();

const PORT = process.env.PORT || 8001;
const corsOpts = {
    origin: 'http://localhost:4200', // client (todo mundo pode acessar)
optionsSuccessStatus: 200
}
const connection = require('./config/db.config');


//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOpts));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});
 

app.get("/", (req:Request, res:Response): void => {
    res.send("Hello typescrpt")
})


app.use('/tasks', tasks);
app.use('/users', users)


app.listen(PORT, (): void => {
    console.log(`Server running on: localhost:/${PORT}`)
})