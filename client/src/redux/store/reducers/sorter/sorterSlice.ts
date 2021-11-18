import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export type NameSortType = 'A-Z' | 'Z-A' | null
export type StatusSortType = 'Alive' | 'Dead' | 'unknown' | null
export type SpeciesSortType = 'A-Z' | 'Z-A' | null
export type TypeSortType = 'A-Z' | 'Z-A' | null
export type GenderSortType = 'Male' | 'Female' | null

export type CommonSortType =
    NameSortType
    | StatusSortType
    | SpeciesSortType
    | TypeSortType
    | GenderSortType
    | PropertySortType

export type PropertySortType = 'name' | 'status' | 'species' | 'type' | 'gender'

type CharactersStateType = {
    name: NameSortType
    status: StatusSortType
    species: SpeciesSortType
    type: TypeSortType
    gender: GenderSortType
}

const initialState: CharactersStateType = {
    name: null,
    status: null,
    species: null,
    type: null,
    gender: null
}

export const sorterSlice = createSlice({
    name: 'sorter',
    initialState,
    reducers: {
        setSortProperty(state: CharactersStateType, action: PayloadAction<{ property: PropertySortType, value: CommonSortType }>) {
            //@ts-ignore
            state[action.payload.property] = action.payload.value
            let propertiesToNull: Array<PropertySortType> = ['name', 'species', 'type']
            if (action.payload.value && propertiesToNull.indexOf(action.payload.property) !== -1) {
                propertiesToNull = propertiesToNull.filter(prop => prop !== action.payload.property)
                for (let prop of propertiesToNull) {
                    state[prop] = null
                }
            }
        }
    }
})


export default sorterSlice.reducer
