$(document).ready(function(){



//Initialize firebase
  var config = {
    apiKey: "AIzaSyBSTMcDQ6A0E9HsWyqeAKNi5NmaV-A76Uc",
    authDomain: "train-scheduler-a7db1.firebaseapp.com",
    databaseURL: "https://train-scheduler-a7db1.firebaseio.com",
    projectId: "train-scheduler-a7db1",
    storageBucket: "",
    messagingSenderId: "480620623482"
  };
  firebase.initializeApp(config);
  var dataRef = firebase.database();

  //initial values
var name="";
var destination="";
var firstTrain=0;
var frequency=0;

  //capture button click

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    //grab values from text boxes
    name=$("#train-name").val().trim();
    destination=$("#destination-input").val().trim();
    firstTrain=$("#firstTrain-input").val().trim();
    frequency=$("#frequency-input").val().trim();
   
//push the traininput values in firebox database
dataRef.ref().push({
    name: name,
    destination:destination,
    firstTrain:firstTrain,
    frequency:frequency,
});

});

dataRef.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
      var trainName =childSnapshot.val().name;
      var destName =childSnapshot.val().destination;
      var initialTrain =childSnapshot.val().firstTrain;
      var trainFreq=childSnapshot.val().frequency;

      var frequency= 10;
      var initialTrain = "12:00";

      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(initialTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + moment(diffTime));

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     //add to html
     //this doesnt seem to be working and im not sure why. getting all the results in console log but just not being able to push into html

     $(".train-info").append("<tr><td>" + trainName + "</td><td>" + destName + "</td><td>"  + trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
     console.log(trainName, destName, trainFreq );



})




})