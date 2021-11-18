import React, {FC, memo, useEffect, useState} from 'react'
import styles from './Characters.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import {getCharacters} from '../../redux/store/reducers/characters/charactersThunkCreators'
import Character from './Character/Character'
import {CharacterType} from '../../redux/models/Character'
import createGrid from '../../helpers/createGrid'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import Loader from '../common/Loader/Loader'
import loadingError from '../../assets/loadingError.png'
import * as FaIcons from 'react-icons/fa'
import sortCharacters from '../../helpers/sort'


const Characters: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {
        characters,
        isCharactersLoading,
        charactersLoadingError,
        page,
        pageCount
    } = useAppSelector(state => state.charactersReducer)
    const {name, species, status, type, gender} = useAppSelector(state => state.sorterReducer)
    const {width} = useWindowDimensions()
    const dispatch = useAppDispatch()

    const colorStyles = require(`./Characters${theme}.module.css`)

    const [canFetch, setCanFetch] = useState<boolean>(false)
    const [isGoUpShown, setIsGoUpShown] = useState<boolean>(false)
    const [localCharacters, setLocalCharacters] = useState<CharacterType[]>(sortCharacters({characters, by: {name, species, status, type, gender}}))

    useEffect(() => {
        setLocalCharacters(sortCharacters({characters, by: {name, species, status, type, gender}}))
    }, [characters, name, species, status, type, gender])

    const scrollHandler = (e: any): void => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10) {
            setCanFetch(true)
        }
        if (e.target.documentElement.scrollTop > 1000) {
            setIsGoUpShown(true)
        }
        if (e.target.documentElement.scrollTop < 1000) {
            setIsGoUpShown(false)
        }
    }

    const [rowSize, setRowSize] = useState<number>(width > 1120 ? 2 : 1)

    useEffect(() => {
        if (width > 1120 && rowSize === 1) {
            setRowSize(2)
        } else if (width < 1120 && rowSize === 2) {
            setRowSize(1)
        }
    }, [width])

    useEffect(() => {
        if (canFetch && pageCount && page < pageCount) {
            dispatch(getCharacters(page))
        }
    }, [canFetch])

    useEffect(() => {
        if (!isCharactersLoading) {
            setCanFetch(false)
        }
    }, [isCharactersLoading])

    useEffect(() => {
        dispatch(getCharacters(1))
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [])

    const charactersGrid: CharacterType[][] = createGrid({items: localCharacters, rowSize})

    const onGoUpClick = (): void => {
        if (isGoUpShown) {
            window.scrollTo(0, 400)
        }
    }

    return (
        <div className={`${styles.characters} + ${colorStyles.characters}`}>

            <div
                className={`${styles.goUp} + ${colorStyles.goUp} + ${isGoUpShown ? styles.shown : ''}`}
                title={isGoUpShown ? 'Go up' : ''}
                onClick={onGoUpClick}
            ><FaIcons.FaRocket/></div>

            {charactersGrid.map((charactersRow, index) => {
                return (
                    <div
                        key={index}
                        className={styles.charactersRow}
                        style={{
                            width: `${rowSize === 2 ? 550 * 2 : 550}px`
                        }}
                    >
                        {charactersRow.map(character => <Character key={character.id} character={character}/>)}
                    </div>
                )
            })}
            <div style={{height: '150px'}}>{isCharactersLoading && <Loader size={120}/>}</div>
            {charactersLoadingError && <div className={styles.error}>
                <img src={loadingError} alt=''/>
                <span>{charactersLoadingError}</span>
            </div>}
            {pageCount && page === pageCount && <div className={styles.error}>
                <img src={loadingError} alt=''/>
                <span>The end</span>
            </div>}
        </div>
    )
}

export default memo(Characters)
