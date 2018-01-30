<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div class="row">
                    <div class="col-xs-8 leftcol">
                        <div v-for="tags in instagramData">
                            <div v-for="insta in tags" class="instagram-container">
                                <div class="instagram-header">
                                    <p class="instagram-title">{{ insta.user.username }}</p>
                                </div>
                                <div>
                                    <img class="img" :src="insta.images.standard_resolution.url" alt="">
                                </div>
                                <div class="instagram_info_div">
                                    <div class="insta-div-details">
                                        <p class="instagram-details">{{ insta.likes.count }} likes</p>
                                        <p class="instagram-details">{{ insta.comments.count }} comments</p>
                                        <p class="instagram-details">{{ insta.created_time | formatDate }}</p>
                                    </div>
                                    <div class="insta-div-button">
                                        <button @click="insertInAlgorithm(insta.likes.count, insta.comments.count, insta.created_time)" class="btn btn-info">Insert</button>
                                    </div>
                                    <div class="algorithm-score">
                                        <h2 v-text="calculateTotalScore(insta.likes.count, insta.comments.count, insta.created_time)"  class="score"></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-4 rightcol">
                        <div class="algorithm_div">
                            <h2>Algoritme</h2>
                            <div class="factor">
                                <p>Like score: </p>
                                <p> {{ algorithmLikes }} * {{ like_slider_value }} = {{ algorithmLikes * like_slider_value }}</p>
                            </div>
                            <div class="factor">
                                <p>Comment score: </p>
                                <p>{{ algorithmComments }} * {{ comment_slider_value }} = {{ algorithmComments * comment_slider_value }}</p>
                            </div>
                            <div class="factor">
                                <p>Date score: </p>
                                <p>{{ Math.round(algorithmDate) }} * {{ date_slider_value }} = {{ Math.round(algorithmDate * date_slider_value) }}</p>
                            </div>
                            <div class="factor">
                                <p>Total score: </p>
                                <p>{{ algorithmLikes * like_slider_value }} + {{ algorithmComments * comment_slider_value }} + {{ Math.round(algorithmDate * date_slider_value) }}
                                    = {{ Math.round(algorithmLikes * like_slider_value + algorithmComments * comment_slider_value + Math.round(algorithmDate * date_slider_value)) }}</p>
                            </div>
                            <button data-toggle="modal" data-target="#myModal" class="btn btn-default">Uitleg</button>
                        </div>
                        <!-- Sliders use vue-slider-component -->
                        <div class="slidebar_div">
                            <h2>Factoren</h2><br>
                            <vue-slider v-model="like_slider_value">Likes</vue-slider>
                            <p>Likes</p> <br>
                            <vue-slider v-model="comment_slider_value"></vue-slider>
                            <p>Comments</p> <br>
                            <vue-slider v-model="date_slider_value"></vue-slider>
                            <p>Date</p> <br>
                            <p>Door de slidebars te verschuiven per factor. Kan je een factor
                            in het algoritme meer of minder laten meetellen. Zet je bijvoorbeeld
                            Likes op 100 en Comments blijft op 0. Dan zullen de posts met meer Likes
                            een hogere score krijgen dan posts met wat minder likes.</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Comes from Modal component -->
            <modal></modal>
        </div>
    </div>
</template>

<script>

    import vueSlider from 'vue-slider-component';
    import Moments from 'moment';
    import lodash from 'lodash';
    import Modal from './Modal.vue';

    export default {
        components: {
            vueSlider,
            'modal': Modal
        },
        data () {
            return {
                like_slider_value: 0,
                comment_slider_value: 0,
                date_slider_value: 0,
                algorithmLikes: 0,
                algorithmComments: 0,
                algorithmDate: 0,
                instagramData: [],
            }
        },
        created () {

            let tArray = this.instagramData;

            //Todo add your own instagram access_token
            let accessToken = "";

            //Get all tags from array stored in the parent.
            this.$parent.tagsArray.forEach(function (tags) {
                $.ajax({
                    url: 'https://api.instagram.com/v1/tags/'+tags+'/media/recent/?access_token='+accessToken+'&callback=?',
                    type: 'GET',
                    dataType: "jsonp",
                    success: function(data) {
                        tArray.push(data.data);
                    },
                });
            });
        },
        filters: {
            /**
             * Formate date from Unix to how many days ago posted.
             */
            formatDate(date) {
                return Moments.unix(date).fromNow();
            }
        },
        /**
         * Used to sort the timeline using a score, but isn't used in this version of the prototype.
         */
        /*computed: {
            sortedArray: function() {
                let sortArray = lodash.orderBy(this.instagramData, function (data) {
                    return data[0].algorithm_score;
                }, ['desc']);

                return sortArray;
            },
        },*/
        methods: {
            /**
             * Scaling function to calculate score per by mapping min and max
             * @param number
             * @param in_min
             * @param in_max
             * @returns {number}
             */
            mapScores: function (number, in_min, in_max) {
                let out_min = 0;
                let out_max = 100;
                return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            },
            /**
             * Calculate the scores for likes
             * @param likesCount
             * @returns {*|number}
             */
            calculateLikes: function (likesCount) {
                return this.mapScores(likesCount, 0, 50);
            },
            /**
             * Calculate the scores for comments
             * @param commentsCount
             * @returns {*|number}
             */
            calculateComments: function (commentsCount) {
                return this.mapScores(commentsCount, 0, 500);
            },
            /**
             * Calculate the scores for dates using unix date
             * @param timeStamp
             * @returns {*|number}
             */
            calculateDate: function (timeStamp) {
                let d = new Date();
                let m = d.getMonth();

                // Set the month to compare with to 3 months ago
                d.setMonth(d.getMonth() - 5);

                // If still in same month, set date to last day of
                // previous month
                if (d.getMonth() == m) d.setDate(0);

                d.setHours(0, 0, 0);
                d.setMilliseconds(0);

                // Get the time value in milliseconds and convert to seconds
                let unixDate = Math.floor(d / 1000);
                let now = Math.floor(Date.now() / 1000);

                return this.mapScores(timeStamp, unixDate, now);
            },
            /**
             * Calculate score per factor and Round the total score.
             * @param likesCount
             * @param commentsCount
             * @param timeStamp
             * @returns {number}
             */
            calculateTotalScore: function (likesCount, commentsCount, timeStamp) {

                let likesScore = this.calculateLikes(likesCount) * this.like_slider_value;
                let commentsScore = this.calculateComments(commentsCount) * this.comment_slider_value;
                let dateScore = this.calculateDate(timeStamp) * this.date_slider_value;

                return Math.round(likesScore + commentsScore + dateScore);
            },
            /**
             * Insert the calculated scores from a post in the explanation section
             * @param likes
             * @param comments
             * @param date
             */
            insertInAlgorithm(likes, comments, date) {

                this.algorithmLikes = this.calculateLikes(likes);
                this.algorithmComments = this.calculateComments(comments);
                this.algorithmDate = this.calculateDate(date);

            }
        }
    }

</script>

<style>

    .instagram-container {
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        margin-bottom: 10px;
        width: 641px;
        height: 765px;
        margin-left:auto;
        margin-right:auto;
        display:block;
    }
    .instagram-header {
        border-bottom: 1px solid #e6e6e6;
        height: 45px;
    }
    .instagram-title {
        padding: 10px 0 10px 10px;
        margin: 0 !important;
    }
    .insta-div-details {
        padding-top: 7px;
        padding-left: 10px;
    }
    .instagram_info_div {
        display: flex;
    }
    .instagram-details {
        margin: 0 !important;
    }
    .insta-div-button {
        margin-top: 25px;
        margin-left: 200px;
    }
    .algorithm-score {
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        width: 90px;
        height: 60px;
        margin-top: 38px;
        margin-left: 185px;
        top: 50%;
        transform: translateY(-50%);
    }
    .score {
        margin-top: 0 !important;
        padding-top: 10px;
        padding-left: 12px;
    }

    .rightcol {
        overflow:hidden;
    }

    .leftcol {
        overflow-y: scroll;
        height: 850px;
    }
    .algorithm_div {
        height: 425px;
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
    }
    .factor {
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        width: 100%;
        height: 75px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 75px;
    }
    .factor p {
        font-size: 150%;
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
    }

    img {
        width: 639px;
        height:639px;

    }

</style>
