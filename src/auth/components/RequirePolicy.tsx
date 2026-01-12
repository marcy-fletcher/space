import * as React from "react"
import type { Policy } from "../policies/policy.ts"
import { useAuth } from "../hooks/useAuth.ts"
import { evaluatePolicy } from "../policies/policyEvaluator.ts"

interface RequirePolicyProps {
    children: React.ReactNode
    policy: Policy
    fallback?: React.ReactNode
    loadingFallback?: React.ReactNode
}

export function RequirePolicy({
                                  children,
                                  policy,
                                  fallback = null,
                                  loadingFallback = null,
                              }: RequirePolicyProps) {
    const {
        initialized,
        isAuthenticated,
        role
    } = useAuth()

    if (!initialized) {
        return <>{loadingFallback}</>
    }

    const allowed = evaluatePolicy(policy, {
        isAuthenticated,
        role
    })

    if (!allowed) {
        return <>{fallback}</>
    }

    return <>{children}</>
}