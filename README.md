# Capital Letter Checker

**Capital Letter Checker** is a Visual Studio Code extension that highlights every capital letter in your text files. You can customize the highlight color and easily toggle the highlighting on and off using a status bar button.

## Features

- **Highlight Capital Letters**: Automatically highlights all capital letters in your text files.
- **Customizable Highlight Color**: Choose your preferred color for highlighting capital letters.
- **Toggle Highlighting**: Easily pause and resume highlighting using a status bar button labeled "CLC Active" or "CLC Paused".

## Installation

1. **Install from VS Code Marketplace**:
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
   - Search for "Capital Letter Checker" and click **Install**.

2. **Manual Installation**:
   - Download the latest release from the Releases page.
   - Open Visual Studio Code.
   - Go to the Extensions view.
   - Click the `...` (More Actions) button in the top right corner and select **Install from VSIX...**.
   - Select the downloaded `.vsix` file to install.

## Usage

1. **Highlight Capital Letters**:
   - Open any text file in VS Code.
   - Capital letters will be highlighted in the default color (red).

2. **Customize Highlight Color**:
   - Open the VS Code settings (`File > Preferences > Settings` or `Ctrl+,`).
   - Search for "Capital Letter Checker".
   - Change the "Highlight Color" setting to your desired color.

3. **Toggle Highlighting**:
   - Look for the status bar button labeled "CLC Active" or "CLC Paused" at the bottom right of the VS Code window.
   - Click the button to toggle highlighting on and off.

## Configuration

The extension provides the following configuration settings:

- `capitalLetterChecker.highlightColor`: Specifies the color used to highlight capital letters. Default is `red`.

## Development

### Prerequisites

- Node.js (version 18 or higher)
- npm
- Visual Studio Code

