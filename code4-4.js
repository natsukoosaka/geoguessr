function initialize() {

  function distancemeter(mk1,mk2){
    var R = 6371.0710;
    var rlat1=mk1.position.lat()*(Math.PI/180);
    var rlat2=mk2.position.lat()*(Math.PI/180);
    var difflat=rlat2-rlat1;
    var difflon=(mk2.position.lng()-mk1.position.lng())*(Math.PI/180);

    var d=2*R*Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)
    +Math.cos(rlat1)*Math.cos(rlat2)
    *Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }
  var url=new URL(window.location.href);

  var params= url.searchParams;

  var lat=Number(params.get("randomlat"));
  var lng=Number(params.get("randomlng"));
  var answerlat=Number(params.get("lat"));
  var answerlng=Number(params.get("lng"))
  //var lat=36.0710+((Math.random())*5/100);
  //var lng=140.07+((Math.random())*5/100);


  var latlng = { lat:lat, lng:lng };
  var answerlatlng={lat:answerlat, lng:answerlng};

  var map = new google.maps.Map(document.getElementById("map"), {
    center: latlng,
    zoom: 14,
    mapTypeControl:false,
    zoomControl:false,
    fullscreenControl:false,
    streetViewControl:false,
    clickableIcons:false,
  });

  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;
  document.getElementById('answerlat').value=answerlat;
  document.getElementById('answerlng').value=answerlng;

  marker = new google.maps.Marker({
    position:latlng,
    map:map,
  });

  answermarker = new google.maps.Marker({
    position:answerlatlng,
    map:map,
  });

  line =new google.maps.Polyline({path:[latlng,answerlatlng], map:map});

  var distance=distancemeter(marker,answermarker);
  document.getElementById('msg').value=distance.toFixed(3);

  map.addListener('click', function(e) {
    clickMap(e.latLng, map);
  });
}
