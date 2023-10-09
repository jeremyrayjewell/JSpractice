// Create an array to hold CodeMirror instances and functions for each terminal
const terminals = [];

// Initialize CodeMirror for each terminal
for (let i = 1; i <= 6; i++) {
    const editor = CodeMirror(document.getElementById(`terminal${i}`), {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
    });

    // Store CodeMirror instance and associated functions in the array
    terminals[i] = {
        editor,
        inputElement: document.getElementById(`input${i}`),
        outputElement: document.getElementById(`output${i}`),
    };
}

// Function to run code for a specific terminal
function runCode(terminalIndex) {
    const terminal = terminals[terminalIndex];
    const code = terminal.editor.getValue();

    try {
        const result = eval(code);
        if (Array.isArray(result)) {
            terminal.outputElement.innerText = "Sorted Array: " + result.join(", ");
        } else {
            terminal.outputElement.innerText = result;
        }
    } catch (error) {
        terminal.outputElement.innerText = "Error: " + error;
    }
}
