"use client"
import React, { useState } from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query';
import Car from '../components/Car'
import { getCars, postCar, deleteCar, putCar } from '@/services/cars';
import style from './car.module.css'


const Cars = () => {
    const [isMutating, setIsMutating] = useState(false);
    const [isAddind, setIsAddind] = useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching } = useQuery({ queryKey: ['cars'], queryFn: getCars })
    const createMutation = useMutation({
        mutationFn: postCar,
        onMutate: async (car: any) => {
            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => [...old, car])
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] }); setIsMutating(false);
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteCar,
        onMutate: async (id: string) => {
            console.log("start");

            setIsMutating(true);
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars']);
            queryClient.setQueryData(['cars'], (old: any) => old.filter((car: any) => car.number !== id));
            console.log(previousCars);
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            setIsMutating(false);
            console.log("end");
        },
    })

    const updateCarMutation = useMutation({
        mutationFn: ({ id, car }: { id: string, car: any }) => putCar(id, car),
        onMutate: async ({ id, car }: { id: string, car: any }) => {
            setIsMutating(true)
            await queryClient.cancelQueries({ queryKey: ['cars'] })
            const previousCars = queryClient.getQueryData(['cars'])
            queryClient.setQueryData(['cars'], (old: any) => old.map((oldCar: any) => oldCar.number === id ? car : oldCar))
            return { previousCars }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            setIsMutating(false)
        },
    })
    function handleDelete(number: string) {
        deleteMutation.mutate(number)
    }
    function handleUpdate(number: string, car: any) {
        updateCarMutation.mutate({ id: number, car })
    }
    const form = () => {
        return (
            <form className={style.addingForm} onSubmit={handleAddCar}>
                <h5>company:</h5>
                <input className={style.input} type="text" placeholder={data.model} defaultValue={data.model} />
                <h5>number:</h5>
                <input className={style.input} type="text" placeholder={data.color} defaultValue={data.color} />
                <h5>model:</h5>
                <input className={style.input} type="text" placeholder={data.number} defaultValue={data.number} />
                <h5>color:</h5>
                <input className={style.input} type="text" placeholder={data.year} defaultValue={data.year} />
                <h5>year:</h5>
                <input className={style.input} type="text" placeholder={data.company} defaultValue={data.company} />
                <button type="submit">Submit</button>
            </form>
        );
    }

    const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAddind(false);
        const form = e.target as HTMLFormElement;
        const car = {
            model: (form[0] as HTMLInputElement).value,
            color: (form[1] as HTMLInputElement).value,
            number: (form[2] as HTMLInputElement).value,
            year: (form[3] as HTMLInputElement).value,
            company: (form[4] as HTMLInputElement).value
        }
        createMutation.mutate(car);
    };

    return (
        <div >
            {(isLoading || isFetching || isMutating) && <p>Loading...</p>}
            {isAddind && form()}
            <div className={style.cars}>
                <button onClick={()=>setIsAddind(!isAddind)}>Add car</button>
                {data?.map((car: any) =>
                    <Car car={car} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                )}
            </div>

        </div>
    )
}

export default Cars;
