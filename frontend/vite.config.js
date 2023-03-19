import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    server: {
        proxy: {
            proxy: {
                '/api': {
                    target: process.env.VITE_PROXY,
                    changeOrigin: true,
                },
            },
            /*   proxy: {
            '/api': 'https://meal-sharing-app-backend-production.up.railway.app/', // the address that u serve in the backend
        }, */
        },
    },
});
