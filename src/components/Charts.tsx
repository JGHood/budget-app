import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { DragDropContext, Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
const Store = window.require('electron-store');

const db = new Store();

export default function Charts(): JSX.Element {

    const pies = [{
        pie: 'apple',
        width: 70
    },
    {
        pie: 'cherry',
        width: 20
    }]

    const [pieOrder, setPieOrder] = useState(pies);
    const purchases = db.get('purchases');
    console.log(purchases);



    const data = [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
            name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];

    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const tempArray = Array.from(pieOrder);
        const [reorderedPies] = tempArray.splice(result.source.index, 1);
        tempArray.splice(result.destination.index, 0, reorderedPies);
        setPieOrder(tempArray);
    }

    return (
        <div className="charts">
                    <DragDropContext onDragEnd={handleOnDragEnd}>

                        <Droppable droppableId="row-id-number-here" direction="horizontal">
                            {(provided: DroppableProvided) =>
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <ul className="card-list">
                                        {
                                            pieOrder.map((pie, index) => {
                                                return (
                                                    <Draggable key={pie.pie} draggableId={pie.pie} index={index}>
                                                        {(provided) =>
                                                            <div {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}>
                                                                <Card className="chart-card" style={{ width: `${pie.width}vw` }}>
                                                                    <Card.Title>{pie.pie}</Card.Title>
                                                                    <Card.Body>
                                                                        <ResponsiveContainer width="100%" minHeight="15rem">
                                                                            <LineChart

                                                                                data={data}
                                                                                margin={{
                                                                                    top: 5, right: 30, left: 20, bottom: 5,
                                                                                }}
                                                                            >
                                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                                <XAxis stroke="white" dataKey="name" />
                                                                                <YAxis stroke="white" />
                                                                                <Tooltip />
                                                                                <Legend />
                                                                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                                            </LineChart>
                                                                        </ResponsiveContainer>
                                                                    </Card.Body>
                                                                </Card>
                                                            </div>
                                                        }
                                                    </Draggable>

                                                )
                                            })
                                        }
                                        {provided.placeholder}
                                    </ul>
                                </div>
                            }
                        </Droppable>

                    </DragDropContext>
                </div>
    );
}