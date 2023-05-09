"use client";
import { db } from "@/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import 'moment-timezone';
import { useEffect, useState } from "react";
import Moment from "react-moment";

const Attendance = () => {
  const [students, setStudents] = useState();
  const [attendance, setAttendance] = useState();
  const [dataInsert, setDataInsert] = useState(false);
  const studentsCollectionRef = collection(db, "students");
  const attendanceCollectionRef = collection(db, "attendance");

  const handleattendance = async (data) => {

    try {
        await addDoc(attendanceCollectionRef, {
          name: data.name,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          height: data.height,
          division: data.division,
          rank: data.rank,
          date:
            new Date().getDate() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear() +
            " @ " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds()
        }).then((response) => {
            setDataInsert(!dataInsert);
        });
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    const getStudents = async () => {
      const data = await getDocs(studentsCollectionRef);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const attendanceData = await getDocs(attendanceCollectionRef);
      setAttendance(
        attendanceData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getStudents();
  }, [dataInsert]);

  console.log(attendance);
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">

            <table className="w-full flex flex-row sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
              <thead className="text-white">
                <tr className="bg-black flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="p-3 text-left text-white">Name</th>
                  <th className="p-3 text-left text-white">Email</th>
                  <th className="p-3 text-left text-white">Phone</th>
                  <th className="p-3 text-left text-white">Gender</th>
                  <th className="p-3 text-left text-white">Height</th>
                  <th className="p-3 text-left text-white">Division</th>
                  <th className="p-3 text-left text-white">Rank</th>
                  <th className="p-3 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="flex-1 sm:flex-none">
                {students?.map((data) => (
                  <tr
                    key={data.id}
                    className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                  >
                    <td className="border-grey-light border hover:bg-gray-100 p-3 text-black">
                      {data.name}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.email}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.phone}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.gender}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.height}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.division}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.rank}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      {
                        <button
                          type="submit"
                          onClick={() => handleattendance(data)}
                        >
                          Attendance
                        </button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-span-12">
            <table className="w-full flex flex-row sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
              <thead className="text-white">
                <tr className="bg-black flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="p-3 text-left text-white">Name</th>
                  <th className="p-3 text-left text-white">Email</th>
                  <th className="p-3 text-left text-white">Phone</th>
                  <th className="p-3 text-left text-white">Gender</th>
                  <th className="p-3 text-left text-white">Height</th>
                  <th className="p-3 text-left text-white">Division</th>
                  <th className="p-3 text-left text-white">Rank</th>
                  <th className="p-3 text-left text-white">Date</th>
                </tr>
              </thead>
              <tbody className="flex-1 sm:flex-none">
                {attendance?.map((data) => (
                  <tr
                    key={data.id}
                    className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                  >
                    <td className="border-grey-light border hover:bg-gray-100 p-3 text-black">
                      {data.name}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.email}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.phone}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.gender}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.height}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.division}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      {data.rank}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate text-black">
                      <Moment parse="DD-MM-YYYY HH:mm" fromNow ago interval={30000}>{data.date}</Moment>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
