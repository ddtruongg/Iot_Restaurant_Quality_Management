const firebaseConfig = {
    apiKey: "AIzaSyCyi8m3prrP6lQxe6YyGTm0bu2o7BJiVkE",
    authDomain: "project-1-6dcbb.firebaseapp.com",
    databaseURL: "https://project-1-6dcbb-default-rtdb.firebaseio.com",
    projectId: "project-1-6dcbb",
    storageBucket: "project-1-6dcbb.appspot.com",
    messagingSenderId: "333572686068",
    appId: "1:333572686068:web:790d5d26b3020474b25ea1",
    measurementId: "G-L7SQVBYEP9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
var database = firebase.database();
//Update led  coi======================================================
const card = document.querySelector('.card');
database.ref('/TT_IOT/coi').on('value', function(snapshot) {
    const coiUpdate = snapshot.val();
    const beforeEl = window.getComputedStyle(card, '::before');
    const beforeAnimation = beforeEl.getPropertyValue('animation');
    if (coiUpdate == 1) {
        card.style.setProperty('--animation-time', '3s');
    } else if (coiUpdate == 0) {
        card.style.setProperty('--animation-time', '0s');
    }
});
const card1 = document.querySelector('.card_1');
database.ref('/TT_IOT/Led').on('value', function(snapshot) {
    const ledUpdate = snapshot.val();
    const beforeEl1 = window.getComputedStyle(card1, '::before');
    const beforeAnimation1 = beforeEl1.getPropertyValue('animation');
    if (ledUpdate == 1) {
        card1.style.setProperty('--animation-time', '3s');
    } else if (ledUpdate == 0) {
        card1.style.setProperty('--animation-time', '0s');
    }
});

const card2 = document.querySelector('.card_2');
database.ref('/TT_IOT/auto').on('value', function(snapshot) {
    const autoUpdate = snapshot.val();
    const beforeEl2 = window.getComputedStyle(card2, '::before');
    const beforeAnimation2 = beforeEl2.getPropertyValue('animation');
    if (autoUpdate == 1) {
        card2.style.setProperty('--animation-time', '3s');
    } else if (autoUpdate == 0) {
        card2.style.setProperty('--animation-time', '0s');
    }
});
//Button ======================================================
var den_on = document.getElementById("btn_bat_den");
var den_off = document.getElementById("btn_tat_den");
var coi_on = document.getElementById("btn_bat_coi");
var coi_off = document.getElementById("btn_tat_coi");
var auto_on = document.getElementById("btn_auto_coi");
var auto_off = document.getElementById("btn_auto_coi_off");

den_on.onclick = function() {
    database.ref("/TT_IOT").update({
        "Led": 1
    });
}
den_off.onclick = function() {
    database.ref("/TT_IOT").update({
        "Led": 0
    });
}
coi_on.onclick = function() {
    database.ref("/TT_IOT").update({
        "coi": 1
    });
}
coi_off.onclick = function() {
    database.ref("/TT_IOT").update({
        "coi": 0
    });
}
auto_on.onclick = function() {
    database.ref("/TT_IOT").update({
        "auto": 1
    });
}
auto_off.onclick = function() {
    database.ref("/TT_IOT").update({
        "auto": 0
    });
}
//Get data from database ======================================================
const alertThreshold = 300;
const gasElement = document.getElementById('gas');
database.ref("/TT_IOT/khigas").on("value", function(snapshot) {
    const gas_c = snapshot.val();
    gasElement.innerHTML = gas_c;
    if (gas_c > alertThreshold) {
        gasElement.classList.add('alert');
    } else {
        gasElement.classList.remove('alert');
    }
});
database.ref("/TT_IOT/doam").on("value", function(snapshot) {
    var da = snapshot.val();
    document.getElementById("do_am").innerHTML = da;
});
database.ref("/TT_IOT/temp").on("value", function(snapshot) {
    var nd = snapshot.val();
    document.getElementById("nhiet_do").innerHTML = nd;
});
//==============================================================================
// Lấy phần tử chứa nội dung và hiệu ứng loading
const content = document.getElementById('content');
const loading = document.getElementById('loading');
// Ẩn nội dung và hiển thị hiệu ứng loading
content.style.display = 'none';
loading.style.display = 'block';
// Sau 2 giây, hiển thị nội dung và ẩn hiệu ứng loading
setTimeout(() => {
    content.style.display = 'block';
    loading.style.display = 'none';
}, 2000);