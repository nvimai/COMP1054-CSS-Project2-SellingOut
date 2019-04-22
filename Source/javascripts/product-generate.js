/* Product detail loading */

// Get data from JSON file
var url = 'includes/database.json';
fetch(url).then(function(response){
  response.json().then(function(myObj) {
    populateProduct(myObj, 'P0');
  });
});

function populateProduct(myObj, productID) {
  // Get a product from productID
  var item = FindItemById(myObj.products, productID);

  // 
  var sectionTitle = document.getElementById('title');
  var sectionDescription = document.getElementById('description');
  var sectionReviews = document.getElementById('reviews');
  var sectionRecommended = document.getElementById('recommended');

  /* Section Title
  -------------------------------------------------------*/
  var productBrief = document.createElement('div');
  productBrief.className = 'title brief';
  sectionTitle.appendChild(productBrief);

  /* Product Title
  --------------------*/
  var productTitle = document.createElement('h1');
  productTitle.textContent = item.title;
  productBrief.appendChild(productTitle);

  /* Product Rate Stars
  --------------------*/
  var rating_star = document.createElement('div');
  rating_star.className = 'rating_star';
  productBrief.appendChild(rating_star);

  // The anchor to goto the Ratings and Reviews section
  var a = document.createElement('a');
  a.className = 'rating_star bio';
  a.setAttribute('href', '#reviews');
  a.setAttribute('title', 'Goto Ratings and Reviews section');

  // Display stars
  var starOuter = document.createElement('div');
  starOuter.className = 'stars-outer';
  var starInner = document.createElement('div');
  starInner.className = 'stars-inner';
  starInner.style.width = ratingStars(item.reviews);
  starOuter.appendChild(starInner);
  a.appendChild(starOuter);

  // Show up the number of reviews
  var spanNum =  document.createElement('span');
  spanNum.textContent = ' ' + item.reviews.length;
  var spanText =  document.createElement('span');
  spanText.textContent = ' ratings and reviews';
  a.appendChild(spanNum);
  a.appendChild(spanText);
  rating_star.appendChild(a);

  productBrief.appendChild(document.createElement('hr'));
  
  /* Order Form
  --------------------*/
  var orderForm = document.createElement('div');
  orderForm.className = 'order-form';
  productBrief.appendChild(orderForm);

  // Product Colors and Prices
  var productColors = document.createElement('div');
  productColors.className = 'product-colors';
  var ul = document.createElement('ul');
  productColors.appendChild(ul);
  orderForm.appendChild(productColors);
  for(let i = 0; i < item.prices.length; i++) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.setAttribute('src', item.prices[i].colorImage);
    img.setAttribute('alt', item.prices[i].color);
    let p = document.createElement('p');
    p.textContent = item.prices[i].price;

    if (i == 0 ) {
      li.classList.add('chose');
    }

    li.appendChild(img);
    li.appendChild(p);
    ul.appendChild(li);
  }

  // Quantity
  var quantityDiv = document.createElement('div');
  quantityDiv.className = 'quantity';

  var quantityLabel = document.createElement('label');
  quantityLabel.setAttribute('for', 'quantity');
  quantityLabel.textContent = 'Quantity:';
  quantityDiv.appendChild(quantityLabel);

  var quantitySelect = document.createElement('select');
  quantitySelect.setAttribute('name', 'quantity');
  for(let i = 1; i <= 30; i ++) {
    let quantityOption = document.createElement('option');
    quantityOption.setAttribute('value', i);
    quantityOption.textContent = i;
    quantitySelect.appendChild(quantityOption);
  }

  quantityDiv.appendChild(quantitySelect);
  orderForm.appendChild(quantityDiv);

  // Add to cart buttons
  var buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'cart-buttons';

  var cartBtn = document.createElement('input');
  cartBtn.type = 'button';
  cartBtn.className = 'btn btn-cart';
  cartBtn.value = 'Add to Cart';
  buttonsDiv.appendChild(cartBtn);

  var favorBtn = document.createElement('input');
  favorBtn.type = 'button';
  favorBtn.className = 'btn btn-favor';
  favorBtn.value = '♡';
  buttonsDiv.appendChild(favorBtn);

  orderForm.appendChild(buttonsDiv);

  /* Hightlights
  --------------------*/
  var highlights = document.createElement('ul');
  highlights.className = 'highlights';
  productBrief.appendChild(highlights);
  for(let i = 0; i < item.description.highlights.length; i++) {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerHTML = item.description.highlights[i];
    li.appendChild(p);
    highlights.appendChild(li);
  }

  /* Slider
  --------------------*/
  var slider = document.createElement('div');
  slider.className = 'title slider';
  sectionTitle.appendChild(slider);

  // Credit to lab 6 COMP1073
  // Full Image
  var fullImg = document.createElement('div');
  fullImg.className = 'full-img';
  slider.appendChild(fullImg);

  // Thumbnails
  var thumbBar = document.createElement('div');
  thumbBar.className = 'thumb-bar';
  slider.appendChild(thumbBar);
  galleryDisplay(item);

  /* Section Description
  -------------------------------------------------------*/
  var descriptionTitle = document.createElement('h2');
  descriptionTitle.textContent = 'Product Information';
  sectionDescription.appendChild(descriptionTitle);

  /* Overview
  --------------------*/
  var overview = document.createElement('div');
  overview.className = 'description overview';
  sectionDescription.appendChild(overview);

  var overviewTitleDiv = document.createElement('div');
  overviewTitleDiv.className = 'description-header';
  var overviewTitle = document.createElement('h3');
  overviewTitle.textContent = 'Overview';
  overviewTitleDiv.appendChild(overviewTitle);

  var overviewMainDiv = document.createElement('div');
  overviewMainDiv.className = 'description-body';
  overviewMainDiv.innerHTML = item.description.overview;

  overview.appendChild(overviewTitleDiv);
  overview.appendChild(overviewMainDiv);

  /* included items
  --------------------*/
  var includedItems = document.createElement('div');
  includedItems.className = 'description included-items';
  sectionDescription.appendChild(includedItems);

  var includedItemsTitleDiv = document.createElement('div');
  includedItemsTitleDiv.className = 'description-header';
  var includedItemsTitle = document.createElement('h3');
  includedItemsTitle.textContent = 'Included Items';
  includedItemsTitleDiv.appendChild(includedItemsTitle);

  var includedItemsMainDiv = document.createElement('div');
  includedItemsMainDiv.className = 'description-body';

  var includedItemsUl = document.createElement('ul');
  for(let i = 0; i < item.description.includedItems.length; i++) {
    let li = document.createElement('li');
    let p  = document.createElement('p');
    p.textContent = item.description.includedItems[i];
    li.appendChild(p);
    includedItemsUl.appendChild(li);
  }
  includedItemsMainDiv.appendChild(includedItemsUl);
  includedItems.appendChild(includedItemsTitleDiv);
  includedItems.appendChild(includedItemsMainDiv);


  /* Section Rivews and Ratings
  -------------------------------------------------------*/
  var ratingsTitle = document.createElement('h2');
  ratingsTitle.textContent = 'Ratings and Reviews';
  sectionReviews.appendChild(ratingsTitle);

  var ratings_reviews = document.createElement('div');
  ratings_reviews.className = 'ratings_reviews';
  sectionReviews.appendChild(ratings_reviews);


  /* Ratings
  --------------------*/
  var rating_star = document.createElement('div');
  rating_star.className = 'rating_star';
  ratings_reviews.appendChild(rating_star);

  // Display stars
  var ratingsDiv = document.createElement('div');
  ratingsDiv.className = 'ratings';
  rating_star.appendChild(ratingsDiv);

  var starOuter = document.createElement('div');
  starOuter.className = 'stars-outer';
  var starInner = document.createElement('div');
  starInner.className = 'stars-inner';
  starInner.style.width = ratingStars(item.reviews);
  starOuter.appendChild(starInner);
  ratingsDiv.appendChild(starOuter);

  // Show up the number of reviews
  var spanNum =  document.createElement('span');
  spanNum.textContent = ' based on ' + item.reviews.length;
  var spanText =  document.createElement('span');
  spanText.textContent = ' reviews';
  ratingsDiv.appendChild(spanNum);
  ratingsDiv.appendChild(spanText);

  // The chart of reviews
  var ratingList = getRatingList(item.reviews);
  var chartTable = document.createElement('table');
  var chartTbody = document.createElement('tbody');
  chartTable.appendChild(chartTbody);
  ratingsDiv.appendChild(chartTable);

  // Loop to display 5 bars of the chart
  for(let i = 5; i > 0; i--){
    var row = document.createElement('tr');

    // First column for the labels
    var hrow = document.createElement('th');
    hrow.textContent = i + (i!=1?' stars':' star');

    // Second column for the bars
      // This is the main bar which is gray
    var tdata1 = document.createElement('td');    
    var barContainer = document.createElement('div');
    barContainer.className = 'bar-container';

      // This is the color bar which displays the number of reviews
    var barItem = document.createElement('div');
    barItem.className = 'bar-' + i;
    barItem.style.width = (ratingList['star'+i] * 100 / ratingList.sum) + '%';

    // Third column for the number of reviews
    var tdata2 = document.createElement('td');
    tdata2.textContent = ratingList['star'+i];

    row.appendChild(hrow);
    barContainer.appendChild(barItem);
    tdata1.appendChild(barContainer);
    row.appendChild(tdata1);
    row.appendChild(tdata2);
    chartTbody.appendChild(row);
  }
  
  /* Reviews
  --------------------*/
  var reviews = document.createElement('div');
  reviews.className = 'reviews';
  ratings_reviews.appendChild(reviews);
  
  for (let i = 0; i < item.reviews.length; i++){
    var div = document.createElement('div');
    div.className = 'person';

    // Display stars
    var starOuter = document.createElement('div');
    starOuter.className = 'stars-outer';
    var starInner = document.createElement('div');
    starInner.className = 'stars-inner';
    starInner.style.width = ratingStars(item.reviews, i);
    starOuter.appendChild(starInner);
    div.appendChild(starOuter);

    // Name
    var name = document.createElement('p');
    name.className = 'name';
    name.innerHTML = ' by ' + item.reviews[i].name;
    div.appendChild(name);

    // Comment
    var comment = document.createElement('p');
    comment.className = 'comment';
    comment.innerHTML = item.reviews[i].comment;
    div.appendChild(comment);

    if(i < item.reviews.length) {
      var hr = document.createElement('hr');
      reviews.appendChild(hr);
    }
    reviews.appendChild(div);
  }


/* Section Recommended
  -------------------------------------------------------*/
  var recommendedTitle = document.createElement('h2');
  recommendedTitle.textContent = 'Recommended';
  sectionRecommended.appendChild(recommendedTitle);

  // Product list
  var productList = document.createElement('ul');
  productList.className = 'grid-container';
  sectionRecommended.appendChild(productList);

  // Loop to display all recommended products
  for(let i = 0; i < item.recommended.length; i++){
    var li = document.createElement('li');
    var div = document.createElement('div');

    // Product information
    var productTitle = document.createElement('h3');
    productTitle.textContent = item.recommended[i].title;
    div.appendChild(productTitle);

    // Product image
    var productImage = document.createElement('img');
    productImage.setAttribute('src', item.recommended[i].image);
    productImage.setAttribute('alt', item.recommended[i].title);
    div.appendChild(productImage);  

    // Product Price
    var productPrice = document.createElement('p');
    productPrice.textContent = item.recommended[i].price;
    div.appendChild(productPrice);

    li.appendChild(div);
    li.classList.add('grid-item');
    productList.appendChild(li);
  }
}

// Find an item in array by Id
function FindItemById(array, id) {
	for(var i = 0; i < array.length; i++) {
		if(array[i].id == id) {
			return array[i];
		}
	}
}

// Get index of item in array by Id
function FindIndexById(array, id) {
	for(var i = 0; i < array.length; i++) {
		if(array[i].id == id) {
			return i;
		}
	}
}