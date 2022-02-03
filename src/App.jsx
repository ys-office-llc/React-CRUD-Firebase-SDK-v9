import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const userDocumentRef = doc(db, 'users', 'lCX9nydi77ZABWQDwdBI');
    getDoc(userDocumentRef).then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        console.log('Document data:', documentSnapshot.data());
      } else {
        console.log('No such document!');
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value,email.value)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前</label>
          <input name="name" type="text" placeholder="名前" />
        </div>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="メールアドレス" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
