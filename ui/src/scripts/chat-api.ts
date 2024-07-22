import type { Chat } from "@/types";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, collection, query, where, getDocs, setDoc, deleteDoc, onSnapshot, getDoc, orderBy } from "firebase/firestore";

const ChatCollection: string = 'chats';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FS_API_KEY,
    authDomain: import.meta.env.VITE_FS_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FS_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FS_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FS_MSG_SENDER_ID,
    appId: import.meta.env.VITE_FS_APP_ID,
    measurementId: import.meta.env.VITE_FS_MEASUREMENT_ID,
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service.
const db = getFirestore(app);

export function getChats(channelId: string, cb: (chats: Chat[]) => void) {
    const chatsRef = collection(db, ChatCollection);

    // Create a query against the collection.
    const q = query(chatsRef,
        where("channelId", "==", channelId)
    );

    onSnapshot(q, async () => {
        const snapshot = await getDocs(q);
        const chats: Chat[] = [];
        snapshot.forEach((doc) => {
            chats.push(doc.data() as Chat);
        });
        // @ts-ignore
        cb(chats.sort((a, b) => b.timestamp - a.timestamp));
    });
}

export async function sendChat(
    chat: Chat
): Promise<boolean> {
    try {
        await setDoc(doc(db, ChatCollection, newId()), chat);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function newId(): `0x${string}` {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return `0x${Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')}`;
}