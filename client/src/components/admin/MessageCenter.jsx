// // client/components/admin/MessageCenter.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaStar, FaExclamation, FaTrash, FaReply } from 'react-icons/fa';

// const MessageCenter = () => {
//   const [messages, setMessages] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [search, setSearch] = useState('');
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [replyContent, setReplyContent] = useState('');

//   useEffect(() => {
//     fetchMessages();
//   }, [filter, search]);

//   const getAuthHeader = () => ({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
//   });

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/contact/messages`, {
//         params: { filter, search },
//         ...getAuthHeader()
//       });
//       setMessages(response.data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };
  
//   const handleStar = async (id) => {
//     try {
//       // Changed from PATCH to POST
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/contact/messages/${id}/star`,
//         {}, // empty body
//         getAuthHeader()
//       );
//       fetchMessages();
//     } catch (error) {
//       console.error('Error starring message:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/contact/messages/${id}`,
//         getAuthHeader()
//       );
//       fetchMessages();
//     } catch (error) {
//       console.error('Error deleting message:', error);
//     }
//   };

//   const handleReply = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/contact/messages/${selectedMessage._id}/reply`,
//         { content: replyContent },
//         getAuthHeader()
//       );
//       setReplyContent('');
//       setSelectedMessage(null);
//       fetchMessages();
//     } catch (error) {
//       console.error('Error sending reply:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Search and Filter Bar */}
//       <div className="mb-6 flex gap-4">
//         <input
//           type="text"
//           placeholder="Search messages..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded-lg w-full"
//         />
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="px-4 py-2 border rounded-lg"
//         >
//           <option value="all">All Messages</option>
//           <option value="unread">Unread</option>
//           <option value="starred">Starred</option>
//           <option value="important">Important</option>
//         </select>
//       </div>

//       {/* Messages List */}
//       <div className="space-y-4">
//         {messages.map((message) => (
//           <div key={message._id} className="border rounded-lg p-4 hover:bg-gray-50">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold">{message.name}</h3>
//                 <p className="text-sm text-gray-600">{message.email}</p>
//                 <p className="mt-2">{message.message}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   {new Date(message.timestamp).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button onClick={() => handleStar(message._id)}>
//                   <FaStar className={message.isStarred ? 'text-yellow-400' : 'text-gray-300'} />
//                 </button>
//                 <button onClick={() => setSelectedMessage(message)}>
//                   <FaReply className="text-blue-500" />
//                 </button>
//                 <button onClick={() => handleDelete(message._id)}>
//                   <FaTrash className="text-red-500" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Reply Modal */}
//       {selectedMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <h2 className="text-xl font-bold mb-4">
//               Reply to {selectedMessage.name}
//             </h2>
//             <textarea
//               value={replyContent}
//               onChange={(e) => setReplyContent(e.target.value)}
//               className="w-full h-40 p-2 border rounded-lg mb-4"
//               placeholder="Type your reply..."
//             />
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={() => setSelectedMessage(null)}
//                 className="px-4 py-2 border rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReply}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//               >
//                 Send Reply
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageCenter;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaExclamation, FaTrash, FaReply } from 'react-icons/fa';

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add debouncing for search
    const timeoutId = setTimeout(() => {
      fetchMessages();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [filter, search]);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchMessages = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/contact/messages`,
        {
          params: { filter, search },
          ...getAuthHeader()
        }
      );
      setMessages(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error fetching messages';
      setError(errorMessage);
      console.error('Error fetching messages:', error);
    }
  };

  // const handleStar = async (id) => {
  //   try {
  //     setError(null);
  //     const response = await axios.patch(
  //       `${import.meta.env.VITE_API_URL}/contact/messages/${id}/star`,
  //       {},
  //       getAuthHeader()
  //     );
  //     // Update the message in the local state
  //     setMessages(messages.map(msg => 
  //       msg._id === id ? { ...msg, isStarred: !msg.isStarred } : msg
  //     ));
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.message || 'Error starring message';
  //     setError(errorMessage);
  //     console.error('Error starring message:', error);
  //   }
  // };
  const handleStar = async (id) => {
    try {
      setError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact/messages/${id}/star`,
        {},  // empty body
        getAuthHeader()
      );
      
      // Update the message in the local state
      setMessages(messages.map(msg => 
        msg._id === id ? response.data : msg
      ));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error starring message';
      setError(errorMessage);
      console.error('Error starring message:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      setError(null);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/contact/messages/${id}`,
        getAuthHeader()
      );
      // Remove the message from local state
      setMessages(messages.filter(msg => msg._id !== id));
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error deleting message';
      setError(errorMessage);
      console.error('Error deleting message:', error);
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim()) {
      setError('Reply content cannot be empty');
      return;
    }

    try {
      setError(null);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact/messages/${selectedMessage._id}/reply`,
        { content: replyContent },
        getAuthHeader()
      );
      
      // Update the message in the local state
      setMessages(messages.map(msg => 
        msg._id === selectedMessage._id ? response.data : msg
      ));
      
      setReplyContent('');
      setSelectedMessage(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error sending reply';
      setError(errorMessage);
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="starred">Starred</option>
        </select>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No messages found</p>
        ) : (
          messages.map((message) => (
            <div key={message._id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{message.name}</h3>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  <p className="mt-2">{message.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStar(message._id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <FaStar className={message.isStarred ? 'text-yellow-400' : 'text-gray-300'} />
                  </button>
                  <button 
                    onClick={() => setSelectedMessage(message)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <FaReply className="text-blue-500" />
                  </button>
                  <button 
                    onClick={() => handleDelete(message._id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              Reply to {selectedMessage.name}
            </h2>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full h-40 p-2 border rounded-lg mb-4"
              placeholder="Type your reply..."
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setSelectedMessage(null);
                  setReplyContent('');
                  setError(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                disabled={!replyContent.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageCenter;