import { getCurrentUser } from "../services/auth.service";

export function authHeader() {
  // return authorization header with jwt token
  if (getCurrentUser && getCurrentUser.token) {
    return { Authorization: `Bearer ${getCurrentUser.token}` };
  } else {
    return {};
  }
}
