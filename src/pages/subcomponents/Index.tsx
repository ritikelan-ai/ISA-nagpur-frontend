import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Users, Shield, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
           {/*<Stethoscope className="w-8 h-8 text-primary" />*/}
            <img  src='https://www.isanagpur.org/wp-content/uploads/2021/06/isa-icon.png.webp' className="w-10 h-10"/>
            <h1 className="text-2xl font-bold text-foreground">Indian Society of Anaesthesiologists</h1>
          </div>
          <Button onClick={() => navigate("/login")}>
           Register Here!
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6">
          Anaesthesia Academicia - ISANCB Member Portal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          ISANCB's member portal for anaesthesiologists. Network securely, discuss complex cases, share research papers, and collaborate with peers in a dedicated academic community.
          </p>
          <Button size="lg" onClick={() => navigate("/login")} className="text-lg px-8 py-6">
            Join  Today
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Doctor Network</CardTitle>
              <CardDescription>
                Connect with verified healthcare professionals and expand your network
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Secure Messaging</CardTitle>
              <CardDescription>
                Communicate securely with colleagues and share patient information safely
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Emergency Management</CardTitle>
              <CardDescription>
                Manage emergency patients with comprehensive medical records and history
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/50 dark:bg-gray-800/50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Healthcare Communication?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of healthcare professionals already using Indian Society of Anaesthesiologists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/register")}>
              Sign Up as Doctor
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Admin Access
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
          Copyright © 2025 Indian Society of Anaesthesiologists. All rights reserved. Powered by eLan Technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
