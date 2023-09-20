import { useEffect, useState } from "react";
import { BASE_URL } from "./constant";

function App() {
  const [tableName, setTableName] = useState('staffs')
  const [tableData, setTableData] = useState([])
  const tablesInDB = ["staffs", "books"]

  const getBooks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/books?tableName=${tableName}`)
      const data = await res.json()
      if (res.status === 200) setTableData(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (tableName) getBooks()
  }, [tableName])

  return (
    <main>
      <div>
        <label>Select DB Table:</label>
        <select onChange={(e) => setTableName(e.target.value)}>
          {tablesInDB?.map(table =>
            <option
              key={table}
              value={table}
            >
              {table}
            </option>
          )}
        </select>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              {tableData?.length > 0 && Object.keys(tableData[0])?.map((header) =>
                <th key={header} className="capitalize text-left">{header}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row, i) =>
              <tr key={i}>
                {tableData?.length > 0 && Object.values(row)?.map((item) => <td key={item}>{item}</td>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
