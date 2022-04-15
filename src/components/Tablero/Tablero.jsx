import TrelloList from './TrelloList'
import { makeStyles} from '@material-ui/core'
import AddCardOrList from './AddCardOrList'
import mockData from '../../utils/mockdata'
import { useState } from 'react'
import {DragDropContext, Droppable} from "react-beautiful-dnd"

const useStyle = makeStyles(theme => ({
     root: {
       display:"flex",
       msFlexDirection:"colum",
       minHeight:"100vh",
       overflowX:"auto",
       background:"#4c9aff",
     //   backgroundImage:`url(${backgraund_image})`,
       backgroundPosition:"center",
       backgroundSize:"cover",
       backgroundRepeat:"no-repeat",
     },
     container:{
       display:"block",
       flexDirection:"row"
 
     },
     tablero:{
       display:"flex",
     }
 
}))

function Tablero() {
  const classes = useStyle()
  const [data ,setData] = useState(mockData)
  const onDragEnd = (result) => {
     const { destination, source, draggableId, type } = result;
     console.log('destination', destination, 'source', source, draggableId);
 
     if (!destination) {
       return;
     }
     if (type === 'list') {
       const newListIds = data.listIds;
       newListIds.splice(source.index, 1);
       newListIds.splice(destination.index, 0, draggableId);
       return;
     }
 
     const sourceList = data.lists[source.droppableId];
     const destinationList = data.lists[destination.droppableId];
     const draggingCard = sourceList.cards.filter(
       (card) => card.id === draggableId
     )[0];
 
     if (source.droppableId === destination.droppableId) {
       sourceList.cards.splice(source.index, 1);
       destinationList.cards.splice(destination.index, 0, draggingCard);
       const newSate = {
         ...data,
         lists: {
           ...data.lists,
           [sourceList.id]: destinationList,
         },
       };
       setData(newSate);
     } else {
       sourceList.cards.splice(source.index, 1);
       destinationList.cards.splice(destination.index, 0, draggingCard);
 
       const newState = {
         ...data,
         lists: {
           ...data.lists,
           [sourceList.id]: sourceList,
           [destinationList.id]: destinationList,
         },
       };
       setData(newState);
     }
  }

  return (
     <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='1' type="list" direction='horizontal'>
          {(provided) => (
          <div
          className={classes.tablero}
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
               {data.listIds.map((listID, index) => {
                    const list = data.lists[listID]
                    return(<TrelloList list={ list } key={ listID } index={index} />)
                    })
               }
               {/* <AddCardOrList type="list"/> */}
               {provided.placeholder}
               </div>
          )}
          </Droppable>
     </DragDropContext>
  )
}

export default Tablero
