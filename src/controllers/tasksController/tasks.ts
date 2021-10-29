let connTasks = require('../../config/db.config');

const stats = [
    {message: 'Cadastrado com sucesso', value: true},
    {message: 'deu erro', value: false}
]

const getAllTasks = (req?: any, res?: any) =>{
    connTasks.query("SELECT * FROM tasks ORDER BY id desc", (err: Error,result:Response, fields:any) => {
        if(err) throw err;
        
        res.send(result, fields);
    })
}

const getTaskById = (req?: any, res?: any) =>{
    const id = req.params.id;

    if(id) {
        connTasks.query("SELECT * FROM tasks WHERE id = ($1)", [id], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
            
            res.send({result, fields});

        })
    }
}

const getTasksByUser = (req?: any, res?: any) => {
    const id_usuario = req.params.id_usuario;
    if(id_usuario) {
        connTasks.query("SELECT * FROM tasks WHERE id_usuario = ($1)", [id_usuario], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
            
            res.send({result, fields});
        })
    }
}

const getTaskByCategoria = (req?: any, res?:any ) => {
    const categoria = req.params.categoria;
    if(categoria) {
        connTasks.query("SELECT * FROM tasks WHERE categoria = ($1)", [categoria], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
            
            res.send({result, fields});
        })
    }
}
const getTaskByTipo = (req?: any, res?:any ) => {
    const tipo = req.params.tipo;
    if(tipo) {
        connTasks.query("SELECT * FROM tasks WHERE tipo = ($1)", [tipo], (err: Error, result: Response, fields:any) => {
            if(err) throw err;
            
            res.send({result, fields});
        })
    }
}

const updateTask = (req?: any, res?: any) =>{
    const taskId = req.params.id;

    const {titulo, descricao, categoria} = req.body;
    connTasks.query("UPDATE tasks SET titulo = $1, descricao = $2, categoria = $3 WHERE id = $4",
     [titulo, descricao, categoria, taskId],
     (err:Error, result: Response, fields: any) => {
        if(err) throw err;

        res.send({result, fields});
    })
}

const deleteTask = (req?: any, res?: any) =>{
    const taskId = req.params.id;

    connTasks.query("DELETE from tasks WHERE id = $1", [taskId], (err: Error, result: any) => {
        if(err) throw err;

        res.send({result})
    })
}

const createTask = (req?: any, res?: any) =>{
    const {titulo, descricao, tipo, categoria, id_usuario} = req.body;
    console.log(titulo, descricao, tipo, categoria, id_usuario)
    connTasks.query("INSERT INTO tasks (titulo, descricao, tipo, categoria, id_usuario) values ($1,$2,$3,$4,$5)", [titulo, descricao, tipo, categoria, id_usuario], (err: Error, result:any) => {
        if(err) throw err;

        res.send({result}, stats[0]);
    });
}

module.exports = {getAllTasks,
    getTaskById, 
    updateTask, 
    createTask, 
    deleteTask,
    getTaskByCategoria,
    getTaskByTipo    
}