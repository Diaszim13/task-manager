const connUsers = require('../../config/db.config');
const bcrypt = require('bcrypt');

const rounds = 10;
const PlainPassword = 's0/\/\P4$$w0rD';

const getAllUsers = (req?: any, res?: any) =>{
    connUsers.query("SELECT * FROM Users ORDER BY id desc", (err: Error,result:Response, fields:any) => {
        if(err) throw err;
        
        res.send(result, fields);
    })
}

const getUserById = (req?: any, res?: any) =>{
    const id = req.params.id;

    if(id) {
        connUsers.query("SELECT * FROM Users WHERE id = ($1)", [id], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
            
            res.send({result, fields});

        })
    }
}

const getUsersByUser = (req?: any, res?: any) => {
    const id_usuario = req.params.id_usuario;
    if(id_usuario) {
        connUsers.query("SELECT * FROM Users WHERE id_usuario = ($1)", [id_usuario], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
   
        })
    }
}


const getUserByTipo = (req?: any, res?:any ) => {
    const tipo = req.params.tipo;
    if(tipo) {
        connUsers.query("SELECT * FROM Users WHERE tipo = ($1)", [tipo], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
            
            res.send({result, fields});
        })
    }
}

const updateUser = (req?: any, res?: any) =>{
    const UserId = req.params.id;

    const {nome, email, senha, tipo} = req.body;
    connUsers.query("UPDATE Users SET nome = $1, email = $2, senha = $3, tipo = $5 WHERE id = $5",
     [nome, email, senha, tipo, UserId],
     (err:Error, result: Response, fields: any) => {
        if(err) throw err;

        res.send({result, fields});
    })
}

const deleteUser = (req?: any, res?: any) =>{
    const UserId = req.params.id;

    connUsers.query("DELETE from Users WHERE id = $1", [UserId], (err: Error, result: any) => {
        if(err) throw err;

        res.send({result})
    })
}

const createUser = (req?: any, res?: any) =>{
    const {nome, email, senha, tipo} = req.body;
    const salt = bcrypt.genSaltSync(rounds);
    const cryptedPassowrd = bcrypt.hashSync(senha, salt);
    console.log(nome, email, cryptedPassowrd, tipo)
    connUsers.query("INSERT INTO Users (nome, email, senha, tipo) values ($1,$2,$3,$4)", [nome, email, cryptedPassowrd, tipo], (err: Error, result:any) => {
        if(err) throw err;

        res.send({result});
    });
}

const login = (req?: any, res?: any) => {
    const {email, senha} = req.body;

    connUsers.query("SELECT (email, senha, tipo) from Users where email = ($1) ", [email],
     (err: Error, result:any) => {
        if(err) throw err;
        // const passValidator = bcrypt.compare(senha, )
                 
        res.send({message: 'Logado com sucesso!', body: {
            user: {email, senha}
        }});
    })
}

module.exports = {getAllUsers,
    getUserById, 
    updateUser, 
    createUser, 
    deleteUser,
    getUserByTipo,
    login  
}