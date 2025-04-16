import { Loader, Table } from "@mantine/core";

const TableCom = ({ columns, data, isLoading, error, handleFunction }) => {
  function handleSubmit(row, rowIndex) {
    if (!handleFunction) return;
    handleFunction(row, rowIndex);
  }
  return (
    <>
      <Table.ScrollContainer className="rounded-[25px]" minWidth={920}>
        <div className="bg-[#FFFFFF] p-2 rounded-[25px]">
          <Table
            withRowBorders
            className="w-full  rounded-[25px] font-normal text-[18px] "
          >
            {/* Table Head */}
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="text-left text-[18px] font-[400]  text-[#718EBF] p-4  specialBorderBottom pb-3 px-4"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className=" ">
              {data && data?.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    onClick={() => handleSubmit(row, rowIndex)}
                    key={rowIndex}
                    className="border-b cursor-pointer border-gray-200 hover:bg-gray-50 rounded-2xl transition"
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className=" px-4 py-3 text-[#000000] text-[18px] font-[400]"
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
                    className="text-center  py-4 text-gray-500"
                  >
                    {isLoading ? (
                      <Loader className="mx-auto" color="blue" type="bars" />
                    ) : error ? (
                      error
                    ) : (
                      "No Data Available"
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Table.ScrollContainer>
    </>
  );
};

export default TableCom;
