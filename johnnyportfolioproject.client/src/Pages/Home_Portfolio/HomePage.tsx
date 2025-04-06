import './HomePage.css';
import profilePicture from '../../../public/Images/portfolio_picture.jpg';
import ProjectShowcaseComponent from '../../Components/ProjectShowcaseComponent';
import BuildBlobLinksComponent from '../../Components/BuildBlobLinksComponent';
//import { DefaultAzureCredential } from "@azure/identity";
//import { BlobServiceClient} from "@azure/storage-blob";

function HomePage() {
    //GetListBlobs();
    //async function GetListBlobs() {
    //    // they follow this format: <accountname>.blob.core.windows.net for Azure global
    //    const blobStorageClient = new BlobServiceClient(
    //        "https://nhablobstore.blob.core.windows.net/", new DefaultAzureCredential())
    //    var containerClient = blobStorageClient.getContainerClient("game-builds");
    //    let blobs = containerClient.listBlobsFlat();
    //    let i = 0;
    //    for await (const blob of blobs) {
    //        console.log(`Blob ${i++}: ${blob.name}`);
    //    }
    //}

    return (
        <div className="p-0 text-black-900">
            <div className="min-height-40 max-height-40">
                <div className="min-w-35 max-w-45 float-left m-3 ...">
                    <img className="h-45 w-45 rounded-sm shadow-md" src={profilePicture} alt="Johnny Arnett Portfolio Picture" data-testid='PortfolioHeadShot'></img>
                </div>
                <div className="p-2 text-left font-sans break-word break-after max-height-20 ...">
                    <div className="p-1 text-left text-md font-serif text-lg font-bold break-word ... " data-testid='HeaderName'>Johnny Arnett <span className="text-gray-400 font-light text-sm">(pronounced: jon-ee Ar-nett)</span></div>
                    <div className="p-1 text-left text-md font-serif text-lg break-word ..." data-testid='HeaderJobTitle'>FS Software Engineer, USI, 2015 - current (2025)</div>
                    <div className="p-1 text-left text-md font-serif text-lg break-word ..." data-testid='HeaderExpertise'><span className='font-bold'>Expertise: </span>in Quality Engineering & Scalable .NET Architecture</div>
                    <div className="p-1 text-left text-md font-serif text-lg break-word ..." data-testid='HeaderResearch'><span className='font-bold'>Research: </span>Automating Software Testing Using AI-Driven Playwright Frameworks and</div>
                    <div className="p-1 text-left text-md font-serif text-lg break-word ..." >Test Framework Execution Speed Optimization</div>

                    <BuildBlobLinksComponent />
                </div>

            </div>
            <div className='float-left text-lg'>
                <div className='text-left' data-testid='PortfolioHomeTextDescription'>
                    <p className='break-word' >Welcome! I am excited to share a bit about myself. My full name is Johnny Arnett (pronounced: jon-ee Ar-nett). By day I am a dedicated Software Engineer with a love for intricate, clean, and effective software systems. I have an expertise in building reliable
                        quick, UI test frameworks for banking, insurance, and real-estate companies. I fell in love with software engineering back when I was just 20 years old and first starting gutting out C# Unity Personal Projects, I ran into some problems that required the uses of abstract classes & builder/decorator/recursive/generics design patterns and it exploded my brain.
                        I started envisioning the intricate systems that the patterns allowed, along with the creativity needed to apply them effectively really gave me a deep respect for past computer scientist.
                    </p>

                    <br/>

                    <p>
                        In my free time, I enjoy playing competitive video games, 
                        staying active outdoors, working on personal projects, and streaming on Twitch. 
                        Lately, I've been streaming mostly Rocket League content lately, 
                        check out the YouTube link below for some highlights! I also have a deep passion for 
                        MMA and love following the sport. Hopefully soon I will have a better opportunity to train
                        and enjoy it first-hand :)
                    </p>

                    <br/>

                    <p>
                        Lastly, don't forget to look at some of my recent github projects. 
                        If you have an idea and want me to colaborate on something 
                        I'd love for you to reach out and contact me. 
                    </p>
                </div>

                <br/> 

                <div className='text-left' data-testid='PortfolioConnectLinks' >Connect with me @JohnnyArnett on <a href='https://www.linkedin.com/in/johnny-arnett-350959135/' className='font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>LinkedIn</a>, <a href='https://www.instagram.com/jaynett96/#' className='font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>Instagram</a>, <a href='https://nhaindustries.azurewebsites.net/' className='font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>NHASocial</a>, <a href='https://www.facebook.com/johnny.arnett.9/' className='font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>Facebook</a>, and <a href='https://www.youtube.com/@NHA_Coyote' className='font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>Youtube</a>.</div>
                <br />
                <div className='text-left'>Outside of software engineering I enjoy:</div>
                <ul className='text-left' data-testid='PortfolioRecreationalList'>
                    <li>- Running</li>
                    <li>- <a href='https://www.youtube.com/shorts/KOcVdj3YZc0' className='font-medium underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>Streaming Rocket League</a></li>
                </ul>
                <ProjectShowcaseComponent />
            </div>
        </div>
    );
}

export default HomePage;