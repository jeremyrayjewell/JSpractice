// Create an array to hold CodeMirror instances, input, output, and console elements for each terminal
const terminals = [];

// Initialize CodeMirror for each terminal
for (let i = 1; i <= 6; i++) {
    const editor = CodeMirror(document.getElementById(`terminal${i}`), {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
    });

    // Store CodeMirror instance and associated elements in the array
    terminals[i] = {
        editor,
        inputElement: document.getElementById(`input${i}`),
        outputElement: document.getElementById(`output${i}`),
        consoleElement: document.getElementById(`console${i}`),
    };
}

// Function to run code for a specific terminal
function runCode(terminalIndex) {
    const terminal = terminals[terminalIndex];
    const code = terminal.editor.getValue();

    try {
        const result = eval(code);

        // Append the result to the console
        if (Array.isArray(result)) {
            terminal.consoleElement.innerText += "Sorted Array: " + result.join(", ") + "\n";
        } else {
            terminal.consoleElement.innerText += result + "\n";
        }
    } catch (error) {
        // Append errors to the console
        terminal.consoleElement.innerText += "Error: " + error + "\n";
    }
}
