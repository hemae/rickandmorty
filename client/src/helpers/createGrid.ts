type CreateGridPayloadType = {
    items: any[]
    rowSize: number
}

type CreateGridType = (payload: CreateGridPayloadType) => any[][]

const createGrid: CreateGridType = ({items, rowSize}) => {
    const grid: any[][] = []

    const rowsCount: number = Math.ceil((items.length) / rowSize)

    for (let i = 0; i < rowsCount; i++) {
        grid.push([])
    }

    for (let i = 0; i < items.length; i++) {
        grid[Math.floor(i / rowSize)].push(items[i])
    }

    return grid
}

export default createGrid