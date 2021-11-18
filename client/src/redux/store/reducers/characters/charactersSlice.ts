import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CharacterType, UniqueId} from '../../../models/Character'
import {getCharacters} from './charactersThunkCreators'
import {ResponseType} from '../../../api/charactersAPI'


export type CharactersLoadingErrorType = string
export type LikedIdsActionType = 'push' | 'pull'

type CharactersStateType = {
    characters: Array<CharacterType>
    isCharactersLoading: boolean
    charactersLoadingError: CharactersLoadingErrorType
    characterCount: number | null
    pageCount: number | null
    page: number
    isFirstResponse: boolean
    currentCharacter: CharacterType | null
    likedIds: Array<UniqueId>
}

const initialState: CharactersStateType = {
    characters: [],
    isCharactersLoading: false,
    charactersLoadingError: '',
    characterCount: null,
    pageCount: null,
    page: 1,
    isFirstResponse: true,
    currentCharacter: null,
    likedIds: []
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacter(state: CharactersStateType, action: PayloadAction<CharacterType | null>) {
            state.currentCharacter = action.payload
        },
        setLikedIds(state: CharactersStateType, action: PayloadAction<Array<UniqueId>>) {
            state.likedIds = action.payload
        },
        pushPullId(state: CharactersStateType, action: PayloadAction<{id: UniqueId, action: LikedIdsActionType}>) {
            if (action.payload.action === 'push') {
                state.likedIds.push(action.payload.id)
                const storageLikedIds: string | null = localStorage.getItem('likedIds')
                if (!storageLikedIds) {
                    localStorage.setItem('likedIds', JSON.stringify({likedIds: [action.payload.id]}))
                } else {
                    const likedIds = JSON.parse(storageLikedIds).likedIds as Array<UniqueId>
                    likedIds.push(action.payload.id)
                    localStorage.setItem('likedIds', JSON.stringify({likedIds}))
                }
            } else {
                state.likedIds = state.likedIds.filter(id => id !== action.payload.id)
                const storageLikedIds: string | null = localStorage.getItem('likedIds')
                if (storageLikedIds) {
                    let likedIds = JSON.parse(storageLikedIds).likedIds as Array<UniqueId>
                    likedIds = likedIds.filter(id => id !== action.payload.id)
                    localStorage.setItem('likedIds', JSON.stringify({likedIds}))
                }
            }
        }
    },
    extraReducers: {
        [getCharacters.pending.type]: (state: CharactersStateType) => {
            state.isCharactersLoading = true
        },
        [getCharacters.fulfilled.type]: (state: CharactersStateType, action: PayloadAction<ResponseType>) => {
            state.charactersLoadingError = ''
            if (!state.pageCount || state.page + 1 <= state.pageCount) {
                state.page += 1
            }
            state.characters = [...state.characters, ...action.payload.results]
            if (state.isFirstResponse) {
                state.isFirstResponse = false
                state.characterCount = action.payload.info.count
                state.pageCount = action.payload.info.pages
            }
            state.isCharactersLoading = false
        },
        [getCharacters.rejected.type]: (state: CharactersStateType, action: PayloadAction<string>) => {
            state.charactersLoadingError = action.payload
            state.isCharactersLoading = false
        }
    }
})


export default charactersSlice.reducer
