import {
  SiFacebook,
  SiX,
  SiInstagram,
  SiLinkerd,
  SiGithub,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

import type { FooterIconKey } from "../types/footer";

// react-simple-icons components take `size` just like lucide-react
// icons do, so no call-site changes are needed anywhere this map
// is consumed (FooterEditor.tsx, Footer.tsx).
export const FOOTER_ICON_MAP: Record<
  FooterIconKey,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  facebook: SiFacebook,
  twitter: SiX, // Twitter rebranded to X; kept the "twitter" key so
  // any already-saved footer data in Mongo (icon: "twitter") keeps
  // working without a migration.
  instagram: SiInstagram,
  linkedin: SiLinkerd,
  github: SiGithub,
  youtube: SiYoutube,
};

export const FOOTER_ICON_OPTIONS = Object.keys(
  FOOTER_ICON_MAP,
) as FooterIconKey[];