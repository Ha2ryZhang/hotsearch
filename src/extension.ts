import * as vscode from 'vscode';
import { RankViewProvider, RankItem } from './hotSearchRank';
import * as open from "open";

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
				await open(rank.url);
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

}

export function deactivate() { }
