import {
  FaGithub,
  FaGoogle,
} from "react-icons/fa";

export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <button
        type="button"
        className="
flex
items-center
justify-center
gap-3
rounded-2xl
border
border-white/10
bg-white/5
py-4
text-white
transition-all
duration-300
hover:border-cyan-400/30
hover:bg-cyan-500/10
"
      >
        <FaGoogle size={18} />

        Google
      </button>

      <button
        type="button"
        className="
flex
items-center
justify-center
gap-3
rounded-2xl
border
border-white/10
bg-white/5
py-4
text-white
transition-all
duration-300
hover:border-cyan-400/30
hover:bg-cyan-500/10
"
      >
        <FaGithub size={18} />

        GitHub
      </button>

    </div>
  );
}