/*global console: true, $: true, node: true */
// Variable to hold request
var request;

// On Form Submit - do following:
function runGS() {
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup local variables
    var $form = $('#Donate_Greece');

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();
    console.log(serializedData);
    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbywcSyaJQI-E6rRITC2fncopsYXls854Merm_tNksluNvm0H9zq/exec",
        type: "post",
        data: serializedData
    });
    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        console.log(serializedData);
        // Log a message to the console
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown, jqXHR
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });
}