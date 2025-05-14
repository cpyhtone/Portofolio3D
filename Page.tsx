import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Button } from "/components/ui/button"
import { Home } from 'lucide-react'

type Project = {
  id: string
  title: string
  url: string
}

export default function ThreeDNavbarPortfolio() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'My Website', url: 'https://example.com' },
    { id: '2', title: 'E-commerce App', url: 'https://shop.example.com' }
  ])
  const [newProject, setNewProject] = useState({ title: '', url: '' })

  const addProject = () => {
    if (newProject.title.trim() && newProject.url.trim()) {
      setProjects([...projects, {
        id: Date.now().toString(),
        title: newProject.title,
        url: newProject.url.startsWith('http') ? newProject.url : `https://${newProject.url}`
      }])
      setNewProject({ title: '', url: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 3D Navbar */}
      <nav className="relative h-16 w-full mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="perspective-nav">
            <div className="transform-nav group">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 px-6 py-3 text-lg font-medium transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <Home className="h-5 w-5" />
                Home
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Portfolio Section */}
      <div className="container mx-auto px-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">My Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add New Project Form */}
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-3">Add New Project</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="My Awesome Project"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Project URL</label>
                  <input
                    type="text"
                    value={newProject.url}
                    onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="example.com"
                  />
                </div>
                <Button onClick={addProject} className="mt-2">
                  Add Project
                </Button>
              </div>
            </div>

            {/* Projects List */}
            <div className="space-y-3">
              <h3 className="font-medium">My Projects</h3>
              {projects.length === 0 ? (
                <p className="text-muted-foreground">No projects yet. Add one above!</p>
              ) : (
                <ul className="divide-y">
                  {projects.map((project) => (
                    <li key={project.id} className="py-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{project.title}</span>
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Visit
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add these styles to your global CSS or a style tag */}
      <style>{`
        .perspective-nav {
          perspective: 500px;
        }
        .transform-nav {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .transform-nav:hover {
          transform: rotateX(10deg) rotateY(5deg);
        }
      `}</style>
    </div>
  )
                        }
