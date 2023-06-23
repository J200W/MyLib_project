<template>
    <section>
        <button class="show-modal">Save book info</button>
    
          <div class="modal-box">
            <h2>Completed</h2>
            <h3>Tne book have been  sucessfully saved !</h3>
    
            <div class="buttons">
              <button class="close-btn">Close</button>
            </div>
          </div>

    </section>
          
</template>
    
    
    <script>
      export default {
        mounted() {
            const section = document.querySelector("section"),
                showBtn = document.querySelector(".show-modal"),
                closeBtn = document.querySelector(".close-btn");
    
            showBtn.addEventListener("click", () => section.classList.add("active"));

            closeBtn.addEventListener("click", () =>
                section.classList.remove("active")
            );
            }
      }
    </script>
    
    

<style scoped>


@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");


* {
  font-family: "Poppins", sans-serif;
}
section {
  overflow-y: hidden;
  z-index: 2;
  position: static;
  height: 100%;
  width: 100%;
}

button {
  position: relative;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  padding: 14px 22px;
  border: none;
  background: #4070f4;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #265df2;
}
button.show-modal,
.modal-box {
  position: relative;
  left: 75%;
  top: 65%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  
}
section.active .show-modal {
  display: none;
}

section.active .overlay {
  opacity: 0;
  pointer-events: auto;
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
  transform: translate(-50%, -50%) scale(1.2);
}
section.active .modal-box {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) scale(1);
}
.modal-box i {
  font-size: 70px;
  color: #4070f4;
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