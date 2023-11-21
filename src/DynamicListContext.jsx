'use client'
import React, { createContext, useContext, useState } from 'react';

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

    const values = {
        itemsX,
        itemsY,
        resistencia,
        addItemX,
        addItemY,
        removeItemX,
        removeItemY,
        setResistencia
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
