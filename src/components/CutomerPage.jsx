import { Title, Select, Group, Box } from "@mantine/core";
import { useQueryHook } from "../services/reactQuery";
import TableCom from "./Table";
import { useState, useMemo } from "react";

function CustomerPage() {
  const {
    data: response = {},
    isLoading,
    error,
  } = useQueryHook({
    queryKey: "transaction",
    endpoint: `/api/organization-transactions-details`,
    staleTime: 0 * 60 * 1000,
  });

  // Memoize the response data to prevent unnecessary recalculations
  const transactions = useMemo(
    () => response?.transactions || [],
    [response?.transactions]
  );
  const locations = useMemo(
    () => response?.locations || [],
    [response?.locations]
  );
  const barbers = useMemo(() => response?.barbers || [], [response?.barbers]);

  // State for filters
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);

  // Prepare filter data for Select - ensure values are strings
  const locationOptions = useMemo(
    () => [
      { value: "", label: "All Locations" },
      ...locations.map((location) => ({
        value: String(location),
        label: String(location),
      })),
    ],
    [locations]
  );

  const barberOptions = useMemo(
    () => [
      { value: "", label: "All Professionals" },
      ...barbers.map((barber) => ({
        value: String(barber),
        label: String(barber),
      })),
    ],
    [barbers]
  );

  const columns = ["Name", "Email", "Barber", "Location"];

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        // Location filter
        const matchesLocation =
          !selectedLocation ||
          String(transaction.locationName) === selectedLocation;

        // Barber filter
        const matchesBarber =
          !selectedBarber || String(transaction.barberName) === selectedBarber;

        return matchesLocation && matchesBarber;
      }),
    [transactions, selectedLocation, selectedBarber]
  );

  // Format the data for the table
  const tableData = useMemo(
    () =>
      filteredTransactions.map((transaction) => ({
        Name: transaction.name || "—",
        Email: transaction.email || "—",
        Barber: transaction.barberName || "—",
        Location: transaction.locationName || "—",
        originalData: transaction,
      })),
    [filteredTransactions]
  );

  return (
    <section>
      <div className="flex flex-col lg:flex-row  lg:justify-between gap-2">
        <Title className="!text-[18px] !font-[400] lg:!text-[22px] lg:!font-[700]">
          Customers
        </Title>
        <Group>
          <Box className="w-[200px]">
            <Select
              data={locationOptions}
              value={selectedLocation}
              onChange={setSelectedLocation}
              placeholder="Select location"
              clearable
            />
          </Box>
          <Box className="w-[200px]">
            <Select
              data={barberOptions}
              value={selectedBarber}
              onChange={setSelectedBarber}
              placeholder="Select professional"
              clearable
            />
          </Box>
        </Group>
      </div>
      <div className="mt-3">
        <TableCom
          data={tableData}
          error={error?.message || "No customers available"}
          columns={columns}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

export default CustomerPage;
