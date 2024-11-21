let cars = [
    { company: 'tesla',
        number:'111111',
        model:'Model 1',
        color:'red',
        year:2021
    }
    ,
    {
        company: 'ford',
        number:'222222',
        model:'Model 2',
        color:'blue',
        year:2010
    }
    ,
    {
        company: 'bmw',
        number:'333333',
        model:'Model 3',
        color:'black',
        year:2022
    },
    {
        company: 'audi',
        number:'444444',
        model:'Model 4',
        color:'white',
        year:2015
    }
]
export default cars;
export const updateCars = (newCars:any) => {
    cars.length = 0; 
    cars.push(...newCars);
};