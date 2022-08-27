import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { getFirestore,
        collection, 
        addDoc,
        doc,
        setDoc,
        getDocs,
        getDoc,
        query,
        where,
        updateDoc
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    connectAuthEmulator,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    browserSessionPersistence,
    setPersistence
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyAYbHvFRpO1vwjo8zTeGlQOmgTETfO_5u4",
    authDomain: "cvtechteam-c44a2.firebaseapp.com",
    projectId: "cvtechteam-c44a2",
    storageBucket: "cvtechteam-c44a2.appspot.com",
    messagingSenderId: "724830760584",
    appId: "1:724830760584:web:f103595593f11349ed793d",
    measurementId: "G-WF0BXB7HLT"
    };



    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const users = collection(db, "users");
    const allUsers = await getDocs(users);





    auth.onAuthStateChanged(function(user) {
        if (user) {
            const q = query(allUsers, where('email', '==', user.email));
            setProfile(user);
        } else {
            location.href="stls.html";
        }
        });


    
    
    







    
    function setProfile(user)
    {

        let userName;
        let userId;
        allUsers.forEach((doc) => 
            {
                if(doc.id==user.email)
                    {
                        userName=doc.data().name;
                        userId=doc.data().id;
                    }
            });



        let name = document.getElementById('name');
        let id = document.getElementById('id');
        let create = document.querySelectorAll('#create');
        let check = document.querySelectorAll('#check');

        name.setAttribute('value', userName);
        id.setAttribute('value', userId);



        for(let i=0; i<create.length; i++)
        {
            create[i].addEventListener('click', function() {
                this.parentElement.classList.add('edit');
                this.parentNode.querySelector('input').disabled = false;
            })
            check[i].addEventListener('click', function() {
                if(this.parentNode.querySelector('input').id=="name")
                {
                    const val = this.parentNode.querySelector('input').value;
                    allUsers.forEach((doc) => 
                    {
                        if(doc.id==user.email)
                        {
                            setDoc(doc(db, 'users', user.email), {
                                name: val
                            });
                        }
                    });
                }
                console.log(this.parentNode.querySelector('input'));
                this.parentElement.classList.remove('edit');
                this.parentNode.querySelector('input').disabled = true;
            })
        }
    }