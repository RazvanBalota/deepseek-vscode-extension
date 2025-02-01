import { post } from './../node_modules/ollama/src/utils';
export default function webviewContent() {
  return /*html*/`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <style>
        body {
          font-family: sans-serif;
          margin: 1rem;
          background-color: #010101;
        }

        .title{
          text-align: center;
          margin: 1rem;
          font-size: 2rem;
          color: #fafafa;
        }

        #prompt {
          width: 100%;
          height: 20rem;
          font-size: 1rem;
          padding: 1rem;
          margin-top: 1rem;
          border: 1px solid #333;
          border-radius: 4px;
          resize: none;
          background-color: #010101;
          color: #fff;
        }

        #ask {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #0078d4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        #ask:hover {
          background-color: #005a9e;
        }

        #response {
          margin-top: 1rem;
          min-height: 20rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #fff
        }
      </style>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1 class="title">Deep Seek Chat</h1>
        <textarea id="prompt" rows="4" placeholder="What can I help you with?"></textarea>
        <button id="ask">Ask</button>
        <div id="response"></div>
      <script>
        const vscode = acquireVsCodeApi();
        document.getElementById('ask').addEventListener('click', () => {
          const text = document.getElementById('prompt').value;
          vscode.postMessage({ command: 'chat', text });
        });

        window.addEventListener('message', event => {
          const { command, text } = event.data;
          if(command === 'response'){
            document.getElementById('response').innerText = text;
          }
        });
      </script>
    </body>
  </html>`;
}