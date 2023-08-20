import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"; // Corrected import statement
import filterFactory,{textFilter} from "react-bootstrap-table2-filter"
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const emailFormatter = (cell, row) => {
    return <span>Email = {cell}</span>;
  };
 const  selectRow={
  mode:'checkbox',
  clickToSelect:true,
  Selected:[1,3],
  clickToEdit:true,
 }
  const columns = [
    {
      dataField: "email",
      text: "Email",
      sort: true,
      formatter: emailFormatter,
    },
    {
      dataField: "postId",
      text: "Product ID",
      filter:textFilter(),
      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: false,
          };
        }
        return true;
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
      
    },
    {
      dataField: "email",
      text: "Dropdown",
      editor:{
        type:Type.SELECT,
        options:[
          {
            value:"A",
            label:"A"
          },
          {
            value:"B",
            label:"B"
          },
        ]
      },
    },
  ];

  return (
    <div className="App">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: () => [1, 2, 3], // Rows that can't be edited
        })}
        selectRow={selectRow}
        filter={filterFactory()}
      />

    </div>
  );
}

export default App;
