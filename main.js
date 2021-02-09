/* if a car div is clicked, it acts as a link*/
$(".car").click(function() {
    window.location = $(this).find("a").attr("href"); 
    return false;
  });