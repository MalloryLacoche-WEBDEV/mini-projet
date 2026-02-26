// Composant ProteinTable — Tableau dynamique des besoins en protéines
// Ce composant reçoit `params` depuis App.jsx via les props.

import { OBJECTIVES } from '../data/objectives.js'
import styles from './ProteinTable.module.css'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function ProteinTable({ params }) {
    const { weightMin, weightMax, rows, selectedObjectives } = params
    const activeObjectives = OBJECTIVES.filter(obj => selectedObjectives.includes(obj.id))

    function generateWeights() {
        // Cas spécial : 1 seule ligne (min === max)
        // Sans ce test : step = 0 / 0 = NaN → bug
        if (rows === 1) return [weightMin]

        const weights = []
        const step = (weightMax - weightMin) / (rows - 1)
        for (let i = 0; i < rows; i++) {
            weights.push(Math.round(weightMin + i * step))
        }
        return weights
    }

    function calculateRange(weight, objective) {
        const protMin = Math.round(weight * objective.min)
        const protMax = Math.round(weight * objective.max)
        return `${protMin} - ${protMax} g/jour`
    }

    // --- Export CSV ---
    // Génère un fichier .csv et le télécharge dans le navigateur.
    // Pas de bibliothèque nécessaire : pur JavaScript.
    function exportCSV() {
        const weights = generateWeights()

        // Ligne d'en-tête
        const headers = ['Poids (kg)', ...activeObjectives.map(o => o.label)]

        // Une ligne par poids
        const dataRows = weights.map(w => [
            `${w} kg`,
            ...activeObjectives.map(o => calculateRange(w, o))
        ])

        // Assemblage du contenu CSV (séparateur point-virgule pour Excel)
        const csvContent = [headers, ...dataRows]
            .map(row => row.join(';'))
            .join('\n')

        // Création du fichier et déclenchement du téléchargement
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'besoins-proteines.csv'
        a.click()
        URL.revokeObjectURL(url)  // libère la mémoire
    }

    // --- Export PDF ---
    // Utilise jsPDF + jspdf-autotable pour générer un PDF avec le tableau.
    function exportPDF() {
        const weights = generateWeights()
        const doc = new jsPDF()

        // Titre dans le PDF
        doc.setFontSize(14)
        doc.text('Besoins journaliers en protéines', 14, 16)

        // Données du tableau
        const headers = [['Poids (kg)', ...activeObjectives.map(o => o.label)]]
        const body = weights.map(w => [
            `${w} kg`,
            ...activeObjectives.map(o => calculateRange(w, o))
        ])

        autoTable(doc, {
            head: headers,
            body: body,
            startY: 22,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 123, 255] }
        })

        doc.save('besoins-proteines.pdf')
    }

    if (activeObjectives.length === 0) {
        return <p className={styles.warning}>Veuillez sélectionner au moins un objectif.</p>
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableHeader}>
                <h2 className={styles.title}>Résultats</h2>
                {/* Boutons d'export */}
                <div className={styles.exportButtons}>
                    <button className={styles.btnExport} onClick={exportCSV}>⬇ CSV</button>
                    <button className={styles.btnExport} onClick={exportPDF}>⬇ PDF</button>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Poids (kg)</th>
                        {activeObjectives.map(obj => <th key={obj.id}>{obj.label}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {generateWeights().map(weight => (
                        <tr key={weight}>
                            <td>{weight} kg</td>
                            {activeObjectives.map(obj => <td key={obj.id}>{calculateRange(weight, obj)}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProteinTable
