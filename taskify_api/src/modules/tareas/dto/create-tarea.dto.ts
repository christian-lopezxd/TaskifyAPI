export class CreateTareaDto {
  titulo: string;
  descripcion?: string;
  usuarioId: number; // Relación con el usuario
}
