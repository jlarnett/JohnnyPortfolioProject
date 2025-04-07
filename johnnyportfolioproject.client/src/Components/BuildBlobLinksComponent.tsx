import {useEffect, useState} from 'react';
import axios from 'axios'

function BuildBlobLinksComponent() {

    //const [projects, setProjects] = useState([]);

  const [builds, setBuilds] = useState([]);

  const environment = process.env.NODE_ENV;
  let baseUrl = ''
  const apiUrl = '/api/Builds'

  //5001

    if (environment == 'development') {
        baseUrl = 'http:localhost:5001'
    }

    const finalUrl = baseUrl + apiUrl;

  useEffect(() => {
    axios.get(finalUrl)
      .then(response => {
        setBuilds(response.data);
      })
      .catch(error => {
        setBuilds([]);
        console.error(error);
      });
  }, []);

  return (
    <div className="p-1 text-left text-md font-serif break-word ..." data-testid='HeaderNephalemBuilds'>
        <span className='font-bold'>Nephalem Builds: </span>
        {builds?.length > 0 ? builds.map((build) => (
            <a className='underline dark:text-cyan-200 dark:hover:text-cyan-400 dark:visited:text-cyan-600 text-blue-600 hover:text-blue-800 visited:text-purple-600 ml-1 mr-1' href={'/api/Builds/Download/' + build}>
                {build}
            </a>
        )) : ""}

    </div>
  );

}

export default BuildBlobLinksComponent;