import type {Policy} from "../policies/policy.ts";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import { Outlet } from 'react-router-dom';
import type {ReactNode} from "react";

interface ProtectedRoutesProps {
    policy: Policy;
    redirectTo?: string;
    forbiddenTo?: string;
    loadingFallback?: ReactNode;
}

export function ProtectedRoutes(props: ProtectedRoutesProps) {
    return <ProtectedRoute {...props}>{<Outlet />}</ProtectedRoute>;
}