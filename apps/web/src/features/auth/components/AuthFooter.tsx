import { Link } from "react-router-dom";

interface Props {
  text: string;
  linkText: string;
  to: string;
}

export default function AuthFooter({
  text,
  linkText,
  to,
}: Props) {
  return (
    <div className="mt-8 text-center">
      <span className="text-slate-400">
        {text}
      </span>

      <Link
        to={to}
        className="ml-2 font-semibold text-cyan-400 transition hover:text-cyan-300"
      >
        {linkText}
      </Link>
    </div>
  );
}