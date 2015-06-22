$.getJSON("/", function(data) { 
  var chartData = {
    labels : [],
    datasets : [
      {
        data : []
      }
    ]
  }

  var tmpData = { }
  $.each(data, function(k,v) {
    tmpData[v.player] ? tmpData[v.player]++ : tmpData[v.player] = 1;
  });

  $.each(tmpData, function(k,v) {
    console.log(k);
    console.log(v);
    chartData.labels.push(k);
    chartData.datasets[0].data.push(v);
  });
  var chart = document.getElementById('chart').getContext('2d');
  new Chart(chart).Bar(chartData);
});
