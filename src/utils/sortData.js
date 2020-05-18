export default function dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (itemA, itemB) {
        if (sortOrder === -1) {
            return itemB[property].localeCompare(itemA[property]);
        } else {
            return itemA[property].localeCompare(itemB[property]);
        }
    }
}