// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("REFUGIO_DB");

// Funcion para registrar un log en la colección log_refugio
function registrarLog(accion, detalle, estado = "OK") {
    db.log_refugio.insertOne({
        fecha_log: new Date(),           
        accion: accion,                  
        detalle: detalle,                
        usuario_ejecuta: "admin", 
        estado: estado                
    });
}

// Funcion para registrar una adopcion
function registrarAdopcion(id_mascota, id_adoptador) {

    const mascota = db.mascotas.findOne({ id_mascota });

    if (!mascota) {
        print("Mascota no existe.");
        registrarLog("registrar_adopcion", `Mascota ID ${id_mascota} no existe`, "ERROR");
        return;
    }

    const yaAdoptada = db.adopciones.findOne({ id_mascota });

    if (yaAdoptada) {
        print("Error: La mascota ya fue adoptada.");
        registrarLog("registrar_adopcion", `Intento fallido de adopcion para mascota ID ${id_mascota}`, "ERROR");
        return;
    }

    db.adopciones.insertOne({
        id_adopcion: db.adopciones.countDocuments() + 301,
        id_mascota,
        id_adoptador,
        fecha: new Date()
    });

    db.mascotas.updateOne(
        { id_mascota },
        { $set: { estado: "ADOPTADA" } }
    );

    print("Adopcion registrada correctamente.");
    registrarLog("registrar_adopcion", `Nueva adopcion registrada para mascota ID ${id_mascota}`);
}

// Funcion para mostrar todas las adopciones
function mostrarAdopciones() {
    print("--- LISTADO DE ADOPCIONES ---");

    const resultados = db.adopciones.aggregate([
        {
            $lookup: {
                from: "mascotas",
                localField: "id_mascota",
                foreignField: "id_mascota",
                as: "mascota"
            }
        },
        { $unwind: "$mascota" },
        {
            $lookup: {
                from: "adoptantes",
                localField: "id_adoptador",
                foreignField: "id_adoptador",
                as: "adoptante"
            }
        },
        { $unwind: "$adoptante" },
        { $sort: { fecha: 1 } }
    ]);

    resultados.forEach(rec => {
        print(`ID: ${rec.id_adopcion} | Mascota: ${rec.mascota.nombre} | Adoptante: ${rec.adoptante.nombre} | Fecha: ${rec.fecha.toISOString().split("T")[0]}`);
    });

    registrarLog("mostrar_adopciones", "Consulta de listado completa");
}

// Funcion para mostrar adopciones filtradas por adoptante
function mostrarAdopcionesFiltrado(id_adoptador) {
    const cantidad = db.adopciones.countDocuments({ id_adoptador });

    if (cantidad === 0) {
        print(`El adoptante con ID ${id_adoptador} no tiene adopciones registradas.`);
        registrarLog("mostrar_adopciones_filtrado", `Sin resultados para adoptante ${id_adoptador}`);
        return;
    }

    print(`--- ADOPCIONES DEL ADOPTANTE ${id_adoptador} ---`);

    const resultados = db.adopciones.aggregate([
        { $match: { id_adoptador } },
        {
            $lookup: {
                from: "mascotas",
                localField: "id_mascota",
                foreignField: "id_mascota",
                as: "mascota"
            }
        },
        { $unwind: "$mascota" },
        { $sort: { fecha: 1 } }
    ]);

    resultados.forEach(rec => {
        print(`ID Adopción: ${rec.id_adopcion} | Mascota: ${rec.mascota.nombre} | Fecha: ${rec.fecha.toISOString().split("T")[0]}`);
    });

    registrarLog("mostrar_adopciones_filtrado", `Consulta exitosa para adoptante ${id_adoptador}`);
}

// Funcion que retorna el total de mascotas adoptadas
function totalMascotasAdoptadas() {
    const total = db.mascotas.countDocuments({ estado: "ADOPTADA" });

    registrarLog("total_mascotas_adoptadas", "Consulta realizada correctamente");
    print(`Total adoptadas: ${total}`);
    return total;
}

// Funcion que retorna adopciones con mascota, adoptante y fecha
function mostrarAdopcionesDesdeMascotas() {
    const resultado = db.mascotas.aggregate([
        { $match: { estado: "ADOPTADA" } },
        {
            $lookup: {
                from: "adopciones",
                localField: "id_mascota",
                foreignField: "id_mascota",
                as: "adopcion"
            }
        },
        { $unwind: "$adopcion" },
        {
            $lookup: {
                from: "adoptantes",
                localField: "adopcion.id_adoptador",
                foreignField: "id_adoptador",
                as: "adoptante"
            }
        },
        { $unwind: "$adoptante" },
        { $sort: { "adopcion.fecha": 1 } }
    ]).toArray();

    if (resultado.length === 0) {
        print("No hay adopciones registradas.");
        return;
    }

    print("=== LISTADO DE ADOPCIONES (desde coleccion mascotas) ===");

    resultado.forEach(doc => {
        print(
            "Mascota: " + doc.nombre +
            " | Adoptante: " + doc.adoptante.nombre +
            " | Fecha: " + doc.adopcion.fecha.toISOString().split("T")[0]
        );
    });

    registrarLog("mostrar_adopciones_mascotas", "Consulta de adopciones desde mascotas realizada");
}

// Funcion para eliminar una adopcion por ID de mascota
function eliminarAdopcion(id_mascota) {
    const adopcion = db.adopciones.findOne({ id_mascota });

    if (!adopcion) {
        print(`No existe adopcion registrada para la mascota ID ${id_mascota}.`);
        registrarLog("eliminar_adopcion", `No se encontro adopcion para mascota ID ${id_mascota}`, "ERROR");
        return;
    }

    db.adopciones.deleteOne({ id_mascota });

    db.mascotas.updateOne(
        { id_mascota },
        { $set: { estado: "DISPONIBLE" } }
    );

    print(`Adopcion de la mascota ID ${id_mascota} eliminada y estado restaurado a DISPONIBLE.`);
    registrarLog("eliminar_adopcion", `Adopción eliminada y estado restaurado para mascota ID ${id_mascota}`);
}



// Ejecutar funciones de prueba
// registrarAdopcion(12, 401);
// mostrarAdopciones();
// mostrarAdopcionesFiltrado(401);
// totalMascotasAdoptadas();
// mostrarAdopcionesDesdeMascotas();
// eliminarAdopcion(12);
