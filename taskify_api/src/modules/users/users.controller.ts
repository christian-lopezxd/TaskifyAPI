import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users') // Etiqueta para la agrupación de endpoints en Swagger
@Controller('users') // Define la ruta base para el controlador
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inyección de dependencia del servicio UsersService

  /**
   * Crea un nuevo usuario
   * @param createUserDto - Datos para crear un nuevo usuario
   */
  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 409, description: 'Email is already registered.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Obtiene todos los usuarios
   * @returns Lista de todos los usuarios
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all users.' })
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su ID
   * @param id - ID del usuario
   * @returns Datos del usuario encontrado o error si no existe
   */
  @Get(':id')
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  /**
   * Actualiza un usuario existente por su ID
   * @param id - ID del usuario
   * @param updateUserDto - Datos a actualizar
   * @returns Usuario actualizado o error si no existe
   */
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 409, description: 'Email is already in use by another user.' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Elimina un usuario por su ID
   * @param id - ID del usuario
   */
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
