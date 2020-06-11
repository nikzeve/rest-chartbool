$(document).ready(function() {
    moment.locale('it');

    
    var url_chiamata = "http://157.230.17.132:4034/sales";



    $.ajax ({
        url: url_chiamata,
        method: 'GET',
        success: function(data) {
            console.log(data);

            var dati_vendite_mensili = funzione_vendite_mensili(data);
            var mesi = Object.keys(dati_vendite_mensili);
            var dati_mesi = Object.values(dati_vendite_mensili);
            grafico_vendite_mensili(mesi, dati_mesi);
        },
        error: function() {
            alert('si è verificato un errore');
        }
    });


    function grafico_vendite_mensili(etichette, dati) {
        var myChart = new Chart($('#grafico-vendite-mensili')[0].getContext('2d'), {
             type: 'line',
             data: {
                 labels: etichette,
                 datasets: [{
                     label: 'importi vendite',
                     data: dati,
                     pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                     pointBorderColor: 'rgba(255, 99, 132, 1)',
                     borderColor: 'rgba(75, 192, 192, 1)',
                     borderWidth: 3,
                     fill: false
                 }]
             },
             options: {
                 scales: {
                     yAxes: [{
                         ticks: {
                             beginAtZero: true
                         }
                     }]
                 },
                 tooltips: {
                     callbacks: {
                         label: function(tooltipItem, data) {
                             var label = data.datasets[tooltipItem.datasetIndex].label + ': ';
                             label += tooltipItem.yLabel;
                             label += ' €';
                             return label;
                         }
                     }
                 }
             }
         });
     };


    function funzione_vendite_mensili(dati) {
        var vendite_mensili = {
            gennaio: 0,
            febbraio: 0,
            marzo: 0,
            aprile: 0,
            maggio: 0,
            giugno: 0,
            luglio: 0,
            agosto: 0,
            settembre: 0,
            ottobre: 0,
            novembre: 0,
            dicembre: 0
        };

        for (var i = 0; i < dati.length; i++) {
            var vendita_corrente = dati[i];
            var importo_corrente = parseInt(vendita_corrente.amount);
            var data_corrente = vendita_corrente.date;
            var data_corrente_moment = moment(data_corrente, 'DD/MM/YYYY');
             var mese_corrente = data_corrente_moment.format('MMMM');
             vendite_mensili[mese_corrente] += importo_corrente;
        }

        return vendite_mensili;
    };
});
