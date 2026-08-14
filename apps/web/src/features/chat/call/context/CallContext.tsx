import {
  createContext,
} from "react";

import type {
  CallContextValue,
} from "./types";

// =====================================================
// Context
// =====================================================

export const CallContext =
  createContext<
    CallContextValue | null
  >(null);