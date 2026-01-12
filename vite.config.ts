import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],

    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {

                    if (id.includes('fortawesome')) {
                        return 'vendor-font-awesome';
                    }

                    if (id.includes('hook-form') ||
                        id.includes('zod')) {
                        return 'vendor-forms'
                    }

                    if (id.includes('tanstack') ||
                        id.includes('zustand')) {
                        return 'vendor-states'
                    }

                    if (id.includes('react-router') ||
                        id.includes('react-dom')) {
                        return 'vendor-react'
                    }

                    return null;
                }
            }
        }
    }
})
