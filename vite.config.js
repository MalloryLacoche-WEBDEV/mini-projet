import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ce fichier configure Vite pour utiliser le plugin React.

export default defineConfig({
    plugins: [react()],
})

