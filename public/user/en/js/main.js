$(document).ready(function() {
  var owl = $('.owl-slider');
  owl.owlCarousel({
	margin: 5,
	nav: false,
	dots: true,  
	loop: false,
	rewind: true,   
	autoplay:true,
	autoplayTimeout:7000,
	smartSpeed: 1500,
	items:1, 
	navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"], 
  })
});

$(document).ready(function() {
  var owl = $('.owl-op');
  owl.owlCarousel({
	margin: 10,
	nav: true,
	dots: false,  
	loop: true,
	rewind: true,   
	autoplay:true,
	autoplayTimeout:7000,
	smartSpeed: 1000,  
	onInitialized: counter, 
    onTranslated: counter, 
	center: true,  
	navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"], 
	responsive: {
	  0: {
		items: 1
	  },
	  600: {
		items: 2
	  },
	  1000: {
		items: 3
	  },
	  1200: {
		items:5
	  },
	  1400: {
		items: 5
	  }
	}  
  });
  function counter(event) {
    var element = event.target; 
    var items = event.item.count; 
    var item = event.item.index + 1; 
    if (item > items) {
      item = item - items;
    }
    $('#counter').html(item + " / " + items);
  }
});

$(document).ready(function() {
  var owl = $('.owl-cs');
  owl.owlCarousel({
	margin: 5,
	nav: false,
	dots: true,  
	loop: false,
	rewind: true,   
	autoplay:true,
	autoplayTimeout:7000,
	smartSpeed: 1500,
	items:1, 
	navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"], 
  })
});


$(document).ready(function() {
  var owl = $('.owl-bsp');
  owl.owlCarousel({
	margin: 20,
	nav: false,
	dots: true,  
	loop: false,
	rewind: true,   
	autoplay:true,
	autoplayTimeout:7000,
	smartSpeed: 1000,  
	navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"], 
	responsive: {
	  0: {
		items: 1
	  },
	  600: {
		items: 2
	  },
	  1000: {
		items: 3
	  },
	  1200: {
		items:3
	  },
	  1400: {
		items: 3
	  }
	}  
  });
});


$(document).ready(function() {
  var owl = $('.owl-na');
  owl.owlCarousel({
	margin: 20,
	nav: true,
	dots: false,  
	loop: true,
	rewind: true,   
	autoplay:true,
	autoplayTimeout:7000,
	smartSpeed: 1000,  
	onInitialized: counter, 
    onTranslated: counter, 
	center: true,  
	items: 1,  
	navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"], 
  });
  function counter(event) {
    var element = event.target; 
    var items = event.item.count; 
    var item = event.item.index + 1; 
    if (item > items) {
      item = item - items;
    }
    $('#counter1').html(item + " / " + items);
  }
});


$(document).ready(function () {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: true,
    autoplay: false,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200,
    navText : ["<i class='fa-solid fa-chevron-left'></i>","<i class='fa-solid fa-chevron-right'></i>"] }).
  on('changed.owl.carousel', syncPosition);

  sync2.
  on('initialized.owl.carousel', function () {
    sync2.find(".owl-item").eq(0).addClass("current");
  }).
  owlCarousel({
    items: slidesPerPage,
    dots: false,
    nav: false,
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate: 100 }).
  on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    sync2.
    find(".owl-item").
    removeClass("current").
    eq(current).
    addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
});