# Documentación de la API

## Swagger UI

La API cuenta con documentación interactiva a través de Swagger UI. Puedes acceder a ella en:

```
http://localhost:3000/api
```

## Endpoints Disponibles

### Rooms (Planning Poker)

#### `POST /rooms`
Crear una nueva sala de Planning Poker.

**Body:**
```json
{
  "name": "Sala de Planning Poker",
  "username": "Juan Pérez",
  "userId": 123
}
```

#### `POST /rooms/join`
Unirse a una sala existente.

**Body:**
```json
{
  "roomId": "room-123",
  "username": "María García", 
  "userId": 456,
  "nanoId": "abc123def456"
}
```

#### `POST /rooms/vote`
Emitir un voto en una sala.

**Body:**
```json
{
  "roomId": "room-123",
  "userId": 123,
  "vote": "5"
}
```

#### `POST /rooms/:id/reset`
Reiniciar los votos de una sala.

#### `POST /rooms/:id/reveal`
Revelar los votos de una sala.

#### `GET /rooms/:id`
Obtener información de una sala.

#### `DELETE /rooms/:roomId/users/:userId`
Eliminar un usuario de una sala.

#### `DELETE /rooms/:id`
Eliminar una sala.

### Diff (Salas Colaborativas)

#### `POST /diff/join`
Crear o unirse a una sala de Diff.

**Body:**
```json
{
  "roomId": "room-123",
  "nanoId": "abc123def456", 
  "name": "Mi Sala Diff",
  "username": "Juan Pérez",
  "userId": 123
}
```

#### `POST /diff/text`
Establecer el texto de la sala Diff.

**Body:**
```json
{
  "roomId": "room-123",
  "nanoId": "abc123def456",
  "text": "Este es el texto de ejemplo para la sala diff"
}
```

#### `GET /diff/:id`
Obtener información de una sala Diff.

**Parámetros:**
- `id` (path): ID de la sala

#### `DELETE /diff/:roomId/users/:userId`
Eliminar un usuario de una sala Diff.

**Parámetros:**
- `roomId` (path): ID de la sala
- `userId` (path): ID del usuario

#### `DELETE /diff/:id`
Eliminar una sala Diff.

**Parámetros:**
- `id` (path): ID de la sala

## Modelos de Datos

### RoomResponse
```json
{
  "id": "room-123",
  "name": "Sala de Planning Poker",
  "users": [
    {
      "id": 123,
      "username": "Juan Pérez",
      "hasVoted": false,
      "vote": null
    }
  ],
  "votes": [],
  "revealed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### DiffRoomResponse
```json
{
  "roomId": "room-123",
  "nanoId": "abc123def456",
  "name": "Mi Sala Diff",
  "users": [
    {
      "id": 123,
      "username": "Juan Pérez",
      "nanoId": "abc123def456"
    }
  ],
  "text": "Este es el texto de ejemplo para la sala diff",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Valores de Voto

Los valores permitidos para votar son:
- `0`, `1`, `2`, `3`, `5`, `8`, `13`, `20`, `40`, `100`
- `?` (para indicar que no se está seguro)
- `☕` (para indicar que se necesita un descanso)

## Errores Comunes

- **400 Bad Request**: Datos inválidos en el cuerpo de la petición
- **404 Not Found**: Sala o usuario no encontrado

## WebSocket

La API también utiliza WebSockets para comunicación en tiempo real. Los eventos se manejan automáticamente cuando los usuarios se unen a las salas o emiten votos.

### Eventos Diff (Namespace: /diff)

#### Cliente → Servidor

**`joinDiffRoom`**
```json
{
  "roomId": "room-123",
  "nanoId": "abc123def456",
  "name": "Mi Sala Diff",
  "username": "Juan Pérez",
  "userId": 123
}
```

**`setText`**
```json
{
  "roomId": "room-123",
  "nanoId": "abc123def456",
  "text": "Nuevo texto de la sala"
}
```

**`removeUser`**
```json
{
  "roomId": "room-123",
  "userId": 123
}
```

**`removeRoom`**
```json
{
  "roomId": "room-123"
}
```

#### Servidor → Cliente

**`diffRoom`** - Estado completo de la sala
**`diffUsers`** - Lista de usuarios actualizada
**`textUpdated`** - Texto actualizado
**`userRemoved`** - Usuario eliminado de la sala
**`roomDeleted`** - Sala eliminada
**`userRemovedSuccess`** - Confirmación de eliminación de usuario
**`roomRemovedSuccess`** - Confirmación de eliminación de sala
**`error`** - Mensajes de error
