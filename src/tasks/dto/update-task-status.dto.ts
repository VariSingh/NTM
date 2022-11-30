import { TaskStatus } from '../task-status.enum';
import { isEnum } from 'class-validator';
export class UpdateTaskStatusDto {
  // @isEnum(TaskStatus)
  status: TaskStatus;
}
