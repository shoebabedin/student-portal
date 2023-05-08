"use client";
import { db } from "@/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Branch = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [branch, setBranch] = useState();
  const branchCollectionRef = collection(db, "branch");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(branchCollectionRef, {
      name: name,
      phone: phone,
      address: address,
      location: location
    });
  };

  useEffect(() => {
    const getBranch = async () => {
      const data = await getDocs(branchCollectionRef);
      setBranch(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBranch();
  }, [handleSubmit]);
  return (
    <>
      <div className="container my-2">
        <div className="grid grid-flow-row grid-cols-12 gap-4">
          <div className="col-span-12">
            <h2 className="font-bold text-xl mb-2">Students</h2>
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
                <label>Address</label>
                <input
                  className="w-full text-black pl-1 py-2 rounded-md"
                  type="text"
                  name="address"
                  id=""
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-span-6">
                <label>Location</label>
                <input
                  className="w-full text-black pl-1 py-2 rounded-md"
                  type="text"
                  name="location"
                  id=""
                  placeholder="Enter your location link from google map"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
            <h2 className="font-bold text-center text-xl mb-2">
              Students List
            </h2>
          </div>
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-4">
              {branch?.map((data) => (
                <div
                  key={data.id}
                  className="col-span-6 item border rounded-md py-2 px-3 bg-white"
                >
                  <p className="text-black font-medium text-base">
                    Name: {data.name}
                  </p>
                  <p className="text-black font-medium text-base">
                    Phone: {data.phone}
                  </p>
                  <p className="text-black font-medium text-base">
                    Address: {data.address}
                  </p>
                  <p className="text-black font-medium text-base">
                  Location:  <Link
                        href={data.location}
                        className="text-blue-700 font-medium text-base inline-block break-all" target="_blank"
                      >
                         {data.location}
                      </Link>
                  </p>

                  <div className="flex items-center justify-start gap-3 mt-3">
                    <button className="border py-1 px-2 rounded-md text-black font-medium text-base">
                      Edit
                    </button>
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
    </>
  );
};

export default Branch;
