/**
 * Item store
 * @flow
 */

var MOCKED_ITEMS = [
 {
   'id': 1,
   'name': 'Prima',
   'thumbnail': 'http://www.myworldhut.com/product_images/x/cafe_prima_finezja_mielona_250g__89716.jpg',
   'score': 2.8,
   'creator': 'Jan',
 },
 {
   'id': 2,
   'name': 'Lavazza - Sinfonia Espresso',
   'thumbnail': 'http://www.kawalavazza.com.pl/images/produkty/thumbnails/lavazza_pad_espresso.jpg.thumb_96x150.jpg',
   'score': 3.5,
   'creator': 'Jan',
 }
];

class ItemStore {
  getItems() {
    return MOCKED_ITEMS.sort((first, second) => second.score - first.score);
  }

  addItem(name: string, thumbnail: string, creator: string) {
    MOCKED_ITEMS.push({
      id: MOCKED_ITEMS.length + 1,
      name: name,
      thumbnail: thumbnail,
      score: 5,
      creator: creator
    });
  }

  markItem(item: object, rate: {name: string, score: number}) {
    var item = MOCKED_ITEMS.find(mi => mi.id == item.id)
    console.log(item);
    if (item != undefined) {
      let additionalScore = (rate.score - 5) != 0 ? (rate.score - 5) / 10 : 0;
      let newScore = item.score + additionalScore;
      if (newScore > 10) {
        item.score = 10;
      } else if (newScore < 0) {
        item.score = 0;
      } else {
        item.score = Math.round(newScore * 100)/100;
      }
    }
  }
}

module.exports = ItemStore
