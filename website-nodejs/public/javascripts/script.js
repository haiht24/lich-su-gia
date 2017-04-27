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
        var labels = [];
        var dataValue = [];

        for(var i=0;i<history.length;i++){
            labels.push(history[i].created_at);
            dataValue.push(history[i].priceFinal);
        }

        var ctx = $('#chartPriceHistory');

        var dataChart = {
            labels: labels,
            responsive: true,
            maintainAspectRatio: false,
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dataValue,
                    spanGaps: false,
                }
            ]
        };
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: dataChart,
            // options: options
        });
    }
})