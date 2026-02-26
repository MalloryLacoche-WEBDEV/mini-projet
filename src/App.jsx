// Composant racine de l'application
// Ce composant est le "chef d'orchestre" : il gère l'état global
// et décide quoi afficher selon les actions de l'utilisateur.

import { useState } from 'react'
import Form from './components/Form.jsx'
import ProteinTable from './components/ProteinTable.jsx'
import Header from './components/Header.jsx'

function App() {
    const [params, setParams] = useState(null)
    function handleGenerate(formValues) {
        setParams(formValues);
    }
    return (
        <div className="container">
            <Header />
            <main>
                <Form onGenerate={handleGenerate} />
                {params && <ProteinTable params={params} />}
            </main>
        </div>
    )
}

export default App
