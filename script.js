 // Import the functions you need from the SDKs you need    
 import { initializeApp } from "firebase/app";

 import { getDatabase } from "firebase/database";

 import { getAnalytics } from "firebase/analytics";
 

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {    

  apiKey: "AIzaSyDZjD6zoPZVxJg3BtdHbB1Sxnq4wauX8E0",

  authDomain: "studentdb-5b0dd.firebaseapp.com",

  databaseURL: "https://studentdb-5b0dd-default-rtdb.asia-southeast1.firebasedatabase.app/",

  projectId: "studentdb-5b0dd",

  storageBucket: "studentdb-5b0dd.appspot.com",

  messagingSenderId: "744815483421",

  appId: "1:744815483421:web:8a837ee2d007b12153c4f4",

  measurementId: "G-79W0XDF0BW"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
const analytics = getAnalytics(app);



// references

var nameBox = document.getElementById("StudentName");
var rollBox = document.getElementById("StudentRoll");
var branchBox = document.getElementById("StudentBranch");
var sectionBox = document.getElementById("StudentSection");

var selBtn = document.getElementById("Select");
var insBtn = document.getElementById("Insert");
var updBtn = document.getElementById("Update");
var delBtn = document.getElementById("Delete");
var clrBtn = document.getElementById("Clear");

function InsertData() {
    set(ref(db,"StudentsDB/"+rollBox),{
        StudentName:nameBox.value,
        RollNumber:rollBox.value,
        Branch:branchBox.value,
        Section:sectionBox.value
    })
    .then(()=>{
        alert("Successful");
    })
    .catch((err)=>{
        alert("Unsuccessful, error :"+err);
    });
}

function SelectData() {
    const dbref=ref(db);
    get(child(dbref,"StudentsDB/"+rollBox.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            nameBox.value=snapshot.val().StudentName;
            branchBox.value=snapshot.val().Branch;
            sectionBox.value=snapshot.val().Section;
        }
        else{
            alert("Data not found");
        }
    })
    .catch((err)=>{
        alert("Unsuccessful, error: "+err);
    });
}

function UpdateData() {
    update(ref(db,"StudentDb/"+rollBox.value),{
        StudentName: nameBox.value,
        RollNumber: rollBox.value,
        Branch: branchBox.value,
        Section: sectionBox.value
    });
}

function DeleteData() {
    remove(ref(db,"StudentDb/"+rollBox.value))
    .then(()=>{
        alert("Successful");
    })
    .catch((err)=>{
        alert("Unsuccessful, error: "+err);
    });
}

function ClearData() {
    nameBox.value="";
    rollBox.value="";
    branchBox.value="";
    sectionBox.value="";
}

//buttons binding

insBtn.addEventListener("click",InsertData);
selBtn.addEventListener("click",SelectData);
updBtn.addEventListener("click",UpdateData);
delBtn.addEventListener("click",DeleteData);
clrBtn.addEventListener("click",ClearData);