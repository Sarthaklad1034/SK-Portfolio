import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FaGithub className="w-6 h-6" />,
            url: 'https://github.com/Sarthaklad1034'
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="w-6 h-6" />,
            url: 'https://www.linkedin.com/in/sarthak-lad/'
        },
        {
            name: 'Twitter',
            icon: <FaTwitter className="w-6 h-6" />,
            url: 'https://x.com/SarthakLad9'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Disable the form while submitting
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/contact`,
                formData
            );
            
            // Show success message
            toast.success('Message sent successfully!');
            
            // Clear form
            setFormData({ name: '', email: '', message: '' });
            
            // Show additional confirmation to user
            setSubmissionStatus('success');
            
        } catch (error) {
            // More descriptive error message
            const errorMessage = error.response?.data?.message || 
                'Unable to send message. Please try again later.';
            
            toast.error(errorMessage);
            setSubmissionStatus('error');
            
        } finally {
            setIsSubmitting(false);
            submitButton.disabled = false;
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">
                            Get In Touch
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
                            Have a question or want to work together? Feel free to reach out!
                        </p>

                        {/* Social Links */}
                        <div className="flex justify-center gap-6 mb-12">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {/* Show submission status */}
{/* Show submission status messages */}
{submissionStatus === 'success' && (
    <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center space-x-3">
        <svg 
            className="h-5 w-5 text-green-500" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
            <h3 className="font-medium text-green-800">Message Sent Successfully!</h3>
            <p className="text-green-700 text-sm mt-1">
            I've received your message and will get back to you within 12-24 hours.
            </p>
        </div>
    </div>
)}

{submissionStatus === 'error' && (
    <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center space-x-3">
        <svg 
            className="h-5 w-5 text-red-500" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
            <h3 className="font-medium text-red-800">Message Not Sent</h3>
            <p className="text-red-700 text-sm mt-1">
                There was an error sending your message. Please try again or email us at{' '}
                <a 
                    href="mailto:support@example.com" 
                    className="underline hover:text-red-900 transition-colors"
                >
                    support@example.com
                </a>
            </p>
        </div>
    </div>
)}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

// Frontend Contact Form Component (Contact.jsx)
// import { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { toast } from 'react-hot-toast';

// const Contact = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: ''
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await axios.post(
//                 `${import.meta.env.VITE_API_URL}/contact`,
//                 formData
//             );

//             toast.success('Message sent successfully!');
//             setFormData({ name: '', email: '', message: '' });
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to send message');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <section className="py-20 bg-white dark:bg-gray-900">
//             <div className="max-w-4xl mx-auto px-4">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Name
//                             </label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={(e) => setFormData({
//                                     ...formData,
//                                     name: e.target.value
//                                 })}
//                                 required
//                                 className="w-full px-4 py-2 rounded-lg border focus:ring-2"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={(e) => setFormData({
//                                     ...formData,
//                                     email: e.target.value
//                                 })}
//                                 required
//                                 className="w-full px-4 py-2 rounded-lg border focus:ring-2"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium mb-1">
//                                 Message
//                             </label>
//                             <textarea
//                                 name="message"
//                                 value={formData.message}
//                                 onChange={(e) => setFormData({
//                                     ...formData,
//                                     message: e.target.value
//                                 })}
//                                 required
//                                 rows={5}
//                                 className="w-full px-4 py-2 rounded-lg border focus:ring-2"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
//                         >
//                             {isSubmitting ? 'Sending...' : 'Send Message'}
//                         </button>
//                     </form>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default Contact;