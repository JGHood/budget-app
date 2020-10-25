import React from "react";

import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";

interface Component {
    id: number,
    type: JSX.Element,
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
                            <div className="chart-row p-0 m-0" style={{ display: "flex", width: "100%", minHeight: "10vh"}} ref={dropProvided.innerRef}>
                                {components.map((component, index) => (
                                    <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                                        {dragProvided => (
                                            <div
                                                {...dragProvided.dragHandleProps}
                                                {...dragProvided.draggableProps}
                                                ref={dragProvided.innerRef}
                                            >
                                                <Card className="chart-card" style={{ width: `${component.width}vw` }}>
                                                    <Card.Title>{component.id}</Card.Title>
                                                    <Card.Body>
                                                        
                                                            {component.type}
                                                        
                                                    </Card.Body>
                                                </Card>
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