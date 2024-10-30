import * as vscode from 'vscode';

let isPaused = false;
let capitalLetterDecorationType: vscode.TextEditorDecorationType;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    const highlightColor = vscode.workspace.getConfiguration('capitalLetterChecker').get('highlightColor', 'red');
    capitalLetterDecorationType = vscode.window.createTextEditorDecorationType({
        color: highlightColor,
        fontWeight: 'bold'
    });

    const toggleCommand = 'capital-letter-checker.toggleHighlight';
    context.subscriptions.push(vscode.commands.registerCommand(toggleCommand, toggleHighlight));

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = toggleCommand;
    updateStatusBar();
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        triggerUpdateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('capitalLetterChecker.highlightColor')) {
            updateHighlightColor();
            triggerUpdateDecorations();
        }
    });
}

function toggleHighlight() {
    isPaused = !isPaused;
    updateStatusBar();

    if (isPaused) {
        vscode.window.activeTextEditor?.setDecorations(capitalLetterDecorationType, []);
    } else {
        triggerUpdateDecorations();
    }
}

function updateStatusBar() {
    statusBarItem.text = isPaused ? '$(eye-closed) CLC Paused' : '$(eye) CLC Active';
}

function updateHighlightColor() {
    const highlightColor = vscode.workspace.getConfiguration('capitalLetterChecker').get('highlightColor', 'red');
    capitalLetterDecorationType.dispose();
    capitalLetterDecorationType = vscode.window.createTextEditorDecorationType({
        color: highlightColor,
        fontWeight: 'bold'
    });
}

function triggerUpdateDecorations() {
    if (!vscode.window.activeTextEditor || isPaused) {
        return;
    }

    const regEx = /[A-Z]/g;
    const text = vscode.window.activeTextEditor.document.getText();
    const capitalLetters: vscode.DecorationOptions[] = [];
    let match;
    while (match = regEx.exec(text)) {
        const startPos = vscode.window.activeTextEditor.document.positionAt(match.index);
        const endPos = vscode.window.activeTextEditor.document.positionAt(match.index + 1);
        const decoration = { range: new vscode.Range(startPos, endPos) };
        capitalLetters.push(decoration);
    }
    vscode.window.activeTextEditor.setDecorations(capitalLetterDecorationType, capitalLetters);
}

export function deactivate() {}
