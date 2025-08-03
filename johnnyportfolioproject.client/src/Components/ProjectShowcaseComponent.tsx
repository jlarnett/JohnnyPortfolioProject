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
    <div className="flex flex-col items-center min-h-screen w-full " data-testid='GithubProjectShowcase'>
      <h2 className='text-xl'>Recent Github Repositories</h2>
      {projects.slice(0, 3).map((project) => (
        <Link
              key={project.id}
              to={project.html_url}
              className="no-underline text-xl border border-1 p-3 m-2 rounded-2xl shadow-lg max-w-full mb-2 items-center transform transition hover:scale-105 hover:shadow-2xl w-full hover:border-green-400"
              style={{ textDecoration: 'none' }}
              data-testid={`GithubProjectShowcase-${project.name}`}
        >
         <h2 className="text-xl font-semibold text-red-700 dark:text-zinc-300 underline mb-4" data-testid='ProjectName'>{project.full_name}</h2>
         <div className="content flex flex-wrap sm:flex-nowrap">
                <img src={`https://opengraph.githubassets.com/1/Jlarnett/${project.name}`} alt={project.name} 
                className="w-100 rounded-lg object-scale-down" data-testid='ProjectImage' />
              <div className='ml-2 break-word break-after max-height-20 text-left'>
                <p className="text-gray-800 dark:text-white mt-2 break-word break-after" data-testid='ProjectDescription'>{project.description}</p>
              </div>
         </div>
         <div className='flex justify-between ps-20 pe-20 border-t-1 mt-2'>
             <div className='text-red-700 dark:text-red-400' data-testid='ProjectProgrammingLanguage'>
                Primary Language -&gt; {project.language}
            </div>
            <div className='text-red-700 dark:text-red-400' data-testid='ProjectUpdateAt'>
                <span className='text-black-700 '>Updated</span> -&gt; {new Date(project.updated_at).toLocaleDateString()}
            </div>
         </div>

        </Link>
      ))}
    </div>
  );
}

export default ProjectShowcaseComponent;
