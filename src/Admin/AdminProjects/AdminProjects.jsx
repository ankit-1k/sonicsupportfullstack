import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import AdminNavbar from './../AdminNavbar/AdminNavbar';
import AdminBanner from './../../AdminBanner/AdminBanner';

const AdminProjects = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectLink: '',
    description: '',
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/projects', formData);
      alert('Project submitted successfully');
      setFormData({ projectName: '', projectLink: '', description: '' });
    } catch (error) {
      console.error('Error submitting project:', error.response);
      alert('Error submitting project. Please try again later.');
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error.response);
    }
  };
  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:4000/api/projects/${projectId}`);
      alert('Project deleted successfully');
      fetchProjects(); // Refresh the project list after deletion
    } catch (error) {
      console.error('Error deleting project:', error.response);
    }
  };
  const [editFormData, setEditFormData] = useState({
    projectName: '',
    projectLink: '',
    description: '',
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  
  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:4000/api/projects/${selectedProjectId}`, editFormData);
      alert('Project updated successfully');
      fetchProjects(); // Refresh the project list after update
    } catch (error) {
      console.error('Error updating project:', error.response);
    }
  };
  
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleEdit();
    setSelectedProjectId(null); // Reset selected project ID
    setEditFormData({ projectName: '', projectLink: '', description: '' }); // Clear edit form data
  };
  
  return (
    <div>
      <AdminNavbar />
      <AdminBanner />
      <h1 className="brand-name text-center mt-5 mb-5">Project</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        />
        <label htmlFor="projectLink">Project Link:</label>
        <input
          type="text"
          id="projectLink"
          name="projectLink"
          value={formData.projectLink}
          onChange={handleChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
       <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div>
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="projectLink">Project Link</label>
              <input
                type="text"
                className="form-control"
                id="projectLink"
                name="projectLink"
                value={formData.projectLink}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                rows={5}
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button className="button mt-2" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div> 
      <ul>
      <ul>
      {projects.map((project) => (
        <li key={project._id}>
          {project.projectName} - {project.projectLink} - {project.description}
          <button onClick={() => setSelectedProjectId(project._id)}>Edit</button>
          <button onClick={() => handleDelete(project._id)}>Delete</button>
          {selectedProjectId === project._id && (
            <form onSubmit={handleEditFormSubmit}>
              <label htmlFor="editProjectName">New Project Name:</label>
              <input
                type="text"
                id="editProjectName"
                name="projectName"
                value={editFormData.projectName}
                onChange={handleEditChange}
              />
              <label htmlFor="editProjectLink">New Project Link:</label>
              <input
                type="text"
                id="editProjectLink"
                name="projectLink"
                value={editFormData.projectLink}
                onChange={handleEditChange}
              />
              <label htmlFor="editDescription">New Description:</label>
              <textarea
                id="editDescription"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
              ></textarea>
              <button type="submit">Update</button>
            </form>
          )}
        </li>
      ))}
    </ul>
    </ul>
      <Footer />
    </div>
  );
};

export default AdminProjects;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Footer from '../../components/Footer/Footer';
// import AdminNavbar from './../AdminNavbar/AdminNavbar'
// import AdminBanner from './../../AdminBanner/AdminBanner'
// const AdminProjects = () => {
//   const [formData, setFormData] = useState({
//     projectName: '',
//     projectLink: '',
//     description: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/projects', formData);
//       alert('Project submitted successfully');
//       setFormData({ projectName: '', projectLink: '', description: '' });
//     } catch (error) {
//       console.error('Error submitting project:', error.response); // Log the error response
//       alert('Error submitting project. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       {/* Admin Navbar and Banner */}
//       <AdminNavbar />
//       <AdminBanner />
//       <h1 className="brand-name text-center mt-5 mb-5">Project</h1>
      //  <div className="container mb-5">
      //   <div className="row">
      //     <div className="col-md-6">
      //       <div>
      //         <label htmlFor="projectName">Project Name</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="projectName"
      //           name="projectName"
      //           value={formData.projectName}
      //           onChange={handleChange}
      //         />
      //       </div>
      //     </div>
      //     <div className="col-md-6">
      //       <div>
      //         <label htmlFor="projectLink">Project Link</label>
      //         <input
      //           type="text"
      //           className="form-control"
      //           id="projectLink"
      //           name="projectLink"
      //           value={formData.projectLink}
      //           onChange={handleChange}
      //         />
      //       </div>
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="col-md-6">
      //       <div>
      //         <label htmlFor="description">Description</label>
      //         <textarea
      //           rows={5}
      //           className="form-control"
      //           id="description"
      //           name="description"
      //           value={formData.description}
      //           onChange={handleChange}
      //         ></textarea>
      //       </div>
      //       <button className="button mt-2" onClick={handleSubmit}>
      //         Submit
      //       </button>
      //     </div>
      //   </div>
      // </div> 
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="projectName">Project Name:</label>
//         <input
//           type="text"
//           id="projectName"
//           name="projectName"
//           value={formData.projectName}
//           onChange={handleChange}
//         />
//         <label htmlFor="projectLink">Project Link:</label>
//         <input
//           type="text"
//           id="projectLink"
//           name="projectLink"
//           value={formData.projectLink}
//           onChange={handleChange}
//         />
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         ></textarea>
//         <button type="submit">Submit</button>
//       </form>
//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default AdminProjects;
