import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { getIconEdit, subscribeIconStore } from "@/hooks/useCMSIcons";

interface CMSIconProps {
  cmsKey: string;
  cmsLabel?: string;
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> =
  LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>>;

export default function CMSIcon({ cmsKey, cmsLabel, name: defaultName, size: defaultSize = 24, color: defaultColor, className, style }: CMSIconProps) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return subscribeIconStore(() => forceUpdate(n => n + 1));
  }, []);

  const edit = getIconEdit(cmsKey);
  const name = edit?.name ?? defaultName;
  const size = edit?.size ?? defaultSize;
  const color = edit?.color ?? defaultColor;

  const isUrl = name?.startsWith("url:");
  const imageUrl = isUrl ? name.slice(4) : null;

  return (
    <span
      data-cms-key={cmsKey}
      data-cms-label={cmsLabel || `Icon: ${name}`}
      data-cms-attr="icon"
      data-cms-icon-name={name}
      data-cms-icon-size={size}
      data-cms-icon-color={color}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }}
    >
      {isUrl ? (
        <img src={imageUrl!} alt="" width={size} height={size} style={{ objectFit: "contain", display: "block" }} />
      ) : (
        (() => {
          const Icon = ICON_MAP[name] || ICON_MAP["Star"];
          return <Icon size={size} style={{ color }} className={className} />;
        })()
      )}
    </span>
  );
}
