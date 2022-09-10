import { GetServerSideProps } from "next";
import { prisma } from "@server/db/prisma";
import { isText } from "istextorbinary";
import { checkShareExpiry } from "@utils/utils";
import { FilePreview } from "@components/file-preview";
import { Error } from "@components/error";

interface Share {
  slug: string;
  id: string;
  fileName: string;
  path: string;
  size: number;
}

interface Props {
  share?: Share;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const slug = query.slug as string;
  if (!slug) {
    return {
      props: {
        error: "No share slug provided",
      },
    };
  }

  const share = await prisma.share.findFirst({
    where: {
      id: slug,
    },
    include: { file: true },
  });

  if (!share || !share.file) {
    return {
      props: {
        error: "Share not found",
      },
    };
  }

  const expired = checkShareExpiry(share);
  if (expired) {
    return {
      props: {
        error: "Share expired",
      },
    };
  }

  const previewable = isText(share.file.name);
  if (previewable) {
    await prisma.share.update({
      data: { downloads: share.downloads + 1 },
      where: { id: share.id },
    });
  }

  return {
    props: {
      share: {
        id: share.id,
        fileName: share.file.name,
        path: share.file.path,
        size: share.file.size,
        slug,
      },
    },
  };
};

const Share = ({ share, error }: Props) => {
  if (error || !share) {
    return <Error msg={error} />;
  }

  const path = share.path.split("/");

  return (
    <div className="flex items-center justify-center w-full h-full">
      <FilePreview path={path} shareId={share.slug} />
    </div>
  );
};

export default Share;
