
function initialize() {

  var startlat=36.1041367;
  var startlng=140.1028341;

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    mapTypeControl:false,
    zoomControl:false,
    fullscreenControl:false,
    streetViewControl:false,
    clickableIcons:false,
    center:{lat:startlat,lng:startlng}
    });

  var lat=36.0710+((Math.random())*5/100);
  var lng=140.07+((Math.random())*5/100);

  var latlng = { lat, lng };

  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;

  marker = new google.maps.Marker({
    map: map, position: new google.maps.LatLng(startlat,startlng),
  });

  map.addListener('click', function(e) {
    clickMap(e.latLng, map);
  });
//ストリートビュー表示
  var panoramaOptions={
    position: latlng,
    addressControl:false,
    clickToGo:false,
    fullscreenControl:false,
    linksControl:false,
    pov: {
      heading: 34,
      pitch: 10,
    }
}

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),panoramaOptions
  );

  map.setStreetView(panorama);
}

function clickMap(geo, map) {
  lat = geo.lat();
  lng = geo.lng();
 
  //小数点以下6桁に丸める場合
  //lat = Math.floor(lat * 1000000) / 1000000);
  //lng = Math.floor(lng * 1000000) / 1000000);
 
  document.getElementById('answerlat').value = lat;
  document.getElementById('answerlng').value = lng;
 
  //中心にスクロール
  map.panTo(geo);
 
  //マーカーの更新
  marker.setMap(null);
  marker = null;
  marker = new google.maps.Marker({
    map: map, position: geo 
  });
}
