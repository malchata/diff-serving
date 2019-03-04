export function isFavorite (id) {
  if ("localStorage" in window) {
    let favoritePedalsStorageKey = "favoritePedals";
    let favoritePedals = localStorage.getItem(favoritePedalsStorageKey);
    let favoritePedalsArr;

    if (favoritePedals !== null) {
      favoritePedalsArr = JSON.parse(favoritePedals);

      return favoritePedalsArr.filter(pedal => pedal.id === id).length > 0;
    }

    return false;
  }

  return false;
}

export function simpleSort (arr, key, order = "asc") {
  if (Array.isArray(arr) === true) {
    return arr.sort((a, b) => {
      if (order === "asc") {
        return a[key].localeCompare(b[key]);
      }

      return b[key].localeCompare(a[key]);
    });
  }

  return false;
}

export function toggleFavorite (id, manufacturer, model, type) {
  if ("localStorage" in window) {
    let favoritePedalsStorageKey = "favoritePedals";
    let favoritePedals = localStorage.getItem(favoritePedalsStorageKey);
    let favoritePedalsArr;

    if (favoritePedals !== null) {
      favoritePedalsArr = JSON.parse(favoritePedals);

      if (favoritePedalsArr.filter(pedal => pedal.id === id).length === 0) {
        favoritePedalsArr.push({
          id: id,
          manufacturer: manufacturer,
          model: model,
          type: type
        });
      } else {
        favoritePedalsArr = favoritePedalsArr.filter(pedal => pedal.id !== id);
      }
    } else {
      favoritePedalsArr = [{
        id: id,
        manufacturer: manufacturer,
        model: model,
        type: type
      }];
    }

    localStorage.setItem(favoritePedalsStorageKey, JSON.stringify(favoritePedalsArr));

    return true;
  }

  return false;
}
