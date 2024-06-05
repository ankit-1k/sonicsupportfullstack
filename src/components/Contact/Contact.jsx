import React, { useState } from 'react';
import axios from 'axios';
import './contact.css';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import successImg from './../assets/img/success.gif'
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        message: ''
    });
    const [isOpensuccess, setIsOpensuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        if (!formData.message) errors.message = 'Message is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await axios.post('http://localhost:4000/api/contact', formData);
                setSubmitMessage('Contact information saved successfully');
                setIsOpensuccess(true)
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    website: '',
                    message: ''
                });
                setErrors({});
            } catch (error) {
                setSubmitMessage('There was an error submitting the form!');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <Banner />
            <div className="contact-container mt-5 mb-5">
                <form id="contact" onSubmit={handleSubmit} method="post">
                    <h1 className='text-center mt-1 brand-name m-1 '>Contact</h1>
                    <div className='d-flex justify-content-center mb-4'>
                        <div className='hr bg-dark'></div>
                    </div>
                    <fieldset>
                        <input
                            placeholder="Your name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Your Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Your Phone Number (optional)"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </fieldset>
                    <fieldset>
                        <input
                            placeholder="Your Web Site (optional)"
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />
                        {errors.website && <span className="error">{errors.website}</span>}
                    </fieldset>
                    <fieldset>
                        <textarea
                            placeholder="Type your message here...."
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.message && <span className="error">{errors.message}</span>}
                    </fieldset>
                    <fieldset>
                        <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                    </fieldset>
                    {submitMessage && <span className="submit-message">{submitMessage}</span>}
                </form>
            </div>
            <Footer />
            {isOpensuccess && (
                <div className="modal-backdrop">
                    <dialog className="modal-custom" style={{ position: 'relative' }} open>
                        <div className="d-flex justify-content-center mt-5">
                            <img src={successImg} className='warning-img' alt="" />
                        </div>
                        <div className='para-less-mp'>
                            <h3 className='text-center fw-bold'>Thank You</h3>
                            <p className='fw-bold text-center lead'>We will contact you soon</p>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                            <button className="button w-25 mt-2" onClick={() => setIsOpensuccess(false)}>OK</button>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    );
}

export default Contact;
