import { useQueryHook } from "../services/reactQuery";
import TableCom from "./Table";

function TransactionsTable({ endpoint }) {
  const {
    data: response = {},
    isLoading,
    error,
  } = useQueryHook({
    queryKey: "transaction",
    endpoint: endpoint,
    staleTime: 0 * 60 * 1000, // Cache for 15 minutes
  });

  const transactions = response?.transactions || [];

  const columns = ["Name", "Amount", "BookingDate", "Time"]; // Changed "timeSlot" to "Time"

  // const handleSubmit = () => {

  // };

  // Format the data for the table
  const tableData = transactions.map((transaction) => {
    // Format time slot (startTime - endTime)
    const timeSlot =
      transaction.startTime && transaction.endTime
        ? `${transaction.startTime} - ${transaction.endTime}`
        : "—";

    // Format booking date
    const bookingDate = transaction.bookingDate
      ? new Date(transaction.bookingDate).toLocaleDateString()
      : new Date(transaction.createdAt).toLocaleDateString();

    return {
      Name: transaction.name || "—",
      Amount: transaction.amount ? `$ ${transaction.amount}` : "—",
      BookingDate: bookingDate,
      Time: timeSlot, // Changed property name to match column header
      // Include the original data in case you need it in handleSubmit
      originalData: transaction,
    };
  });

  return (
    <div>
      <TableCom
        data={tableData}
        error={error?.message || "No transactions Availiable"}
        columns={columns}
        isLoading={isLoading}
        // handleFunction={handleSubmit}
      />
    </div>
  );
}

export default TransactionsTable;
