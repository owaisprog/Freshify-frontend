import { Table } from "@mantine/core";

const TableCom = ({ columns, data }) => {
  return (
    <div className="shadow-lg rounded-xl overflow-hidden">
      {" "}
      {/* Shadow & border-radius */}
      <Table highlightOnHover striped className="min-w-full bg-white">
        {/* Table Head */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left text-[#718EBF] p-4 font-medium border-b border-gray-300 pb-3 px-4"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="text-left px-4 py-3 text-gray-700"
                  >
                    {row[col] || "—"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableCom;
