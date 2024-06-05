import React, { useEffect, useState } from 'react'
import './projects.css'
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import warningImg from './../assets/img/warning.gif'
const Projects = () => {
    // const projectJson = [
    //     {
    //         id: '1',
    //         name: 'SonicPortfolios',
    //         txt: 'Developed a voice-command-operated website enabling communication with a bot for streamlined interaction and user engagement.',
    //         link: 'https://ankit5116k.netlify.app/'
    //     },
    //     {
    //         id: '2',
    //         name: 'HYDPG',
    //         txt: 'Developed React platform for Hyderabad PG search, dynamic components, efficient data management.',
    //         link: 'https://hydpg.netlify.app/'
    //     },
    //     {
    //         id: '3',
    //         name: 'SIIM',
    //         txt: 'Created responsive college website template: HTML, CSS, JavaScript. Clean design, device-friendly.',
    //         link: 'https://ankit-1k.github.io/SIIM/'
    //     },
    //     {
    //         id: '4',
    //         name: 'FilmFlix',
    //         txt: 'Debuted FilmFlix: dynamic site for Bollywood, Hollywood, and Tollywood films; user-friendly for easy browsing and updated selections.',
    //         link: 'https://ankit-1k.github.io/movie-website/'
    //     }
    // ];
    const [projects, setProjects] = useState([])
    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/projects')
            setProjects(response.data)
        } catch (error) {
            console.log('Some Problem in fetch project')
        }
    }
    useEffect(() => {
        fetchProjects()
    }, [])
    return (
        <div>
            <Navbar />
            <Banner />
            <h1 className='text-center mt-5 brand-name m-1 '>Projects</h1>
            <div className='d-flex justify-content-center mb-4'>
                <div className='hr bg-dark'></div>
            </div>
            {projects.length === 0 ? (
                <div className="d-flex justify-content-center">
                    <div>
                        <img src={warningImg} alt="" height={300} width={400} />
                        <h3 className='text-center'>Currectly there is not project</h3>
                    </div>
                </div>
            ) : (
                <div className="project-container">
                    {projects.map((item) => (
                        <div className="project-card" key={item._id}>
                            <div className="face face1">
                                <div className="content">
                                    <h3>{item.projectName}</h3>
                                </div>
                            </div>
                            <div className="face face2">
                                <div className="content">
                                    <p>{item.description}</p>
                                    <a href={item.projectLink}>View Project</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default Projects