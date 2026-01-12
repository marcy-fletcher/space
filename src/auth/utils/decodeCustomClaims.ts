import {jwtDecode} from "jwt-decode";
import type {CustomJwtClaims} from "./claims.ts";

export function decodeCustomClaims(accessToken: string): CustomJwtClaims {
    const decoded = jwtDecode<CustomJwtClaims>(accessToken)

    return {
        user_role: decoded.user_role ?? 'guest'
    }
}