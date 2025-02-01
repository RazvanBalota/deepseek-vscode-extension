# Deepseek VS Code Extension

Deepseek VS Code Extension is a hobby project that integrates an AI-powered chat panel into VS Code, powered by Ollama. To use it, you must have [Ollama installed](https://ollama.com/) and running on your machine.

## Installation

1. Download the extension `.vsix` package by running:

```
vsce package
```

2. Install the extension in VS Code:
- Open the Command Palette (Ctrl+Shift+P) and search for `Extensions: Install from VSIX`.
- Select the `.vsix` file you just created and install it.

## Usage

After installation, open the panel to access the AI-powered chat panel. You can send your prompts, and the AI will respond accordingly.

## Models and Parameters

The extension uses the following model for chat interactions:
- **Model:** `deepseek-r1:1.5b`

Parameters:
- **Messages:** A list of messages where the user provides the input and the AI responds.
- **Stream:** The responses are streamed in real-time.
### Changing the Model and Parameters

To change the model or any other parameters, you can modify the `model` and `parameters` in the extension’s code:

1. Open the `activate` function in `src/extension.ts`.
2. Find this part of the code where the model is defined:
```ts
const streamResponse = await ollama.chat({
  model: 'deepseek-r1:1.5b',
  messages: [{ role: 'user', content: prompt }],
  stream: true
});