import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://192.168.1.10:3000", // CHANGE THIS TO YOUR LOCAL IP
  disableCSRFTokenCheck: true, // Needed for mobile usually
});
