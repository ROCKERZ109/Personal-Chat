import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, orderBy, getDocs, limit, onSnapshot, where
}
    from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyAvFciOXxUMhhDenRVVzVqEXLlzVeHgOxU",
    authDomain: "vira-d182b.firebaseapp.com",
    projectId: "vira-d182b",
    storageBucket: "vira-d182b.appspot.com",
    messagingSenderId: "642906804481",
    appId: "1:642906804481:web:a5f667b54241d428188b00"
};
import lottieWeb from "https://cdn.skypack.dev/lottie-web";
document.getElementById('Head_name').innerText = window.localStorage["another"].toUpperCase();
// Initialize Firebase
const app = initializeApp(firebaseConfig);

let interval = window.setInterval(anim(), 100);

// cancel interval after 1 second (1000 ms)
setTimeout(() => clearInterval(interval), 100);
function anim() {
    console.log("running");
    var animation = bodymovin.loadAnimation({
        // animationData: { /* ... */ },
        container: document.getElementById('lottie'), // required
        path: 'load.json', // required
        renderer: 'svg', // required
        loop: true, // optional
        autoplay: true, // optional
        name: "Demo Animation", // optional

    });


}//
let input = document.getElementById("message_box");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // event.preventDefault();
        adder();
    }
});
const db = getFirestore();

window.adder = async function adder() {

    const messageToSend = document.getElementById('message_box').value;
    if (messageToSend == "") {
        return;
    }
    document.getElementById('message_box').value = "";
    console.log("poersa");
    console.log()
    await addDoc(
        collection(db, "Personal"), {
        sender: window.localStorage["name"].toUpperCase(),
        message: messageToSend,
        ts: new Date().getTime().toString(),
        receiver: window.localStorage["another"].toUpperCase(),
        common: window.localStorage["common"]

    }

    );



}

//   await setDoc(doc(db, "Chatroom","name"), {

//     name: new Date().getTime(),
//     message: messageToSend.value,
//     ts:new Date().getTime()
// })
//   .then(()=>alert('called')).catch((e)=>{
//     alert("not success");
//   });
1
let value;

window.getDocument = async function getDocument() {
    // const q = query(collection(db, param),orderBy('ts','desc'),limit(1));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // value=doc.data();
    //  });

    let paraelement;
    console.log("called2");
    const q = await query(collection(db, "Personal"), where("common", "==", window.localStorage["common"]), orderBy('ts', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
        // snapshot.doc.map((d)=>console.log(d.name))
        //   snapshot.docChanges().forEach(async change => {
        // if (change.type === 'added') 
        // {

        //  console.log(change.doc);
        //    }
        //   });
        console.log("called1");

        snapshot.docChanges().forEach((change) => {
            console.log("salled");
            let element = document.createElement('div');
            element.id = new Date().getTime();
            console.log("called");
            if (change.doc.data()['sender'] == window.localStorage["name"].toUpperCase()) {

                element.style = "position:relative;display: flex;justify-content: end;";
                let image = document.createElement('img');
                image.src = window.localStorage["senderphoto"].toString();
                image.style = "margin-top:25px;margin-left:5px;background-color:red;width:40px;height:40px;border-radius:20px;margin-right:15%"

                paraelement = document.createElement('p');
                paraelement.innerText = change.doc.data()['message'];

                paraelement.style = "position:relative;min-width:50px;font-size: 16px;box-shadow: 10px 10px 10px rgba(0,0,0,0.20);color:black;word-wrap: break-word;line-height: 1.4;font-family:Roboto,Arial;background-color: rgb(249, 184, 184);max-width: 250px;padding: 9px;margin: 0;word-wrap: break-word;margin-right: 0%;border-radius:10px 0 10px 0;margin-top:25px;font-weight:500"

                element.appendChild(paraelement);
                element.appendChild(image);
            }
            else {
                let image = document.createElement('img');
                image.src = window.localStorage["receiverphoto"].toString();
                image.style = "margin-top:25px;margin-right:5px;background-color:red;width:40px;height:40px;border-radius:20px;margin-left:15%"

                element.style = "display: flex;justify-content: start;";
                paraelement = document.createElement('p');
                paraelement.innerText = change.doc.data()['message'];
                paraelement.style = "position:relative;min-width:50px;font-size: 16px;box-shadow: 10px 10px 10px rgba(0,0,0,0.20);word-wrap: break-word;line-height: 1.4;font-family:Roboto,Arial;color:black;background-color:rgb(229, 206, 208);max-width: 250px;padding: 10px;margin: 0;word-wrap: break-word;border-radius:0px 10px 0px 10px;margin-top:25px;font-weight:500";

                element.appendChild(image);
                element.appendChild(paraelement);

            }
            console.log('written');
            document.body.appendChild(element);
            window.scrollTo(0, document.body.scrollHeight);
            console.log(change.doc.data())
        });
    });
}
// document.getElementById('click_button').addEventListener("click",adder(),true)
await getDocument();
let button_click = document.getElementById('click_button');
    // button_click.addEventListener("click",adder(),true);

