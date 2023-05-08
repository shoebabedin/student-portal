"use client";
import { db } from "@/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Teacher = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [division, setDivision] = useState("");
  const [rank, setRank] = useState("");
  const [born, setBorn] = useState("");
  const [teacher, setTeacher] = useState();
  const teacherCollectionRef = collection(db, "teachers");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(teacherCollectionRef, { name: name, email: email, phone: phone, gender: gender, height:height, division: division, rank:rank, born:born });
  };

  useEffect(() => {
    const getTeacher = async () => {
      const data = await getDocs(teacherCollectionRef);
      setTeacher(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTeacher();
  }, [handleSubmit]);
  return (
    <div className="container my-2">
      <div className="grid grid-flow-row grid-cols-12 gap-4">
        <div className="col-span-12">
          <h2 className="font-bold text-xl mb-2">Teachers</h2>
          <form
            action=""
            className="grid grid-cols-12 grid-flow-row gap-3"
            onSubmit={handleSubmit}
          >
            <div className="col-span-6">
              <label>Name</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="text"
                name="name"
                id=""
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-span-6">
              <label>Email</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="text"
                name="email"
                id=""
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-span-6">
              <label>Phone</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="text"
                name="phone"
                id=""
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-span-6">
              <label>Gender</label>
              <select className="w-full text-black pl-1 py-2 rounded-md" onChange={(e) => setGender(e.target.value)}>
                <option className="text-black" value="male" selected>
                  Select your gender
                </option>
                <option className="text-black" value="male">
                  Male
                </option>
                <option className="text-black" value="female">
                  Female
                </option>
              </select>
            </div>
            <div className="col-span-6">
              <label>Height</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="text"
                name="height"
                id=""
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="col-span-6">
              <label>Division</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="text"
                name="division"
                id=""
                placeholder="Enter your division"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              />
            </div>
            <div className="col-span-6">
              <label>Rank</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="text"
                name="rank"
                id=""
                placeholder="Enter your rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              />
            </div>
            <div className="col-span-6">
              <label>Born</label>
              <input
                className="w-full text-black pl-1 py-2 rounded-md"
                type="date"
                name="born"
                id=""
                placeholder="Enter your born"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
              />
            </div>
            <div className="col-span-12">
              <button type="submit" className="border py-1 px-3 rounded-md">
                submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-12">
        <h2 className="font-bold text-center text-xl mb-2">Teachers List</h2>
        </div>
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-4">
            {teacher?.map((teacher) => (
              <div key={teacher.id} className="col-span-3 item border rounded-md py-2 px-3 bg-white">
                <p className="text-black font-medium text-base">Name: {teacher.name}</p>
                <p className="text-black font-medium text-base">Email: {teacher.email}</p>
                <p className="text-black font-medium text-base">Phone: {teacher.phone}</p>
                <p className="text-black font-medium text-base">Gender: {teacher.gender}</p>
                <p className="text-black font-medium text-base">Gender: {teacher.height}</p>
                <p className="text-black font-medium text-base">Gender: {teacher.division}</p>
                <p className="text-black font-medium text-base">Gender: {teacher.rank}</p>
                <p className="text-black font-medium text-base">Gender: {teacher.born}</p>
                <div className="flex items-center justify-start gap-3 mt-3">
                  <button className="border py-1 px-2 rounded-md text-black font-medium text-base">Edit</button>
                  <button className="border py-1 px-2 rounded-md text-black font-medium text-base">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
