import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue,
  push,
  set,
  query,
  orderByChild,
  limitToLast,
  get,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN_HERE",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "YOUR_DATABASE_URL_HERE",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID_HERE",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID_HERE",
};

let app;
let database: any = null;
let auth: any = null;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  auth = getAuth(app);
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

const recommendationsRef = database ? ref(database, "recommendations/count") : null;
const recommendationsUsersRef = database ? ref(database, "recommendations/users") : null;
const visitorsRef = database ? ref(database, "visitors/count") : null;
const testimonialsRef = database ? ref(database, "testimonials") : null;

export const hasUserRecommended = async (fingerprint: string): Promise<boolean> => {
  if (!recommendationsUsersRef) return false;
  try {
    const userRef = ref(database, `recommendations/users/${fingerprint}`);
    const snapshot = await get(userRef);
    return snapshot.exists();
  } catch (error) {
    console.error("❌ Error checking user fingerprint:", error);
    return false;
  }
};

export const incrementRecommendations = async (fingerprint: string): Promise<number> => {
  if (!recommendationsRef || !recommendationsUsersRef) {
    throw new Error("Firebase not initialized");
  }

  try {
    const alreadyRecommended = await hasUserRecommended(fingerprint);
    if (alreadyRecommended) {
      throw new Error("USER_ALREADY_RECOMMENDED");
    }

    const result = await runTransaction(recommendationsRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });

    if (result.committed) {
      const userRef = ref(database, `recommendations/users/${fingerprint}`);
      await set(userRef, { timestamp: Date.now(), liked: true });
      return result.snapshot.val();
    } else {
      throw new Error("Transaction not committed");
    }
  } catch (error) {
    console.error("❌ Error incrementing recommendations:", error);
    throw error;
  }
};

export const incrementVisitors = async (): Promise<number> => {
  if (!visitorsRef) throw new Error("Firebase not initialized");
  try {
    const result = await runTransaction(visitorsRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });
    if (result.committed) return result.snapshot.val();
    throw new Error("Transaction not committed");
  } catch (error) {
    console.error("❌ Error incrementing visitors:", error);
    throw error;
  }
};

export const subscribeToRecommendations = (callback: (c: number) => void) => {
  if (!recommendationsRef) return () => {};
  return onValue(recommendationsRef, (snapshot) => {
    callback(snapshot.val() || 0);
  });
};

export const subscribeToVisitors = (callback: (c: number) => void) => {
  if (!visitorsRef) return () => {};
  return onValue(visitorsRef, (snapshot) => {
    callback(snapshot.val() || 0);
  });
};

export const submitTestimonial = async (testimonial: any) => {
  if (!testimonialsRef) throw new Error("Firebase not initialized");
  try {
    const newRef = push(testimonialsRef);
    await set(newRef, { ...testimonial, timestamp: Date.now(), approved: false });
    return newRef.key;
  } catch (error) {
    console.error("❌ Error submitting testimonial:", error);
    throw error;
  }
};

export const subscribeToTestimonials = (callback: (t: any[]) => void, limit = 20) => {
  if (!testimonialsRef) return () => {};
  const q = query(testimonialsRef, orderByChild("timestamp"), limitToLast(limit));
  return onValue(q, (snapshot) => {
    const arr: any[] = [];
    snapshot.forEach((child) => {
      const data = child.val();
      if (data.approved === true || data.approved === "true") {
        arr.push({ id: child.key, ...data });
      }
    });
    arr.reverse();
    callback(arr);
  });
};

export const getAllTestimonialsAdmin = async () => {
   if (!testimonialsRef) return [];
   try {
     const snapshot = await get(testimonialsRef);
     const arr: any[] = [];
     snapshot.forEach((child) => {
        arr.push({ id: child.key, ...child.val() });
     });
     return arr.reverse();
   } catch (error) {
     console.error("error fetching all testimonials");
     return [];
   }
};

export const submitContactMessage = async (messageData: any) => {
  if (!database) throw new Error("Firebase not initialized");
  try {
    const messagesRef = ref(database, "messages");
    const newRef = push(messagesRef);
    await set(newRef, { ...messageData, timestamp: Date.now() });
    return newRef.key;
  } catch (error) {
    console.error("❌ Error submitting message:", error);
    throw error;
  }
};

export { database, auth };
