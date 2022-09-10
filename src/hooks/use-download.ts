import { useTransferStore } from "@store/transfer";
import axios from "axios";

export const useDownload = () => {
  const updateFile = useTransferStore(({ updateFile }) => updateFile);

  const download = async (
    fileName: string,
    slug: string,
    downloadShared: boolean = false
  ) => {
    const downloadUrl = `/api/${
      downloadShared ? "download-shared" : "download"
    }/${slug}`;

    axios({
      url: downloadUrl,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        updateFile(fileName, percentage, "download");
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    });
  };

  return { download };
};
