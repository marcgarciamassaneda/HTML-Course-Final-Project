var url = 'https://curso-jedi-web.herokuapp.com/pokemons';

$(window).on("load",  async () => {
    var name, surname, continent, city, zipCode, mail, password, rptPassword, terms, moreInfo; // info de base de dades
    $('#sign-in-button').on("click", async () => {
        try {
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
            else {
                
            }
        } catch (error) {
            console.log(error);
        }
    });
});