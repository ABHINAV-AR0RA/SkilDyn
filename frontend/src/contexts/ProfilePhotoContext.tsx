import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProfilePhotoContextType {
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;
}

const ProfilePhotoContext = createContext<ProfilePhotoContextType | undefined>(undefined);

export const ProfilePhotoProvider = ({ children }: { children: ReactNode }) => {
  const [profilePhoto, setProfilePhotoState] = useState<string | null>(() => {
    // Load from localStorage on initial render
    return localStorage.getItem("profilePhoto");
  });

  const setProfilePhoto = (photo: string | null) => {
    setProfilePhotoState(photo);
    if (photo) {
      localStorage.setItem("profilePhoto", photo);
    } else {
      localStorage.removeItem("profilePhoto");
    }
  };

  return (
    <ProfilePhotoContext.Provider value={{ profilePhoto, setProfilePhoto }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhoto = () => {
  const context = useContext(ProfilePhotoContext);
  if (context === undefined) {
    throw new Error("useProfilePhoto must be used within a ProfilePhotoProvider");
  }
  return context;
};
