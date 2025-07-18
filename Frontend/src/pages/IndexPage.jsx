/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { UserContext } from "../UserContext";  // ✅ import user context

export default function IndexPage() {
  const { user } = useContext(UserContext);  // ✅ use user context
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, likes: event.likes + 1 }
              : event
          )
        );
      })
      .catch((error) => {
        console.error("Error liking event:", error);
      });
  };

  return (
    <div className="mt-1 flex flex-col">
      {/* Hero Section */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-center w-full h-[379px] bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-md rounded">
          <div className="text-center px-6 md:px-12 lg:px-24 max-w-6xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4 tracking-wide">
              Welcome to EventoSphere
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 font-medium leading-relaxed">
              Simplifying the way professionals discover, manage, and connect through meaningful corporate events.
              Whether you're planning or participating, EventoSphere offers seamless solutions to elevate your engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="mx-10 my-5 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:mx-5">
        {events.length > 0 &&
          events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const currentDate = new Date();

            if (
              eventDate > currentDate ||
              eventDate.toDateString() === currentDate.toDateString()
            ) {
              return (
                <div className="bg-white rounded-xl shadow-md" key={event._id}>
                  <div className="relative rounded-t-xl overflow-hidden">
                    {event.image && (
                      <img
                        src={`http://localhost:4000/${event.image}`}
                        alt={event.title}
                        className="w-full h-[200px] object-cover"
                      />
                    )}
                    <div className="absolute flex gap-4 bottom-4 right-4">
                      <button onClick={() => handleLike(event._id)}>
                        <BiLike className="w-10 h-10 bg-white p-2 rounded-full shadow-md transition-all hover:text-primary" />
                      </button>
                    </div>
                  </div>

                  <div className="m-2 grid gap-2">
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-lg mt-2">{event.title.toUpperCase()}</h1>
                      <div className="flex gap-2 items-center mr-4 text-red-600">
                        <BiLike /> {event.likes}
                      </div>
                    </div>

                    <div className="flex text-sm justify-between text-primarydark font-bold mr-4">
                      <div>{event.eventDate.split("T")[0]}, {event.eventTime}</div>
                      <div>{event.ticketPrice === 0 ? "Free" : `Rs. ${event.ticketPrice}`}</div>
                    </div>

                    <div className="text-xs text-gray-600 truncate">{event.description}</div>

                    <div className="flex justify-between items-center my-2 mr-4">
                      <div className="text-sm text-primarydark">
                        Organized By: <br />
                        <span className="font-bold">{event.organizedBy}</span>
                      </div>
                      <div className="text-sm text-primarydark">
                        Created By: <br />
                        <span className="font-semibold">{event.owner.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* ✅ Book Ticket visible only if user is logged in */}
                    {user && (
                      <Link to={`/event/${event._id}`} className="flex justify-center">
                        <button className="primary flex items-center gap-2">
                          Book Ticket
                          <BsArrowRightShort className="w-6 h-6" />
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
