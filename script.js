document.addEventListener('DOMContentLoaded', () => {
    const walletSelect = document.getElementById('walletSelect');
    const connectButton = document.getElementById('connectButton');
    const inputSection = document.getElementById('inputSection');
    const messageForm = document.getElementById('messageForm');
    const userInput = document.getElementById('userInput');
    const statusMessage = document.getElementById('statusMessage');
    const connectWalletLink = document.getElementById('connectWalletLink');

    // Show wallet section when "Connect Wallet" is clicked
    connectWalletLink.addEventListener('click', () => {
        document.getElementById('connect-wallet').classList.remove('hidden');
    });

    // Enable connect button when a wallet is selected
    walletSelect.addEventListener('change', () => {
        connectButton.disabled = false;
    });

    // Mock WalletConnect connection
    connectButton.addEventListener('click', async () => {
        const selectedWallet = walletSelect.value;
        if (selectedWallet) {
            try {
                console.log(`Connecting to ${selectedWallet}`);
                inputSection.classList.remove('hidden');
                statusMessage.textContent = `Connected to ${selectedWallet}!`;
                statusMessage.style.color = 'green';
            } catch (error) {
                statusMessage.textContent = 'Connection failed. Try again.';
                statusMessage.style.color = 'red';
            }
        }
    });

    // Handle form submission with Formspree
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page reload
        const message = userInput.value.trim();
        if (message) {
            try {
                const response = await fetch(messageForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        _to: 'igetaoreed54@gmail.com',
                        message: message,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    statusMessage.textContent = 'Message sent successfully!';
                    statusMessage.style.color = 'green';
                    userInput.value = '';
                } else {
                    throw new Error(data.error || 'Failed to send message.');
                }
            } catch (error) {
                statusMessage.textContent = `Error: ${error.message}`;
                statusMessage.style.color = 'red';
            }
        } else {
            statusMessage.textContent = 'Please enter a message.';
            statusMessage.style.color = 'red';
        }
    });
});