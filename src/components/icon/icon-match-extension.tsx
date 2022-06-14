import { IconArchive } from "./icon-archive";
import { IconCog } from "./icon-cog";
import { IconDocument } from "./icon-document";
import { IconMusic } from "./icon-music";
import { IconPhotograph } from "./icon-photograph";
import { IconTerminal } from "./icon-terminal";
import { IconText } from "./icon-text";

interface Props {
  ext?: string;
}

const textExt = [".txt", ".md", ".html", ".css", ".js"];
const photoExt = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
const musicExt = [".mp3", ".wav", ".flac", ".ogg", ".aac", ".wma", ".m4a"];
const scriptExt = [".sh", ".bat", ".ps1"];
const executableExt = [".exe", ".msi"];
const archiveExt = [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".xz"];

export const IconMatchExtension = ({ ext }: Props) => {
  if (!ext) return null;

  if (textExt.includes(ext)) return <IconText />;
  if (photoExt.includes(ext)) return <IconPhotograph />;
  if (musicExt.includes(ext)) return <IconMusic />;
  if (scriptExt.includes(ext)) return <IconTerminal />;
  if (executableExt.includes(ext)) return <IconCog />;
  if (archiveExt.includes(ext)) return <IconArchive />;

  return <IconDocument />;
};
