import { ShareList } from "@components/share-list";
import { Pagination } from "@components/ui";
import { trpc } from "@utils/trpc";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = trpc.useQuery(["share.get-all"]);

  const shares = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 10;
    const lastPageIndex = firstPageIndex + 10;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  if (isLoading || !shares) {
    return null;
  }

  return (
    <div className="w-full pt-10 mx-auto lg:w-4/5 xl:w-3/5">
      <div className="flex items-center w-full mb-2">
        <div className="flex flex-col w-full">
          <ShareList shares={shares} />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Pagination
          currentPage={currentPage}
          totalCount={data?.length || 0}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
