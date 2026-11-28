// Colocar en la misma carpeta que index.html
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
firebase.initializeApp({apiKey:"AIzaSyB0GZuwv1JMKx0OJLUG4EsioyUuGSil_WA",authDomain:"sigma-operaciones.firebaseapp.com",projectId:"sigma-operaciones",storageBucket:"sigma-operaciones.firebasestorage.app",messagingSenderId:"413525292010",appId:"1:413525292010:web:20823e1a80bef9605b7893"});
const messaging=firebase.messaging();
// Si el mensaje trae "notification", FCM lo muestra solo. Si llega solo con "data", se muestra aquí.
messaging.onBackgroundMessage(function(p){
  if(p.notification)return;
  var d=p.data||{};
  self.registration.showNotification(d.title||'Sigma Studio',{body:d.body||'',data:{url:d.url||'./'}});
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(l){
    for(var i=0;i<l.length;i++){if('focus' in l[i])return l[i].focus()}
    return clients.openWindow('./');
  }));
});
