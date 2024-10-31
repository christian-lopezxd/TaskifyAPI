export class CreateTaskDto {
  title: string;
  description?: string;
  userId: number; // Relación con el usuario
}
