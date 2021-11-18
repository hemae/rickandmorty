import {CharacterType} from '../redux/models/Character'
import {
    GenderSortType,
    NameSortType,
    SpeciesSortType,
    StatusSortType,
    TypeSortType
} from '../redux/store/reducers/sorter/sorterSlice'


// type SortByPayloadType = {
//     items: any[]
//     by: any
// }
//
// type SortByType = (payload: SortByPayloadType) => void
//
// export const sortBy: SortByType = ({items, by}) => {
//     items.sort(i)
// }

type SortPayloadType = {
    characters: CharacterType[]
    by: {
        name: NameSortType
        status: StatusSortType
        species: SpeciesSortType
        type: TypeSortType
        gender: GenderSortType
    }
}

type SortType = (payload: SortPayloadType) => CharacterType[]

const sortCharacters: SortType = ({characters, by}) => {
    const sortedCharacter: CharacterType[] = characters
        .filter(character => by.status ? character.status === by.status : true)
        .filter(character => by.gender ? character.gender === by.gender : true)

    if (by.name) {
        sortedCharacter.sort((character1, character2) => {
                if (character1.name < character2.name) {
                    return by.name === 'A-Z' ? -1 : 1
                }
                if (character1.name > character2.name) {
                    return by.name === 'A-Z' ? 1 : -1
                }
                return 0
            })
    }
    if (by.type) {
        sortedCharacter.sort((character1, character2) => {
            if (character1.type < character2.type) {
                return by.type === 'A-Z' ? -1 : 1
            }
            if (character1.type > character2.type) {
                return by.type === 'A-Z' ? 1 : -1
            }
            return 0
        })
    }
    if (by.species) {
        sortedCharacter.sort((character1, character2) => {
            if (character1.species < character2.species) {
                return by.species === 'A-Z' ? -1 : 1
            }
            if (character1.species > character2.species) {
                return by.species === 'A-Z' ? 1 : -1
            }
            return 0
        })
    }

    return sortedCharacter
}

export default sortCharacters