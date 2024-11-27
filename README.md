# **API de Gestión de Rifas**

Esta API permite a los usuarios gestionar rifas, comprar boletos y consultar información relacionada.

## **Índice**

1. [Rutas de Rifas](#rutas-de-rifas)
2. [Rutas Detalladas](#rutas-detalladas)
   - [Obtener todas las rifas del usuario](#1-obtener-todas-las-rifas-del-usuario)
   - [Obtener una rifa específica](#2-obtener-una-rifa-específica)
   - [Crear una nueva rifa](#3-crear-una-nueva-rifa)
   - [Actualizar una rifa](#4-actualizar-una-rifa)
   - [Eliminar una rifa](#5-eliminar-una-rifa)
   - [Comprar un ticket](#6-comprar-un-ticket)
   - [Buscar rifas por código de usuario](#7-buscar-rifas-por-código-de-usuario)
3. [Errores comunes](#errores-comunes)

---

## **Rutas de Rifas**

| Método | Ruta                    | Descripción                         | Autenticación |
| ------ | ----------------------- | ----------------------------------- | ------------- |
| GET    | `/rifas/all`            | Obtiene todas las rifas del usuario | Sí            |
| GET    | `/rifas/:id`            | Obtiene una rifa específica por ID  | Sí            |
| POST   | `/rifas/new`            | Crea una nueva rifa                 | Sí            |
| PUT    | `/rifas/:id`            | Actualiza una rifa existente        | Sí            |
| DELETE | `/rifas/:id`            | Elimina una rifa                    | Sí            |
| POST   | `/rifas/buy/:id`        | Compra un ticket de una rifa        | Sí            |
| GET    | `/rifas/user/:codeUser` | Busca rifas por código de usuario   | No            |

---

## **Rutas Detalladas**

### **1. Obtener todas las rifas del usuario**

- **Método**: `GET`
- **Ruta**: `/rifas/all`
- **Descripción**: Devuelve todas las rifas asociadas al usuario autenticado.

```json
[
  {
    "_id": "64f3b2e8e1f15a0012a3bcb5",
    "name": "Rifa de Navidad",
    "description": "Premio: $500",
    "code": "abc12345",
    "tickets": [
      {
        "number": 1,
        "owner": "user@example.com",
        "dateBuy": "2024-11-20T10:00:00Z"
      }
    ]
  }
]
```

### **2. Obtener una rifa específica**

- **Método**: `GET`
- **Ruta**: `/rifas/:id`
- **Descripción**: Devuelve una rifa específica utilizando su ID.

```json
{
  "_id": "64f3b2e8e1f15a0012a3bcb5",
  "name": "Rifa de Navidad",
  "description": "Premio: $500",
  "code": "abc12345",
  "tickets": []
}
```

### **3. Crear una nueva rifa**

- **Método**: `POST`
- **Ruta**: `/rifas/new`
- **Descripción**: Crea una nueva rifa asociada al usuario autenticado.

- **BODY**

```json
{
  "name": "Rifa de Navidad",
  "description": "Premio: $500"
}
```

- **Respuesta**

```json
{
  "_id": "64f3b2e8e1f15a0012a3bcb5",
  "name": "Rifa de Navidad",
  "description": "Premio: $500",
  "code": "abc12345",
  "tickets": []
}
```

### **4. Actualizar una rifa**

- **Método**: `PUT`
- **Ruta**: `/rifas/:id`
- **Descripción**: Actualiza los datos de una rifa existente.

- **BODY**

```json
{
  "description": "Premio actualizado: $1000"
}
```

- **Respuesta**

```json
{
  "_id": "64f3b2e8e1f15a0012a3bcb5",
  "name": "Rifa de Navidad",
  "description": "Premio actualizado: $1000",
  "code": "abc12345",
  "tickets": []
}
```

### **5. Eliminar una rifa**

- **Método**: `DELETE`
- **Ruta**: `/rifas/:id`
- **Descripción**: Elimina una rifa específica.

```json
{
  "message": "Rifa eliminada con éxito"
}
```

### **6. Comprar un ticket**

- **Método**: `POST`
- **Ruta**: `/rifas/buy/:id`
- **Descripción**: Compra un ticket para una rifa específica.

- **BODY**

```json
{
  "number": 10
}
```

- **Respuesta**

```json
{
  "message": "Ticket comprado con éxito",
  "ticket": {
    "number": 10,
    "owner": "user@example.com",
    "dateBuy": "2024-11-20T10:00:00Z",
    "id": 1
  }
}
```

### **7. Buscar rifas por código de usuario**

- **Método**: `GET`
- **Ruta**: `/rifas/user/:codeUser?codeRifa=`
- **Descripción**: Obtiene todas las rifas asociadas al código de usuario proporcionado.

```json
{
  "name": "Rifa Navidad 2024",
  "description": "Rifa especial de navidad con grandes premios para nuestros clientes más fieles.",
  "price": 10.0,
  "initialDate": "2024-12-01T00:00:00.000Z",
  "finalDate": "2024-12-25T23:59:59.000Z",
  "paymentMethods": ["Tarjeta de Crédito", "PayPal", "Efectivo"],
  "quantityNumbers": 500,
  "code": "XYZ678",
  "tickets": [
    {
      "number": 1,
      "owner": "user1@example.com",
      "dateBuy": "2024-11-25T15:30:00.000Z",
      "id": 101
    },
    {
      "number": 2,
      "owner": "user2@example.com",
      "dateBuy": "2024-11-25T16:00:00.000Z",
      "id": 102
    }
  ]
}
```

## **Errores comunes**

| Código | Mensaje                 | Solución                                                 |
| ------ | ----------------------- | -------------------------------------------------------- |
| 404    | "Usuario no encontrado" | Asegúrate de que el ID del usuario es válido.            |
| 404    | "Rifa no encontrada"    | Verifica que el ID de la rifa sea correcto.              |
| 400    | "Ticket ya comprado"    | No intentes comprar el mismo número de ticket dos veces. |
| 500    | "Error en el servidor"  | Contacta al soporte técnico si el problema persiste.     |

---
