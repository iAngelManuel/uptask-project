import type { Request, Response } from 'express'
import Project from '../models/Project'

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body)

    project.manager = req.user.id

    try {
      await project.save()
      res.status(201).send('Proyecto creado correctamente')
    } catch (error) {
      res.status(400).send(error)
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [
          { manager: { $in: req.user.id } },
          { team: { $in: req.user.id } },
        ],
      })

      return res.json(projects)
    } catch (error) {
      res.status(400).send('Error al obtener los proyectos')
    }
  }

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id).populate('tasks')

      if (
        project.manager.toString() !== req.user.id &&
        !project.team.includes(req.user.id)
      ) {
        const error = new Error(
          'No tienes permisos para ver este proyecto',
        )
        return res.status(403).json({ error: error.message })
      }

      if (!project) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({ error: error.message })
      }

      return res.json(project)
    } catch (error) {
      res.status(400).send('Error al obtener el proyecto')
    }
  }

  static updateProject = async (req: Request, res: Response) => {
    try {
      req.project.clientName = req.body.clientName
      req.project.projectName = req.body.projectName
      req.project.description = req.body.description

      await req.project.save()
      return res.json('Proyecto actualizado correctamente')
    } catch (error) {
      res.status(400).send('Error al actualizar el proyecto')
    }
  }

  static deleteProject = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne()
      return res.json('Proyecto eliminado correctamente')
    } catch (error) {
      res.status(400).send('Error al eliminar el proyecto')
    }
  }
}
