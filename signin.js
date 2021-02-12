var url = "https://selfbuilt-audi-store.herokuapp.com/users";

var obj = newData => {
    var newUser = {
        "id": newData[5].val(), // mail perque no es repeteixi
        "nom" : newData[0].val(),
        "surname": newData[1].val(),
        "continent": newData[2].val(),
        "city": newData[3].val(),
        "zip_code": newData[4].val(),
        "password": newData[6].val(),
        // newData[7] es tambe el password
        "news": newData[8].is(":checked"),
      };
    return newUser;
}

$(window).on("load",  async () => {
    
    $('#form').on("submit", async (event) => {
        event.preventDefault();
        try {
            var name, surname, continent, city, zipCode, mail, password, rptPassword, terms, moreInfo; // info de un usuari
            name = $("#name");
            surname = $("#surname");
            continent = $("#continent");
            city = $("#city");
            zipCode = $("#zip-code");
            mail = $("#mail");
            password = $("#password");
            rptPassword = $("#rptpassword");
            terms = $("#terms");
            moreInfo = $("#more-info");
            var requiredInfo = [name, surname, continent, city, zipCode, mail, password, rptPassword];
            var variablesName = ["Name", "Surname", "Continent", "City", "Zip Code", "Mail", "Password", "Repeat the Password"];

            var alertSentence = "";
            var first = true;
            for (var x in requiredInfo) {
                if (requiredInfo[x].val() === "") {
                    if (!first) {
                        alertSentence += "\n"; // salt de línia quan no és el primer
                    }
                    first = false;
                    alertSentence += "The field \"" + variablesName[x] + "\" is required.";
                }
            }

            // control de inputs obligatoris
            if (alertSentence !== "") {
                alert(alertSentence);
                return;
            }
            // control de que s'acceptin els terms and conditions
            else if (!terms.is(":checked")) {
                alert("You must accept the Terms & Conditions.");
                return;
            }
            // els camps "Password" i "Repeat the Password" han de ser els mateixos
            else if (password.val() !== rptPassword.val()) {
                alert("The passwords must match!");
                return;
            }
            // si tot es correcte guardem les dades a la api
            else {
                var newUser = obj([...requiredInfo, moreInfo]); // obj amb les dades del nou usuari
                console.log(newUser);
                try {
                    await axios.post(url, newUser); // posem el nou usuari a la api
                    alert("User saved! Now you can log in with it.");
                    window.location.assign("login.html"); // carreguem la pagina del login
                } catch (error) { // hi ha hagut un error perque l'email s'ha repetit => es repeteix el camp "id"
                    alert("This email has already been used! Use another one.")
                    window.location.reload(); // reiniciem la pagina
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
});