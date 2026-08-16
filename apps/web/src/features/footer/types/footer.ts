export type FooterIconKey =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "github"
  | "youtube";

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: FooterIconKey;
}

export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterContent {
  description: string;
  copyrightText: string;
  socialLinks: FooterSocialLink[];
  sections: {
    company: FooterLink[];
    services: FooterLink[];
    legal: FooterLink[];
  };
}

export const DEFAULT_FOOTER_CONTENT: FooterContent = {
  description:
    "Building scalable web, mobile, AI and cloud solutions for startups, businesses and enterprises.",
  copyrightText: "AI Company Management Platform. All rights reserved.",
  socialLinks: [],
  sections: {
    company: [],
    services: [],
    legal: [],
  },
};