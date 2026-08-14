import FadeUp from "@/components/motion/FadeUp";
import GradientText from "@/components/premium/GradientText";

export default function AuthLeftPanel() {
  return (
    <div className="relative hidden overflow-hidden border-r border-white/10 lg:flex">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.12),transparent_40%)]" />

      <div className="relative z-10 flex w-full flex-col justify-center px-20">

        <FadeUp>

          <span className="inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            Shehwa Technology
          </span>

        </FadeUp>

        <FadeUp delay={0.15}>

          <h1 className="mt-8 text-6xl font-black leading-tight text-white">

            Welcome to

            <br />

            <GradientText>
              Company Portal
            </GradientText>

          </h1>

        </FadeUp>

        <FadeUp delay={0.3}>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            Manage projects, employees, AI tools, attendance,
            reports and business operations from one premium
            platform.
          </p>

        </FadeUp>

        <FadeUp delay={0.45}>

          <div className="mt-14 grid grid-cols-2 gap-6">

            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-4xl font-black text-cyan-300">
                250+
              </h3>

              <p className="mt-3 text-slate-300">
                Projects Delivered
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-4xl font-black text-cyan-300">
                98%
              </h3>

              <p className="mt-3 text-slate-300">
                Client Satisfaction
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-4xl font-black text-cyan-300">
                30+
              </h3>

              <p className="mt-3 text-slate-300">
                Team Members
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-4xl font-black text-cyan-300">
                AI
              </h3>

              <p className="mt-3 text-slate-300">
                Powered Workspace
              </p>
            </div>

          </div>

        </FadeUp>

      </div>
    </div>
  );
}