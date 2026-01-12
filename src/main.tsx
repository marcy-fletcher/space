import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const AGE_VERIFIED_KEY = 'age_verified';

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__:
            import("@tanstack/query-core").QueryClient;
    }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
)