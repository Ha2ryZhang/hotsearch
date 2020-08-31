import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';
import { RankItem } from './hotSearchRank';
let webviewPanel: WebviewPanel | undefined;

export function createWebView(

    context: ExtensionContext,     
    viewColumn: ViewColumn,         
    rank: RankItem                  

) {

    if (webviewPanel === undefined) {

        webviewPanel = window.createWebviewPanel(

            'webView',                       
            rank.item.name,                           
            viewColumn,                         
            {
                retainContextWhenHidden: true,  
                enableScripts: true             
            }

        );

        webviewPanel.webview.html = getIframeHtml(rank.url);

    } else {

        webviewPanel.title = rank.item.name;
        webviewPanel.webview.html = getIframeHtml(rank.url);
    }

    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    return webviewPanel;
}

export function getIframeHtml(url: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>

        <body>
        <iframe id='iframe1' class="iframeDiv" src="${url}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}