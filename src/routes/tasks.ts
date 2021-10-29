import express from 'express';
const {getAllTasks,
     getTaskById,
      updateTask,
       createTask,
        deleteTask,
        getTaskByCategoria,
        getTaskByTipo

} = require('../controllers/tasksController/tasks')

const router = express.Router();

//Buscar todos
//adicionar
router.route('/').get(getAllTasks).post(createTask);

//buscar por Id 
//exlcuindo e editando
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);

//buscar por categoria
router.route('/:categoria').get(getTaskByCategoria);

router.route('/:tipo').get(getTaskByTipo);


module.exports = router