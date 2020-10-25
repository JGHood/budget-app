import React from "react";

import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

interface Component {
    id: number,
    type: string,
    width: string
}


interface Props {

  components: Component[];

  listId: string;

  listType?: string;

  internalScroll?: boolean;

  isCombineEnabled?: boolean;

}



export const Row: React.FC<Props> = ({ listId, listType, components }) => {

  return (

    <Droppable

      droppableId={listId}

      type={listType}

      direction="horizontal"

      isCombineEnabled={false}

    >

      {dropProvided => (

        <div {...dropProvided.droppableProps}>

          <div>

            <div>

              <div style={{ display: "flex" }} ref={dropProvided.innerRef}>

                {components.map((component, index) => (

                  <Draggable key={component.id} draggableId={component.id.toString()} index={index}>

                    {dragProvided => (

                      <div

                        {...dragProvided.dragHandleProps}

                        {...dragProvided.draggableProps}

                        ref={dragProvided.innerRef}

                      >

                        <div style={{ backgroundColor: "gray" }}>{component.type}</div>

                      </div>

                    )}

                  </Draggable>

                ))}

                {dropProvided.placeholder}

              </div>

            </div>

          </div>

        </div>

      )}

    </Droppable>

  );

};