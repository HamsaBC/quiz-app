import  { createSlice,type  PayloadAction } from '@reduxjs/toolkit';

export type Question = {
    question: string;
    options:string[];
    correctAnswer: string;
};

 export interface QuizState {
    questions: Question[];
    currentIndex: number;
    score: number;
    userAnswers: string[];
    quizEnded:boolean;

}

// const initialState : QuizState = {
//     questions: [
//         {
//             question: "What is the capital of France?",
//             options: ["Paris", "London", "Berlin", "Madrid"],
//             correctAnswer: "Paris",

//         },

//         {
//             question: "2 + 2 = ?",
//             options: ["3", "4", "5", "6"],
//             correctAnswer: "4",
//          },

//          {
//             question: "What does HTML stand for?",
//             options: [
//                  "Hyper Text Markup Language",
//                  "Home Tool Markup Language",
//                  "Hyperlinks and Text Markup Language",
//                  "Hyper Tool Multi Language",
//              ],
//             correctAnswer: "Hyper Text Markup Language",
//         },
//     ],

//     currentIndex: 0,
//     score:0,
//     userAnswers: [],
//     quizEnded: false,
// };

const initialState: QuizState = {
    questions: [],
    currentIndex: 0,
    score: 0,
    userAnswers: [],
    quizEnded: false,
};

// const quizSlice = createSlice ( {
//     name: 'quiz',
//     initialState,
//     reducers: {
//         answerQuestion(state, action: PayloadAction<string>) {              // Handles the user's answer to the current question
//             const currentQuestion = state.questions[state.currentIndex];
//             const isCorrect = action.payload === currentQuestion.correctAnswer;

//             state.userAnswers.push(action.payload);
//             if(isCorrect) state.score += 1;

//             if(state.currentIndex + 1 < state.questions.length) {
//                 state.currentIndex += 1;
//             } else {
//                 state.quizEnded = true;
//             }
//         },
//         restartQuiz(state) {
//             state.currentIndex =0;
//             state.score =0;
//             state.userAnswers = [];
//             state.quizEnded = false;
//         },
//         addQuestion (state, action : PayloadAction<Question>) {             // Adds a new question to the quiz
//             state.questions.push(action.payload);
//         },
//     },
// });


//

const quizSlice = createSlice ({
    name: 'quiz',
    initialState,
    reducers: {
        setQuestions(state,action:PayloadAction<Question[]>) {
            state.questions = action.payload;
        },
        fetchQuestions() {}, //trigger for saga
        answerQuestion(state,action:PayloadAction<string>) {
            const current = state.questions[state.currentIndex];
            const isCorrect = action.payload === current.correctAnswer;
            state.userAnswers.push(action.payload);
            if(isCorrect) state.score++;
            if(state.currentIndex +1 <state.questions.length) {
                state.currentIndex++;
            } else {
                state.quizEnded = true;
            }
        },

        resetQuiz: (state) => {
            state.currentIndex = 0;
            state.score = 0;
            state.userAnswers = [];
            state.quizEnded = false;
        },


        restartQuiz(state) {
            state.currentIndex=0;
            state.score=0;
            state.userAnswers=[];
            state.quizEnded= false;
        },
        addQuestion (state, action : PayloadAction<Question[]>) {             // Adds a new question to the quiz ,[] is used to add mutiple
             state.questions.push(...action.payload);
       },

    },

});
export const { setQuestions,fetchQuestions,answerQuestion,addQuestion, restartQuiz,resetQuiz} = quizSlice.actions;
export default quizSlice.reducer;



