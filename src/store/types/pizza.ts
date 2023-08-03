

export enum SizeValues {
    SMALL = '26 см.',
    MIDDLE = '30 см.',
    BIG = '40 см.'
}

export type TypeOptionValue = {
    value: string,
    sale: number,
    checked: boolean
}

export type TypeOptions = {
    size: TypeOptionValue[],
    type: TypeOptionValue[]
}


export type TypePizza = {
    id: string|number,
    title: string,
    img: string,
    defaultId: string|number,
    price: string,
    quantity: number,
    category: string,
    rating: number,
    options: TypeOptions 
}


