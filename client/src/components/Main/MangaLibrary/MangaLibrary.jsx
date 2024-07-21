import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Cookies from 'js-cookie';
import LibraryCard from './LibraryCard';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const MangaLibrary = () => {
  const [columns, setColumns] = useState({
    "planToRead": { title: "Plan to Read", items: [] },
    "reading": { title: "Reading", items: [] },
    "finished": { title: "Finished", items: [] },
    "dropped": { title: "Dropped", items: [] }
  });

  useEffect(() => {
    const fetchLibrary = async () => {
      const email = Cookies.get('email');
      const token = Cookies.get('token');
      if (!email || !token) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/libraries?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const library = response.data.map(manga => ({
          ...manga,
          id: uuidv4() 
        }));
        setColumns({
          "planToRead": { title: "Plan to Read", items: library.filter(manga => manga.status === 'Plan to Read') },
          "reading": { title: "Reading", items: library.filter(manga => manga.status === 'Reading') },
          "finished": { title: "Finished", items: library.filter(manga => manga.status === 'Finished') },
          "dropped": { title: "Dropped", items: library.filter(manga => manga.status === 'Dropped') },
        });
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };

    fetchLibrary();
  }, []);

  const updateMangaStatus = async (email, title, status) => {
    const token = Cookies.get('token');
    try {
      await axios.put('http://localhost:3000/api/libraries', {
        email,
        title,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error updating manga status:", error);
    }
  };

  const onDragEnd = async (result) => {
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

      const email = Cookies.get('email');
      await updateMangaStatus(email, removed.title, destColumn.title);
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
