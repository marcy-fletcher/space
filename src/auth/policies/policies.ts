import {auth, policy, role} from "./policyBuilders.ts";
import {Roles} from "../types/roles.ts";

export const Policies = {
    adminOrModerator: policy(
        auth(),
        role(Roles.ADMIN, Roles.MODERATOR)
    ),
}