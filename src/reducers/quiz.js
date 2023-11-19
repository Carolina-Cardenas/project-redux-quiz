import { createSlice } from "@reduxjs/toolkit";

const questions = [
  {
    id: 1,
    questionText: "What are Mandalorians sometimes called?",
    options: ["Mandos", "Nandos", "Delorians ", "Starkillers"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText: "What is the name of character who is The Mandalorian?",
    options: [
      "Mye Sharona",
      "Din Djarin",
      "Rood Barista",
      "Grand Admiral Jamiroquai",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    questionText:
      "How would you best describe the character of The Mandalorian? ",
    options: [
      "Ship technician",
      "Lone gunfighter and Bounty hounter",
      "Scrap salvager and jedi",
      "Cargo pirate",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    questionText: " How old is The Child ?",
    options: ["10", "20", "50", "100"],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    questionText: "What is the droid Q9-0 often called?",
    options: ["Pippety", "Zero", "Ru Mental", "Bansky"],
    correctAnswerIndex: 1,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizIsOngoing: true,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }
      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    restart: () => {
      return initialState;
    },
  },
});
