import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    const unsub = onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value, email.value);
    const usersCollectionRef = collection(db, 'users');
    const documentRef = await addDoc(usersCollectionRef, {
      admin: false,
      name: name.value,
      email: email.value,
      timpstamp: serverTimestamp(),
    });
    console.log(documentRef);
  };

  const deleteUser = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    await deleteDoc(userDocumentRef);
  };

  const changeAdmin = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    await updateDoc(userDocumentRef, {
      admin: true,
    });
  };

  return (
    <div style={{ margin: '50px' }}>
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
      <h1>ユーザ一覧</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <span>{user.name}</span>
            <button onClick={() => deleteUser(user.id)}>削除</button>
            {!user.admin && (
              <button onClick={() => changeAdmin(user.id)}>admin</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
