// Elements
const planetButtons = [...document.querySelectorAll(".planet-btn")];
const modalTitle = document.querySelector("#modal-title");
const modalQuestion = document.querySelector("#modal-question-title");
const modalAnswers = [...document.querySelector("#modal-answers").children];
const playButton = document.querySelector("#play-btn");
const goalImage = document.querySelector("#goal-img");
const refreshButton = document.querySelector("#refresh-btn");
let currentQuestion = 0;

MicroModal.init({
  disableScroll: true,
  disableFocus: true,
});

// Show popup on page load with game instructions
window.addEventListener("load", () => {
  MicroModal.show("modal-2", {
    onClose: () => playPressed(),
    disableScroll: true,
    disableFocus: true,
  });
});

planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", (e) => {
    if (e.target.classList.contains("current")) {
      // If the planet has pending questions, show the modal to answer.
      MicroModal.show("modal-1", {
        disableScroll: true,
        disableFocus: true,
      });
      configureModal();
    } else {
      // Else shake the planet button to indicate it's not the current planet.
      e.target.classList.add("shake");
      setTimeout(() => {
        e.target.classList.remove("shake");
      }, 500);
    }
  });
});

const configureModal = () => {
  // Set modal title text
  modalTitle.innerHTML = `Question ${currentQuestion + 1} of ${
    questions.length
  }`;

  // Set current question text
  modalQuestion.innerHTML = questions[currentQuestion].question;

  // Clear answer buttons styles
  modalAnswers.forEach((modalAnswer) => {
    modalAnswer.classList.remove("correct");
    modalAnswer.classList.remove("incorrect");
  });

  // Shuffle answers
  shuffleAnswers(modalAnswers);

  // Set answers text
  for (let i = 0; i < modalAnswers.length; i++) {
    modalAnswers[i].innerHTML = questions[currentQuestion].answers[i];
  }
};

const shuffleAnswers = () => {
  // modalAnswers.sort(() => Math.random() - 0.5);
  for (let i = modalAnswers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [modalAnswers[i], modalAnswers[randomIndex]] = [
      modalAnswers[randomIndex],
      modalAnswers[i],
    ];
  }
};

// When an answer is selected, check if it's correct, if yes, scroll to the next planet.
modalAnswers.forEach((modalAnswer) => {
  modalAnswer.addEventListener("click", (e) => {
    if (e.target.innerHTML === questions[currentQuestion].correctAnswer) {
      e.target.classList.add("correct");
      setTimeout(() => {
        correctAnswerSelected();
      }, 100);
    } else {
      e.target.classList.add("incorrect");
    }
  });
});

/*
 * When the correct answer is selected, scroll to the next planet.
 * If it's the last planet, show the game over modal.
 */
const correctAnswerSelected = () => {
  MicroModal.close("modal-1");

  if (currentQuestion + 1 === questions.length) {
    gameOver();
    return;
  }

  currentQuestion++;
  planetButtons[currentQuestion].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });

  planetButtons[currentQuestion - 1].setAttribute("disabled", true);

  planetButtons[currentQuestion - 1]
    .querySelector("img")
    .classList.remove("current");
  planetButtons[currentQuestion].querySelector("img").classList.add("current");
};

// Starts the game
const playPressed = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
  document.body.style.overflow = "hidden";
};

const gameOver = () => {
  planetButtons[currentQuestion]
    .querySelector("img")
    .classList.remove("current");

  planetButtons[currentQuestion].setAttribute("disabled", true);

  goalImage.classList.add("scale-up-center");

  MicroModal.show("modal-3", {
    onClose: () => {
      window.location.reload();
    },
    disableScroll: true,
    disableFocus: true,
  });
};

refreshButton.addEventListener("click", () => {
  window.location.reload();
});

// Constants
const questions = [
  {
    question: 'What year was "Ziltoid the Omniscient" released?',
    answers: ["1992", "2004", "2007", "2022"],
    correctAnswer: "2007",
  },
  {
    question: "What's the name of Ziltoid's homeworld?",
    answers: ["Ziltoidia 9", "Earth", "Jupiter", "Talllatte"],
    correctAnswer: "Ziltoidia 9",
  },
  {
    question:
      "The album's release was accompanied by five webisode skits featuring a Ziltoid muppet. What social media platform were they originally broadcasted on?",
    answers: ["YouTube", "Facebook", "Twitter", "MySpace"],
    correctAnswer: "MySpace",
  },
  {
    question:
      "How were the drum tracks recorded, as the album was Townsend's solo project?",
    answers: [
      "Programmed on EZDrummer, a software drum machine",
      "By Devin Townsend, who learned how to play for this album",
      "By a hired studio drummer",
      "There were no drum tracks",
    ],
    correctAnswer: "Programmed on EZDrummer, a software drum machine",
  },
  {
    question:
      'A sequel album to "Ziltoid the Omniscient" was released in 2014. What was its name?',
    answers: [
      "Ziltoidia Attaxx!!",
      "Z^2",
      "Ziltoid 2: Not so smart now",
      "Ziltoid the Horrible",
    ],
    correctAnswer: "Z^2",
  },
  {
    question: "Ziltoid comes from which dimension?",
    answers: [
      "The 4th Dimension",
      "The Coffee Dimension",
      "The Z Dimension",
      "The Metal Dimension",
    ],
    correctAnswer: "The 4th Dimension",
  },
  {
    question:
      "Ziltoid searches for the ultimate cup of coffee. When he takes a sip of Earth's ultimate coffee, he is so appalled by the taste he orders his minions to attack and destroy the planet. What word does he use to describe the taste?",
    answers: ["Horrible", "Academic", "Fetid", "Blah"],
    correctAnswer: "Fetid",
  },
  {
    question: "What weapon does Ziltoid intend to use to destroy Earth?",
    answers: [
      "The Death Star",
      "The hammer of Thor",
      "The spinach cannon",
      "The planet smasher",
    ],
    correctAnswer: "The planet smasher",
  },
];
