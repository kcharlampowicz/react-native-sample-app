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
    console.log("GET" + MOCKED_ITEMS);
    return MOCKED_ITEMS;
  }

  addItem(name: string, thumbnail: string, creator: string) {
    MOCKED_ITEMS.push({
      id: MOCKED_ITEMS.length + 1,
      name: name,
      thumbnail: thumbnail,
      score: 0,
      creator: creator
    });
    console.log(MOCKED_ITEMS);
  }
}

module.exports = ItemStore
