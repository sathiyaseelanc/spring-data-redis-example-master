  var dataSet = [
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
    ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"]
  ];
  
  var dset=[
	 // [id=key3, firstName=Sathiyaseelan, lastName=C, contactNo=93575533, id=key3-Singapore Type, addressLine1=Singapore, addressLine2=Singapore2, city=Singapore, country=Singapore, postalCode=0065]
	 // ["key3","Sathiyaseelan","C","93575533","key3-Singapore Type","Singapore","Singapore2","Singapore","Singapore","0065"]
	  [{"id":"key3","firstName":"Sathiyaseelan","lastName":"C","contactNo":"93575533","address":{"id":"key3-Singapore Type","addressLine1":"Singapore","addressLine2":"Singapore2","city":"Singapore","country":"Singapore","postalCode":"0065"}},{"id":"key1","firstName":"Sathiyaseelan","lastName":"C","contactNo":"93575533","address":{"id":"key1-Singapore2","addressLine1":"Singapore2","addressLine2":"Singapore2","city":"Singapore","country":"Singapore","postalCode":"0065"}}]
	  ];

  var columnDefs = 
  [
	 { title: "Id" },
     { title: "FirstName" },
     { title: "LastName" },
     { title: "ContactNo" },
     { title: "AddressType" },
     { title: "AddressLine1" },
     { title: "AddressLine2" },
     { title: "City" },
     { title: "Country" },
     { title: "PostalCode" }
  ];

  
  function deleteKey(key) {
	    /*
	     * Delete the key.
	     * Reload keys and values in table to reflect the deleted ones.
	     * Set keyboard focus to key input: ready to start typing.
	     */
	    $.post('/delete', {key: key}, function() {
	      
	    });
	}
  

  var dataval;
  var myTable;
  $(document).ready(function() {
	  //multiGet();
	  $.get('/multiget', function(data) {
      	//alert(data);
      	dataval=data;
 
  myTable = $('#example').DataTable({
    "sPaginationType": "full_numbers",
    data: dataval,       // data from above
    columns: columnDefs,  // columns from above
    dom: 'Bfrtip',        // element order: NEEDS BUTTON CONTAINER (B) ****
    select: 'single',     // enable single row selection
    responsive: true,     // enable responsiveness
    altEditor: true,      // Enable altEditor ****
    buttons: [
    {
      text: 'Add',
      name: 'add'        // DO NOT change name
    },
    {
      extend: 'selected', // Bind to Selected row
      text: 'Edit',
      name: 'edit'        // DO NOT change name
    },
    {
      extend: 'selected', // Bind to Selected row
      text: 'Delete',
      name: 'delete'      // DO NOT change name
   }]
  });
	  });
  });