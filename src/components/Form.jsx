// Composant Form — Formulaire de saisie des paramètres
// Ce composant reçoit une prop `onGenerate` depuis App.jsx
// et l'appelle quand l'utilisateur soumet le formulaire.

import { useState } from 'react'
import { OBJECTIVES } from '../data/objectives.js'
import styles from './Form.module.css'


function Form({ onGenerate }) {
    const [weightMin, setWeightMin] = useState()
    const [weightMax, setWeightMax] = useState()
    const [rows, setRows] = useState(6)
    const [selectedObjectives, setSelectedObjectives] = useState([])
    const [error, setError] = useState('')  // message d'erreur de validation

    function handleCheckboxChange(objectiveID) {
        if (selectedObjectives.includes(objectiveID)) {
            setSelectedObjectives(prev => prev.filter(id => id !== objectiveID))
        } else {
            setSelectedObjectives(prev => [...prev, objectiveID])
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        // Validation : poids min ne peut pas être supérieur au poids max
        if (weightMin > weightMax) {
            setError('Le poids minimum doit être inférieur ou égal au poids maximum.')
            return  
        }

        // Cas spécial : si min === max, on force 1 seule ligne
        const effectiveRows = weightMin === weightMax ? 1 : rows

        setError('') 
        onGenerate({ weightMin, weightMax, rows: effectiveRows, selectedObjectives })
    }

    function blockInvalidKeys(e) {
        if (['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault()
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Paramètres</h2>
            <fieldset className={styles.fieldset}>
                <legend>Objectif(s) sportif(s)</legend>
                {OBJECTIVES.map(obj => (
                    <label key={obj.id} className={styles.checkboxLabel}>
                        <input type="checkbox" checked={selectedObjectives.includes(obj.id)} onChange={() => handleCheckboxChange(obj.id)} />
                        {obj.label}
                    </label>
                ))}
            </fieldset>
            <div className={styles.fieldsRow}>
                <div className={styles.fieldGroup}>
                    <label>Poids minimum (kg)</label>
                    <input type="number" value={weightMin} onKeyDown={blockInvalidKeys} onChange={(e) => setWeightMin(Number(e.target.value))} />
                </div>
                <div className={styles.fieldGroup}>
                    <label>Poids maximum (kg)</label>
                    <input type="number" value={weightMax} onKeyDown={blockInvalidKeys} onChange={(e) => setWeightMax(Number(e.target.value))} />
                </div>
                <div className={styles.fieldGroup}>
                    <label>Nombre de lignes</label>
                    <input type="number" value={rows} onKeyDown={blockInvalidKeys} onChange={(e) => setRows(Number(e.target.value))} />
                </div>
            </div>
            {/* Message d'erreur — affiché seulement si error n'est pas vide */}
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.button} type="submit">Générer le tableau</button>
        </form>
    )
}

export default Form

