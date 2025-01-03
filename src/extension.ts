'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as vizMod from '@viz-js/viz';
import type MarkdownIt from 'markdown-it';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    const viz = await vizMod.instance()

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "graphviz-markdown-preview" is now active!');
    return {

        extendMarkdownIt(md: MarkdownIt) {

            const highlight = md.options.highlight;

            md.options.highlight = (code, lang, attrs) => {

                if (lang && lang.match(/\bgraphviz\b/i)) {
                    try {
                        return '<pre style="all:unset;">'
                        + viz.renderString(code, { engine: 'dot', format: 'svg' })
                        + '</pre>';
                    } catch (e) {
                        return `<pre><code>${e.message}</code></pre>`;
                    }
                }

                return highlight(code, lang, attrs);

            };

            return md;

        }

    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
