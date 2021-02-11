var url = "https://selfbuilt-audi-store.herokuapp.com/users";

var newUsers = (users, newData) => {
    var newUser = {
        "name": newData[0].val(),
        "surname": newData[1].val(),
        "continent": newData[2].val(),
        "city": newData[3].val(),
        "zip_code": newData[4].val(),
        "mail": newData[5].val(),
        "password": newData[6].val(),
        // newData[7] es tambe el password
        "news": newData[8].is(":checked"),
      };
    users.push(newUser);
    return users;
}

$(window).on("load",  async () => {
    try {
        var users = await axios.get(`${url}`);
    } catch (error) {
        console.log(err);
    }

    $('#sign-in-button').on("click", async () => {
        try {
            var name, surname, continent, city, zipCode, mail, password, rptPassword, terms, moreInfo; // info de base de dades
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
                var newUsersArray = newUsers(users.data, [...requiredInfo, moreInfo]);
                console.log(newUsersArray);
                axios.post(url, newUsersArray[1]);
                alert("User saved! Now you can log in with it.");
            }
        } catch (error) {
            console.log(error);
        }
    });
});