// import { useForm } from "react-hook-form";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import MemberSelector from "../components/MemberSelector";

// import { useCreateProject } from "../hooks/useCreateProject";

// interface Props {
//   open: boolean;

//   onOpenChange: (
//     open: boolean,
//   ) => void;
// }

// type ProjectForm = {
//   name: string;

//   description: string;

//   status:
//   | "Planning"
//   | "Active"
//   | "On Hold"
//   | "Completed";

//   priority:
//   | "Low"
//   | "Medium"
//   | "High"
//   | "Critical";

//   startDate: string;

//   dueDate: string;

//   members: string[];
// };

// export default function CreateProjectDialog({
//   open,
//   onOpenChange,
// }: Props) {
//   const createProject =
//     useCreateProject();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: {
//       errors,
//     },
//   } = useForm<ProjectForm>({
//     defaultValues: {
//       name: "",

//       description: "",

//       status: "Planning",

//       priority: "Medium",

//       startDate: "",

//       dueDate: "",

//       members: [],
//     },
//   });

//   const members =
//     watch("members");

//   async function onSubmit(
//     data: ProjectForm,
//   ) {
//     console.log("PROJECT PAYLOAD");
//     console.log(data);

//     console.log("MEMBERS");
//     console.log(data.members);
//     try {
//       await createProject.mutateAsync(
//         data,
//       );

//       reset({
//         name: "",

//         description: "",

//         status: "Planning",

//         priority: "Medium",

//         startDate: "",

//         dueDate: "",

//         members: [],
//       });

//       onOpenChange(false);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={onOpenChange}
//     >
//       <DialogContent className="sm:max-w-2xl">
//         <DialogHeader>

//           <DialogTitle>
//             Create New Project
//           </DialogTitle>

//         </DialogHeader>

//         <form
//           onSubmit={handleSubmit(
//             onSubmit,
//           )}
//           className="space-y-6"
//         >

//           <div>

//             <Input
//               placeholder="Project Name"
//               {...register("name", {
//                 required:
//                   "Project name is required.",
//               })}
//             />

//             {errors.name && (
//               <p className="mt-2 text-sm text-red-500">
//                 {
//                   errors.name
//                     .message
//                 }
//               </p>
//             )}

//           </div>

//           <div>

//             <Textarea
//               rows={5}
//               placeholder="Project Description"
//               {...register(
//                 "description",
//               )}
//             />

//           </div>

//           <div className="grid grid-cols-2 gap-5">

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Status
//               </label>

//               <select
//                 className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none"
//                 {...register(
//                   "status",
//                 )}
//               >
//                 <option value="Planning">
//                   Planning
//                 </option>

//                 <option value="Active">
//                   Active
//                 </option>

//                 <option value="On Hold">
//                   On Hold
//                 </option>

//                 <option value="Completed">
//                   Completed
//                 </option>

//               </select>

//             </div>

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Priority
//               </label>

//               <select
//                 className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none"
//                 {...register(
//                   "priority",
//                 )}
//               >
//                 <option value="Low">
//                   Low
//                 </option>

//                 <option value="Medium">
//                   Medium
//                 </option>

//                 <option value="High">
//                   High
//                 </option>

//                 <option value="Critical">
//                   Critical
//                 </option>

//               </select>

//             </div>

//           </div>

//           <div className="grid grid-cols-2 gap-5">

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Start Date
//               </label>

//               <Input
//                 type="date"
//                 {...register(
//                   "startDate",
//                   {
//                     required:
//                       "Start date is required.",
//                   },
//                 )}
//               />

//               {errors.startDate && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {
//                     errors
//                       .startDate
//                       .message
//                   }
//                 </p>
//               )}

//             </div>

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Due Date
//               </label>

//               <Input
//                 type="date"
//                 {...register(
//                   "dueDate",
//                   {
//                     required:
//                       "Due date is required.",
//                   },
//                 )}
//               />

//               {errors.dueDate && (
//                 <p className="mt-2 text-sm text-red-500">
//                   {
//                     errors
//                       .dueDate
//                       .message
//                   }
//                 </p>
//               )}

//             </div>

//           </div>

//           <MemberSelector
//             value={members}
//             onChange={(
//               value,
//             ) =>
//               setValue(
//                 "members",
//                 value,
//                 {
//                   shouldDirty: true,
//                   shouldTouch: true,
//                 },
//               )
//             }
//           />

//           <DialogFooter>

//             <Button
//               type="button"
//               variant="outline"
//               onClick={() =>
//                 onOpenChange(
//                   false,
//                 )
//               }
//             >
//               Cancel
//             </Button>

//             <Button
//               type="submit"
//               disabled={
//                 createProject.isPending
//               }
//             >
//               {createProject.isPending
//                 ? "Creating..."
//                 : "Create Project"}
//             </Button>

//           </DialogFooter>

//         </form>

//       </DialogContent>
//     </Dialog>
//   );
// }


import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import MemberSelector from "../components/MemberSelector";

import { useCreateProject } from "../hooks/useCreateProject";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ProjectForm = {
  name: string;
  description: string;
  status: "Planning" | "Active" | "On Hold" | "Completed";
  priority: "Low" | "Medium" | "High" | "Critical";
  startDate: string;
  dueDate: string;
  members: string[];
};

export default function CreateProjectDialog({ open, onOpenChange }: Props) {
  const createProject = useCreateProject();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectForm>({
    defaultValues: {
      name: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      dueDate: "",
      members: [],
    },
  });

  const members = watch("members");

  async function onSubmit(data: ProjectForm) {
    try {
      await createProject.mutateAsync(data);

      reset({
        name: "",
        description: "",
        status: "Planning",
        priority: "Medium",
        startDate: "",
        dueDate: "",
        members: [],
      });

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              placeholder="Project Name"
              {...register("name", {
                required: "Project name is required.",
              })}
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              rows={5}
              placeholder="Project Description"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none"
                {...register("status")}
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Priority
              </label>

              <select
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none"
                {...register("priority")}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Start Date
              </label>

              <Input
                type="date"
                {...register("startDate", {
                  required: "Start date is required.",
                })}
              />

              {errors.startDate && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Due Date
              </label>

              <Input
                type="date"
                {...register("dueDate", {
                  required: "Due date is required.",
                })}
              />

              {errors.dueDate && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          <MemberSelector
            value={members}
            onChange={(value) =>
              setValue("members", value, {
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={createProject.isPending}>
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}