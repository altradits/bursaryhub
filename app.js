document.addEventListener('DOMContentLoaded', () => {
    // Structural runtime evaluation mapping cache
    const systemFeeRegistryCache = {};

    const masterForm = document.getElementById('feeMasterForm');
    const claimForm = document.getElementById('billingClaimForm');
    const masterFeedback = document.getElementById('masterFeedback');
    const claimFeedback = document.getElementById('claimFeedback');

    masterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        masterFeedback.className = 'feedback-msg';
        masterFeedback.style.display = 'none';

        const course = document.getElementById('courseIdentifier').value.trim();
        const tuition = parseFloat(document.getElementById('tuitionCost').value) || 0;
        const accommodation = parseFloat(document.getElementById('accommodationCost').value) || 0;
        const aggregateCalculatedVal = tuition + accommodation;

        try {
            const response = await fetch('/backend/handlers/feemaster.go', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ course, tuition, accommodation, total: aggregateCalculatedVal })
            });

            if (!response.ok) throw new Error('Master data entry rejected by contract system nodes[cite: 8].');

            // Explicitly sync structural constraints local cache to match verification logic requirements
            systemFeeRegistryCache[course] = aggregateCalculatedVal;

            masterFeedback.textContent = `Fee Master schema locked for ${course} at ${aggregateCalculatedVal} KES[cite: 8].`;
            masterFeedback.classList.add('success');
            masterForm.reset();
        } catch (err) {
            masterFeedback.textContent = err.message;
            masterFeedback.classList.add('error');
        }
    });

    claimForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        claimFeedback.className = 'feedback-msg';
        claimFeedback.style.display = 'none';

        const studentId = document.getElementById('claimTargetStudent').value.trim();
        const course = document.getElementById('claimTargetCourse').value.trim();
        const presentedAmount = parseFloat(document.getElementById('claimAggregatedTotal').value) || 0;

        // Ultimate Check Boundary: Enforce Data-Registry Matching Rules
        if (systemFeeRegistryCache[course] !== undefined && systemFeeRegistryCache[course] !== presentedAmount) {
            claimFeedback.textContent = `Fraud Prevention Block: Claim amount for ${course} must equal Fee Master specification (${systemFeeRegistryCache[course]} KES)[cite: 2, 10].`;
            claimFeedback.classList.add('error');
            return;
        }

        try {
            const response = await fetch('/backend/handlers/claims.go', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, course, amount: presentedAmount })
            });

            if (!response.ok) throw new Error('Network ledger processing error. Claim transmission stalled[cite: 63].');

            claimFeedback.textContent = 'Digital payment claim generated and broadcasted directly to beneficiary workspace[cite: 63, 64].';
            claimFeedback.classList.add('success');
            claimForm.reset();
        } catch (error) {
            claimFeedback.textContent = error.message;
            claimFeedback.classList.add('error');
        }
    });
});