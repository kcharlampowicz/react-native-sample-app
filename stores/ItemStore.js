/**
 * Item store
 * @flow
 */
import React, { Component } from 'react';
var ENDPOINT_URL = 'http://192.168.10.57:8080/api/items';
class ItemStore {
  getItems(notify) {
    fetch(ENDPOINT_URL)
      .then((response) => response.json())
      .then((json) => notify(json))
      .catch((err) => {
        console.log(err);
        notify([]);
      });
  }

  addItem(name: string, photo: string, creator: string, notify) {
    fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': name,
        'creator': creator,
        'thumbnail': photo
      })
    })
    .then((response) => notify())
    .catch((err) => {
      console.log(err);
      notify();
    });
  }

  rateItem(item: object, rate: {name: string, score: number}, notify) {
    fetch(ENDPOINT_URL + '/' + item.id + '/review', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': rate.name,
        'score': rate.score
      })
    })
    .then((response) => notify())
    .catch((err) => {
      console.log(err);
      notify();
    });
  }
}

module.exports = ItemStore
