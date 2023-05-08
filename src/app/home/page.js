"use client";
import { db } from "@/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState();
  const [teacher, setTeacher] = useState();
  const [students, setStudents] = useState();
  const [branch, setBranch] = useState();
  const userCollectionRef = collection(db, "users");
  const teacherCollectionRef = collection(db, "teachers");
  const studentsCollectionRef = collection(db, "students");
  const branchCollectionRef = collection(db, "branch");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(userCollectionRef, { name: name, email: email });
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(userCollectionRef);
      setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const teacherData = await getDocs(teacherCollectionRef);
      setTeacher(
        teacherData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const studentsData = await getDocs(studentsCollectionRef);
      setStudents(
        studentsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const branchData = await getDocs(branchCollectionRef);
      setBranch(branchData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUser();
  }, [handleSubmit]);

  return (
    <>
      <div className="container my-2">
        <div className="grid grid-flow-row grid-cols-12 gap-4">
          <div className="col-span-3 border text-center py-5 rounded-md">
            <h2 className="font-bold text-xl">
              Total Users: <b>{user?.length}</b>
            </h2>
          </div>
          <div className="col-span-3 border text-center py-5 rounded-md">
            <h2 className="font-bold text-xl">
              Total Teachers: <b>{teacher?.length}</b>
            </h2>
          </div>
          <div className="col-span-3 border text-center py-5 rounded-md">
            <h2 className="font-bold text-xl">
              Total Students : <b>{students?.length}</b>
            </h2>
          </div>
          <div className="col-span-3 border text-center py-5 rounded-md">
            <h2 className="font-bold text-xl">
              Total Branch: <b>{branch?.length}</b>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
