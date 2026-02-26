import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ce fichier configure Vite pour utiliser le plugin React.
// Vous n'avez rien à modifier ici.
// defineConfig() prend un objet de configuration.
// La propriété `plugins` reçoit un tableau — ajoutez-y react() pour activer la compilation JSX.

export default defineConfig({
    plugins: [react()],
})
