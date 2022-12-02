import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title: string;

  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
