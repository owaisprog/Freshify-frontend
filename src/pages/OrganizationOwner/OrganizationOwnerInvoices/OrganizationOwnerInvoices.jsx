import { useState } from "react";
import TableCom from "../../../components/Table";
import { useQueryHook } from "../../../services/reactQuery";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { FiUpload, FiDownload } from "react-icons/fi";
import { Loader, Title } from "@mantine/core";

function OrganizationOwnerInvoices() {
  const { data: invoices, isLoading: isInvoicesFetech } = useQueryHook({
    queryKey: "invoices",
    endpoint: `/api/customer-payment-receipts`,
    staleTime: 0 * 60 * 1000,
  });

  const [visibleRows, setVisibleRows] = useState(15); // Start with 15 rows
  const [downLoadLoading, setDownloadLoading] = useState(null);
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
        setDownloadLoading(null);
        const url = URL.createObjectURL(blob);
        Object.assign(document.createElement("a"), {
          href: url,
          download: `invoice-${invoiceId}.pdf`,
        }).click();
        URL.revokeObjectURL(url);
      },

      onError: () => {
        setDownloadLoading(null);
        toast.error("Failed to download invoice.", { position: "top-right" });
      },
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
              onClick={() => {
                setDownloadLoading(invoice.id);
                downloadInvoice(invoice.id);
              }}
              className="flex items-center justify-center p-[6px] rounded bg-[#E7FFEB] cursor-pointer w-[30px] h-[30px]"
              disabled={isDownloadingInvoice}
            >
              {downLoadLoading === invoice.id ? (
                <Loader size={"xs"} type="dots" color="green" />
              ) : (
                <FiDownload size={18} style={{ color: "#427B42" }} />
              )}
            </button>
          ),
        }))
    : [];

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 15); // Increase visible rows by 15
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 lg:px-6 px-2 lg:bg-[#FFFFFF] py-[18px] rounded-[16px]">
        <Title
          c={"black"}
          className="lg:!text-[32px] !text-[24px] !font-[500] !m-0"
        >
          Invoices
        </Title>
      </div>
      <section className=" max-w-[1440px]  mx-auto -mt-10 lg:mt-0  px-2 lg:px-0 flex flex-col justify-between w-full  gap-8">
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
      </section>
    </div>
  );
}

export default OrganizationOwnerInvoices;
