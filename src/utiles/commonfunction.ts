import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const emailPasswordAuth = (email: any, password: any) => {
//   auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(() => {
//       console.log('User account created & signed in!');
//      // storeData(email);
//     })
//     .catch(error => {
//       if (error.code) console.log();
//     });
// };
export const createUser = (email: any, password: any,) => {
  console.log('email,password', email, password);
  auth()
    .createUserWithEmailAndPassword('kdsinghak47@gmail.com', 'kdsingh@123')
    .then(res => {
      console.log('resp at Sucess UserCreate',res);

    })
    .catch(err => {
      console.log(err);
      console.log('Error UserCreate',err);

    });
  // auth()
  //   .createUserWithEmailAndPassword(email,password)
  //   .then(sucess => {
  // console.log('User account created',sucess?.user?._user?.uid);
  // console.log('userdata----->',sucess)
  //  AsyncStorage.setItem('userData', JSON.stringify(sucess?.user?._user));
  //  AsyncStorage.getItem('userData').then(user=> {
  //   console.log('user=', JSON.parse(user))
  //  })

  // console.log('')
  // callback(sucess?.user?._user?.uid)
  // firestore()
  // .collection('users')
  // .doc(sucess?.user?._user?.uid)
  // .set({
  //   name:name,
  //   email: email,
  //   password: password,

  // })
  // .then(() => {
  //   console.log('User added!');
  // });

  // })
  // .catch(failure => {
  //   console.log('jdfk', failure);
  // });
  // //cloud storage
};
// export const logOut = () => {
//   auth()
//     .signOut()
//     .then(() => console.log('User signed out!'))
//     .catch(() => {
//       console.log('user not signed out yet');
//     });
// };

//firestore
// import firestore from '@react-native-firebase/firestore';
// import {storeData} from './asynStorage';
// export const submitUserData = (
//   email: string,
//   password: string,
//   name: string,
// ) => {
//   firestore()
//     .collection('users')
//     .doc('pushpraj')
//     .set({
//       name: name,
//       email: email,
//       password: password,
//     })
//     .then(() => {
//       console.log('User added!');
//     });
// };
// export const updateStore = (email: string, password: string) => {
//   firestore()
//     .collection('users')
//     .doc('pushpraj')
//     .update({
//       email: email,
//       password: password,
//     })
//     .then(() => {
//       console.log('User updated!');
//     });
// };
// export const deleteStore = () => {
//   firestore()
//     .collection('Users')
//     .doc('pushpraj')
//     .delete()
//     .then(() => {
//       console.log('User deleted!');
//     });
//};
