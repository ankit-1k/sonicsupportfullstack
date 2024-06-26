import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './../AdminNavbar/AdminNavbar';
import AdminBanner from './../../AdminBanner/AdminBanner'
import Footer from './../../components/Footer/Footer'
const AdminNotes = () => {
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ id: '', subject: '', question: '', answer: '' });
  const [isEditmodal, setEditModal] = useState(false);
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/questions');
      setNotes(response.data);
    } catch (error) {
      console.log("Can't fetch notes on admin:", error);
    }
  };

  const handleEdit = (id, subject, question, answer) => {
    setEditMode(true);
    setEditData({ id, subject, question, answer });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({ id: '', subject: '', question: '', answer: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(`http://localhost:4000/questions/${editData.id}`, {
        subject: editData.subject,
        question: editData.question,
        answer: editData.answer,
      });
      setEditMode(false);
      setEditData({ id: '', subject: '', question: '', answer: '' });
      fetchNotes(); // Refresh notes after edit
    } catch (error) {
      console.log("Can't update note:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/questions/${id}`);
      fetchNotes(); // Refresh notes after deletion
    } catch (error) {
      console.log("Can't delete note:", error);
    }
  };
  return (
    <>
      <AdminNavbar />
      <AdminBanner />
      <h2 className="brand-name text-center mt-5 mb-5">Edit Note</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {notes.map((item) => (
              <div key={item._id}>
                {editMode && editData.id === item._id ? (
                  <div>
                    {isEditmodal && (
                      <div className="modal-backdrop">
                        <dialog className="modal-custom" style={{ position: 'relative' }} open>
                          <div className="d-flex justify-content-center mt-5">
                            {/* <img src={successImg} className='warning-img' alt="" /> */}
                          </div>
                          <div className='para-less-mp'>
                            <h3 className='brand-name text-center'>Edit Q/A</h3>
                            <label className='mt-3' htmlFor="">Question</label>
                            <textarea
                              className='form-control'
                              name="question"
                              value={editData.question}
                              onChange={handleInputChange}
                            />
                            <label className='mt-3' htmlFor="">Answer</label>
                            <textarea
                            rows={5}
                              className='form-control'
                              name="answer"
                              value={editData.answer}
                              onChange={handleInputChange}
                            />
                            <div className="mt-3 d-flex justify-content-end">
                              <div>
                                <button className='button me-2' onClick={handleSubmitEdit}>Save</button>
                                <button className='button bg-danger' onClick={handleCancelEdit}>Cancel</button>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className='mb-3'>
                      <h5>Q: {item.question}</h5>
                      <p>
                        <span className="fw-bold lead">A: </span>
                        {item.answer}
                      </p>
                      <span className='p-2' onClick={() => { handleEdit(item._id, item.subject, item.question, item.answer); setEditModal(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square text-success" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                      </span >
                      <span className='p-2' onClick={() => handleDelete(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </span >
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminNotes;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AdminNavbar from './../AdminNavbar/AdminNavbar';
// import AdminBanner from './../../AdminBanner/AdminBanner'
// const AdminNotes = () => {
//   const [notes, setNotes] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({ id: '', subject: '', question: '', answer: '' });
//   const [isEditmodal, setEditModal] = useState(false);
//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/questions');
//       setNotes(response.data);
//     } catch (error) {
//       console.log("Can't fetch notes on admin:", error);
//     }
//   };

//   const handleEdit = (id, subject, question, answer) => {
//     setEditMode(true);
//     setEditData({ id, subject, question, answer });
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setEditData({ id: '', subject: '', question: '', answer: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmitEdit = async () => {
//     try {
//       await axios.put(`http://localhost:4000/questions/${editData.id}`, {
//         subject: editData.subject,
//         question: editData.question,
//         answer: editData.answer,
//       });
//       setEditMode(false);
//       setEditData({ id: '', subject: '', question: '', answer: '' });
//       fetchNotes(); // Refresh notes after edit
//     } catch (error) {
//       console.log("Can't update note:", error);
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4000/questions/${id}`);
//       fetchNotes(); // Refresh notes after deletion
//     } catch (error) {
//       console.log("Can't delete note:", error);
//     }
//   };
//   return (
//     <>
//       <AdminNavbar />
//       <AdminBanner />
//       <h2 className="brand-name text-center mt-5 mb-5">Edit Note</h2>
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             {notes.map((item) => (
//               <div key={item._id}>
//                 {editMode && editData.id === item._id ? (
//                   <div>
//                     {isEditmodal && (
//                       <div className="modal-backdrop">
//                         <dialog className="modal-custom" style={{ position: 'relative' }} open>
//                           <div className="d-flex justify-content-center mt-5">
//                             {/* <img src={successImg} className='warning-img' alt="" /> */}
//                           </div>
//                           <div className='para-less-mp'>
//                             <h3 className='brand-name text-center'>Edit Q/A</h3>
//                             <label className='mt-3' htmlFor="">Question</label>
//                             <textarea
//                               className='form-control'
//                               name="question"
//                               value={editData.question}
//                               onChange={handleInputChange}
//                             />
//                             <label className='mt-3' htmlFor="">Answer</label>
//                             <textarea
//                               className='form-control'
//                               name="answer"
//                               value={editData.answer}
//                               onChange={handleInputChange}
//                             />
//                             <div className="mt-3 d-flex justify-content-end">
//                               <div>
//                                 <button className='button me-2' onClick={handleSubmitEdit}>Save</button>
//                                 <button className='button bg-danger' onClick={handleCancelEdit}>Cancel</button>
//                               </div>
//                             </div>
//                           </div>
//                         </dialog>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <div className='mb-3'>
//                       <h5>Q: {item.question}</h5>
//                       <p>
//                         <span className="fw-bold lead">A: </span>
//                         {item.answer}
//                       </p>
//                       <span className='p-2' onClick={() => { handleEdit(item._id, item.subject, item.question, item.answer); setEditModal(true) }}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square text-success" viewBox="0 0 16 16">
//                           <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                           <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                         </svg>
//                       </span >
//                       <span className='p-2' onClick={() => handleDelete(item._id)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
//                           <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
//                           <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
//                         </svg>
//                       </span >
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminNotes;