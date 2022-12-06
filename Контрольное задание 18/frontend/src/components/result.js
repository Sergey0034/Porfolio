import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

export class Result {
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        this.showAnswerButton = document.getElementById('answer');
        this.showAnswerButton.onclick = this.showAnswer.bind(this);
        this.result_score = null;
        this.result_total = null;

        this.init();
    }

    async init() {

        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    document.getElementById('result-score').innerText = result.score + '/' + result.total;

                    return;
                }
            } catch (error) {
                console.log(error);
            }


        }

        location.href = '/#/';
    }

    showAnswer() {
        location.href = '/#/answers?id=' + this.routeParams.id;
    }
}