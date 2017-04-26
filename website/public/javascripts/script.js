$(document).ready(function () {
    if(typeof loadScript !== 'undefined' && loadScript === 'product'){
        var arrPath = location.pathname.split("/");
        var productId = arrPath[arrPath.length - 1];
        $.get('http://localhost:3333/product/' + productId, function( data ) {
            console.log(data);
            $('#productName').text(data.name);
            initChart(data.history);
        });
    }

    // var searchForm = $('#frmSearch');
    // searchForm.submit(function () {
    //     return;
    //     console.log('submit');
    // });

    var initChart = function (history) {
        var data = [];
        var labels = [];
        var dataValue = [];

        for(var i=0;i<history.length;i++){
            labels.push(history[i].created_at);
            dataValue.push(history[i].priceFinal);
        }

        var ctx = $('#chartPriceHistory');
        var productChart = new Chart(ctx, {
            type: 'bar',
            data: {
                // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: dataValue,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
})