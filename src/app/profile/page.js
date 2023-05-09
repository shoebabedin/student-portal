"use client";

import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
    const auth = useAuth();

    
    return (
        <div>
            <p>{auth.currentUser}</p>
        </div>
    );
};

export default Profile;