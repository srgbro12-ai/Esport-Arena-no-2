
'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useFirebaseApp, errorEmitter, FirestorePermissionError } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { uploadFile } from '@/firebase/storage';
import { Loader2 } from 'lucide-react';

export default function CompleteProfilePage() {
    const { profile, updateAvatar, updateProfile, setProfile } = useProfile();
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useUser();
    const firestore = useFirestore();
    const firebaseApp = useFirebaseApp();

    const [displayName, setDisplayName] = useState('');
    const [handle, setHandle] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const profilePicInputRef = useRef<HTMLInputElement>(null);

     useEffect(() => {
        if (user) {
            setProfile(prev => ({ ...prev, avatarUrl: user.photoURL || 'https://placehold.co/128x128.png' }));
            setHandle(user.email?.split('@')[0] || '');
        }
    }, [user, setProfile]);


    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                toast({ title: 'Image too large', description: 'Please select an image smaller than 2MB.', variant: 'destructive'});
                return;
            }
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    updateAvatar(e.target.result as string);
                }
            }
            reader.readAsDataURL(file);
        }
    };
    
    const handleSave = async () => {
        if (!user || !firestore || !firebaseApp) {
            toast({ title: 'You must be logged in.', variant: 'destructive' });
            return;
        }
        if (!displayName || !handle) {
            toast({ title: 'Please enter a channel name and handle.', variant: 'destructive' });
            return;
        }

        setIsSaving(true);
        let avatarUrl = profile.avatarUrl;

        try {
            if (avatarFile) {
                const filePath = `avatars/${user.uid}-${avatarFile.name}`;
                avatarUrl = await uploadFile(firebaseApp, avatarFile, filePath);
            }
            
            const profileData = {
                id: user.uid,
                email: user.email,
                displayName: displayName, 
                username: handle,
                avatarUrl: avatarUrl,
                bannerUrl: 'https://placehold.co/1080x240.png',
                description: `Welcome to the channel of ${displayName}!`,
                isVerified: false,
                subscriberCount: 0,
                videoCount: 0,
                links: [],
                dob: dob, 
                gender: gender,
                joinDate: new Date().toISOString(),
            };

            const userRef = doc(firestore, 'users', user.uid);
            
            setDoc(userRef, profileData, { merge: true })
                .then(() => {
                    updateProfile({
                        name: displayName,
                        handle: `@${handle}`,
                        avatarUrl: avatarUrl,
                        dob,
                        gender,
                        description: profileData.description,
                        email: user.email || '',
                        links: []
                    });

                    toast({
                        title: "Channel created!",
                        description: "Welcome to Esport Arena!",
                    });
                    router.push(`/channel/${handle}`);
                })
                .catch(async (error) => {
                    const permissionError = new FirestorePermissionError({
                        path: userRef.path,
                        operation: 'create',
                        requestResourceData: profileData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                })
                .finally(() => {
                     setIsSaving(false);
                });

        } catch (error) {
            console.error("Error creating channel: ", error);
            toast({ title: 'Failed to create channel', description: (error as Error).message, variant: 'destructive' });
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen p-4">
            <style jsx global>{`
                .tag-selected {
                    background-color: #06b6d4;
                    color: #ffffff;
                    border-color: #0891b2;
                    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.5);
                }
                .profile-pic-wrapper {
                    position: relative;
                    width: 128px;
                    height: 128px;
                    cursor: pointer;
                }
                .profile-pic {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #4a5568;
                }
                .profile-pic-upload-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease-in-out;
                    font-size: 12px;
                    text-align: center;
                }
                .profile-pic-wrapper:hover .profile-pic-upload-overlay {
                    opacity: 1;
                }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(0.6) brightness(1);
                }
            `}</style>

            <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-700">
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white">Create your channel</h2>
                    <p className="text-sm text-gray-400">Your channel represents you on Esport Arena. Choose a name and handle to get started.</p>
                    
                    <div className="flex flex-col items-center">
                        <label htmlFor="profilePicInput" className="profile-pic-wrapper">
                            <Image width={128} height={128} src={profile.avatarUrl} alt="Profile Picture" className="profile-pic" data-ai-hint={profile.dataAiHint}/>
                            <div className="profile-pic-upload-overlay"><span>Change<br/>Picture</span></div>
                        </label>
                        <input ref={profilePicInputRef} type="file" id="profilePicInput" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-400 mb-1">Channel Name</label>
                            <input id="displayName" type="text" placeholder="Your Channel Name" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="handle" className="block text-sm font-medium text-gray-400 mb-1">Username (@handle)</label>
                            <input id="handle" type="text" placeholder="your_unique_handle" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" value={handle} onChange={(e) => setHandle(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
                            <input id="dob" type="date" className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${dob ? 'text-white' : 'text-gray-500'}`} value={dob} onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Gender</label>
                            <div className="flex flex-wrap gap-3">
                                {['Male', 'Female', 'Other'].map(g => (
                                    <button 
                                        key={g} 
                                        className={`py-2 px-4 bg-gray-700 text-gray-300 rounded-full cursor-pointer transition-all duration-200 ease-in-out border-2 border-transparent hover:border-cyan-500 hover:text-white ${gender === g ? 'tag-selected' : ''}`}
                                        onClick={() => setGender(g)}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                     <Button className="w-full bg-cyan-500 hover:bg-cyan-600" onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaving ? 'Creating Channel...' : 'Create Channel & Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

    