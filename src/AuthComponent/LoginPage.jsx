import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Loader2, Mail, Lock } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch('https://event-booking-backend-ivh3.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, role, userId } = data;
                const username = email.split('@')[0];

                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem('role', role);
                localStorage.setItem('userId', userId);
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                alert("Login failed, please check your credentials");
                console.error('Login failed');
            }
        } catch (error) {
            alert("Login failed, please check your credentials");
            console.error('Error during login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Welcome Content */}
                <div className="text-center md:text-left space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-indigo-900 leading-tight">
                            Welcome Back to EventHub
                        </h1>
                        <p className="text-lg text-slate-600">
                            Sign in to continue managing your events and connecting with your attendees
                        </p>
                    </div>
                    
                    <div className="relative">
                        <img 
                            src="/api/placeholder/500/400"
                            alt="Event Management"
                            className="rounded-2xl shadow-2xl mx-auto md:mx-0"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full hidden md:block"/>
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100 rounded-full hidden md:block"/>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-bold text-center text-indigo-900">
                            Login to Your Account
                        </CardTitle>
                        <p className="text-sm text-center text-slate-600">
                            Enter your credentials to continue
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <Input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-white/50 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 bg-white/50 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button 
                                    type="submit" 
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg shadow-lg transition-all duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging in...
                                        </div>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>

                                <p className="text-center text-sm text-slate-600">
                                    Don't have an account?{' '}
                                    <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;