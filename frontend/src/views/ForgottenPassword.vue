<script setup>
import NavbarSimple from "@/components/NavbarSimple.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
    <NavbarSimple />

    <body>
        <form id="form-forgotten" @submit="submitForm">
            <label class="form-label" for="username">Enter your email address to reset your password</label>
            <input class="form-input" type="email" id="username" name="username" required> <br><br>
            <input class="form-submit" type="submit" value="Submit"><br><br>
        </form>
        <div id="form_forgotten"></div>
    </body>

    <TheFooter />
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
}

body {
    background-color: #F7EDE2;
}


.links {
    text-decoration: none;
    color: white;
    background-color: #0C0A0B;
    font-size: 2.5vmin;
    border: #f5f5f5 2px solid;
    border-radius: 40px;
    padding: 0.8rem;
    margin-left: 1rem;
}

.links:hover {
    color: black;
    background-color: #FFF !important;
    transition: all 0.1s ease-in-out;
}

#form-forgotten {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    padding: 40px 40px 40px 40px;
    width: 50%;
    background-color: #FFF;
    top: 50%;
    left: 50%;
    margin: auto;
    margin-top: 5%;
}

.form-label {
    font-size: 2.5vmin;
    margin-bottom: 0.5rem;
}

.form-input {
    font-size: 2.5vmin;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    border: #A09C9C 2px solid;
    background-color: #A09C9C;
    color: #FFF;
}

.form-submit {
    font-size: 2.5vmin;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    border: #D0AB77 2px solid;
    background-color: #D0AB77;
    color: #FFF;
    width: 50%;
    margin: auto;
}

.form-submit:hover {
    background-color: #D79262;
    border: #D79262 2px solid;
    color: white;
    transition: all 0.3s ease 0s;
}



@media (max-width: 1100px) {
    #section {
        width: 50%;
    }

    #section router-link {
        font-size: 2vmin;
        padding: 0.6rem;
    }
}
</style>

<script>


export default
{
  name:'ForgottenPassword',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    submitForm(event) {
      // Envoyer les données du formulaire au serveur ou effectuer des actions supplémentaires
      console.log('Formulaire soumis !', this.email, this.password);
      event.preventDefault();

      var datas = {
        email: this.email,
      };

      fetch("http://localhost:80/send_login_forgotMdp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indiquer le type de données dans le corps de la requête
          //"Content-Encoding": "gzip" // Ajouter l'en-tête Content-Encoding avec la valeur gzip
        },
        body: JSON.stringify(datas)
      })
          .then(response => response.text())
          .then(data => {
            // Traiter la réponse du serveur
            console.log("Envoi du mail:", data);
            // Crée un paragraphe avec du css indiquant que le mail a bien été envoyé
            var para = document.createElement("p");
            var node = document.createTextNode(data ? "An email has been sent to you" : "An error occured while sending the email");
            para.appendChild(node);
            para.style.color = data ? "green" : "red";
            var element = document.getElementById("form-forgotten");
            element.appendChild(para);

          })  .catch(error => {
        // Gérer les erreurs
        console.error("Erreur lors de l'envoi du formulaire :", error);
      });

    }
  }
}
</script>