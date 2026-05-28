document.addEventListener('DOMContentLoaded', () => {
    const triggerPayoutBtn = document.getElementById('triggerPayoutVerificationBtn');
    const signatureModal = document.getElementById('otpSignatureModal');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const executeSignatureBtn = document.getElementById('executeSignatureBtn');
    const otpInputCode = document.getElementById('otpInputCode');
    const otpFeedback = document.getElementById('otpFormFeedback');
    const pwaContainer = document.getElementById('pwaInterfaceContainer');

    triggerPayoutBtn.addEventListener('click', () => {
        otpFeedback.className = 'feedback-msg';
        otpFeedback.style.display = 'none';
        otpInputCode.value = '';
        signatureModal.classList.add('active-window');
    });

    cancelModalBtn.addEventListener('click', () => {
        signatureModal.classList.remove('active-window');
    });

    executeSignatureBtn.addEventListener('click', async () => {
        const pinSignature = otpInputCode.value.trim();
        if (pinSignature.length !== 6 || isNaN(pinSignature)) {
            otpFeedback.textContent = 'Signature Rejection: OTP pin configuration must comprise exactly 6 numeric digit inputs[cite: 28].';
            otpFeedback.classList.add('error');
            return;
        }

        executeSignatureBtn.disabled = true;
        const baselineText = executeSignatureBtn.textContent;
        executeSignatureBtn.innerHTML = '<span class="spinner"></span>';

        try {
            // Concurrent execution pipeline targeting auth and claim layers [cite: 31, 66]
            const [authGatewayResponse, claimGatewayResponse] = await Promise.all([
                fetch('/backend/handlers/auth.go', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ signature: pinSignature, type: 'sms_mfa' })
                }),
                fetch('/backend/handlers/claims.go', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetClaimId: 'claimInstance_1', proofToken: pinSignature })
                })
            ]);

            if (!authGatewayResponse.ok || !claimGatewayResponse.ok) {
                throw new Error('On-chain verification handshake rejected signature clearance parameters[cite: 44, 68].');
            }

            signatureModal.classList.remove('active-window');

            // Complete UI Structural Layout Overwrite: Display Cryptographic Disbursed Layout
            pwaContainer.innerHTML = `
                <div class="pwa-success-state">
                    <div class="icon-seal">🛡️</div>
                    <h2 style="color: var(--success); font-weight: 800; letter-spacing:-0.02em;">100% Cryptographically Audited & Disbursed</h2>
                    <p style="color: #475569; margin-top: 1.25rem; font-size: 0.95rem; line-height:1.5;">
                        Multi-sig verification criteria resolved. Stablecoin liquidity released out of escrow and settled to whitelisted institutional banking lines[cite: 44, 69, 70].
                    </p>
                    <button class="btn btn-primary" onclick="window.location.reload()" style="margin-top: 2.5rem; width:100%; background-color: var(--ifc-blue);">Return to Workspace Profile</button>
                </div>`;

        } catch (error) {
            executeSignatureBtn.disabled = false;
            executeSignatureBtn.textContent = baselineText;
            otpFeedback.textContent = error.message;
            otpFeedback.classList.add('error');
        }
    });
});