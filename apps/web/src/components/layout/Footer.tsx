// apps/web/src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Container from "@/components/common/Container";
import Logo from "@/components/ui/Logo";

import { footerApi } from "@/features/footer/api/footer.api";
import { DEFAULT_FOOTER_CONTENT } from "@/features/footer/types/footer";
import { FOOTER_ICON_MAP } from "@/features/footer/utils/footer-icons";

export default function Footer() {
  const { data } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => (await footerApi.getFooter()).data,
  });

  const content = data ?? DEFAULT_FOOTER_CONTENT;

  return (
    <footer className="border-t bg-slate-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />

            <p className="mt-5 text-sm leading-7 text-slate-400">
              {content.description}
            </p>

            <div className="mt-6 flex gap-4">
              {content.socialLinks.map((social) => {
                const Icon = FOOTER_ICON_MAP[social.icon];

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-slate-800 p-2 transition hover:bg-blue-600"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Company</h3>

            <div className="flex flex-col gap-3">
              {content.sections.company.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Services</h3>

            <div className="flex flex-col gap-3">
              {content.sections.services.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold">Legal</h3>

            <div className="flex flex-col gap-3">
              {content.sections.legal.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {content.copyrightText}
        </div>
      </Container>
    </footer>
  );
}