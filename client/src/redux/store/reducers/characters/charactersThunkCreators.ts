import {createAsyncThunk} from '@reduxjs/toolkit'
import {AxiosResponse} from 'axios'
import charactersAPI, {ResponseType} from '../../../api/charactersAPI'


export const getCharacters = createAsyncThunk(
    'getCharacters',
    async (page: number, thunkAPI) => {
        try {
            const response: AxiosResponse<ResponseType> = await charactersAPI.getCharacters(page)
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)