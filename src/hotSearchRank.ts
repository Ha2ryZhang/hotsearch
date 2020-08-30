import { TreeItem, EventEmitter, Event, TreeItemCollapsibleState, TreeDataProvider, window } from 'vscode';
import * as path from 'path';
import { getRankList } from "./api";

export class RankViewProvider implements TreeDataProvider<RankItem>{

	private _onDidChangeTreeData: EventEmitter<RankItem | undefined> = new EventEmitter<RankItem | undefined>();
	readonly onDidChangeTreeData: Event<RankItem | undefined> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getTreeItem(element: RankItem): TreeItem | Thenable<TreeItem> {
		return element;
	}

	getChildren(element?: RankItem | undefined): import("vscode").ProviderResult<RankItem[]> {
		return getRankList().then(list => {
			return list.map(item => new RankItem(item, TreeItemCollapsibleState.None as TreeItemCollapsibleState,));
		});
	}
}

export class RankItem extends TreeItem {

	constructor(
		public readonly item: HotSearch,
		public readonly collapsibleState: TreeItemCollapsibleState,
	) {
		super(item.name, collapsibleState);
	}

	get url(): string {
		return `https://s.weibo.com/weibo?q=%23${this.item.name}%23`;
	}

	get tooltip(): string {
		let data = [
			`${this.item.name}`,
			`--------------------------`,
			`热度:　　　　${this.item.descExtr || '推荐位'}`,
		];
		return data.join('\r\n');
	}

	iconPath = path.join(__filename, '..', '..', 'src', 'assert', 'item.svg');

}