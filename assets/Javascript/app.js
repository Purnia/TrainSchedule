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

var name="";
var destination="";
var firstTrain=0;
var frequency=0;

  //capture button click

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
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

dataRef.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().frequency);

      var frequency;
      var firstTrain = "12:00";

      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);



})




})