import { NameSortType, StatusSortType, SpeciesSortType, TypeSortType, GenderSortType, PropertySortType, CommonSortType } from "../redux/store/reducers/sorter/sorterSlice"

type SelectorPayloadType = {
    sortProperties: {
        name: NameSortType
        status: StatusSortType
        species: SpeciesSortType
        type: TypeSortType
        gender: GenderSortType
    }
    property: PropertySortType
}

type SelectorType = (payload: SelectorPayloadType) => CommonSortType

const selector: SelectorType = ({sortProperties, property}) => {
    return sortProperties[property]
}

export default selector