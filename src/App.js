import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { createMuiTheme } from "@material-ui/core/styles";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ThemeProvider } from "@material-ui/core";
import { columnDefs, defaultColDef } from "./columns";
import GridComponents from "./Components";
import { Button } from "@material-ui/core";
import { uuid } from "uuidv4";
import "./App.css";

function App() {
  const applyTheme = {
    palette: {
      primary: {
        light: "#fd7e15",
        main: "#fd7e14",
        dark: "#fd7e14",
        contrastText: "#fff",
      },
      secondary: {
        light: "#28a745",
        main: "#28a745",
        dark: "#28a745",
        contrastText: "#fff",
      },
    },
    status: {
      danger: "orange",
    },

    typography: {
      button: {
        fontWeight: 400,
        textAlign: "capitalize",
      },
    },
  };
  const [gridApi, setGridApi] = useState(null);
  const [rootColumnDef, setColumnDefs] = useState(columnDefs);
  const [columnApi, setColumnApi] = useState(null);

  const [rowData, setRowData] = useState(null);

  const frameworkComponents = {
    simpleEditor: GridComponents.SimpleEditor,
    asyncValidationEditor: GridComponents.AsyncValidationEditor,
    autoCompleteEditor: GridComponents.AutoCompleteEditor,
    agDateInput: GridComponents.MyDatePicker,
    dateEditor: GridComponents.DateEditor,
    actionsRenderer: GridComponents.ActionsRenderer,
    addRowStatusBar: GridComponents.AddRowStatusBar,
    drilldownRenderer: GridComponents.DrilldownRenderer,
  };

  function onGridReady(params) {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    params.api.sizeColumnsToFit();
  }

  function getData() {
    fetch(
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((row) => (row.id = uuid()));
        setRowData(data.slice(0, 100));
      });
  }

  function handleClick() {
    const newColDef = columnDefs;
    newColDef.push({
      headerName: "View Details",
      field: "viewDetails",
      isDrillDown: true,
      cellRenderer: "drilldownRenderer",
      width: 95,
      pinned: "left",
    });
    //setColumnDefs(newColDef);
    getData();
  }

  return (
    <ThemeProvider theme={createMuiTheme(applyTheme)}>
      <div className="my-app">
        <Button color="primary" onClick={handleClick} size="small">
          View
        </Button>

        <div
          id="myGrid"
          style={{ height: "100%", width: "100%" }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={rootColumnDef}
            defaultColDef={defaultColDef}
            rowData={rowData}
            getRowNodeId={(data) => data.id}
            onGridReady={onGridReady}
            frameworkComponents={frameworkComponents}
            editType="fullRow"
            suppressClickEdit
            statusBar={{
              statusPanels: [{ statusPanel: "addRowStatusBar" }],
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
