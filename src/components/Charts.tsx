import * as React from "react";

import { DragDropContext } from "react-beautiful-dnd";

import { reorderComponents } from "./reorder";


import { Row } from "./ChartRow";
import {LineGraph} from './Graphs';

interface Component {
    id: number,
    type: JSX.Element,
    width: string
}

interface Rows { [key: string]: Component[] };



const App = () => {

    const [rows, setRows] = React.useState<Rows>({

        a: [
            {
                id: 1,
                type: <LineGraph/>,
                width: "45"
            }
        ],

        b: [
            {
                id: 2,
                type: <LineGraph/>,
                width: "30"
            }
        ],

        c: [
            {
                id: 3,
                type: <LineGraph/>,
                width: "30"
            }
        ]

    });
    console.log(rows);



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