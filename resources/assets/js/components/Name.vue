<template>
    <div class="container">
        <h1>Wat is je naam?</h1>
        <p>Om het doorlopen van deze webapp zo persoonlijk mogelijk te maken willen we je naam graag weten. </p>
        <div class="input-group">
            <input type="text" v-model="newName" class="form-control" placeholder="Naam" aria-describedby="basic-addon1">
        </div> <br />
        <router-link to="/"><button class="btn btn-default">Vorige</button></router-link>
        <router-link to="/facebook"><button @click="storeNameGlobal" class="btn btn-default" :disabled="newName.length <= 1">Volgende</button></router-link>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                newName: ''
            }
        },
        mounted() {
            console.log("You have arrived on the name page");
        },
        methods: {
            /**
             * Store name in parent so it can be used in other components
             */
            storeNameGlobal() {
                this.$parent.userName = this.newName;
            }
        }
    }

</script>