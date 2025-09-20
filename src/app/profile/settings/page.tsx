"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileSettingsPage() {
    const { user, login, isLoggedIn } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            const updatedUser = { ...user, name, email };
            login(updatedUser);
            toast({
                title: "Profile Updated",
                description: "Your profile information has been successfully updated.",
            });
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6">
            <header className="mb-8">
                <h1 className="font-headline text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your personal information.</p>
            </header>
            <Card>
                <form onSubmit={handleSaveChanges}>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardContent className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
