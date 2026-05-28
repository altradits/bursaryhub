document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('csvFileInput');
    const rosterFeedback = document.getElementById('rosterFeedback');
    const poolForm = document.getElementById('poolDeploymentForm');
    const poolFeedback = document.getElementById('poolFeedback');

    // Drag and Drop Logic Handlers
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('active-drag');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('active-drag');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('active-drag');
        if (e.dataTransfer.files.length) processRosterUpload(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) processRosterUpload(fileInput.files[0]);
    });

    async function processRosterUpload(file) {
        if (!file.name.endsWith('.csv')) {
            showFeedback(rosterFeedback, 'Validation Error: System ingestion routes process compiled CSV spreadsheets exclusively[cite: 58].', 'error');
            return;
        }

        rosterFeedback.className = 'feedback-msg';
        rosterFeedback.style.display = 'block';
        rosterFeedback.innerHTML = '<div style="display:flex;align-items:center;gap:0.5rem;"><span class="spinner" style="border-top-color:var(--ifc-blue)"></span> Streaming entries to ledger parsing matrix... [cite: 59]</div>';

        const dataForm = new FormData();
        dataForm.append('roster', file);

        try {
            const response = await fetch('/backend/handlers/roster.go', {
                method: 'POST',
                body: dataForm
            });

            if (!response.ok) throw new Error('Ingestion execution failed. Verification registry rejected rows[cite: 59].');

            showFeedback(rosterFeedback, 'Roster processing complete. Student sub-allocation parameters successfully built into contract rules[cite: 59].', 'success');
        } catch (err) {
            showFeedback(rosterFeedback, err.message, 'error');
        }
    }

    // Pool Deployment Request Pipeline
    poolForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        poolFeedback.className = 'feedback-msg';
        poolFeedback.style.display = 'none';

        const budgetValue = document.getElementById('poolBudget').value;

        try {
            const response = await fetch('/backend/handlers/pool.go', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseFloat(budgetValue) })
            });

            if (!response.ok) throw new Error('Escrow initialization rejected by vault controller[cite: 56].');

            showFeedback(poolFeedback, 'Vault escrow initialized. Pool asset tokens locked[cite: 56].', 'success');
            poolForm.reset();
        } catch (error) {
            showFeedback(poolFeedback, error.message, 'error');
        }
    });

    function showFeedback(target, text, stylingClass) {
        target.className = `feedback-msg ${stylingClass}`;
        target.textContent = text;
    }
});