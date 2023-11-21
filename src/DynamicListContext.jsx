'use client'
import React, { createContext, useContext, useState } from 'react';
import calcularResistencia from '@/lib/interpolacion';

const DynamicListContext = createContext(null);

export const DynamicListProvider = ({ children }) => {
    const [itemsX, setItemsX] = useState([]);
    const [itemsY, setItemsY] = useState([]);
    const [resistencia, setResistencia] = useState(0);

    const addItemX = (value) => {
        setItemsX([...itemsX, value]);
    };

    const addItemY = (value) => {
        setItemsY([...itemsY, value]);
    };

    const removeItemX = (index) => {
        const updatedItems = itemsX.filter((_, i) => i !== index);
        setItemsX(updatedItems);
    };

    const removeItemY = (index) => {
        const updatedItems = itemsY.filter((_, i) => i !== index);
        setItemsY(updatedItems);
    };

    const getResistencia = () => {
        console.log(itemsX, itemsY);
        calcularResistencia(97.74, itemsX, itemsY).then((res) => {
            console.log(res)
            setResistencia(res)
        })
    }

    const values = {
        itemsX,
        itemsY,
        resistencia,
        addItemX,
        addItemY,
        removeItemX,
        removeItemY,
        setResistencia,
        getResistencia
    };

    return (
        <DynamicListContext.Provider value={values}>
            {children}
        </DynamicListContext.Provider>
    );
};

export const useDynamicList = () => {
    const context = useContext(DynamicListContext);
    if (!context) {
        throw new Error('useDynamicList must be used within a DynamicListProvider');
    }
    return context;
};
