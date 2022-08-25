import React, { useState, useEffect } from 'react';
import './style.css';
import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  function handleStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second:'2-digit',
    })
  };
  
  setStudents(prevState => [...prevState, newStudent])
}

   useEffect(()=>{
     async function fetchData(){
       const response = await fetch( "https://api.github.com/users/washingtongomes");
       const data = await response.json() as ProfileResponse;
       console.log("DADOS====>", data);
       setUser({
         name: data.name,
         avatar: data.avatar_url,
     });
   }
   fetchData();
   },[]);


//  useEffect(()=>{
//    fetch( "https://api.github.com/users/washingtongomes")
//    .then(response => response.json())
//    .then(data => {
//      setUser({
//        name: data.name,
//        avatar: data.avatar_url
//      })
//    })
//    .catch(error => console.error(error))

//  }
//  ,[]);

  return (
    <div className='container'>
<header>
<h1>Lista de presença</h1>
<div>
  <strong>{user.name} </strong>
  <img src={user.avatar} alt="Foto perfil" />
</div>

</header>


     <input
      type="text"
      placeholder="Digite o nome... "
      onChange= {e => setStudentName(e.target.value)}
      />
   
     <button type="button" onClick={ handleStudent }> Adicionar </button>

    {
     students.map(student => (
     <Card 
     key={student.time}
     name = {student.name}
     time={student.time}
     />
     ))
    }
    </div>
    )
  }