let dataSet = [
	["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
	["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
	["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
	["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
	["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
	["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
	["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
	["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
	["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
	["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
	["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
	["Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"],
	["Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600"],
	["Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500"],
	["Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750"],
	["Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500"],
	["Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000"],
	["Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500"],
	["Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000"],
	["Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500"],
	["Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000"],
	["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000"],
	["Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450"],
	["Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600"],
	["Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000"],
	["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
	["Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650"],
	["Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850"],
	["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000"],
	["Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000"],
	["Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400"],
	["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
	["Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000"],
	["Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500"],
	["Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050"],
	["Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675"]
];




(function ($) {
	"use strict"


	//example 1
	var table = $('#example').DataTable({
		createdRow: function (row, data, index) {
			$(row).addClass('selected')
		},
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		}
	});
	var table = $('#projects-tbl').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		pageLength: 5,
		select: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});

	var table = $('#projects-tbl1').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		pageLength: 5,
		select: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#projects-tb22').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		pageLength: 5,
		select: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#user-tbl').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],

		searching: true,
		pageLength: 12,
		select: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			},
			'search': ' <i class="fa-solid fa-magnifying-glass"></i>',
			searchPlaceholder: "Search..."

		},

	});


	var table = $('#attendance-tbl').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#empoloyees-tbl').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		pageLength: 5,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#empoloyees-tblwrapper').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		//pageLength:5,			
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#empoloyees-tbl2').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		pageLength: 5,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#empoloyees-tbl3').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		pageLength: 7,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#reports-tbl').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		//pageLength:5,			
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#empoloyeestbl2').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		/* pageLength:5, */
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#empoloyees-tbl1').DataTable({
		//dom: 'Bfrtip',
		'dom': 'ZBfrltip',
		buttons: [

			{
				extend: 'excel', text: '<i class="fa-solid fa-file-excel"></i> Export Report',
				className: 'btn btn-sm border-0'
			}
		],
		searching: false,
		select: false,
		pageLength: 8,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});
	var table = $('#product-tbl').DataTable({
		//dom: 'Bfrtip',
		searching: false,
		select: false,
		pageLength: 7,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}

		},

	});

	table.on('click', 'tbody tr', function () {
		var $row = table.row(this).nodes().to$();
		var hasClass = $row.hasClass('selected');
		if (hasClass) {
			$row.removeClass('selected')
		} else {
			$row.addClass('selected')
		}
	})

	table.rows().every(function () {
		this.nodes().to$().removeClass('selected')
	});


	//example 2
	var table2 = $('#example2').DataTable({
		createdRow: function (row, data, index) {
			$(row).addClass('selected')
		},

		"scrollY": "42vh",
		"scrollCollapse": true,
		"paging": false
	});

	table2.on('click', 'tbody tr', function () {
		var $row = table2.row(this).nodes().to$();
		var hasClass = $row.hasClass('selected');
		if (hasClass) {
			$row.removeClass('selected')
		} else {
			$row.addClass('selected')
		}
	})

	table2.rows().every(function () {
		this.nodes().to$().removeClass('selected')
	});

	// dataTable1
	var table = $('#dataTable1').DataTable({
		searching: false,
		paging: true,
		select: false,
		lengthChange: false,

	});
	// dataTable2
	var table = $('#dataTable2').DataTable({
		searching: false,
		paging: true,
		select: false,
		lengthChange: false,

	});
	// dataTable3
	var table = $('#dataTable3').DataTable({
		searching: false,
		paging: true,
		select: false,
		lengthChange: false,

	});
	// dataTable4
	var table = $('#dataTable4').DataTable({
		searching: false,
		paging: true,
		select: false,
		lengthChange: false,

	});

	// dataTable5
	var table = $('#example5').DataTable({
		searching: false,
		paging: false,
		select: false,
		info: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		}

	});

	// dataTable6
	var table = $('#example6').DataTable({
		searching: false,
		paging: true,
		select: false,
		info: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		}

	});


	// dataTable7
	var table = $('#example7').DataTable({
		searching: false,
		paging: true,
		select: false,
		info: true,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		}

	});
	// dataTable9

	// table row
	var table = $('#dataTable1, #dataTable2, #dataTable3, #dataTable4, #example3, #example4').DataTable({
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		}
	});

	var url = $('#dataTable').data('url');
	var table = $('#inhouseProduct').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'product_id' },
			{ data: 'image' },
			{ data: 'name' },
				// { data: 'category' },
				// { data: 'purchase_price' },
				// { data: 'price' },
				// { data: 'quantity' },
			{ data: 'status' },
			{ data: 'action' },
		]

	});

	var url = $('#inhousecatrgoryurl').data('url');
	var table = $('#inhouseCategory').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'category' },
			{ data: 'status' },
			{ data: 'action' },
		]

	});

	var url = $('#warehouseurl').data('url');
	var table = $('#warehouseTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'productCode' },
			{ data: 'zone' },
			{ data: 'rack' },
			{ data: 'location' },
			{ data: 'action' },
		]

	});

	var url = $('#promotionurl').data('url');
	var table = $('#promotiontable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'titleen' },
			{ data: 'status' },
			{ data: 'action' },
		]

	});

	var url = $('#CouponUrl').data('url');
	var table = $('#CouponTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'code' },
			{ data: 'type' },
			{ data: 'value' },
			{ data: 'claimed' },
			{ data: 'status' },
			{ data: 'action' },
		]

	});

	var url = $('#productdataTable').data('url');
	var table = $('#broditProduct').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'product_id' },
			{ data: 'name' },
			{ data: 'eanNumber' },
			{ data: 'status' },
			{ data: 'action' },
		]

	});
	var url = $('#branddataTableURL').data('url');
	var table = $('#brandTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'brand_id' },
			{ data: 'name' },
			{ data: 'brand_type_name' },
			{ data: 'action' },
		]

	});
	var url = $('#modelsTableURL').data('url');
	var table = $('#modelsTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'model_id' },
			{ data: 'name' },
			{ data: 'brand' },
			{ data: 'brandType' },
			{ data: 'action' },
		]

	});

	var url = $('#currencydataTableurl').data('url');
	var table = $('#currencyTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'code' },
			{ data: 'qar_rate' },
			{ data: 'image' },
			{ data: 'status' },
			{ data: 'action' },
		]

	});

	$('#orderfilterBtn').on('click', function () {
    var table = $('#ordersTable').DataTable();
    table.ajax.reload(null, false);
});

var url = $('#orderdataTable').data('url');
var table = $('#ordersTable').DataTable({
    searching: true,
    paging: true,
    select: true,
    info: true,
    lengthChange: true,
    processing: true,
    serverSide: true,
    language: {
        paginate: {
            next: '<i class="fa-solid fa-angle-right"></i>',
            previous: '<i class="fa-solid fa-angle-left"></i>'
        }
    },
    ajax: {
        url: url,
        data: function (d) {
            d.fromDate = $('#fromDate').val();
            d.toDate = $('#toDate').val();
            d.paymentStatus = $('#payment_status').val();
            d.shippingMethod = $('#shipping_method').val();
        }
    },
    columns: [
        { 
            data: 'id',
            name: 'id',
            searchable: true
        },
        { 
            data: 'created_at',
            name: 'created_at',
            searchable: true
        },
        { 
            data: 'odoo_order_number',
            name: 'odoo_order_number',
            searchable: true
        },
        { 
            data: 'customer',
            name: 'customer',
            searchable: true
        },
        { 
            data: 'country',
            name: 'country',
            searchable: true
        },
        { 
            data: 'city',
            name: 'city',
            searchable: true
        },
        { 
            data: 'amount_to_pay',
            name: 'amount_to_pay',
            searchable: true
        },
        { 
            data: 'status',
            name: 'payment_status', // Use the actual database column name for searching
            searchable: true
        },
        { 
            data: 'delivery_type',
            name: 'delivery_type', // Use the actual database column name for searching
            searchable: true
        },
		{ 
            data: 'shipment_status',
            name: 'shipment_status', // Use the actual database column name for searching
            searchable: true
        },
        { 
            data: 'transaction_id',
            name: 'transaction_id',
            searchable: true
        },
        { 
            data: 'action',
            name: 'action',
            orderable: false,
            searchable: false
        }
    ],
    footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        
        // Helper function to convert to float
        var parseAmount = function (i) {
            return typeof i === 'string' ? 
                parseFloat(i.replace(/[^0-9.-]+/g, '')) || 0 : 
                typeof i === 'number' ? i : 0;
        };
        
        // Total of Amount Paid column (index 6)
        var total = api
            .column(6, { page: 'current', search: 'applied' })
            .data()
            .reduce(function (a, b) {
                return parseAmount(a) + parseAmount(b);
            }, 0);
        
        // Format as currency
        var formattedTotal = total.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        
        // Show in footer
        $(api.column(6).footer()).html(formattedTotal);
    }
});

// Trigger table reload when filters change
$('#orderfilterBtn').on('click', function() {
    table.draw();
});



	var url = $('#preorderdataTable').data('url');
	var table = $('#preordersTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'created_at' },
			{ data: 'name' },
			{ data: 'email' },
			{ data: 'phone' },
			{ data: 'alternatephone' },
			{ data: 'quantity' },
			// { data: 'product_id' },
			{ data: 'brodit_id' },
			{ data: 'stock' },
			{ data: 'action' },
		]

	});

        
	
	var url = $('#ContactTableURL').data('url');
	var table = $('#ContactTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'first_name' },
			{ data: 'last_name' },
			{ data: 'phone' },
			{ data: 'email' },
			{ data: 'action' },
		]
	});

	var url = $('#ReviewTableURL').data('url');
	var table = $('#ReviewTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'name' },
			{ data: 'review'}, 
			{ data: 'reviewar'},
			{ data: 'stars' },
			{ data: 'product_link' },
		]
	});

	var url = $('#CareerTableURL').data('url');
	var table = $('#CareerTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: {
			url: url,
			data: function (d) {
				// Add the 'fromDate' and 'toDate' parameters to the Ajax request
				d.fromDate = $('#fromDate').val();
				d.toDate = $('#toDate').val();
			}
		},
		columns: [
			{ data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
			{ data: 'first_name' },
			{ data: 'last_name' },
			{ data: 'phone' },
			{ data: 'email' },
			{ data: 'created_date' },
			{ data: 'status' },
			{ data: 'file' },
		]
	});

	$('#careerfilterBtn').on('click', function() {
		var table = $('#CareerTable').DataTable();
		table.ajax.reload(null, false);
	});
	$('#careerresetBtn').on('click', function() {
		$('#fromDate').val('');
		$('#toDate').val('');

		var table = $('#CareerTable').DataTable();
		table.ajax.reload(null, false);
	});

	$('#filterBtn').on('click', function () {
		var table = $('#orderReport').DataTable();
		table.ajax.reload(null, false);
	});

	var url = $('#orderreportTable').data('url');
	var table = $('#orderReport').DataTable({
		dom: 'lBfrtip',
        "buttons": [
			{
				extend: 'pdfHtml5',
				customize: function(doc) {
					// Iterate through each table cell in the document
					doc.content.forEach(function(item) {
						if (item.table) {
							item.table.body.forEach(function(row) {
								row.forEach(function(cell) {
									// Center-align the text in each cell
									cell.alignment = 'center';
								});
							});
						}
					});
				}
			},
			// 'excelHtml5',
			'csvHtml5'
		],
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: {
			url: url,
			data: function (d) {
				// Add the 'fromDate' and 'toDate' parameters to the Ajax request
				d.fromDate = $('#fromDate').val();
				d.toDate = $('#toDate').val();
				d.paymentStatus = $('#payment_status').val();
			}
		},
		columns: [
			{ data: 'id' },
			{ data: 'created_at' },
			{ data: 'odoo_order_number' },
			{ data: 'customer' },
			{ data: 'country' },
			{ data: 'city' },
			{ data: 'delivery_type' },
			{ data: 'amount_to_pay' },
			{ data: 'status' },
			{ data: 'transaction_id' },
		]

	});

	var url = $('#preorderreportdataTable').data('url');
	var table = $('#preordersreportTable').DataTable({
		dom: 'lBfrtip',
        "buttons": [
			
			// 'excelHtml5',
			'csvHtml5'
		],
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'created_at' },
			{ data: 'name' },
			{ data: 'email' },
			{ data: 'phone' },
			{ data: 'alternatephone' },
			{ data: 'quantity' },
			// { data: 'product_id' },
			{ data: 'brodit_id' },
		],
columnDefs: [
        { targets: '_all', className: 'text-left' } // Align all columns to the left
    ]

	});
	
	var url = $('#customersreportdataTable').data('url');
	var table = $('#customersreportTable').DataTable({
		dom: 'lBfrtip',
        "buttons": [
			
			// 'excelHtml5',
			'csvHtml5'
		],
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
			{ data: 'name' },
			{ data: 'email' },
			{ data: 'mobile' },
			{ data: 'country' },
		],
columnDefs: [
        { targets: '_all', className: 'text-left' } // Align all columns to the left
    ]

	});

	var url = $('#EmailSubscriptiondataTable').data('url');
	var table = $('#EmailSubscriptionTable').DataTable({
		dom: 'lBfrtip',
        "buttons": [
			
			// 'excelHtml5',
			'csvHtml5'
		],
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
			{ data: 'email' },
			{ data: 'created_at' }
		],
columnDefs: [
        { targets: '_all', className: 'text-left' } // Align all columns to the left
    ]

	});



	var url = $('#linkURL').data('url');
	var table = $('#linkTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'customer_name' },
			{ data: 'country' },
			{ data: 'location' },
			{ data: 'amount' },
			{ data: 'transaction_id' },
			{ data: 'payment_status' },
			{ data: 'action' },
		]
	});
	
	var url = $('#bannersURL').data('url');
	var table = $('#bannerTable').DataTable({
		searching: true,
		paging: true,
		select: true,
		info: true,
		lengthChange: true,
		processing: true,
		serverSide: true,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		},
		ajax: url,
		columns: [
			{ data: 'id' },
			{ data: 'page' },
			{ data: 'image' },
			{ data: 'action' },
		]
	});

	$(document).ready(function () {

		// Initialize
		$('#empTable').DataTable({
			processing: true,
			serverSide: true,
			ajax: "{{ route('getDataTableData') }}",
			columns: [
				{ data: 'emp_name' },
				{ data: 'email' },
				{ data: 'gender' },
				{ data: 'city' },
				{ data: 'status' },
			]
		});
	});



	$('#example tbody').on('click', 'tr', function () {
		var data = table.row(this).data();
	});

	// application table
	var table = $('#application-tbl1,#application-tbl2,#application-tbl3,#application-tbl4 ').DataTable({
		searching: false,
		lengthChange: false,
		language: {
			paginate: {
				next: '<i class="fa-solid fa-angle-right"></i>',
				previous: '<i class="fa-solid fa-angle-left"></i>'
			}
		}
	});

})(jQuery);
