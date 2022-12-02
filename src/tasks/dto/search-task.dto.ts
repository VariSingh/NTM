import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class SearchTaskDto {
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
