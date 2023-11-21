
function interpolacionDividida(x: number, x_vals: number[], y_vals: number[]): number {
    const n: number = x_vals.length;
    let f: number = 0.0;
    for (let i = 0; i < n; i++) {
        let prod: number = 1.0;
        for (let j = 0; j < n; j++) {
            if (j !== i && x_vals[i] !== x_vals[j]) {
                prod *= (x - x_vals[j]) / (x_vals[i] - x_vals[j]);
            }
        }
        f += y_vals[i] * prod;
    }
    return f;
}

export default function calcularResistencia(diametro_especifico: any, itemsX: any, itemsY: any) {
    return new Promise((resolve, reject) => {
        const diametros_antes: number[] = itemsX.map((subArray: any) => subArray[0]);/* [97.18, 96.85, 96.88, 96.88, 98.88, 99.77] */;
        const diametros_despues: number[] = itemsY.map((subArray: any) => subArray[0]);/* [91.87, 94.3, 96.96, 97.24, 93.96, 93.83] */;
        console.log(diametros_antes, diametros_despues);
        const altura_promedio: number = 202;
        const fuerza: number = 275000;
        const area1: number = 3.14 * 48.87;
        const area2: number = 3.14 * 47.34;
        const masa_inicial: number = 900;
        const masa_final: number = 899;


        const radio_giro: number = 94.686 / 4;
        const esbeltez: number = altura_promedio / radio_giro;
        /*  const diametro_especifico: number = 97.74; */

        const diametros: number[] = [...diametros_antes, ...diametros_despues];

        const resistencia_compresion: number = interpolacionDividida(diametro_especifico, diametros_antes, diametros_despues);

        console.log(`La resistencia a la compresión del cilindro de madera es: ${resistencia_compresion.toFixed(4)}`);


        resolve(resistencia_compresion.toFixed(4)); // Resuelve la promesa con los resultados

    });
}
