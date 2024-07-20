// src/components/MangaLibrary/MangaLibrary.jsx
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import LibraryCard from './LibraryCard';

const MangaLibrary = ({ library }) => {
  const [columns, setColumns] = useState({
    "planToRead": {
      title: "Plan to Read",
      items: library.planToRead
    },
    "reading": {
      title: "Reading",
      items: library.reading
    },
    "finished": {
      title: "Finished",
      items: library.finished
    },
    "dropped": {
      title: "Dropped",
      items: library.dropped
    }
  });

  useEffect(() => {
    setColumns({
      "planToRead": { title: "Plan to Read", items: library.planToRead },
      "reading": { title: "Reading", items: library.reading },
      "finished": { title: "Finished", items: library.finished },
      "dropped": { title: "Dropped", items: library.dropped },
    });
  }, [library]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="library">
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div key={columnId} className="column">
              <h2>{column.title}</h2>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="droppable-column"
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="draggable-item"
                          >
                            <LibraryCard manga={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default MangaLibrary;
