import React from 'react';
import GetFullName from './Components/FullName'
import UserInfo from './Components/Info'


function App() {
  var users = [
    {userName: 'user1', password: 1111, email: 'a@gmail.com'},
    {userName: 'user2', password: 2222, email: 'b@gmail.com'},
    {userName: 'user3', password: 3333, email: 'c@gmail.com'},
]
  return (
    <div className="App">
      <GetFullName name='Arman' lastName='Vardanyan' />
      <UserInfo users={users} />
    </div>
  );
}

export default App;
