const hamburgerIcon = document.querySelector(".hamburger--container");
const navBar = document.querySelector(".navbar");

hamburgerIcon.addEventListener('click', () => {
    navBar.classList.toggle("change")
});

// function prevent(e) {
//   e.preventDefault();
// };

document.getElementById("submit").addEventListener("click", function(event){
  event.preventDefault()
}); 
 
function validateForm() {
    var name = document.forms["form"]["name"].value;
    var lastName = document.forms["form"]["lastname"].value;
    var email = document.forms["form"]["email"].value
    if (name == "") {
      alert("Name must be filled out");
      return false;
    }
    if (lastName == "") {
        alert("Last name must be filled out");
        return false;
    }
    if(email == ""){
        alert("Email must be filled out");
        return false;
    }
}

function test() {
  return alert("This is working");
} 