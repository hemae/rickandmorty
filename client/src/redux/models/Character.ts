export type UniqueId = number
export type NameType = string
export type StatusType = 'Alive' | 'Dead' | 'unknown'
export type SpeciesType = string
export type TypeType = string
export type GenderType = 'Male' | 'Female' | 'unknown'
export type UrlType = string
export type DateType = string
export type LocationType = {
    name: NameType
    url: UrlType
}

export type CharacterType = {
    id: UniqueId
    name: NameType
    status: StatusType
    species: SpeciesType
    type: TypeType
    gender: GenderType
    origin: LocationType
    location: LocationType
    image: UrlType
    episode: Array<UrlType>
    url: UrlType
    created: DateType
}