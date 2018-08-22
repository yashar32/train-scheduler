var url ="https://my-train-schedule.firebaseio.com/";
var dataRef = new Firebase(url);
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';


$(document).ready(function() {

     $("#add-train").on("click", function() {
     	// YOUR TASK!!!
     	// Code in the logic for storing and retrieving the most recent user.
     	// Dont forget to provide initial data to your Firebase database.
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for the push
     	keyHolder = dataRef.push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  // 2:22 in my example
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});
          // The notes below are for finding the path to the key in the data being pushed, leaving as notes to save for later use.
          /*console.log(keyHolder.path.u[0]);
          var key = keyHolder.path.u[0];
          console.log(key);*/
     	// Don't refresh the page!

          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
          //id=" + "'" + keyHolder.path.u[0] + "'" + "
     dataRef.on("child_added", function(childSnapshot) {
	// full list of items to the well

		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");
// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});

}); // Closes jQuery wrapper
