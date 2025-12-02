use("REFUGIO_DB");

// 1. Poblar mascotas
db.mascotas.insertMany([
    { id_mascota: 1, nombre: "Luna", especie: "Perro", edad: 3, estado: "ADOPTADA" },
    { id_mascota: 2, nombre: "Milo", especie: "Gato", edad: 2, estado: "ADOPTADA" },
    { id_mascota: 3, nombre: "Rocky", especie: "Perro", edad: 5, estado: "DISPONIBLE" },
    { id_mascota: 4, nombre: "Nala", especie: "Gato", edad: 1, estado: "ADOPTADA" },
    { id_mascota: 5, nombre: "Coco", especie: "Conejo", edad: 4, estado: "RESCATADA" },
    { id_mascota: 6, nombre: "Toby", especie: "Perro", edad: 6, estado: "ADOPTADA" },
    { id_mascota: 7, nombre: "Simba", especie: "Gato", edad: 3, estado: "ADOPTADA" },
    { id_mascota: 8, nombre: "Lola", especie: "Conejo", edad: 2, estado: "RESCATADA" },
    { id_mascota: 9, nombre: "Max", especie: "Perro", edad: 7, estado: "DISPONIBLE" },
    { id_mascota: 10, nombre: "Mimi", especie: "Gato", edad: 4, estado: "RESCATADA" }
]);

// 2. Poblar recates
db.rescates.insertMany([
    {
        id_rescate: 101,
        id_mascota: 5,
        fecha: new Date("2023-09-10"),
        lugar: "Zona rural",
        descripcion: "Conejo atrapado"
    },
    {
        id_rescate: 102,
        id_mascota: 8,
        fecha: new Date("2023-12-01"),
        lugar: "Zona escolar",
        descripcion: "Conejo encontrado"
    },
    {
        id_rescate: 103,
        id_mascota: 10,
        fecha: new Date("2024-02-10"),
        lugar: "Colonia sur",
        descripcion: "Gata embarazada"
    }
]);

// 3. Poblar adoptantes
db.adoptantes.insertMany([
    {
        id_adoptador: 201,
        nombre: "Maria Lopez",
        direccion: "Calle 123, Ciudad Jardin",
        email: "maria.lopez@email.com"
    },
    {
        id_adoptador: 202,
        nombre: "Carlos Perez",
        direccion: "Av. Siempre Viva 742",
        email: "carlos.perez@email.com"
    },
    {
        id_adoptador: 203,
        nombre: "Laura Gomez",
        direccion: "Calle Luna 45, Solar Norte",
        email: "laura.gomez@email.com"
    },
    {
        id_adoptador: 204,
        nombre: "Pedro Sanchez",
        direccion: "Camino Real 89",
        email: "pedro.sanchez@email.com"
    },
    {
        id_adoptador: 205,
        nombre: "Ana Torres",
        direccion: "Boulevard Estrella 56",
        email: "ana.torres@email.com"
    }
]);

// 4. Poblar adopciones
db.adopciones.insertMany([
    {
        id_adopcion: 301,
        id_mascota: 1,
        id_adoptador: 201,
        fecha: new Date("2023-06-01")
    },
    {
        id_adopcion: 302,
        id_mascota: 2,
        id_adoptador: 202,
        fecha: new Date("2023-07-20")
    },
    {
        id_adopcion: 303,
        id_mascota: 4,
        id_adoptador: 203,
        fecha: new Date("2023-09-01")
    },
    {
        id_adopcion: 304,
        id_mascota: 6,
        id_adoptador: 204,
        fecha: new Date("2023-11-20")
    },
    {
        id_adopcion: 305,
        id_mascota: 7,
        id_adoptador: 205,
        fecha: new Date("2023-12-10")
    }
]);

// 5. Poblar logs iniciales
db.log_refugio.insertOne({
    fecha_log: new Date(),
    accion: "poblacion_inicial",
    detalle: "Datos cargados correctamente en todas las colecciones",
    usuario_ejecuta: "admin_init",
    estado: "OK"
});

// Creacion de colecciones
// use("REFUGIO_DB");
// db.createCollection("mascotas");
// db.createCollection("rescates");
// db.createCollection("adoptantes");
// db.createCollection("adopciones");
// db.createCollection("log_refugio");

// Limpiar DB
// db.mascotas.drop();
// db.rescates.drop();
// db.adoptantes.drop();
// db.adopciones.drop();
// db.log_refugio.drop();
