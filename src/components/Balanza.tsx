'use client'
import calcularResistencia from '@/lib/interpolacion';
// components/Balanza.tsx
import { useEffect, useRef, useState } from 'react';
import { useDynamicList } from "@/DynamicListContext";
import { calcularEsfuerzoYDeformacion } from '@/lib/esfuerzoYdeformacion';

const Balanza = () => {
    const { itemsX, itemsY, resistencia, setResistencia }: any = useDynamicList();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pesoObjeto, setPesoObjeto] = useState<number>(0);
    const [material, setMaterial] = useState<any>({
        deformacionAxial: 0,
        esfuerzoAxial: 0
    });


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // cargamos el fondo            
        const fondo = new Image();
        fondo.src = '/utils/construccion.jpg';
        fondo.onload = () => {
            // Dibujar el fondo primero
            ctx.drawImage(fondo, 0, 0, 800, 300); // Posición y tamaño del fondo

            // Resto del código
            const drawImages = () => {
                // Limpiar el canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(fondo, 0, 0, 800, 300); // Posición y tamaño del fondo
                // Cargar imágenes de la balanza y del mineral       
                const mineralImg = new Image();
                mineralImg.src = '/utils/pesa.png'; // Reemplaza con la ruta correcta
                const balanzaImg = new Image();
                balanzaImg.src = '/utils/balanza.png'; // Reemplaza con la ruta correcta

                // Variables para el arrastre
                let isDragging = false;
                let offsetX = 0;
                let offsetY = 0;

                // Esperar a que las imágenes se carguen antes de dibujarlas
                Promise.all([balanzaImg, mineralImg].map((img) => new Promise((resolve) => img.onload = resolve)))
                    .then(() => {

                        // Configuraciones de estilo para el texto
                        ctx.font = '16px Monospace';
                        ctx.fillStyle = 'black';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.shadowColor = 'blue '



                        // Dibujar el mineral primero si hay peso
                        if (pesoObjeto > 0) {
                            const aspectRatio = mineralImg.width / mineralImg.height;
                            const mineralAltura = pesoObjeto <= 10 ? pesoObjeto * 3.5 : pesoObjeto * 2; // Ejemplo: 1kg = 10px de altura
                            const mineralAnchura = mineralAltura * aspectRatio;
                            ctx.drawImage(mineralImg, 170 - mineralAnchura / 2, 280 - mineralAltura, mineralAnchura, mineralAltura); // Posición y tamaño del mineral

                            canvas.addEventListener('mousedown', (e) => {
                                const mouseX = e.clientX - canvas.getBoundingClientRect().left;
                                const mouseY = e.clientY - canvas.getBoundingClientRect().top;

                                // Verificar si se hizo clic sobre el mineral
                                if (
                                    mouseX >= 170 - mineralAnchura / 2 && // calibrar la posicion en X del mineral segun su ancho
                                    mouseX <= 170 + mineralAnchura / 2 &&
                                    mouseY >= 280 - mineralAltura && // calibar la posicion en Y del mineral segun su alto
                                    mouseY <= 280
                                ) {
                                    isDragging = true;
                                    offsetX = mouseX - (170 - mineralAnchura / 2); // calibrar la posicion en X del mineral segun su ancho
                                    offsetY = mouseY - (280 - mineralAltura / 2); // calibar la posicion en Y del mineral segun su alto
                                }
                            });

                            // Evento movimiento del mouse para arrastrar el mineral
                            canvas.addEventListener('mousemove', (e) => {
                                if (isDragging) {

                                    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
                                    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

                                    const newMineralX = mouseX - offsetX;
                                    const newMineralY = mouseY - offsetY;

                                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

                                    // Dibujar el mineral en la nueva posición


                                    ctx.drawImage(fondo, 0, 0, 800, 300); // Posición y tamaño de la balanza
                                    ctx.drawImage(mineralImg, newMineralX, newMineralY, mineralAnchura, mineralAltura);
                                    ctx.drawImage(balanzaImg, 220, 90, 350, 350); // Posición y tamaño de la balanz1



                                    // Verificar si el mineral está sobre la balanza
                                    const balanzaX = 320; // Coordenada X de la balanza
                                    const balanzaY = 210; // Coordenada Y de la balanza
                                    const balanzaAnchura = 100; // Ancho de la balanza
                                    const balanzaAltura = 50; // Altura de la balanza

                                    const mineralEnBalanza =
                                        newMineralX + mineralAnchura >= balanzaX &&
                                        newMineralX <= balanzaX + balanzaAnchura &&
                                        newMineralY + mineralAltura >= balanzaY &&
                                        newMineralY <= balanzaY + balanzaAltura;

                                    if (mineralEnBalanza) {
                                        ctx.drawImage(mineralImg, newMineralX, newMineralY, mineralAnchura, mineralAltura);
                                        ctx.fillText(`${pesoObjeto} kg`, 395, 281)
                                        calcularEsfuerzoYDeformacion(pesoObjeto).then((resultados: any) => {
                                            setMaterial(resultados)
                                        })
                                            .catch((error: any) => {
                                                console.error('Error:', error);
                                            });
                                        const res = calcularResistencia(97.74, itemsX, itemsY);
                                        console.log(res)
                                        setResistencia(res)
                                    } else {
                                        ctx.drawImage(mineralImg, newMineralX, newMineralY, mineralAnchura, mineralAltura);
                                        ctx.fillText(`0 kg`, 395, 281);
                                        setMaterial({
                                            deformacionAxial: 0,
                                            esfuerzoAxial: 0
                                        })

                                    }
                                    // Actualizar la posición solo si el objeto está siendo arrastrado
                                    canvas.addEventListener('mousedown', (e) => {
                                        setResistencia(0)
                                        setMaterial({
                                            deformacionAxial: 0,
                                            esfuerzoAxial: 0
                                        })
                                        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
                                        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

                                        // Verificar si se hizo clic sobre el mineral
                                        if (
                                            mouseX >= newMineralX &&
                                            mouseX <= newMineralX + mineralAnchura &&
                                            mouseY >= newMineralY &&
                                            mouseY <= newMineralY + mineralAltura
                                        ) {
                                            isDragging = true;
                                            offsetX = mouseX - newMineralX;
                                            offsetY = mouseY - newMineralY;
                                        }
                                    });

                                }
                            });

                            // Evento liberación del clic para detener el arrastre
                            canvas.addEventListener('mouseup', () => {
                                isDragging = false;
                            });



                        }
                        // Dibujar la balanza siempre
                        ctx.drawImage(balanzaImg, 220, 90, 350, 350); // Posición y tamaño de la balanza
                        // Dibujar el valor 'x' en el centro del canvas
                        ctx.fillText(`0 kg`, 395, 281);
                    });
            };

            drawImages();
        }


    }, [pesoObjeto]);

    const handleChangePeso = (nuevoPeso: number) => {
        setPesoObjeto(nuevoPeso);
    };

    return (
        <div>
            <canvas ref={canvasRef} className='border border-black mx-auto my-4 ' width={800} height={300}></canvas>
            <div className={"inline-flex"}>
                <div className="inline-flex border border-black rounded-lg bg-white h-14">
                    <input
                        className='text-center m-auto h-10 rounded-lg outline-none focus:border-transparent focus:ring-0'
                        type="number"
                        value={pesoObjeto}
                        onChange={(e) => handleChangePeso(parseFloat(e.target.value))}
                    />
                    &nbsp;
                    <div className='mx-2 text-center items-center  bg-white'>
                        <p className='mx-auto m-3 text-lg '>kg</p>
                    </div>
                </div>
                <div className='inline-flex'>
                    <div className="m-4">
                        Deformaicion Axial:&nbsp; {material.deformacionAxial.toFixed(4)} cm
                        <br />
                        Esfuerzo Axial (σ):&nbsp; {material.esfuerzoAxial.toFixed(4)}
                    </div>
                    <div className="m-4">
                        Resistencia del material: {resistencia}
                    </div>
                </div>
            </div>

            {/*   <div>Peso total en la balanza: {pesoTotal}&nbsp;kg</div> */}

            {/*      <p>Width:{windowSize.width / 2.5}</p>
            <p>Height: {windowSize.height / 2}</p> */}
        </div>
    );
};

export default Balanza;
