const DEFAULT_KEY = 'PASTE_YOUR_GOOGLE_MAPS_API_KEY';
const TOKYO_CENTER = '35.681236, 139.767125';

const params = new URLSearchParams(window.location.search);
const apiKey = params.get('key') ?? DEFAULT_KEY;

if (!apiKey || apiKey === DEFAULT_KEY) {
  showNotice('API キーが未設定です。URL に ?key=YOUR_API_KEY を付けてアクセスしてください。');
}

loadMaps3D(apiKey)
  .then(setupControls)
  .catch((error) => {
    console.error(error);
    showNotice(
      '3D Maps API の読み込みに失敗しました。Maps JavaScript API の有効化と課金設定をご確認ください。'
    );
  });

function loadMaps3D(key) {
  return new Promise((resolve, reject) => {
    const callbackName = `init3d_${Math.random().toString(36).slice(2)}`;
    window[callbackName] = () => {
      resolve();
      delete window[callbackName];
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      key
    )}&v=beta&libraries=maps3d&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load Maps JavaScript API 3D library'));
    document.head.appendChild(script);
  });
}

function setupControls() {
  const map3d = document.getElementById('map3d');
  const flyButton = document.getElementById('flyTokyo');
  const spinButton = document.getElementById('spinMap');

  flyButton.addEventListener('click', () => {
    map3d.setAttribute('center', TOKYO_CENTER);
    map3d.setAttribute('range', '1200');
    map3d.setAttribute('tilt', '67.5');
    map3d.setAttribute('heading', '210');
  });

  let spinTimer;
  spinButton.addEventListener('click', () => {
    if (spinTimer) {
      clearInterval(spinTimer);
      spinTimer = null;
      spinButton.textContent = '自動回転';
      return;
    }

    spinButton.textContent = '停止';
    spinTimer = setInterval(() => {
      const currentHeading = Number(map3d.getAttribute('heading') || 0);
      map3d.setAttribute('heading', String((currentHeading + 1.2) % 360));
    }, 30);
  });
}

function showNotice(message) {
  const notice = document.createElement('div');
  notice.className = 'notice';
  notice.textContent = message;
  document.body.prepend(notice);
}
