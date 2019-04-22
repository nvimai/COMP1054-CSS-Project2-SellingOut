// Credit to COMP1002 Project
// Rating Stars
function ratingStars(reviewArray, index = null){
    // total number of stars
    var starTotal = 5;
    var starSum = 0;
    var starPercentage = 0;

    if (index != null){
        starSum += reviewArray[index].rating;
        starPercentage = starSum * 100 / starTotal + "%";
    } else {
        for (var item in reviewArray){
            starSum += reviewArray[item].rating;
        }
        starPercentage = (starSum/reviewArray.length) * 100 / starTotal + "%";
    }
    return starPercentage;
}

// Ratings list
function getRatingList(reviewArray){
    var reviewList = {
        star5 : 0,
        star4 : 0,
        star3 : 0,
        star2 : 0,
        star1 : 0,
        sum : 0
    };
    for (var item in reviewArray){
        if (reviewArray[item].rating == 1){
            reviewList.star1++;
        } else if (reviewArray[item].rating == 2){
            reviewList.star2++;
        } else if (reviewArray[item].rating == 3){
            reviewList.star3++;
        } else if (reviewArray[item].rating == 4){
            reviewList.star4++;
        } else if (reviewArray[item].rating == 5){
            reviewList.star5++;
        }
        reviewList.sum++;
    }
    return reviewList;
}