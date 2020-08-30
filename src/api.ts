import axios from "axios";
const RANK_URL = 'https://api.weibo.cn/2/guest/page?count=20&page=1&containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot';

export function getRankList(): Promise<HotSearch[]> {
    return new Promise((resolve, reject) => {
        axios.get(RANK_URL)
            .then((response) => {
                let cardGroup = response.data.cards[0].card_group;
                let hotSearchRank = cardGroup.map((item: any) => {
                    const card: HotSearch = {
                        name: item.desc,
                        descExtr: item.desc_extr,
                        cardType: item.card_type
                    };
                    return card;
                });
                resolve(hotSearchRank);
            }).catch((err) => {
                reject(err);
            });
    });
}