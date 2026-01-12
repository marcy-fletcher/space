import {Navigate, useLocation} from 'react-router-dom'
import type {Policy} from "../policies/policy.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {evaluatePolicy} from "../policies/policyEvaluator.ts";
import * as React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    policy: Policy
    redirectTo?: string
    forbiddenTo?: string
    loadingFallback?: React.ReactNode
}

export function ProtectedRoute({
                                   children,
                                   policy,
                                   redirectTo = '/403',
                                   forbiddenTo = '/403',
                                   loadingFallback = null,
                               }: ProtectedRouteProps) {
    const location = useLocation()
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
        return (
            <Navigate
                to={isAuthenticated ? forbiddenTo : redirectTo}
                replace
                state={{ from: location }}
            />
        )
    }

    return children
}
