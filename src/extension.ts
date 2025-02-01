// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import webviewContent from './webviewContent';
import ollama from 'ollama';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('extension is active');

	const disposable = vscode.commands.registerCommand('deepseek-vscode-extension.start', () => {
		const panel = vscode.window.createWebviewPanel(
			'deepseek chat',
			'Deepseek Chat',
			vscode.ViewColumn.One,
			{
				enableScripts: true
			}
		);

		panel.webview.html = webviewContent();
		panel.webview.onDidReceiveMessage(async (message) => {
			if (message.command === 'chat') {
				const prompt = message.text;
				let responseText = '';

				try {
					const streamResponse = await ollama.chat({
						model: 'deepseek-r1:1.5b',
						messages: [{ role: 'user', content: prompt }],
						stream: true
					});
					for await (const response of streamResponse) {
						responseText += response.message.content;
						panel.webview.postMessage({ command: 'response', text: responseText });
					}
				} catch (e) {
					if (e instanceof Error) {
						vscode.window.showErrorMessage(e.message);
					}
					vscode.window.showErrorMessage("An error occured!");
				}
			}
		});
	});

	context.subscriptions.push(disposable);
}