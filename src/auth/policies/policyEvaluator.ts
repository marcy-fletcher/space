import type {Policy, PolicyRule} from './policy.ts'
import type {PolicyContext} from "./policyContext.ts";

type RuleEvaluator<T extends PolicyRule> = (
    rule: T,
    ctx: PolicyContext
) => boolean

const evaluators: {
    [K in PolicyRule['type']]: RuleEvaluator<Extract<PolicyRule, { type: K }>>
} = {
    auth: (_rule, ctx) => ctx.isAuthenticated,
    noAuth: (_rule, ctx) => !ctx.isAuthenticated,

    'role': (rule, ctx) =>
        rule.roles.includes(ctx.role),

    predicate: (rule, ctx) => rule.evaluate(ctx),
}

export function evaluatePolicy(policy: Policy, ctx: PolicyContext): boolean {
    return policy.rules.every((rule) => {
        const evaluator = evaluators[rule.type] as (rule: PolicyRule, ctx: PolicyContext) => boolean;
        return evaluator(rule, ctx);
    })
}
