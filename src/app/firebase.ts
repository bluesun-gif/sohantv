import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export interface TvUserData {
  favoriteChannels: string[];
  watchHistory: string[];
}

export async function saveTvUserData(userId: string, data: Partial<TvUserData>) {
  try {
    const userDocRef = doc(db, "users", userId);
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    if (data.favoriteChannels !== undefined) updateData.favoriteChannels = data.favoriteChannels;
    if (data.watchHistory !== undefined) updateData.watchHistory = data.watchHistory;

    await setDoc(userDocRef, updateData, { merge: true });
  } catch (error) {
    console.error("Error saving TV user data to Firestore:", error);
  }
}

export async function getTvUserData(userId: string): Promise<TvUserData | null> {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        favoriteChannels: data.favoriteChannels || [],
        watchHistory: data.watchHistory || []
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting TV user data from Firestore:", error);
    return null;
  }
}
