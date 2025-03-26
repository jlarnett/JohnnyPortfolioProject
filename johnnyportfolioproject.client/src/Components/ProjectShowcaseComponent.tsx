import {useEffect, useState} from 'react';
import { Link } from 'react-router';

function ProjectShowcaseComponent() {

    interface githubProjectInformation {
        id: number,
        html_url: string,
        full_name: string,
        name: string,
        description: string,
        language: string,
        updated_at: Date,
    }

    const [projects, setProjects] = useState<githubProjectInformation[]>([]);
    useEffect(() => {
        fetch('https://api.github.com/users/Jlarnett/repos')
            .then(response => response.json())
            .then(data => {
                const sortedData: githubProjectInformation[] = data.sort((a: { updated_at: string | number | Date; }, b: { updated_at: string | number | Date; }) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
                setProjects(sortedData);
                })
            .catch(error => console.error('Error fetching repos:', error));
       }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h2 className='text-xl'>Recent Github Repositories</h2>
      {projects.slice(0, 3).map((project) => (
        <Link
          key={project.id}
          to={project.html_url}
          className="no-underline border border-1a p-3 m-2 rounded-2xl shadow-lg w-full mb-2 items-center transform transition hover:scale-105 hover:shadow-2xl hover:border-blue-400"
          style={{ textDecoration: 'none' }}
        >
         <h2 className="text-xl font-semibold text-red-500 underline">{project.full_name}</h2>
         <div className='flex'>
            <div className='w-full'>
                <img src={`https://opengraph.githubassets.com/1/Jlarnett/${project.name}`} alt={project.name} 
                className="object-scale-down rounded-lg border"/>
            </div>
          <div className='ml-2'>
            <p className="text-gray-800 mt-2 items-center">{project.description}</p>
          </div>
         </div>
         <div className='flex justify-between ps-20 pe-20 border-t-1 mt-2'>
             <div className='text-red-500'>
                Primary Language -&gt; {project.language}
            </div>
            <div className='text-red-500'>
                <span className='text-black-500'>Updated</span> -&gt; {new Date(project.updated_at).toLocaleDateString()}
            </div>
         </div>

        </Link>
      ))}
    </div>
  );
}

export default ProjectShowcaseComponent;