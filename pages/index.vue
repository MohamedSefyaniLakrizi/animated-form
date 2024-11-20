<template>
  <div
    v-if="openResetPopup"
    class="fixed z-50 w-full h-screen flex flex-col justify-center items-center bg-white animate-fadein">
    <h1 class="text-3xl font-bold mb-10">Reset the form?</h1>
    <Button label="Reset" @click="reloadNuxtApp()" />
  </div>
  <div
    v-if="!closeInitialPopup"
    class="z-20 fixed flex items-center justify-center w-full h-full gradient">
    <Button
      label="continue"
      class="ml-[415px] mt-5"
      @click="
        changeText('Great! let\'s start by entering your name!');
        closeInitialPopup = true;
        goToTarget('.targetName');
        focusElement(0);
      " />
  </div>
  <div class="relative w-full h-screen">
    <img class="image absolute z-50" :src="imgLink" />
    <div class="absolute text z-50">
      <div
        class="relative w-fit bg-gray-100 text-gray-800 rounded-lg shadow-md">
        <!-- Speech bubble content -->
        <p v-html="speechBubble"></p>
        <!-- Left arrow -->
        <div
          class="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-100"></div>
      </div>
    </div>

    <div class="h-full flex flex-col items-center justify-center">
      <div
        class="w-[520px] h-full flex flex-col justify-center items-center gap-5">
        <h1 class="text-4xl font-bold mb-10">Example Form Website</h1>
        <div class="targetName relative flex items-center w-full">
          <div
            v-if="!completedName"
            class="arrowName absolute left-32 -top-7 text-primary-500">
            <i class="pi pi-arrow-down-right text-2xl" />
          </div>
          <p class="w-40">Name:</p>
          <InputText
            ref="nameInput"
            placeholder="Enter your name!"
            v-model="name"
            class=""
            @change=""
            v-on:click="
              if (!completedName) {
                if (name !== '') {
                  completedName = true;
                  changeText('Great! Now enter your email!');
                  goToTarget(
                    '.targetEmail',
                    'right',
                    200,
                    140,
                    25,
                    '/_nuxt/public/2881137_254-ai-2.png'
                  );
                  focusElement(1);
                } else {
                  changeText('Enter your name first to continue!');
                }
              }
            "
            v-on:submit=""
            v-on:blur="
              if (!completedName) {
                if (name !== '') {
                  completedName = true;
                  changeText('Great! Now enter your email!');
                  goToTarget(
                    '.targetEmail',
                    'right',
                    200,
                    140,
                    25,
                    '/_nuxt/public/2881137_254-ai-2.png'
                  );
                  focusElement(1);
                } else {
                  changeText('Enter your name first to continue!');
                }
              }
            " />
          <Button
            v-if="!completedName"
            class="ml-5"
            label="Continue"
            :disabled="name === ''"
            @click="focusElement(0)" />
        </div>
        <div class="targetEmail relative flex items-center w-full">
          <div class="arrowEmail absolute right-24 -top-7 text-primary-500">
            <i
              v-if="completedName && !completedEmail"
              class="pi pi-arrow-down-left text-2xl" />
          </div>
          <p class="w-40">Email:</p>
          <InputText
            placeholder="Enter your email!"
            v-model="email"
            class=""
            v-on:blur="
              if (!completedEmail) {
                if (email !== '') {
                  completedEmail = true;
                  changeText('Lastly, enter your password!');
                  goToTarget(
                    '.targetPassword',
                    'left',
                    200,
                    140,
                    25,
                    '/_nuxt/public/2881137_254-ai-4.png'
                  );
                  focusElement(2);
                } else {
                  changeText('Enter your email first to continue!');
                }
              }
            " />
          <Button
            v-if="!completedEmail && completedName"
            class="ml-5"
            label="Continue"
            :disabled="email === ''"
            @click="focusElement(1)" />
        </div>
        <div class="targetPassword relative flex items-center w-full">
          <div class="arrowEmail absolute left-32 -bottom-7 text-primary-500">
            <i
              v-if="completedName && completedEmail && !completedPassword"
              class="pi pi-arrow-up-right text-2xl" />
          </div>
          <p class="w-40">Password:</p>
          <InputText
            placeholder="Enter your password!"
            v-model="password"
            class=""
            v-on:blur="
              if (!completedPassword) {
                if (password.length > 5) {
                  completedPassword = true;
                  changeText('You can submit the form now!');
                  goToTarget(
                    '.targetPassword',
                    'left',
                    200,
                    140,
                    25,
                    '/_nuxt/public/2881137_254-ai-5.png'
                  );
                  focusElement(2);
                } else {
                  changeText(
                    'You need 5 or more characters for your password!'
                  );
                }
              }
            " />
        </div>
        <div>
          <Button
            class="submitButton"
            label="Submit"
            @click="
              if (completedName && completedEmail && completedPassword) {
                changeText('Form submitted successfully!');
                openResetPopupFunction();
                confetti({
                  particleCount: 1000,
                  startVelocity: 30,
                  spread: 360,
                  origin: { y: 0.6 },
                });
                changeText('Reset to submit another form!');
                goToFinalPosition();
              } else {
                changeText('Fill out the form first to submit!');
              }
            "
            :disabled="
              !completedName && !completedEmail && password.length < 6
            " />
        </div>
      </div>
    </div>
    <input type="number" v-model="finalPosition" />
  </div>
</template>

<script setup lang="ts">
  const imgLink = ref("/_nuxt/public/2881137_254-ai.png");
  const { $anime } = useNuxtApp();
  const closeInitialPopup = ref(false);
  const speechBubble = ref("Hello and welcome to our website!");
  const finalPosition = ref(0);
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const completedName = ref(false);
  const completedEmail = ref(false);
  const completedPassword = ref(false);
  const completeForm = ref(false);
  const nameInput = ref(null);
  import confetti from "canvas-confetti";

  if (window) {
    $anime({
      targets: ".image",
      translateX: window.innerWidth * 0.42,
      translateY: window.innerHeight * 0.4,
      width: 100,
      height: 250,
      duration: 0,
      easing: "easeInOutQuad",
    });
    $anime({
      targets: ".text",
      translateX: window.innerWidth * 0.5,
      translateY: window.innerHeight * 0.4,
      duration: 0,
      fontSize: ["16px", "24px"],
      easing: "easeInOutQuad",
    });
    $anime({
      targets: ".text > div:first-child",
      padding: ["0px", "16px"], // Animate padding from 10px to 20px
      duration: 0,
      easing: "easeInOutQuad",
    });
  }

  onMounted(() => {
    $anime({
      targets: ".arrowName",
      translateY: [5, 0],
      translateX: [5, 0],
      duration: 800,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });
    $anime({
      targets: ".arrowEmail",
      translateY: [-5, 0],
      translateX: [5, 0],
      duration: 800,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });
    $anime({
      targets: ".arrowPassword",
      translateY: [5, 0],
      translateX: [5, 0],
      duration: 800,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });
  });

  function goToTarget(
    className: string,
    direction: string = "left",
    leftDisplacement: number = 200,
    leftDisplacementText: number = 140,
    topDisplacement: number = 25,
    imageSource?: string
  ) {
    const targetElement = document.querySelector(className);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect();
      console.log("Target position:", targetPosition);
      console.log("Image source:", imageSource);
      if (imageSource) {
        console.log("Image source:", imageSource);
        imgLink.value = imageSource;
      }
      $anime({
        targets: ".image",
        translateX:
          direction === "left"
            ? targetPosition.left - leftDisplacement
            : targetPosition.right,
        translateY: targetPosition.top - topDisplacement,
        scale: imageSource ? [0.7, 1] : 1,
        width: 50,
        height: 125,
        duration: 800,
        easing: "easeInOutQuad",
      });
      $anime({
        targets: ".text",
        translateX:
          direction === "left"
            ? targetPosition.left - leftDisplacementText
            : targetPosition.right + 60,
        translateY: targetPosition.top - topDisplacement,
        fontSize: ["24px", "12px"],
        duration: 800,
        easing: "easeInOutQuad",
      });
      $anime({
        targets: ".text > div:first-child",
        padding: ["16px", "8px"], // Animate padding from 10px to 20px
        duration: 800,
        easing: "easeInOutQuad",
      });

      watch(finalPosition, () => {
        $anime({
          targets: ".image",
          translateY: finalPosition.value,
          width: 50,
          height: 125,
          duration: 800,
          easing: "easeInOutQuad",
        });
        $anime({
          targets: ".text",
          translateY: finalPosition.value,
          duration: 800,
          easing: "easeInOutQuad",
        });
      });
    }
  }

  const changeText = async (newText: string) => {
    speechBubble.value = newText
      .split("")
      .map((char) => `<span class="letter">${char}</span>`)
      .join("");
    await nextTick();
    $anime({
      targets: ".letter",
      opacity: [0, 1],
      duration: 50,
      easing: "easeInOutQuad",
      delay: (el, i) => i * 30,
    });
  };
  const changeImageSource = (newSrc: string) => {
    $anime({
      targets: ".image",
      scale: 0,
      duration: 200,
      easing: "easeInOutQuad",
      complete: () => {
        imgLink.value = newSrc;
        $anime({
          targets: ".image",
          scale: 1,
          duration: 200,
          easing: "easeInOutQuad",
        });
      },
    });
  };

  watch(password, () => {
    if (!completeForm.value) {
      if (password.value.length > 5) {
        goToTarget(".submitButton", "left", 0, -60, -50);
        changeText("You can submit the form now!");
        completeForm.value = true;
        completedPassword.value = true;
      }
    }
  });

  async function focusElement(number: number) {
    const name = document.getElementsByClassName("p-inputtext")[number].focus();
    console.log("focused");
  }

  const openResetPopup = ref(false);
  function openResetPopupFunction() {
    setTimeout(() => {
      openResetPopup.value = true;
    }, 200);
  }

  function goToFinalPosition() {
    imgLink.value = "/_nuxt/public/2881137_254-ai-2.png";
    $anime({
      targets: ".image",
      translateX: window.innerWidth * 0.45,
      translateY: window.innerHeight * 0.15,
      scale: [0, 1],
      width: 100,
      height: 250,
      duration: 500,
      easing: "easeInOutQuad",
    });
    $anime({
      targets: ".text",
      translateX: window.innerWidth * 0.53,
      translateY: window.innerHeight * 0.15,
      duration: 500,
      fontSize: ["16px", "24px"],
      easing: "easeInOutQuad",
    });
  }
</script>

<style scoped>
  .gradient {
    background: rgb(0, 0, 0);
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }

  .letter {
    display: inline-block;
    opacity: 0;
  }
</style>
