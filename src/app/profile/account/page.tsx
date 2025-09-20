"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountSettingsPage() {
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
    }

    if (!user) {
        return null;
    }
    
    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:px-6">
            <header className="mb-8">
                <h1 className="font-headline text-3xl font-bold">Account Settings</h1>
                <p className="text-muted-foreground">Manage your account and security settings.</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <form onSubmit={handlePasswordChange}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" required />
                        </div>
                    </CardContent>
                    <CardContent className="flex justify-end">
                        <Button type="submit">Update Password</Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
