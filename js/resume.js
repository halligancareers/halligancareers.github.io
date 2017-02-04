var DEBUG = true;

$(document).ready(function () {
    $("#resume").change(setUploadFilename);
    $("#submit").click(submitResume);
});

function submitResume() {

    errors = updateErrors();
    if (errors)
        return;

    var endpt = DEBUG ? "http://localhost:5000/resume" : "https://halligancareers.herokuapp.com/resume";

    var formData = new FormData($("#form-fields")[0]);
    formData.append("email", $("#email").val());
    formData.append("resume", $("#resume")[0].files[0]);
    formData.append("notes", $("#notes").val());

    $.post({
        url: endpt,
        data: formData,
        processData: false,
        contentType: false
    }).done(successSubmitResume).fail(errorSubmitResume);
    
}

function successSubmitResume() {
    $("#form-fields").addClass("hidden");
    $("#form-success").removeClass("hidden");
    $("#success-frame").removeClass("hidden");
}

function errorSubmitResume(error) {
    if (error.responseJSON.message == "Invalid email")
            toggleError("email", true);
    else if (error.responseJSON.message == "Invalid resume-type")
        toggleError("resume", true);
}

function updateErrors() {

    var errors = false;

    toggleError(["email", "resume"], false);

    if ($("#email").val() === "") {
        toggleError("email", true);
        errors = true;
    }

    if (typeof $("#resume")[0].files[0] == "undefined") {
        toggleError("resume", true);
        errors = true;
    }

    return errors;

}

function toggleError(error, show) {
    if (error.isArray) {
        Array.map(function(error) {
            toggleError(error, show);
        });
    } else if (error == "email") {
        show ? $("#email-error").removeClass("hidden") :
               $("#email-error").addClass("hidden");
    } else if (error = "resume") {
        show ? $("#resume-error").removeClass("hidden") :
               $("#resume-error").addClass("hidden");
    }
}

function extractFilename(filepath) {
    var re = /C:\\fakepath\\(.+)/;
    var filename = filepath.match(re)[1];
    return filename;
}

function setUploadFilename() {
    var filename = extractFilename($("#resume").val());
    $("#resume-label").empty();
    $("#resume-label").append(filename);
}
