$(document).ready(function(){
  console.log('jq ready function');
  $('#portalSelect').on('submit', function(e) {
    e.preventDefault();
    console.log('submitted');
    $.getJSON("/?portal=" + encodeURIComponent($('#portal').val()), function(data) { 
      console.log(data);
      var chartData = {
        labels : [],
        datasets : [
          {
            fillColor : "rgba(47, 162, 59, 1)",
            strokeColor : "rgba(33, 115, 41, 1)",
            data : []
          }
        ]
      }

      var tmpData = { }
      $.each(data, function(k,v) {
        tmpData[v.player] ? tmpData[v.player]++ : tmpData[v.player] = 1;
      });

      // there has got to be a better way to do this
      var sortable = [];
      for (var player in tmpData) {
        sortable.push([player,tmpData[player]]);
      }
      sortable.sort(function(a, b) {return b[1] - a[1]})
      $.each(sortable, function(k,v) {
        chartData.labels.push(v[0]);
        chartData.datasets[0].data.push(v[1]);
      });
      // end mess

      var chart = document.getElementById('chart').getContext('2d');
      new Chart(chart).Bar(chartData);
    });
  });
  $("#portalSelect").submit();
});
