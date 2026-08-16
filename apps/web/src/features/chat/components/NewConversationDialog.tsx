// import {
//   useMemo,
//   useState,
// } from "react";

// import {
//   Loader2,
//   MessageSquarePlus,
//   Search,
// } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";

// import { useEmployees } from "@/features/employees/hooks/useEmployees";
// import { mapEmployee } from "@/features/employees/mapper/employee.mapper";

// import { useCreateConversation } from "../hooks/useCreateConversation";

// interface Props {
//   open: boolean;

//   onOpenChange(
//     value: boolean,
//   ): void;

//   onCreated(
//     conversationId: string,
//   ): void;
// }

// export default function NewConversationDialog({
//   open,
//   onOpenChange,
//   onCreated,
// }: Props) {
//   const [search, setSearch] =
//     useState("");

//   console.log(
//     "Dialog Render -> open:",
//     open,
//   );

//   const {
//     data,
//     isLoading,
//   } = useEmployees(search);

//   const createConversation =
//     useCreateConversation();

//   const employees =
//     useMemo(() => {
//       if (!data) {
//         return [];
//       }

//       return data.items.map(
//         mapEmployee,
//       );
//     }, [data]);

//   async function create(
//     employeeId: string,
//   ) {
//     console.log(
//       "Creating conversation with:",
//       employeeId,
//     );

//     try {
//       const conversation =
//         await createConversation.mutateAsync({
//           participantId:
//             employeeId,
//         });

//       console.log(
//         "Conversation created:",
//         conversation,
//       );

//       onCreated(
//         conversation.id,
//       );

//       console.log(
//         "Closing dialog after create...",
//       );

//       onOpenChange(false);
//     } catch (error) {
//       console.error(
//         "Conversation creation failed:",
//         error,
//       );
//     }
//   }

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(value) => {
//         console.log(
//           "Dialog onOpenChange:",
//           value,
//         );

//         onOpenChange(value);
//       }}
//     >
//       <DialogContent className="max-w-lg border-white/10 bg-[#0B1120]">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <MessageSquarePlus className="h-5 w-5" />

//             Start Conversation
//           </DialogTitle>
//         </DialogHeader>

//         <div className="relative">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

//           <Input
//             value={search}
//             onChange={(e) =>
//               setSearch(
//                 e.target.value,
//               )
//             }
//             placeholder="Search employee..."
//             className="pl-10"
//           />
//         </div>

//         <ScrollArea className="mt-4 h-96">
//           {isLoading ? (
//             <div className="flex justify-center py-8">
//               <Loader2 className="h-6 w-6 animate-spin" />
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {employees.map(
//                 (
//                   employee,
//                 ) => (
//                   <button
//                     key={
//                       employee.id
//                     }
//                     type="button"
//                     onClick={() =>
//                       create(
//                         employee.id,
//                       )
//                     }
//                     className="flex w-full items-center gap-4 rounded-xl p-3 transition hover:bg-white/5"
//                   >
//                     <Avatar>
//                       <AvatarImage
//                         src={
//                           employee.avatar
//                         }
//                       />

//                       <AvatarFallback>
//                         {employee.firstName.charAt(
//                           0,
//                         )}
//                       </AvatarFallback>
//                     </Avatar>

//                     <div className="flex-1 text-left">
//                       <p className="font-medium">
//                         {
//                           employee.name
//                         }
//                       </p>

//                       <p className="text-xs text-muted-foreground">
//                         {
//                           employee.designation
//                         }
//                       </p>
//                     </div>

//                     <Button
//                       size="sm"
//                       type="button"
//                     >
//                       Chat
//                     </Button>
//                   </button>
//                 ),
//               )}

//               {!employees.length && (
//                 <div className="py-8 text-center text-sm text-muted-foreground">
//                   No employees found.
//                 </div>
//               )}
//             </div>
//           )}
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }



// apps/web/src/features/chat/components/NewConversationDialog.tsx
import { useMemo, useState } from "react";

import { Loader2, MessageSquarePlus, Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEmployees } from "@/features/employees/hooks/useEmployees";
import { mapEmployee } from "@/features/employees/mapper/employee.mapper";

import { useCreateConversation } from "../hooks/useCreateConversation";

interface Props {
  open: boolean;
  onOpenChange(value: boolean): void;
  onCreated(conversationId: string): void;
}

export default function NewConversationDialog({
  open,
  onOpenChange,
  onCreated,
}: Props) {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useEmployees(search);
  const createConversation = useCreateConversation();

  const employees = useMemo(() => {
    if (!data) return [];
    return data.items.map(mapEmployee);
  }, [data]);

  async function create(employeeId: string) {
    try {
      const conversation = await createConversation.mutateAsync({
        participantId: employeeId,
      });

      onCreated(conversation.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Conversation creation failed:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] border-white/10 bg-[#0B1120] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5" />
            Start Conversation
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee..."
            className="pl-10"
          />
        </div>

        <ScrollArea className="mt-4 h-80 sm:h-96">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {employees.map((employee) => (
                <button
                  key={employee.id}
                  type="button"
                  onClick={() => create(employee.id)}
                  className="flex w-full items-center gap-3 rounded-xl p-3 transition hover:bg-white/5 sm:gap-4"
                >
                  <Avatar>
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback>
                      {employee.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate font-medium">{employee.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {employee.designation}
                    </p>
                  </div>

                  <Button size="sm" type="button" className="shrink-0">
                    Chat
                  </Button>
                </button>
              ))}

              {!employees.length && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No employees found.
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}