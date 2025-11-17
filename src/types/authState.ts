// Authentication state
import {User} from "./user.ts";
import {UserProfile} from "./userProfile.ts";

export interface AuthState {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    isAuthenticated: boolean;
}