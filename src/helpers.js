const capital = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const randomNumBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
};

const randomizeMaps = (maps, bestOf) => {
    let selected = {};

    const mapTypes = Object.keys(maps);

    const selectedTypes = shuffle([...Array(bestOf + 1).keys()]);

    // unreadable solution, someone please clean this up
    selected = selectedTypes.map((index) => {
        map: maps[mapTypes[index]][randomNumBetween(0, maps[mapTypes[index]].length)], index;
    });

    selected.pop();

    return selected;
};

module.exports = { capital, randomizeMaps };
