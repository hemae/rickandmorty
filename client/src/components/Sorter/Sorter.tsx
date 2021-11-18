import React, {FC, memo, useEffect, useState} from 'react'
import styles from './Sorter.module.css'
import {useAppDispatch, useAppSelector} from '../../redux/hooks/redux'
import {CommonSortType, PropertySortType, sorterSlice} from '../../redux/store/reducers/sorter/sorterSlice'
import createGrid from '../../helpers/createGrid'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import selector from '../../helpers/selector'


const sortData: Array<{ values: Array<CommonSortType>, property: PropertySortType }> = [
    {values: [null, 'A-Z', 'Z-A'], property: 'name'},
    {values: [null, 'Alive', 'Dead', 'unknown'], property: 'status'},
    {values: [null, 'A-Z', 'Z-A'], property: 'species'},
    {values: [null, 'A-Z', 'Z-A'], property: 'type'},
    {values: [null, 'Male', 'Female', 'unknown'], property: 'gender'}
]

const Sorter: FC = () => {

    const {theme} = useAppSelector(state => state.settingsReducer)
    const {name, species, status, type, gender} = useAppSelector(state => state.sorterReducer)
    const dispatch = useAppDispatch()
    const {width} = useWindowDimensions()

    const colorStyles = require(`./Sorter${theme}.module.css`)

    const [rowSize, setRowSize] = useState<number>(width > 1120 ? 5 : 3)

    useEffect(() => {
        if (width > 1120 && rowSize === 3) {
            setRowSize(5)
        } else if (width < 1120 && rowSize === 5) {
            setRowSize(3)
        }
    }, [width])

    const sortPropertiesGrid: { values: Array<CommonSortType>, property: PropertySortType }[][] = createGrid({
        items: sortData,
        rowSize
    })

    return (
        <div className={`${styles.sorter} + ${colorStyles.sorter}`}>
            {sortPropertiesGrid.map((sortData, index) => {
                return (
                    <div key={index} className={styles.sortDataRow}>
                        {sortData.map((propertyData, index) => {
                            return (
                                <div key={index} className={`${styles.sorterProperty} + ${colorStyles.sorterProperty}`}>
                                    <span>{propertyData.property}:</span>
                                    <select
                                        name={propertyData.property}
                                        id={`select_${propertyData.property}`}
                                        placeholder={propertyData.property}
                                        onChange={
                                            (e) => {
                                                dispatch(sorterSlice.actions.setSortProperty({
                                                    property: propertyData.property,
                                                    value: e.target.value as CommonSortType || null
                                                }))
                                            }
                                        }
                                        value={selector({sortProperties: {name, species, status, type, gender}, property: propertyData.property}) || ''}
                                    >
                                        {propertyData.values.map((value, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={value || ''}>
                                                    {value || ''}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default memo(Sorter)
