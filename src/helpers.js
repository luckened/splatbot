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

const randomizeBO3 = (maps) => {
    let selected = {};
    const bestOf = 3;
    const mapTypes = Object.keys(maps);
    const selectedTypes = shuffle([...Array(bestOf + 1).keys()]);

    selected = selectedTypes.map((index) => {
        const current = maps[mapTypes[index]];

        return { map: current[randomNumBetween(0, current.length)], index };
    });

    selected.pop();

    return selected;
};

const randomizeBO5 = (maps) => {
    let selected = {};
    const bestOf = 5;
    const mapTypes = Object.keys(maps);
    let selectedTypes = shuffle([...Array(bestOf - 1).keys()]);

    selectedTypes.push(randomNumBetween(0, bestOf - 1));

    selected = selectedTypes.map((index) => {
        const current = maps[mapTypes[index]];

        return { map: current[randomNumBetween(0, current.length)], index };
    });

    return selected;
};

module.exports = { capital, randomizeBO3, randomizeBO5 };
