import { inferQueryResponse } from "@pages/api/trpc/[trpc]";

export function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export function checkShareExpiry(
  share: inferQueryResponse<"share.get-all">[0]
) {
  if (share.permanent) return false;
  if (share.downloadLimit === -1) {
    if (share.expires && new Date(share.expires).getTime() < Date.now())
      return true;

    return false;
  }

  if (share.downloads >= share.downloadLimit) return true;
  return false;
}
