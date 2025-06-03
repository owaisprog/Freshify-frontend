import { useState } from "react";
import TableCom from "../../../components/Table";
import { useQueryHook } from "../../../services/reactQuery";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FiUpload } from "react-icons/fi";

function OrganizationOwnerInvoices() {
  const { data: invoices, isLoading: isInvoicesFetech } = useQueryHook({
    queryKey: "invoices",
    endpoint: `/api/customer-payment-receipts`,
    staleTime: 0 * 60 * 1000,
  });

  const [visibleRows, setVisibleRows] = useState(15); // Start with 15 rows
  const token = localStorage.getItem("token");
  const { mutate: downloadInvoice, isPending: isDownloadingInvoice } =
    useMutation({
      mutationFn: (invoiceId) =>
        axios
          .post(
            `https://freshify-backend.vercel.app/api/download-customer-receipt/${invoiceId}`,
            null, // <-- no body → use null/undefined
            {
              responseType: "blob", // lives in CONFIG
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => res.data), // we only need the Blob

      onSuccess: (blob, invoiceId) => {
        const url = URL.createObjectURL(blob);
        Object.assign(document.createElement("a"), {
          href: url,
          download: `invoice-${invoiceId}.pdf`,
        }).click();
        URL.revokeObjectURL(url);
      },

      onError: () => toast.error("Failed to download invoice.",{position:"top-center"}),
    });

  // Define table columns
  const columns = [
    "Merchant Name",
    "Merchant Email",
    "Amount",
    "Date",
    "Action",
  ];

  // Sort invoices by date (newest first) and format data for table
  const formattedData = invoices?.receipts
    ? [...invoices.receipts]
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
        .slice(0, visibleRows) // Show only the latest `visibleRows` rows
        .map((invoice) => ({
          "Merchant Name": invoice.merchantName || "—",
          "Merchant Email": invoice.merchantEmail || "—",
          Amount: `$${invoice.amount.toFixed(2)}`,

          // ▼ CLOSE the options object **and** the toLocaleDateString call here
          Date: new Date(invoice.date).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),

          // ▼ Now the Action cell is a *sibling* property, not nested
          Action: (
            <button
              onClick={() => downloadInvoice(invoice.id)}
              className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
              disabled={isDownloadingInvoice}
            >
              <FiUpload size={18} style={{ color: "#427B42" }} />
            </button>
          ),
        }))
    : [];

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 15); // Increase visible rows by 15
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <TableCom
        columns={columns}
        data={formattedData}
        isLoading={isInvoicesFetech}
        error={invoices?.error || "Failed to load invoices"}
      />
      {invoices?.receipts && visibleRows < invoices.receipts.length && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-black hover:text-black cursor-pointer text-white font-semibold text-[16px] rounded-full hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default OrganizationOwnerInvoices;
