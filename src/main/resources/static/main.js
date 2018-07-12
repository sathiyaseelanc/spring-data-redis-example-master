/**
 * Create HTML table row.
 *
 * \param text (str) HTML code to be placed inside the row.
 */
function tr(text) {
    return '<tr>' + text + '</tr>';
}

/**
 * Create HTML table cell element.
 *
 * \param text (str) The text to be placed inside the cell.
 */
function td(text) {
    return '<td>' + text + '</td>';
}

/**
 * Edit value: load key and value into inputs.
 */
function editButton(key) {
    var format = '<button '
        + 'class="btn btn-default" '
        + 'onclick="editKey(\'{key}\')" '
        + '>Edit</button>';
    return format.replace(/{key}/g, key);
}

/**
 * Create HTML button with which a key-value pair is deleted from persistence.
 *
 * \param key (str) that'll be deleted when the created button is clicked.
 */
function deleteButton(key) {
    var format = '<button '
        + 'class="btn btn-default" '
        + 'data-key="{key}" '
        + 'onclick="deleteKey(\'{key}\')" '
        + '>Delete</button>'
    return format.replace(/{key}/g, key);
}

/**
 * Create HTML table row element.
 *
 * \param key (str) text into the key cell.
 * \param value (str) text into the value cell.
 */
function row(key, value) {
    return $(
        tr(
            td(key) +
            td(value) +
            td(editButton(key)) +
            td(deleteButton(key))));
}

/**
 * Clear and reload the values in data table.
 */
function refreshTable() {
    $.get('/values', function(data) {
        var attr,
            mainTable = $('#mainTable tbody');
        mainTable.empty();
        for (attr in data) {
        	//alert(attr);
            if (data.hasOwnProperty(attr)) {
            	//alert(data[attr]);
                mainTable.append(row(attr, data[attr]));
            }
        }
    });
}

function refreshTableList() {
    $.get('/listvalues', function(data) {
        	//alert(data);
    });
}

function multiGet() {
    $.get('/multiget', function(data) {
        	//alert(data);
    });
}

function editKey(key) {
    /* Find the row with key in first column (key column). */
    var format = '#mainTable tbody td:first-child:contains("{key}")',
        selector = format.replace(/{key}/, key),
        cells = $(selector).parent().children(),
        keyVal = cells[0].textContent,
        firstNameVal = cells[1].textContent,
        lastNameVal = cells[2].textContent,
        contactNoVal = cells[3].textContent,
        addressTypeVal = cells[4].textContent,
        addressLine1Val = cells[5].textContent,
        addressLine2Val = cells[6].textContent,
        cityVal = cells[7].textContent,
        countryVal = cells[8].textContent,
        postalCodeVal = cells[9].textContent,
        //keyInput = $('#keyInput'),
        keyInput = $('#keyInput');
	    firstName = $('#firstName'),
	    lastName = $('#lastName'),
	    contactNo = $('#contactNo'),
	    addressType = $('#addressType'),
	    addressLine1 = $('#addressLine1'),
	    addressLine2 = $('#addressLine2'),
	    city = $('#city'),
	    country = $('#country'),
	    postalCode = $('#postalCode');

    /* Load the key and value texts into inputs
     * Select value text so it can be directly typed to
     */
    keyInput.val(keyVal);
    //valueInput.val(value);
    firstName.val(firstNameVal);
    lastName.val(lastNameVal);
    contactNo.val(contactNoVal);
    addressType.val(addressTypeVal);
    addressLine1.val(addressLine1Val);
    addressLine2.val(addressLine2Val);
    city.val(cityVal);
    country.val(countryVal);
    postalCode.val(postalCodeVal);
    
    keyInput.select();
}

/**
 * Delete key-value pair.
 *
 * \param key (str) The key to be deleted.
 */
function deleteKey(key) {
    /*
     * Delete the key.
     * Reload keys and values in table to reflect the deleted ones.
     * Set keyboard focus to key input: ready to start typing.
     */
    $.post('/delete', {key: key}, function() {
        refreshTable();
        $('#keyInput').focus();
    });
}

$(document).ready(function() {
    var keyInput = $('#keyInput'),
    firstName = $('#firstName'),
    lastName = $('#lastName'),
    contactNo = $('#contactNo'),
    addressType = $('#addressType'),
    addressLine1 = $('#addressLine1'),
    addressLine2 = $('#addressLine2'),
    city = $('#city'),
    country = $('#country'),
    postalCode = $('#postalCode');

    refreshTable();
    refreshTableList();
    multiGet();
    $('#addForm').on('submit', function(event) {
        var data = {
            key: keyInput.val(),
            //value: valueInput.val()
            firstName:firstName.val(),
            lastName:lastName.val(),
            contactNo:contactNo.val(),
            addressType:addressType.val(),
            addressLine1:addressLine1.val(),
            addressLine2:addressLine2.val(),
            city:city.val(),
            country:country.val(),
            postalCode:postalCode.val()
        };

        /*
         * Persist the new key-value pair.
         * Clear the inputs.
         * Set keyboard focus to key input: ready to start typing.
         */
        $.post('/add', data, function() {
            refreshTable();
            keyInput.val('');
            //valueInput.val('');
            firstName.val('');
            lastName.val('');
            contactNo.val('');
            addressType.val('');
            addressLine1.val('');
            addressLine2.val('');
            city.val('');
            country.val('');
            postalCode.val('');
            keyInput.focus();
        });
        /* Prevent HTTP form submit */
        event.preventDefault();
    });

    /* Focus keyboard input into key input; ready to start typing */
    keyInput.focus();
});
