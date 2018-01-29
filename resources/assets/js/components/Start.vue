<template>
    <div class="container vertical-center">
        <div class="center-block col-md-4 text-center" style="float: none;">
            <h1>Algorithm Checker</h1>
            <p>Wat weet jij over algoritmes en hoe deze werken?</p>
            <div class="row">
                <!-- Using Vue-Router -->
                <router-link to="/name"><button class="btn btn-success">Start</button></router-link>
                <router-link to="/privacypolicy"><button class="btn btn-default">Privacy Policy</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        mounted() {
            console.log("Vue works");
        }
    }

</script>

<style>

    .vertical-center {
        min-height: 70%;  /* Fallback for browsers do NOT support vh unit */
        min-height: 70vh; /* These two lines are counted as one :-) */
        display: flex;
        align-items: center;
    }

</style>