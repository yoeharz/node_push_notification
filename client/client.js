const publicVapidKey = 'BGjL1smDeVnlhBb3Ad-nwRXTryel2a400mo1TLYnnwoTWfQT2oIGXdVRDGGbIAxPrdxFW4YrCjfZthlTBTSpdbw';

// check for service worker
if('serviceWorker' in navigator){
    console.log("SW tidak di navigation")
    send().catch(err => console.log("Error: "+err));
}else{
    console.log("SW tidak di navigation")
}

// Register SW, Register Push, Send Push
async function send() {
    // Register SW
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');

    // Register Push
    console.log('Registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered...');

    // Send Push Notification
    console.log('Sending push...'+JSON.stringify(subscription));
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent  ...');

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }