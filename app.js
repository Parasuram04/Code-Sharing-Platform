let isNewMode = false;
let modalInstance;

document.getElementById('newButton').addEventListener('click', function () {
    isNewMode = true;
    showModal("Enter Code to Start New CodeSpace");
});

document.getElementById('openButton').addEventListener('click', function () {
    isNewMode = false;
    showModal("Enter Code to Open your CodeSpace");
});

document.getElementById('submitCodeButton').addEventListener('click', function () {
    const secretCode = document.getElementById('secretCodeInput').value.trim();
    const codeWarning = document.getElementById('codeWarning');
    const codeTextArea = document.getElementById('codeTextArea');

    if (!secretCode) {
        codeWarning.textContent = "Secret code cannot be empty.";
        return;
    }

    if (isNewMode) {
        // New mode: Show code section and buttons for new code
        document.getElementById('codeSection').classList.remove('hidden');
        codeTextArea.value = ''; // Clear text area
        codeTextArea.removeAttribute('readonly');
        document.getElementById('pasteButton').classList.remove('hidden');
        document.getElementById('clearButton').classList.remove('hidden');
        document.getElementById('saveButton').classList.remove('hidden');
        document.getElementById('copyButton').classList.add('hidden');
        document.getElementById('editButton').classList.add('hidden');
        hideModal();
    } else {
        // Open mode: Show code section and buttons for existing code
        const storedCode = localStorage.getItem(secretCode);
        if (storedCode) {
            codeTextArea.value = storedCode;
            codeTextArea.setAttribute('readonly', true);
            document.getElementById('pasteButton').classList.add('hidden');
            document.getElementById('clearButton').classList.remove('hidden');
            document.getElementById('saveButton').classList.add('hidden');
            document.getElementById('copyButton').classList.remove('hidden');
            document.getElementById('editButton').classList.remove('hidden');
            hideModal();
            document.getElementById('codeSection').classList.remove('hidden');
        } else {
            codeWarning.textContent = "Invalid secret code. Please try again.";
        }
    }
});

document.getElementById('editButton').addEventListener('click', function () {
    const codeTextArea = document.getElementById('codeTextArea');
    codeTextArea.removeAttribute('readonly');
    document.getElementById('saveButton').classList.remove('hidden');
});

document.getElementById('copyButton').addEventListener('click', function () {
    const codeTextArea = document.getElementById('codeTextArea');
    codeTextArea.select();
    document.execCommand('copy');
});

document.getElementById('pasteButton').addEventListener('click', function () {
    document.getElementById('codeTextArea').focus();
    document.execCommand('paste');
});

document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('codeTextArea').value = '';
});

document.getElementById('saveButton').addEventListener('click', function () {
    const secretCode = document.getElementById('secretCodeInput').value.trim();
    const code = document.getElementById('codeTextArea').value.trim();
    if (code) {
        localStorage.setItem(secretCode, code);
        alert("Code saved successfully!");
    } else {
        alert("Cannot save empty code.");
    }
});

document.getElementById('exitButton').addEventListener('click', function () {
    document.getElementById('codeSection').classList.add('hidden');
    document.getElementById('codeTextArea').value = '';
});

function showModal(title) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('codeWarning').textContent = '';
    document.getElementById('secretCodeInput').value = '';
    modalInstance = new bootstrap.Modal(document.getElementById('codeModal'));
    modalInstance.show();
}

function hideModal() {
    if (modalInstance) {
        modalInstance.hide();
    }
}