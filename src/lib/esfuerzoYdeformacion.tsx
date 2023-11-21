

export function calcularEsfuerzoYDeformacion(peso: any) {
    return new Promise((resolve, reject) => {
        const areaTransversal = 0.01; // Área transversal en metros cuadrados
        const longitudOriginal = 1.0; // Longitud original en metros
        const YoungModulus = 200; // Modulo de Young - ajusta según el material

        // Leer el valor del sensor (simulado como un número aleatorio entre 0 y 1023)
        const lecturaCarga = peso; // Simulación de lectura analógica

        // Convertir la lectura analógica a una carga en Newtons
        const cargaEnN = map(lecturaCarga, 0, 1023, 0, 1000); // Rango de 0 a 1000 Newtons

        // Cálculo del esfuerzo axial y la deformación axial
        const esfuerzoAxial = cargaEnN / areaTransversal;
        const deformacionAxial = (cargaEnN * longitudOriginal) / (areaTransversal * YoungModulus); // Ajusta YoungModulus según el material

        // Devolver los resultados como un objeto
        const resultados = { esfuerzoAxial: esfuerzoAxial, deformacionAxial: deformacionAxial };


        resolve(resultados); // Resuelve la promesa con los resultados

    });
}

function map(valor: any, inicioRango1: any, finRango1: any, inicioRango2: any, finRango2: any) {
    return inicioRango2 + ((valor - inicioRango1) * (finRango2 - inicioRango2)) / (finRango1 - inicioRango1);
}


