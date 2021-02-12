var url = "https://selfbuilt-audi-store.herokuapp.com/users";

const login = (users, mail, password) => {
    // si mirant tots els usuaris de la api, algun coincideix => true; sino => false
    for (var user in users) {
        if (users[user].id === mail) { // el mail coincideix
            if (users[user].password === password) { // la constrasenya i el mail coincideixen
                return true;
            }
            else { // sabem que els mails no es poden repetir i per tant ja no cal iterar més: s'ha equivocat
                return false;
            }
        } 
    }
    return false;
}

$(window).on("load",  async () => {

    $('#form').on("submit", async (event) => {
        event.preventDefault();
        try {
            var users = await axios.get(url); // rebem tots els usuaris
            mail = $("#mail");
            password = $("#password");
            var requiredInfo = [mail, password];
            var variablesName = ["Mail", "Password"];
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
            else { // tots els camps omplerts
                if (login(users.data, mail.val(), password.val())) {
                    alert("Success!");
                    window.location.assign("index.html"); // tornem a la pagina inicial
                }
                else {
                    alert("Ups... This user log in is not correct. Try again!");
                    window.location.reload(); // ens quedem a la pagina del login
                }
            }
            
        } catch (error) {
            console.log(err);
        }
    });

    $('#delete-button').on("click", async (event) => {
        event.preventDefault();
        try {
            var users = await axios.get(url); // rebem tots els usuaris
            for (var user in users.data) { // borrem tots els usuaris
                console.log(users.data[user].id)
                await axios.delete(`${url}/${users.data[user].id}`);
            }
            alert("All users deleted!");
            window.location.reload(); // reiniciem la pagina
        } catch (err) {
            console.log(err);
        }
    });
});

