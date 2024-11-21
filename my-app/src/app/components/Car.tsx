"use client";
import React, { useState } from 'react';
import style from './car.module.css'

interface carProps {
    car: any,
    handleDelete(number: string): void,
    handleUpdate(number: string, newCar: any): void
}

const Car: React.FC<carProps> = ({ car, handleDelete, handleUpdate }) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const form = () => {
        return (
            <form onSubmit={onUpdate} className={style.updateForm}>
                <h5>company:</h5>
                <input className={style.input} type="text" placeholder={car.model} defaultValue={car.model} />
                <h5>number:</h5>
                <input className={style.input} type="text" placeholder={car.color} defaultValue={car.color} />
                <h5>model:</h5>
                <input className={style.input} type="text" placeholder={car.number} defaultValue={car.number} />
                <h5>color:</h5>
                <input className={style.input} type="text" placeholder={car.year} defaultValue={car.year} />
                <h5>year:</h5>
                <input className={style.input} type="text" placeholder={car.company} defaultValue={car.company} />
                <button type="submit">Submit</button>
            </form>
        );
    }
    const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsUpdating(false); 
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newCar = {
            model: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            number: (form[2] as HTMLInputElement).value,
            year: (form[3] as HTMLInputElement).value,
            company: (form[4] as HTMLInputElement).value
        }
        handleUpdate(car.number, newCar);
    };

    return (
        <>
            {isUpdating && form()}
            {<div className={style.car}>
                <h1>{car.number}</h1>
                <p>{car.company}</p>
                <p>{car.model}</p>
                <p>{car.color}</p>
                <p>{car.year}</p>
                <button onClick={() => handleDelete(car.number)}>🗑️</button>
                <button onClick={() => setIsUpdating(!isUpdating)}>🖋️</button>
            </div>}

        </>
    )
}

export default Car;
