import { simpleSort } from "Utils";

export function search (searchQuery, pedals, searchSortBy = "model", searchSortOrder = "asc") {
  if (/^[a-z0-9\!\@\#\$\%\^\&\*\)\(\+\=\.\_\-\? ]+$/ig.test(searchQuery) === true) {
    const query = decodeURI(searchQuery.toLowerCase());
    const sortBy = decodeURI(searchSortBy);
    const sortOrder = decodeURI(searchSortOrder);
    const clean = {
      query
    };
    let results = [];
    let sortKey = "manufacturer";

    if (/^(\*|all)$/i.test(clean.query) === true) {
      results = pedals;
    } else {
      for (let pedal in pedals) {
        const pedalEntry = pedals[pedal];
        const { manufacturer, model, type } = pedalEntry;
        const productString = `${manufacturer.toLowerCase()} ${model.toLowerCase()}`;

        if (productString.indexOf(clean.query) !== -1 || (manufacturer.toLowerCase().indexOf(clean.query) !== -1 || model.toLowerCase().indexOf(clean.query) !== -1 || type.toLowerCase().indexOf(clean.query) !== -1)) {
          results.push(pedalEntry);
        }
      }
    }

    if (["model", "type", "manufacturer"].indexOf(sortBy) !== -1) {
      sortKey = sortBy;
    }

    return simpleSort(results, sortKey, sortOrder);
  }

  return false;
}
