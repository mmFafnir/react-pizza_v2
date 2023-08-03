

export enum PropertySort  {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'name'
}


export type TypeSortFilter = {
    value: string,
    property: PropertySort,
    checked: boolean
}

export type TypeFilter = {
    category: string,
    limit: number|null,
    sort: TypeSortFilter, 
    search: string, 
    page: number, 
}