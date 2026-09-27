import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        SH
      </div>

      <div>
        <h1 className="text-lg font-bold text-slate-900">
          SHEWA TECHNOLOGIES
        </h1>

        <p className="text-xs text-slate-500">
          Software Development Company
        </p>
      </div>
    </Link>
  );
}
