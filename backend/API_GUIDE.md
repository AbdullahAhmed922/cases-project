# Backend API Guide for User Management

This guide provides the backend API endpoints needed for the frontend user management system.

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. Get All Users
```http
GET /api/users
```

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "createdAt": "2025-01-14T10:00:00Z",
      "updatedAt": "2025-01-14T10:00:00Z"
    }
  ],
  "message": "Users retrieved successfully",
  "statusCode": 200
}
```

### 2. Get User by ID
```http
GET /api/users/:id
```

**Response:**
```json
{
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "createdAt": "2025-01-14T10:00:00Z",
    "updatedAt": "2025-01-14T10:00:00Z"
  },
  "message": "User retrieved successfully",
  "statusCode": 200
}
```

### 3. Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+0987654321"
}
```

**Response:**
```json
{
  "data": {
    "id": "2",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+0987654321",
    "createdAt": "2025-01-14T10:05:00Z",
    "updatedAt": "2025-01-14T10:05:00Z"
  },
  "message": "User created successfully",
  "statusCode": 201
}
```

### 4. Update User
```http
PATCH /api/users/:id
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

**Response:**
```json
{
  "data": {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+0987654321",
    "createdAt": "2025-01-14T10:05:00Z",
    "updatedAt": "2025-01-14T10:10:00Z"
  },
  "message": "User updated successfully",
  "statusCode": 200
}
```

### 5. Delete User
```http
DELETE /api/users/:id
```

**Response:**
```json
{
  "message": "User deleted successfully",
  "statusCode": 200
}
```

## NestJS Implementation Example

Here's an example of how to implement these endpoints in NestJS:

### Users Controller

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
```

### DTOs

**create-user.dto.ts:**
```typescript
export class CreateUserDto {
  name: string;
  email: string;
  phone?: string;
}
```

**update-user.dto.ts:**
```typescript
export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
}
```

### Users Service

```typescript
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto) {
    const user = {
      id: this.idCounter.toString(),
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    this.idCounter++;
    return { data: user };
  }

  findAll() {
    return { data: this.users };
  }

  findOne(id: string) {
    const user = this.users.find(u => u.id === id);
    return { data: user };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
      user.updatedAt = new Date();
    }
    return { data: user };
  }

  remove(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
    return { message: 'User deleted successfully' };
  }
}
```

## CORS Configuration

Make sure to enable CORS in your NestJS backend:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3001', // Frontend URL
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
```

## Error Handling

The API should return appropriate HTTP status codes:
- 200 OK - Successful GET, PATCH, DELETE
- 201 Created - Successful POST
- 400 Bad Request - Invalid input
- 404 Not Found - User not found
- 500 Internal Server Error - Server error

## Testing Endpoints

You can test the API using curl or Postman:

```bash
# Get all users
curl http://localhost:3000/api/users

# Get specific user
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Update user
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1
```
