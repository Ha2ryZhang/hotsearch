import * as vscode from 'vscode';
import { RankViewProvider, RankItem } from './hotSearchRank';
import * as open from "open";
import { createWebView } from './webview';

export function activate(context: vscode.ExtensionContext) {

	const rankViewProvider = new RankViewProvider();
	vscode.window.registerTreeDataProvider('rank', rankViewProvider);

	vscode.commands.registerCommand('hotsearch.refresh', () =>
		rankViewProvider.refresh()
	);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			"hotsearch.open",
			async (rank: RankItem) => {
				await open(rank.url.toString());
			}
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"hotsearch.copyUrl",
			(rank: RankItem) => {
				vscode.env.clipboard.writeText(rank.url);
				vscode.window.showInformationMessage("The link has been copied to the clipboard.");
			}
		)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"hotsearch.github",
			async () => {
				await open("https://github.com/Ha2ryZhang/hotsearch");
			}
		)
	);
	context.subscriptions.push(vscode.commands.registerCommand('hotsearch.rankItemClick', (rank:RankItem) => {
		const webView = createWebView(context, vscode.ViewColumn.Active, rank);
		context.subscriptions.push(webView);
	}));

}

export function deactivate() { }
