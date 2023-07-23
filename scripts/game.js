//Get all the planets
const planetButtons = [...document.querySelectorAll(".planet-btn")];
const modalTitle = document.querySelector("#modal-title");
const modalQuestion = document.querySelector("#modal-question-title");
const modalAnswers = [...document.querySelector("#modal-answers").children];
let answerButtons;

console.log(modalQuestion);
console.log(modalAnswers);

MicroModal.init({
  disableScroll: true,
  disableFocus: true,
});
let currentQuestion = 0;

planetButtons.forEach((planetButton) => {
  planetButton.addEventListener("click", (e) => {
    console.log(e.target);
    MicroModal.show("modal-1", {
      disableScroll: true,
      disableFocus: true,
    });
    configureModal();
  });
});

function configureModal() {
  //set modal title
  modalTitle.innerHTML =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

  //set current question
  modalQuestion.innerHTML = questions[currentQuestion].question;

  //set answers
  //clear answer buttons styles
  modalAnswers.forEach((modalAnswer) => {
    modalAnswer.classList.remove("correct");
    modalAnswer.classList.remove("incorrect");
  });

  //shuffle answers
  shuffleAnswers();
  //set answers text
  for (let i = 0; i < modalAnswers.length; i++) {
    modalAnswers[i].innerHTML = questions[currentQuestion].answers[i];
  }
}

function shuffleAnswers() {
  //shuffle answers
  // Start from the last element and swap it with a randomly selected element before it
  for (let i = modalAnswers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [modalAnswers[i], modalAnswers[randomIndex]] = [
      modalAnswers[randomIndex],
      modalAnswers[i],
    ];
  }
}

modalAnswers.forEach((modalAnswer) => {
  modalAnswer.addEventListener("click", (e) => {
    console.log(e.target + "clicked");
    if (e.target.innerHTML === questions[currentQuestion].correctAnswer) {
      e.target.classList.add("correct");
      currentQuestion++;
      // setTimeout(() => {
      //   MicroModal.close("modal-1");
      // }, 1000);
    } else {
      e.target.classList.add("incorrect");
      // setTimeout(() => {
      //   MicroModal.close("modal-1");
      // }, 1000);
    }

    if (currentQuestion === questions.length) {
      console.log("game over");
    }
  });
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
