'use client'

import React, { useState } from 'react';
import { useDynamicList } from '../DynamicListContext';
import Trash from '../../public/icons/trash';
import { Button } from '@chakra-ui/react';

const DynamicListXY = () => {
    const { itemsX, itemsY, addItemX, addItemY, removeItemX, removeItemY }: any = useDynamicList();
    const [inputValue, setInputValue] = useState(''); // Estado para el valor del input
    const [selectedColumn, setSelectedColumn] = useState<'X' | 'Y'>('X'); // Estado para la columna seleccionada

    const addItem = () => {
        if (inputValue.trim() !== '') {
            if (selectedColumn === 'X') {
                addItemX([inputValue]);
            } else {
                addItemY([inputValue]);
            }
            setInputValue('');
        }
    };

    const removeItem = (axis: 'X' | 'Y', index: number) => {
        if (axis === 'X') {
            removeItemX(index);
        } else {
            removeItemY(index);
        }
    };

    return (
        <div className="inline-flex w-full">
            <div>
                <form
                    className="p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addItem();
                    }}
                >
                    <input
                        type="text"
                        value={inputValue}
                        className='text-center border border-gray-600 my-4 rounded-lg h-10'
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Nuevo elemento"
                    />

                    <select className='border border-green-700 outline-1 ounded-t-lg  focus:outline-none p-2 bg-white rounded-lg mx-2' value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value as 'X' | 'Y')}>
                        <option className='rounded-t-lg ' value="X">X</option>
                        <option className='rounded-b-lg ' value="Y">Y</option>
                    </select>

                    <button type="submit" className='px-3 md:px-4 py-1 md:py-2 bg-green-600 border border-green-600 text-white rounded-lg hover:bg-white hover:text-black transition duration-150 ease-in-outs'>Agregar</button>
                </form >
            </div >

            <div className="border border-black w-[50%] h-[200px] float-right mx-auto  rounded-lg">
                <div className='float-left mx-12 '>
                    <h3 className='border border-black text-lg w-28 text-center rounded-lg m-2'>Columna X</h3>
                    <ul className='text-center'>
                        {itemsX.map((item: any, index: any) => (
                            <div className="center border border-gray-600 relative my-1 select-none whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                                <li key={index}>
                                    <Button className="h-4 inline-flex w-12 mx-auto" onClick={() => removeItem('X', index)}>
                                        <p className='float-left'>{item}x</p>
                                        <Trash className={'ml-2'} />
                                    </Button>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className='float-right mx-12'>
                    <h3 className='border border-black text-lg w-28 text-center rounded-lg m-2'>Columna Y</h3>
                    <ul className='text-center'>
                        {itemsY.map((item: any, index: any) => (
                            <div className="center border border-gray-600 relative my-1 select-none whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-black">
                                <li key={index}>
                                    <Button className="h-4 inline-flex w-12 mx-auto" onClick={() => removeItem('Y', index)}>
                                        <p className='float-left'>{item}y</p>
                                        <Trash className={'ml-2'} />
                                    </Button>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DynamicListXY;

