
function calculateStars(ratings) {
    // Puts the string amounts of each rating
    // in a single place
    var allRatings = [
        ratings['1'],
        ratings['2'],
        ratings['3'],
        ratings['4'],
        ratings['5']
    ]

    // Calculates the average using (total * value) / total
    var total = 0;
    var valueTotal = 0;
    for (var i = 0; i < allRatings.length; i++) {
        total += Number(allRatings[i]) * 1;
        valueTotal += Number(allRatings[i]) * (i + 1);
    }

    return valueTotal / total;
}

export { calculateStars };
