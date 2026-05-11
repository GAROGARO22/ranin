import { db, auth } from "./firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp,
  orderBy,
  limit
} from "firebase/firestore";

export const postPoem = async (poem: { title: string, content: string, type: string }) => {
  if (!auth.currentUser) throw new Error("Must be logged in to post.");
  
  return addDoc(collection(db, "poems"), {
    ...poem,
    userId: auth.currentUser.uid,
    authorName: auth.currentUser.displayName,
    likes: [],
    createdAt: serverTimestamp()
  });
};

export const getTrendingPoems = async () => {
  const q = query(collection(db, "poems"), orderBy("createdAt", "desc"), limit(20));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const likePoem = async (poemId: string) => {
  if (!auth.currentUser) return;
  const poemRef = doc(db, "poems", poemId);
  await updateDoc(poemRef, {
    likes: arrayUnion(auth.currentUser.uid)
  });
};

export const followUser = async (userIdToFollow: string) => {
  if (!auth.currentUser) return;
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    following: arrayUnion(userIdToFollow)
  });
};
