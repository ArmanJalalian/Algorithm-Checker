<template>
    <div id="myModal" class="modal is">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h1 class="modal-title">Uitleg Algoritme</h1>
                </div>
                <div class="modal-body">
                    <p>
                        De score per post wordt bereked door het aantal likes en comments in onderstaand algoritme te stoppen. Omdat
                        de aantallen erg kunnen verschillen worden ze allemaal herberekend tot een score tussen 0 en 100.
                    </p>
                    <p>
                        <strong>X = Aantal Likes of Comments</strong>
                    </p>
                    <p>
                        <strong>Y = Minimale aantal wat in de formule wordt gestopt, dus minimale aantal Likes of Comments.</strong>
                    </p>
                    <p>
                        <strong>Z = Maximale aantal wat in de formule wordt gestopt, dus maximale aantal Likes of Comments.</strong>
                    </p>
                    <p>
                        <strong>A = Minimale score die uit de formule komt, ligt meestal op 0 omdat dat de laagste score is die eruit kan komen.</strong>
                    </p>
                    <p>
                        <strong>B = Maximale score die uit de formulte komt, ligt meestal op 100 omdat dat de hoogste score is die eruit kan komen.</strong>
                    </p>
                    <h3>Formule</h3>
                    <h4>(X - Y) * (B - A) / (Z - Y) + A</h4>
                    <p>Voorbeeld: Als je 23 likes hebt en je wilt dit tussen de 0 en 100 krijgen, en de minimale aantal likes = 0, en maximale aantal likes = 50.</p>
                    <p>
                        (X - Y) = (23 - 0) = 23
                    </p>
                    <p>
                        (B - A) = (100 - 0) = 100
                    </p>
                    <p>
                        (Z - Y) + A = (50 - 0) + 0 = 50
                    </p>
                    <p>
                        (23 * 100) / 50 = 46
                    </p>
                    <p><strong>De score van een post met 23 likes komt dan te liggen op 46.</strong></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {}

</script>