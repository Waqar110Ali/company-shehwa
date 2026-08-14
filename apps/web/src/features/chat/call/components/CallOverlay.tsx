import { CallWindow } from "./CallWindow";
import { IncomingCallDialog } from "./IncomingCallDialog";

export function CallOverlay() {
    return (
        <>
            <IncomingCallDialog />

            <CallWindow />
        </>
    );
}