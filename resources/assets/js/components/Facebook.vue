<template>
    <div class="container">
        <div v-if="loggedIn == false">

            <div class="container">
                <h1>Facebook login</h1>

                <p>
                    Om algoritmes uit te leggen is er data nodig. Deze dat kan je zelf uitkiezen door in onderstaande categoriën er
                    5 tot 10 van uit te kiezen. Deze categoriën worden dan gebruikt om relevante data van Instagram af te halen, waardoor
                    iedere gebruiker zijn eigen persoonlijke timeline voor zich kan hebben.
                </p> <br />
                <!-- Using vue-facebook-signin-button -->
                <fb-signin-button class="fb-signin-button"
                                  :params="fbSignInParams"
                                  @success="onSignInSuccess"
                                  @error="onSignInError"
                                  v-if="likeData.length == 0">
                    Sign in with Facebook
                </fb-signin-button>
            </div>

        </div>
        <div v-if="loggedIn == true">
            <div class="container">
                <h1>Facebook likes</h1>
                <p>
                    Hier onder staan alle pagina's die je ooit op Facebook hebt geliked of hebt gevolgd. De bedoeling is
                    om uit deze pagina's minstens 5 verschillende pagina's aan te vinken. Op deze manier kan er relevante
                    data worden opgehaald van Instagram die gekozen wordt aan de hand van de pagina's die jij hebt uitgekozen.
                </p>
                <label v-for="likes in likeData" style="margin-right: 10px; margin-bottom: 10px;" class="btn btn-info">
                    <input v-model="selectedTagsArray"
                           v-bind:value="likes.name"
                           v-bind:id="likes.id"
                           type="checkbox"> {{ likes.name }}
                </label>
            </div>
            <div class="container">
                <button v-if="previousUrlString" class="btn btn-default" @click="loadPreviousData">
                    Previous <i class="glyphicon glyphicon-chevron-left"></i>
                </button>
                <button v-if="nextUrlString" class="btn btn-default" @click="loadNextData">
                    <i class="glyphicon glyphicon-chevron-right"></i> Next
                </button>
            </div>
        </div> <br />
        <div class="container">
            <label v-for="items in devTags" style="margin-right: 10px; margin-bottom: 10px;" class="btn btn-info">
                <input  v-model="selectedTagsArray"
                        v-bind:value="items.name"
                        type="checkbox"> {{ items.name }}
            </label>
        </div>
        <div class="container">
            <router-link to="/timeline">
                <button @click="saveToGlobalArray" class="btn btn-success" :disabled="selectedTagsArray.length < 2">Ga naar je timeline</button>
            </router-link>
        </div><br />
        <div class="container">
            <span v-for="tags in selectedTagsArray">{{ tags + ", " }}</span> <br />
            <span v-if="selectedTagsArray.length > 0">Je hebt nu: {{ selectedTagsArray.length }} items uitgekozen.</span>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                //Needed to get correct data from Facebook and ensure login works
                fbSignInParams: {
                    scope: 'email,user_likes',
                    return_scopes: true
                },
                likeData: [],
                selectedTagsArray: [],
                previousUrlString: '',
                nextUrlString: '',
                loggedIn: false,
                //Added 20 subjects test persons can use to get data from instagram
                devTags: [{name: 'TamTam'}, {name: 'TheVerge'}, {name: 'Surflife'}, {name: 'Nedgame'}, {name: 'Sony'}, {name: 'SmashingMagazine'}, {name: 'Snowworld'}, {name: 'RedBull'}, {name: 'Qdance'}, {name: 'Reverze'},
                    {name: 'Rodesk'}, {name: 'StedelijkDaltonLyceum'}, {name: 'Playstation'}, {name: 'Pluralsight'}, {name: 'Nitro Circus'}, {name: 'Oneplus'}, {name: 'NS'}, {name: 'Nimbi'}, {name: 'Burnout'}, {name: 'MirrorsEdge'}
                ]
            }
        },
        methods: {
            /**
             * On signin success get all the likes from facebook persons facebook account
             */
            onSignInSuccess (response) {
                //Using facebook login button
                FB.api('/me/likes', likes => {
                    this.likeData = likes.data;
                    this.nextUrlString = likes.paging.next;
                    this.loggedIn = true;
                });
            },
            /**
             * On signin error function
             * @param error
             */
            onSignInError (error) {
                console.log('Facebook Error', error);
            },
            /**
             * Load next data page when user clicks on "volgende" button to see the next page of likes
             */
            loadNextData () {
                FB.api(this.nextUrlString, likesTwo => {
                    if(!(likesTwo.paging.next === 'undefined')) {
                        this.nextUrlString = likesTwo.paging.next;
                        this.previousUrlString = likesTwo.paging.previous;
                        this.likeData = likesTwo.data;
                    } else {
                        this.nextUrlString = "";
                    }
                });
            },
            /**
             * Load previous data page when user clicks on "vorige" button to see the next page of likes
             */
            loadPreviousData () {
                FB.api(this.previousUrlString, likesTwo => {
                    if(!(likesTwo.paging.previous === 'undefined')) {
                        this.nextUrlString = likesTwo.paging.next;
                        this.previousUrlString = likesTwo.paging.previous;
                        this.likeData = likesTwo.data;
                    } else {
                        this.previousUrlString = "";
                    }
                });
            },
            /**
             * Save to array stored in parent to ensure tags can be used in another component
             */
            saveToGlobalArray () {
                let tagsArray = this.$parent.tagsArray;
                this.selectedTagsArray.forEach(function (tags, index) {
                    // Used to filter out spaces in the text
                    tagsArray.push(tags.replace(/\s/g, ''));
                });
            }
        }
    }

</script>

<style>

    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #4267b2;
        color: #fff;
    }

</style>