const DEFAULT_KEY = 'PASTE_YOUR_GOOGLE_MAPS_API_KEY';
const TOKYO_STATION = { lat: 35.681236, lng: 139.767125 };

const params = new URLSearchParams(window.location.search);
const apiKey = params.get('key') ?? DEFAULT_KEY;

if (!apiKey || apiKey === DEFAULT_KEY) {
  showNotice(
    'API キーが未設定です。URLに ?key=YOUR_API_KEY を付けてアクセスしてください。'
  );
}

loadGoogleMaps(apiKey)
  .then(initMap)
  .catch((error) => {
    console.error(error);
    showNotice(
      'Google Maps API の読み込みに失敗しました。APIキーの有効化や請求設定を確認してください。'
    );
  });

function loadGoogleMaps(key) {
  return new Promise((resolve, reject) => {
    const callbackName = `initMap_${Math.random().toString(36).slice(2)}`;
    window[callbackName] = () => {
      resolve(window.google.maps);
      delete window[callbackName];
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      key
    )}&v=weekly&libraries=maps&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load Google Maps script'));
    document.head.appendChild(script);
  });
}

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: TOKYO_STATION,
    zoom: 17,
    heading: 210,
    tilt: 67.5,
    mapId: 'DEMO_MAP_ID',
    mapTypeId: 'satellite'
  });

  new google.maps.Marker({
    map,
    position: TOKYO_STATION,
    title: 'Tokyo Station'
  });

  document.getElementById('flyTokyo').addEventListener('click', () => {
    map.moveCamera({
      center: TOKYO_STATION,
      zoom: 18,
      tilt: 67.5,
      heading: (map.getHeading() + 120) % 360
    });
  });
}

function showNotice(message) {
  const notice = document.createElement('div');
  notice.className = 'notice';
  notice.textContent = message;
  document.querySelector('.app').prepend(notice);
}
