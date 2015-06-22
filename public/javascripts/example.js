$(document).ready(function(){
  
  var theChart;

  // populate dropdown
  $.getJSON("/", function(data) {
    var menu = {};

    // dedup portal names
    $.each(data, function(k,v) {
      menu[v.portal] = 1;
    });

    // alphabetize and add to dropdown
    $.each(Object.keys(menu).sort(), function(v,k) {
      $('#portal')
         .append($("<option></option>")
         .attr("value",k)
         .text(k)); 
    });
  });

  $('#portalSelect').on('submit', function(e) {
    e.preventDefault();

    // get the json data
    $.getJSON("/?portal=" + encodeURIComponent($('#portal').val()), function(data) { 


      // blank boilerplate chart data - fill options here
      chartData = {
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
        console.log(v.address);
        $('#portalInfo').text(v.address);
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
    
      // little hacky to work around chartjs bug(?) 
      if(theChart) { theChart.destroy(); }
      var ctx = $("#chart").get(0).getContext("2d");
      theChart = new Chart(ctx).Bar(chartData);

    });
  });

});
