import { ShareList } from "@components/share-list";
import { trpc } from "@utils/trpc";

const Dashboard = () => {
  const { data, isLoading } = trpc.useQuery(["share.get-all"]);

  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="w-full pt-10 mx-auto lg:w-4/5 xl:w-3/5">
      <div className="flex items-center w-full mb-2">
        <div className="flex flex-col w-full">
          <ShareList shares={data} />
        </div>
      </div>
    </div>
  );
};

Dashboard.auth = true;

export default Dashboard;
