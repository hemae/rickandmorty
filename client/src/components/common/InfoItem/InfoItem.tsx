import React, {FC, memo, useEffect, useState} from 'react'
import styles from './InfoItem.module.css'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks/redux'
import {GenderType, NameType, SpeciesType, StatusType, TypeType, UniqueId} from '../../../redux/models/Character'
import * as BsIcons from 'react-icons/bs'
import {charactersSlice} from '../../../redux/store/reducers/characters/charactersSlice'


type InfoItemPropsType = {
    id?: UniqueId
    property: string
    value: NameType | StatusType | SpeciesType | TypeType | GenderType
    isCharacterHover?: boolean
    shownPropertyLabel?: boolean
    isPopUp?: boolean
    isInLikes?: boolean
    setIsOnStar?: (isOnStar: boolean) => void
}

const InfoItem: FC<InfoItemPropsType> = ({
                                             id = 0,
                                             property,
                                             value,
                                             isCharacterHover = false,
                                             shownPropertyLabel = true,
                                             isPopUp = false,
                                             setIsOnStar
                                         }) => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {likedIds} = useAppSelector(state => state.charactersReducer)
    const dispatch = useAppDispatch()

    const isInLikes: boolean = likedIds.indexOf(id) !== -1

    const colorStyles = require(`./InfoItem${theme}.module.css`)

    const [propertyRotate, setPropertyRotate] = useState<number>(Math.random() * 4 - 2)
    const [valueRotate, setValueRotate] = useState<number>(Math.random() * 4 - 2)

    useEffect(() => {
        setPropertyRotate(Math.random() * 4 - 2)
        setValueRotate(Math.random() * 4 - 2)
    }, [isCharacterHover])

    const onStarClick = (): void => {
        dispatch(charactersSlice.actions.pushPullId({id, action: isInLikes ? 'pull' : 'push'}))
    }

    const onStarOver = (): void => {
        if (setIsOnStar) {
            setIsOnStar(true)
        }
    }

    const onStarLeave = (): void => {
        if (setIsOnStar) {
            setIsOnStar(false)
        }
    }

    return (
        <div className={`${styles.info} + ${colorStyles.info}`}
             style={{
                 //@ts-ignore
                 flexDirection: `${!isPopUp ? property !== 'name' ? value.length > 20 ? 'column' : 'row' : 'row' : 'row'}`
             }}
        >

            {shownPropertyLabel && <span
                className={`${styles.property} + ${colorStyles.property}`}
                style={{
                    transform: `rotate(${propertyRotate}deg)`
                }}
            >{property}:</span>}

            <span
                className={`${styles.value} + ${colorStyles.value} + ${property === 'name' ? colorStyles.name : ''}`}
                style={{
                    transform: `rotate(${valueRotate}deg)`,
                    width: `${isPopUp ? 'max-content' : 'initial'}`,
                    fontSize: `${property === 'name' ? value.length > 17 ? 18 : 26 : value.length > 17 ? 18 : 24 }px`
                }}
            >{value || '- -'}</span>

            {property === 'name' ?
                <div
                    className={`${styles.star} + ${colorStyles.star}`}
                    onClick={onStarClick}
                    onMouseOver={onStarOver}
                    onMouseLeave={onStarLeave}
                >{isInLikes ? <BsIcons.BsStarFill/> : <BsIcons.BsStar/>}</div> : <></>}

        </div>
    )
}

export default memo<InfoItemPropsType>(InfoItem)
