
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminPlumberForm from "@/components/admin/AdminPlumberForm";
import { plumbers } from "@/data/mockData";
import { Plumber } from "@/types";

const AdminPage = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [plumbersList, setPlumbersList] = useState([...plumbers]);
  const [selectedPlumber, setSelectedPlumber] = useState<Plumber | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple login logic - in a real app, this would authenticate against a backend
    if (loginForm.email === "admin@example.com" && loginForm.password === "password") {
      setIsLoggedIn(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: "", password: "" });
  };

  const handleAddNew = () => {
    setSelectedPlumber(null);
    setIsAdding(true);
  };

  const handleEditPlumber = (plumber: Plumber) => {
    setSelectedPlumber(plumber);
    setIsAdding(false);
  };

  const handleSavePlumber = (plumberData: Partial<Plumber>) => {
    if (isAdding) {
      // Adding new plumber
      const newPlumber = {
        ...plumberData,
        id: `plumber-${plumbersList.length + 1}`,
      } as Plumber;
      
      setPlumbersList(prev => [...prev, newPlumber]);
      toast({
        title: "Plumber added",
        description: `${plumberData.businessName} has been added to the directory.`,
      });
    } else {
      // Updating existing plumber
      setPlumbersList(prev => 
        prev.map(p => (p.id === selectedPlumber?.id ? { ...p, ...plumberData } as Plumber : p))
      );
      toast({
        title: "Plumber updated",
        description: `${plumberData.businessName} has been updated.`,
      });
    }
    
    setSelectedPlumber(null);
    setIsAdding(false);
  };

  const handleDeletePlumber = (plumberId: string) => {
    if (confirm("Are you sure you want to delete this plumber?")) {
      setPlumbersList(prev => prev.filter(p => p.id !== plumberId));
      toast({
        title: "Plumber deleted",
        description: "The plumber has been removed from the directory.",
      });
    }
  };

  const cancelForm = () => {
    setSelectedPlumber(null);
    setIsAdding(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-secondary-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-primary mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>For demo purposes, use:</p>
              <p>Email: admin@example.com</p>
              <p>Password: password</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-light py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="plumbers">
            <TabsList className="mb-8">
              <TabsTrigger value="plumbers">Plumbers</TabsTrigger>
              <TabsTrigger value="suburbs">Suburbs</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plumbers">
              {selectedPlumber || isAdding ? (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {isAdding ? "Add New Plumber" : "Edit Plumber"}
                  </h2>
                  <AdminPlumberForm
                    plumber={selectedPlumber || undefined}
                    onSave={handleSavePlumber}
                    onCancel={cancelForm}
                  />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Plumbers</h2>
                    <Button onClick={handleAddNew}>
                      Add New Plumber
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="py-3 px-4 text-left">Business Name</th>
                          <th className="py-3 px-4 text-left">Contact</th>
                          <th className="py-3 px-4 text-left">Services</th>
                          <th className="py-3 px-4 text-left">Areas</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plumbersList.map(plumber => (
                          <tr key={plumber.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{plumber.businessName}</td>
                            <td className="py-3 px-4">
                              <div>{plumber.phone}</div>
                              <div className="text-sm text-gray-500">{plumber.email}</div>
                            </td>
                            <td className="py-3 px-4">
                              {plumber.services.length} services
                            </td>
                            <td className="py-3 px-4">
                              {plumber.areasServiced.length} areas
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleEditPlumber(plumber)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeletePlumber(plumber.id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="suburbs">
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Suburb management interface is under development.
                </p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="blog">
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Blog post management interface is under development.
                </p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Site settings interface is under development.
                </p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
