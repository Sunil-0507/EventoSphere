import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: null,
    likes: 0
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.organizedBy) newErrors.organizedBy = "Organizer is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.eventTime) newErrors.eventTime = "Event time is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.ticketPrice < 0) newErrors.ticketPrice = "Ticket price cannot be negative";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (key === 'eventDate' && formData[key]) {
          const date = new Date(formData[key]);
          data.append(key, date.toISOString());
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const res = await axios.post('/createEvent', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Event posted successfully:', res.data);
      alert('Event created successfully!');
      setFormData({
        owner: user ? user.name : "",
        title: "",
        description: "",
        organizedBy: "",
        eventDate: "",
        eventTime: "",
        location: "",
        ticketPrice: 0,
        image: null,
        likes: 0
      });
    } catch (error) {
      console.error('Error posting event:', error);
      if (error.response?.data?.error) {
        alert(error.response.data.error + (error.response.data.details ? '\n' + error.response.data.details.join('\n') : ''));
      } else {
        alert('Failed to create event. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="w-full max-w-2xl px-6">
        <h1 className="font-bold text-[36px] mb-8 text-center">Post an Event</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {["title", "description", "organizedBy", "eventDate", "eventTime", "location", "ticketPrice"].map((field) => (
            <label className="flex flex-col font-medium" key={field}>
              <span>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                {errors[field] && <span className="text-red-500 ml-2 text-sm">{errors[field]}</span>}
              </span>
              <input
                type={field === "ticketPrice" ? "number" : field.includes("Date") ? "date" : field.includes("Time") ? "time" : "text"}
                name={field}
                className={`rounded mt-2 px-4 py-2 ring-2 border-none ${errors[field] ? 'ring-red-500' : 'ring-sky-700'}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </label>
          ))}

          <label className="flex flex-col font-medium">
            <span>Image:</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="rounded mt-2 px-4 py-2 ring-sky-700 ring-2 border-none"
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="primary py-3 px-6 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
