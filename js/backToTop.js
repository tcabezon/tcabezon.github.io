
//code from: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp 

function scrollFunction() {
    //Get the button
    var mybutton = document.getElementById("topBtn");
    //get full page height
    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight );

  if (document.body.scrollTop > (document.documentElement.scrollHeight/2) || document.documentElement.scrollTop > (document.documentElement.scrollHeight/2)) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
