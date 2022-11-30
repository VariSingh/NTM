import {
  Body,
  Controller,
  Delete,
  Query,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filtertDto: GetTasksFilterDto): Task[] {
  //   // if we have any filters defined, call taskService.getTasksWithFilters
  //   // otherwise, just get all tasks
  //   if (Object.keys(filtertDto).length) {
  //     return this.tasksService.getTasksWithFilters(filtertDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status') updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.deleteTaskById(id);
  // }
}
