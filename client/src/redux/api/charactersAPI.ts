import AxiosApi from './AxiosApi'
import {AxiosResponse} from 'axios'
import {CharacterType} from '../models/Character'
import {ResponseInfoType} from '../models/ResponseInfo'

const api = new AxiosApi({basePath: 'https://rickandmortyapi.com/api'})

export type ResponseType = {
    results: Array<CharacterType>
    info: ResponseInfoType
}

const charactersAPI = {
    getCharacters(page: number): Promise<AxiosResponse<ResponseType>> {
        return api.getPromiseResponse({path: `/character/?page=${page}`, method: 'get'})
    }
}

export default charactersAPI