<template>
    <div class="sectionModal">
        <button class="modal-button show-modal">Save book info</button>

          <div class="modal-box">
            <h2>Sucess!</h2>
            <h3>Book informations have been  sucessfully saved.</h3>

            <div class="buttons">
              <button class="modal-button close-btn">Close</button>
            </div>
          </div>

    </div>

</template>


    <script>
      export default {
        mounted() {
            const section = document.querySelector(".sectionModal"),
                showBtn = document.querySelector(".show-modal"),
                closeBtn = document.querySelector(".close-btn");

            showBtn.addEventListener("click", () => section.classList.add("active"));

            closeBtn.addEventListener("click", () =>
                section.classList.remove("active"),

            );
            }
      }
    </script>



<style scoped>


@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");


* {
  font-family: "Poppins", sans-serif;
}
.sectionModal {

  z-index: 1;
  position: relative  ;



}

#modal-button {
  font-size: 18px;
  font-weight: 400;
  padding: 14px 22px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
#modal-button:hover {
  transition: 0.3s;
  background-color: #b97b07;
}
button.show-modal,
.modal-box {
  position: relative;
  left: 65%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

}
.sectionModal.active .show-modal {
  display: none;
}


.modal-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 100%;
  padding: 30px 20px;
  border-radius: 24px;
  background-color: #fff;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%) scale(1.4);
}
.sectionModal.active .modal-box {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1.2);
}
.modal-box i {
  font-size: 70px;
  color: #ecb41b;
}
.modal-box h2 {
  margin-top: 20px;
  font-size: 25px;
  font-weight: 500;
  color: #333;
}
.modal-box h3 {
  font-size: 16px;
  margin-top: 15px;
  font-weight: 400;
  color: #333;
  text-align: center;
}
.modal-box .buttons {
  margin-top: 25px;
}
.modal-box button {
  font-size: 15px;
  padding: 9px 18px;
  margin: 0 10px;
}

</style>