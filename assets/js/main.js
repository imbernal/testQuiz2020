
var quiz = [];
var index = 0;
var evaluation = [];
var currentSolution = "";
var eachPoossibleSolution  = "";
var userAnswer = {};

String.prototype.takeOf = function(){
  var newWord = "";
  for (var i = 1; i < this.length-1; i++) {
    newWord+=this[i];
  }
  return newWord;
}


$.ajax({
  method:"get",
  url: "http://fvi-grad.com:4004/quiz",
  success: function(res){
    $("#question").html(res[index].questionText);
    //first iteration




    for (var i = 0; i < res[0].answers.length ; i++) {
      eachPoossibleSolution = res[0].answers[i];
      // console.log(eachPoossibleSolution);
      $('.answers').append("<label class='label'>"+"<div class='radioButton'><div id= "+"'"+eachPoossibleSolution+"'"+ " class='radioInside'></div></div>"+"<input type='radio' class='radioButtonSolution' value= "+"'"+eachPoossibleSolution+"'"+ " name='radioName'>" + eachPoossibleSolution + "</label>");
    }




      drawRadio();


      function drawRadio(){
        $('input[name=radioName]').on('change',function(){
          var  id = $('input[name=radioName]:checked').val();

          $(".radioInside").each(function(elem){
            if ($(this).hasClass('checkRadioInside')) {
                $(this).removeClass("checkRadioInside");
            }

          })

          $("#"+id).toggleClass("checkRadioInside");

        });
      }




    $("#send").click(function(){



      if(index+1 === res.length) {

        $("#send").attr('disabled','disabled');
        $("#question").html("");
        $('.answers').html("");
        checkSolution();
        $("#send").toggleClass("showButton");
        $("#try").toggleClass("showButton");
        $(".isRight").addClass("isRightAfter");

          if ($(".isRight").html()=="") {
            $(".isRight").html("<img src='assets/img/wrong.png' alt='ok'><p>Sorry!! your test is 0% right" +"</p>");
          }


        $("#try").click(function(){
          location.reload();
        })


      }else{

          $('.answers input').each(function(i){
            if ($(this).is(':checked')) {
              userAnswer[res[index].id] = $(this).val();
            }
          });

          index+=1;


          $("#question").html("");
          $('.answers').html("");

          $("#question").html(res[index].questionText);
          //first iteration
          for (var i = 0; i < res[index].answers.length ; i++) {
            eachPoossibleSolution = res[index].answers[i];
            // console.log(eachPoossibleSolution);
            $('.answers').append("<label class='label'>"+"<div class='radioButton'><div id= "+"'"+eachPoossibleSolution+"'"+ " class='radioInside'></div></div>"+"<input type='radio' class='radioButtonSolution' value= "+"'"+eachPoossibleSolution+"'"+ " name='radioName'>" + eachPoossibleSolution + "</label>");
          }


          drawRadio();

      }





      function checkSolution(){

        var  rigthSolution = {};
        let test = "";
        let average = 0;

        for (let i = 0; i < Object.keys(userAnswer).length; i++) {
          // console.log(userAnswer[i]);

          $.ajax({

            method: "GET",
            url: " http://fvi-grad.com:4004/quiz-get-answer/"+Object.keys(userAnswer)[i],
            success: function(res){
              test += " " + res;
              // $(".isRight").html(test);

              if(userAnswer[Object.keys(userAnswer)[i]] == res.takeOf()){
                average+=1;
                var isRight = "";
                var aux = (average/Object.keys(userAnswer).length)*100;

                if( aux > 50){
                  isRight = "<img src='assets/img/OK.svg' alt='ok'><p>Congrats!! your test is "+ aux +"% right" +"</p>"
                  $(".isRight").html(isRight);
                }else{
                  isRight = "<img src='assets/img/wrong.png' alt='ok'><p>Sorry!! your test is "+ aux +"% right" +"</p>"
                  $(".isRight").html(isRight);
                };
              }



            }

          })


        }



      }


    });






  }
});



// function getEachOne(res){
//
//   return index == quiz.length ? null : res[index];
// }
//
//
// function saveCurrentSolution(res){
//   currentSolution = res;
// }
// //get Solution to compare with the user solution
// function getSolution(id){
//   var url = "http://fvi-grad.com:4004/quiz-get-answer/"+ id;
//   $.ajax({
//     method:"get",
//     url: url,
//     success: function(res){
//       saveCurrentSolution(res);
//     }
//   });
// }
//
// function createHtml(){
//   var currentObject = getEachOne();
//
//   // for (var i = 0; i < currentObject.answers.length ; i++) {
//   //   $('.answers').append(radioButton);
//   // }
// }
