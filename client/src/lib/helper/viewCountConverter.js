export function formatViewCount(views) {
    const units = [
        { value: 1e9, symbol: 'B' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'K' }
    ];

    for (let { value, symbol } of units) {
        if (views >= value) {
            let formattedViews = (views / value).toFixed(1).replace(/\.0$/, ''); //calculating the views in terms of millions and billions
            return formattedViews + symbol; //returning the views in terms of millions and billions with symbol
        }
    }

    return views.toString();
}