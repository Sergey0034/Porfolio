import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth.js";

export class Answers {

    constructor() {
        this.quiz = null;
        this.questionIndex = 1;
        this.routeParams = UrlManager.getQueryParams();
        this.userInfo = Auth.getUserInfo();
        this.getQuiz();
    }

    async getQuiz() {
        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id +
                    '/result/details?userId=' + this.userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    this.quiz = result;
                    this.showCheckAnswers();
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    showCheckAnswers() {
        document.getElementById('back').onclick = this.backClick;
        const preAnswerTitle = document.getElementById('pre-answer-title');
        preAnswerTitle.innerText = this.quiz.test.name;

        const testCompleteUser = document.getElementById('user-test-complete');
        testCompleteUser.innerHTML = 'Тест выполнил <span>' + this.userInfo.fullName + ', ' + this.userInfo.email + '</span>';

        const answersElement = this.quiz.test.questions;
        const questionsElement = document.getElementById('answer-questions');

        if (answersElement && answersElement.length > 0) {
            answersElement.forEach(question => {
                    const questionElement = document.createElement('div');
                    questionElement.className = 'answer-question';

                    const questionAnswerTitle = document.createElement('div')
                    questionAnswerTitle.className = 'answer-question-title';
                    questionAnswerTitle.innerHTML = '<span>Вопрос ' + this.questionIndex++ + ':</span> ' + question.question

                    const answerQuestionsOptions = document.createElement('div')
                    answerQuestionsOptions.className = 'answer-question-options';

                    question.answers.forEach(option => {
                        const answerQuestionOption = document.createElement('div')
                        answerQuestionOption.className = 'answer-question-option';

                        const inputId = 'answer-' + option.id;
                        const inputElement = document.createElement('input');
                        inputElement.setAttribute('type', 'radio');
                        inputElement.setAttribute('name', 'answer');
                        inputElement.setAttribute('value', option.id);
                        inputElement.className = 'option-answer';
                        inputElement.setAttribute('id', option.id);

                        const labelElement = document.createElement('label');
                        labelElement.setAttribute('for', inputId);
                        labelElement.innerText = option.answer;

                        answerQuestionOption.appendChild(inputElement);
                        answerQuestionOption.appendChild(labelElement);
                        answerQuestionsOptions.appendChild(answerQuestionOption);
                        questionElement.appendChild(questionAnswerTitle);
                        questionElement.appendChild(answerQuestionsOptions);
                        questionsElement.appendChild(questionElement);

                        if (option.correct === true) {
                            labelElement.className = 'aright';
                            inputElement.className = 'aright';
                        } else if (option.correct === false) {
                            labelElement.className = 'wrong';
                            inputElement.className = 'wrong';
                        }
                    })
                }
            )
        }
    };

    backClick() {
        history.back();
    }

}