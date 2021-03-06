import React, { FunctionComponent } from 'react'
import { VariableSizeList as List, ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Link } from 'react-router-dom'
import ModiteListItem from '../ModiteListItem'
import s from './styles.module.css'
import VirtualizedListProps from '../../types/components/VirtualizedList'
import Modite from '../../models/Modite'

const VirtualizedList: FunctionComponent<VirtualizedListProps> = ({
  records,
  lastScrollOffset,
  onScroll = () => {},
  addSpacerRow = false,
}) => {
  const getItemSize = (index: number) => {
    if (!addSpacerRow) {
      return 60
    } else {
      return index === 0 ? document.body.clientHeight * 0.4 : 60
    }
  }

  const pseudoRecord: Modite = {
    id: '30000000',
  }
  const localRecords = addSpacerRow ? [pseudoRecord, ...records] : records

  const Row: FunctionComponent<ListChildComponentProps> = ({ index, style }) => (
    <>
      {addSpacerRow && index === 0 && <div style={style} />}
      {(!addSpacerRow || (addSpacerRow && index !== 0)) && localRecords[index].id && (
        <Link to={`/details/${localRecords[index].id}`} className={`ListRow ${s.moditeRow}`} style={style}>
          <ModiteListItem item={localRecords[index]} key={localRecords[index].id} />
        </Link>
      )}
      {/* When does not have an id (e.g. no modite found) there is no detail link.*/}
      {(!addSpacerRow || (addSpacerRow && index !== 0)) && !localRecords[index].id && (
        <span className={`ListRow ${s.moditeRow}`} style={style}>
          <ModiteListItem item={localRecords[index]} />
        </span>
      )}
    </>
  )

  return (
    <AutoSizer aria-label="The list of Modites">
      {({ height, width }: { height: number; width: number }) => (
        <>
          <List
            className="List"
            itemSize={getItemSize}
            itemCount={localRecords.length}
            height={height}
            width={width}
            initialScrollOffset={lastScrollOffset}
            onScroll={onScroll}
            itemKey={(index: number) => localRecords[index].id || (index.toString() as string)}
            overscanCount={30}
          >
            {Row}
          </List>
        </>
      )}
    </AutoSizer>
  )
}

export default React.memo(VirtualizedList)
