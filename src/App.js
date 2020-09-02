import React from 'react';
import GetFullName from './Components/FullName'
import UserInfo from './Components/Info'
import Product from './Components/Product'
// HomeWork 3

// function App() {
//   var users = [
//     {userName: 'user1', password: 1111, email: 'a@gmail.com'},
//     {userName: 'user2', password: 2222, email: 'b@gmail.com'},
//     {userName: 'user3', password: 3333, email: 'c@gmail.com'},
// ]
//   return (
//     <div className="App">
//       <GetFullName name='Arman' lastName='Vardanyan' />
//       <UserInfo users={users} />
//     </div>
//   );
// }



//HomeWork 4

function App() {
 
  return (
    <div className="App">
      <Product name='banabas' price='100$' description='Fresh bananas from Armenia' />
    </div>
  );
}



export default App;
