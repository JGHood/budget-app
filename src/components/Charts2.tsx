import * as React from "react";

import { DragDropContext } from "react-beautiful-dnd";

import { reorderComponents } from "./reorder";


import { Row } from "./ChartRow";


interface Component {
    id: number,
    type: string,
    width: string
}

interface Rows { [key: string]: Component[] };



const App = () => {

    const [rows, setRows] = React.useState<Rows>({

        a: [
            {
                id: 1,
                type: "Hello",
                width: "45"
            }
        ],

        b: [
            {
                id: 2,
                type: "Test",
                width: "30"
            }
        ],

        c: [
            {
                id: 3,
                type: "Yo",
                width: "30"
            }
        ]

    });

    return (

        <DragDropContext
            onDragEnd={({ destination, source }) => {
                // // dropped outside the list
                if (!destination) {
                    return;
                }

                setRows(reorderComponents(rows, source, destination));
            }}
        >

            <div>
                {Object.entries(rows).map(([rowId, components]) => (
                    <Row
                        listId={rowId}
                        components={components}
                    />
                ))}
            </div>
        </DragDropContext>
    );
};

export default App;