const { Plugin } = require('obsidian');

class LineMoverPlugin extends Plugin {
    onload() {
        this.addCommand({
            id: 'move-line-up',
            name: 'Move Line Up',
            hotkeys: [
                {
                    modifiers: ["Alt"],
                    key: 'ArrowUp',
                },
            ],
            editorCallback: (editor, view) => {
                this.moveLine(editor, -1);
            },
        });

        this.addCommand({
            id: 'move-line-down',
            name: 'Move Line Down',
            hotkeys: [
                {
                    modifiers: ["Alt"],
                    key: 'ArrowDown',
                },
            ],
            editorCallback: (editor, view) => {
                this.moveLine(editor, 1);
            },
        });
    }

    moveLine(editor, direction) {
        const cursor = editor.getCursor();
        const currentLine = editor.getLine(cursor.line);
        if (direction === -1 && cursor.line === 0) return; // Prevent moving up at the first line
        if (direction === 1 && cursor.line === editor.lineCount() - 1) return; // Prevent moving down at the last line

        editor.replaceRange("", { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
        let targetLine = cursor.line + direction;
        editor.replaceRange(currentLine + "\n", { line: targetLine, ch: 0 });

        // Adjust the cursor position
        editor.setCursor({ line: targetLine, ch: cursor.ch });
    }
}

module.exports = LineMoverPlugin;
