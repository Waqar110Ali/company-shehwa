// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import GlassCard from "@/components/premium/GlassCard";

// import type {
//   Reports,
// } from "../types/report";

// interface Props {
//   reports: Reports;
// }

// export default function RevenueChart({
//   reports,
// }: Props) {
//   const data =
//     reports.payroll.byDepartment;

//   return (
//     <GlassCard className="rounded-3xl border border-white/10 p-6">
//       <h2 className="mb-2 text-2xl font-bold text-white">
//         Payroll by Department
//       </h2>

//       <p className="mb-6 text-sm text-slate-400">
//         Monthly payroll based on current employee salaries.
//       </p>

//       {data.length === 0 ? (
//         <div className="flex h-[350px] items-center justify-center text-slate-400">
//           No payroll data available.
//         </div>
//       ) : (
//         <ResponsiveContainer
//           width="100%"
//           height={350}
//         >
//           <BarChart data={data}>
//             <CartesianGrid
//               stroke="#334155"
//             />

//             <XAxis
//               dataKey="department"
//               tick={{
//                 fill: "#94a3b8",
//               }}
//             />

//             <YAxis
//               tick={{
//                 fill: "#94a3b8",
//               }}
//             />

//             <Tooltip />

//             <Bar
//               dataKey="payroll"
//               name="Payroll"
//               fill="#06b6d4"
//               radius={[
//                 8,
//                 8,
//                 0,
//                 0,
//               ]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </GlassCard>
//   );
// }