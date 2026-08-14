import { Link } from "react-router-dom";

import Container from "@/components/common/Container";
import Logo from "@/components/ui/Logo";

import { footerSections } from "@/constants/footer";
import { socialLinks } from "@/constants/social";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Logo />

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Building scalable web, mobile, AI and cloud solutions
              for startups, businesses and enterprises.
            </p>

            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;

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

          {/* Company Links */}
          <div>
            <h3 className="mb-5 font-semibold">Company</h3>

            <div className="flex flex-col gap-3">
              {footerSections.company.map((item) => (
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

          {/* Services */}
          <div>
            <h3 className="mb-5 font-semibold">Services</h3>

            <div className="flex flex-col gap-3">
              {footerSections.services.map((item) => (
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

          {/* Legal */}
          <div>
            <h3 className="mb-5 font-semibold">Legal</h3>

            <div className="flex flex-col gap-3">
              {footerSections.legal.map((item) => (
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
          © {new Date().getFullYear()} AI Company Management Platform.
          All rights reserved.
        </div>
      </Container>
    </footer>
  );
}