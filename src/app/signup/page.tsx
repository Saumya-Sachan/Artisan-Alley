
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    );
}

export default function SignupPage() {
  const { translate } = useLanguage();
  const [role, setRole] = useState<"customer" | "artisan">("customer");
  const { signInWithGoogle, login } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const { toast } = useToast();
  
  const handleGoogleSignup = async () => {
    await signInWithGoogle(role);
    router.push(role === 'artisan' ? '/dashboard' : '/');
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setShowOtpInput(true);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
      });
    }
  };

  const handleFormSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first-name') as string || 'New';
    const lastName = formData.get('last-name') as string || 'User';
    const email = formData.get('email') as string || 'new.user@example.com';
    
    const newUser = {
        name: `${firstName} ${lastName}`,
        email: email,
        avatar: `https://picsum.photos/seed/${firstName}/200/200`,
        role: role,
    };
    login(newUser);
    toast({
        title: "Account Created",
        description: "Your account has been successfully created.",
    });
    router.push(role === 'artisan' ? '/dashboard' : '/');
  }
  
  const handleTabChange = (value: string) => {
    if (value === 'email') {
      setShowOtpInput(false);
    }
  };


  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline">{translate('Create an Account')}</CardTitle>
          <CardDescription>
            {translate('Join our community of artisans and art lovers.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>{translate('I am a...')}<span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue="customer" onValueChange={(value: "customer" | "artisan") => setRole(value)} className="grid grid-cols-2 gap-4" disabled={showOtpInput}>
                    <div>
                        <RadioGroupItem value="customer" id="customer-signup" className="peer sr-only" />
                        <Label htmlFor="customer-signup" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            {translate('Customer')}
                        </Label>
                    </div>
                        <div>
                        <RadioGroupItem value="artisan" id="artisan-signup" className="peer sr-only" />
                        <Label htmlFor="artisan-signup" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            {translate('Artisan')}
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <Tabs defaultValue="email" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">{translate('Email')}</TabsTrigger>
                  <TabsTrigger value="phone">{translate('Phone')}</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <form onSubmit={handleFormSignup}>
                    <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">{translate('First Name')}<span className="text-red-500">*</span></Label>
                                <Input name="first-name" id="first-name" placeholder={translate('John')} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">{translate('Last Name')}<span className="text-red-500">*</span></Label>
                                <Input name="last-name" id="last-name" placeholder={translate('Doe')} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">{translate('Email')}<span className="text-red-500">*</span></Label>
                        <Input name="email" id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="password">{translate('Password')}<span className="text-red-500">*</span></Label>
                        <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                        {translate('Create Account')}
                        </Button>
                    </div>
                </form>
              </TabsContent>
              <TabsContent value="phone">
                <form onSubmit={!showOtpInput ? handleSendCode : handleFormSignup}>
                  <div className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <Label htmlFor="first-name-phone">{translate('First Name')}<span className="text-red-500">*</span></Label>
                              <Input name="first-name" id="first-name-phone" placeholder={translate('John')} required />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="last-name-phone">{translate('Last Name')}<span className="text-red-500">*</span></Label>
                              <Input name="last-name" id="last-name-phone" placeholder={translate('Doe')} required />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="phone">{translate('Phone Number')}<span className="text-red-500">*</span></Label>
                          <Input 
                              id="phone" 
                              type="tel" 
                              placeholder={translate('e.g. 5550000000')} 
                              required 
                              value={phone}
                              onChange={handlePhoneChange}
                              maxLength={10}
                              disabled={showOtpInput}
                          />
                      </div>
                      {!showOtpInput ? (
                          <Button type="submit" className="w-full">
                              {translate('Send One-Time Code')}
                          </Button>
                      ) : (
                      <div className="space-y-4">
                          <div className="space-y-2">
                              <Label htmlFor="otp">{translate('One-Time Password')}<span className="text-red-500">*</span></Label>
                              <Input id="otp" type="text" placeholder={translate('Enter your OTP')} required maxLength={6} />
                          </div>
                           <p className="text-xs text-center text-muted-foreground">
                                {translate('Entered the wrong number?')}
                                <Button variant="link" type="button" className="p-0 h-auto text-xs" onClick={() => setShowOtpInput(false)}>
                                    {translate('Click here to change')}
                                </Button>
                            </p>
                          <Button type="submit" className="w-full">
                              {translate('Sign up with OTP')}
                          </Button>
                      </div>
                      )}
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {translate('Or continue with')}
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => {
                setShowOtpInput(false);
                handleGoogleSignup();
            }} type="button">
              <GoogleIcon className="mr-2 h-4 w-4" />
              {translate('Sign up with Google')}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {translate('Already have an account?')}{" "}
            <Link href="/login" className="underline">
              {translate('Login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    

    