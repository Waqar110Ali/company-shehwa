// // // import { useEffect, useRef } from "react";

// // // import MessageBubble from "./MessageBubble";
// // // import TypingIndicator from "./TypingIndicator";

// // // import type { ChatMessage } from "../types/chat";

// // // interface Props {
// // //   messages: ChatMessage[];
// // //   typing: boolean;
// // // }

// // // export default function ChatWindow({ messages, typing }: Props) {
// // //   const bottomRef = useRef<HTMLDivElement>(null);

// // //   useEffect(() => {
// // //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages, typing]);

// // //   return (
// // //     <div className="flex h-full min-h-0 flex-col overflow-y-auto p-6">
// // //       <div className="flex flex-1 flex-col gap-5">
// // //         {messages.map((message) => (
// // //           <MessageBubble key={message.id} message={message} />
// // //         ))}

// // //         {typing && <TypingIndicator />}

// // //         <div ref={bottomRef} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useRef } from "react";

// // import MessageBubble from "./MessageBubble";
// // import TypingIndicator from "./TypingIndicator";

// // import type { ChatMessage } from "../types/chat";

// // interface Props {
// //   messages: ChatMessage[];
// //   typing: boolean;
// // }

// // export default function ChatWindow({ messages, typing }: Props) {
// //   const bottomRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, typing]);

// //   return (
// //     <div className="flex h-full min-h-0 flex-col overflow-y-auto p-6">
// //       <div className="flex flex-1 flex-col gap-5">
// //         {messages.map((message) => (
// //           <MessageBubble key={message.id} message={message} />
// //         ))}

// //         {typing && <TypingIndicator />}

// //         <div ref={bottomRef} />
// //       </div>
// //     </div>
// //   );
// // }

// // apps/web/src/features/assistant/components/ChatWindow.tsx
// import { useEffect, useRef } from "react";

// import MessageBubble from "./MessageBubble";
// import TypingIndicator from "./TypingIndicator";

// import type { ChatMessage } from "../types/chat";

// interface Props {
//   messages: ChatMessage[];
//   typing: boolean;
// }

// export default function ChatWindow({ messages, typing }: Props) {
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, typing]);

//   return (
//     <div className="flex h-full min-h-0 flex-col overflow-y-auto p-4 sm:p-6">
//       <div className="flex flex-1 flex-col gap-4 sm:gap-5">
//         {messages.map((message) => (
//           <MessageBubble key={message.id} message={message} />
//         ))}

//         {typing && <TypingIndicator />}

//         <div ref={bottomRef} />
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

import type { ChatMessage } from "../types/chat";

interface Props {
  messages: ChatMessage[];
  typing: boolean;
}

export default function ChatWindow({ messages, typing }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 md:p-6">
      <div className="flex min-h-full flex-col gap-4 sm:gap-5">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {typing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
