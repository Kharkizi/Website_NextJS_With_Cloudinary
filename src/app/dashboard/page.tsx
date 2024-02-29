// Trong file Dashboard.js hoặc tương tự
"use client"
import { Suspense } from 'react'
import Link from "next/link";
import { CldImage } from 'next-cloudinary';
import React, { useState, useEffect } from 'react';



const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function Dashboard() {
  const { topics } = await getTopics();
  return (
    <main>
      <h1 className="text-white my-5 text-4xl text-center">Demo</h1>
      <div className="flex justify-center">
        <Link
          className="text-black my-2 inline-block py-3 px-6 rounded-md cursor-pointer 
          font-bold bg-gradient-to-tr from-yellow-300 to-red-300 text-center"
          href="/"
        >
          Return
        </Link>
      </div>
      <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 justify-center flex  gap-5 items-start"
          style={{ flexDirection: 'column' }}
        >
          <div>
            <h2 className="font-bold text-white">Name: {t.title}</h2>
            <div className="font-bold text-white">Description: {t.description}</div>
          </div>
            <CldImage
            loading="lazy"
          width="400"
          height="400"
          src= {t.src}
          alt="Description of my image"
        />
        </div>
      ))}
    </>
    </main>
  );
}
