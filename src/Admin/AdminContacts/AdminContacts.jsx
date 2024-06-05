import React, { useEffect, useState } from 'react'
import AdminNavbar from './../AdminNavbar/AdminNavbar'
import AdminBanner from './../../AdminBanner/AdminBanner'
import './admincontact.css'
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
const AdminContacts = () => {
  useEffect(() => {
    fetchContacts();
  }, []);
  const [contacts, setContacts] = useState([])
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  return (
    <div>
      <AdminNavbar />
      <AdminBanner />
      <div className="contact-list-container">
        <h2 className="text-center mt-5 mb-5 brand-name">Contacts</h2>
        <table>
          <thead>
            <tr className='bg-theme text-white'>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.website}</td>
                <td>{contact.message}</td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill text-danger" viewBox="0 0 16 16" onClick={() => handleDelete(contact._id)}>
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  )
}

export default AdminContacts