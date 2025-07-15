import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
const firebaseConfig = {
  apiKey: "AIzaSyCN9FwNLLT308_enkEMswhiBWZaUSuJVxg",
  authDomain: "transactionform-e26b7.firebaseapp.com",
  databaseURL: "https://transactionform-e26b7-default-rtdb.firebaseio.com",
  projectId: "transactionform-e26b7",
  storageBucket: "transactionform-e26b7.appspot.com",
  messagingSenderId: "408974043566",
  appId: "1:408974043566:web:0886b1a26c39bc90adc03f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
document.getElementById("submitButton").addEventListener('click',function(e){
  set(ref(db,'user/'+document.getElementById("transactionName").value),
{
  transactionName:document.getElementById("transactionName").value,
})
})