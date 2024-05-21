import { Router } from 'express'
import { body, param } from 'express-validator'
import { ProjectController } from '../controllers/ProjectController'
import { TaskController } from '../controllers/TaskController'
import validateProjectExists from '../middleware/project'
import handleInputErrors from '../middleware/validation'

const router: Router = Router()

router.post(
  '/',

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del cliente es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('La descripción del proyecto es requerido'),

  handleInputErrors,

  ProjectController.createProject,
)

router.get('/', ProjectController.getAllProjects)

router.get(
  '/:id',

  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  handleInputErrors,

  ProjectController.getProjectById,
)

router.put(
  '/:id',

  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('El nombre del cliente es requerido'),

  body('projectName')
    .notEmpty()
    .withMessage('La descripción del proyecto es requerido'),

  handleInputErrors,

  ProjectController.updateProject,
)

router.delete(
  '/:id',

  param('id')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  ProjectController.deleteProject,
)

// ROUTES FOR TASKS

router.param('projectId', validateProjectExists)
router.post(
  '/:projectId/tasks',

  body('name')
    .notEmpty()
    .withMessage('El nombre de la tarea es requerido'),

  body('description')
    .notEmpty()
    .withMessage('La descripción de la tarea es requerido'),

  handleInputErrors,

  TaskController.createTask,
)

router.get(
  '/:projectId/tasks',

  TaskController.getProjectTasks,
)

router.get(
  '/:projectId/tasks/:taskId',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  TaskController.getTasksById,
)

router.put(
  '/:projectId/tasks/:taskId',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  body('name')
    .notEmpty()
    .withMessage('El nombre de la tarea es requerido'),

  body('description')
    .notEmpty()
    .withMessage('La descripción de la tarea es requerido'),

  TaskController.updateTask,
)

router.delete(
  '/:projectId/tasks/:taskId',

  param('taskId')
    .notEmpty()
    .withMessage('El ID del proyecto es requerido')
    .isMongoId()
    .withMessage('El ID del proyecto no es válido'),

  TaskController.deleteTask,
)

export default router
