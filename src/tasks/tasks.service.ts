import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  createTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
    const { title, description } = createTaskDto;
    const task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepo.save(task);
    return task;
  };

  getTasks = async (searchTaskDto: SearchTaskDto): Promise<Task[]> => {
    const { search } = searchTaskDto;
    const query = this.taskRepo.createQueryBuilder('Task');
    if (search) {
      const tasks = await query
        .where(
          `LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)`,
          {
            search: `%${search}%`,
          },
        )
        .getMany();
      return tasks;
    }
    const tasks = await query.getMany();
    return tasks;
  };

  getTaskById = async (id: string): Promise<Task> => {
    const found = await this.taskRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return found;
  };

  updateTaskStatus = async (id: string, status: TaskStatus): Promise<Task> => {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepo.save(task);
    return task;
  };

  deleteTask = async (id: string): Promise<void> => {
    const result = await this.taskRepo.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
  };
}
