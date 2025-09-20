"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, Send, X, Bot, User, Loader } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { craftBuddy } from "@/ai/flows/craft-buddy";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLanguage } from "@/hooks/use-language";

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export function CraftBuddyWidget() {
    const { translate } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([{
                role: 'assistant',
                content: translate("Hi, I'm Craft Buddy! How can I help you today? You can ask me for gift ideas, product suggestions, or about the history of a craft.")
            }]);
        }
    }, [isOpen, translate]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const { response } = await craftBuddy({ message: input });
            const botMessage: Message = { role: 'assistant', content: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Craft Buddy error:", error);
            const errorMessage: Message = { role: 'assistant', content: translate("Sorry, I'm having a little trouble right now. Please try again later.") };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="h-8 w-8" />
            </Button>
        );
    }

    return (
        <Card className="fixed bottom-6 right-6 w-80 h-[28rem] flex flex-col shadow-lg rounded-xl z-50">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-headline text-xl"><Bot /> {translate('Craft Buddy')}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {message.role === 'assistant' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                                </Avatar>
                           )}
                           <div className={`max-w-[75%] rounded-lg px-3 py-2 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                <p className="text-sm">{message.content}</p>
                           </div>
                             {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><User size={20}/></AvatarFallback>
                                </Avatar>
                           )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-2 justify-start">
                             <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot size={20}/></AvatarFallback>
                            </Avatar>
                            <div className="max-w-[75%] rounded-lg px-3 py-2 bg-secondary">
                                <Loader className="h-5 w-5 animate-spin"/>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <CardFooter className="pt-4">
                <div className="flex w-full items-center space-x-2">
                    <Input 
                        placeholder={translate('Ask me anything...')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button onClick={handleSend} disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}