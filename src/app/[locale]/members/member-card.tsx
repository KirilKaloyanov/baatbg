'use client';

import { MemberDTO } from "@/interfaces/admin/MemberDTO"
// import { storage } from "@firebaseClient";

export function MemberCard({ member } : {member: MemberDTO}) {
    // console.log(member.img, storage)
    return (
        
        <>
            <h1>Member card</h1>
            <img src={member.img} />
        </>
    )
}