import { Metadata } from "next";
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { fetchCustomerPages, fetchFilteredCustomers, fetchInvoicesPages } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Pagination from "@/app/ui/invoices/pagination";

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomerPages(query);
  const customers = await fetchFilteredCustomers(query)

  console.log(query)

  return (
    <div className="w-full">

      {<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>}
      {/* <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div> */}
    </div>
  )
}