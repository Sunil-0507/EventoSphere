import React from 'react';

const FeaturesPage = () => {
  return (
    <div className="p-10 max-w-5xl mx-auto text-gray-800 leading-7">
      <h1 className="text-3xl font-bold mb-6 text-primary">Features of EventoSphere</h1>

    

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🎟 Digital Ticketing System</h2>
        <p>
          Forget paper passes — EventoSphere uses secure QR-based ticketing for check-ins. This eco-conscious approach supports fast, contactless verification at any venue.
        </p>
      </section>

      

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">💼 Centralized Wallet</h2>
        <p>
          View all your tickets, transactions, and order history in one place. The wallet simplifies access to past and upcoming event details without digging through emails or apps.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">⚙️ Hassle-Free Event Creation</h2>
        <p>
          Host your own event with just a few clicks. EventoSphere provides guided forms, real-time previews, and instant publishing. All events are automatically discoverable by your target audience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌿 Sustainability Focus</h2>
        <p>
          We promote minimalism and environmental responsibility. From digital invites to zero-paper ticketing, EventoSphere helps your brand go green without compromising on impact.
        </p>
      </section>
    </div>
  );
};

export default FeaturesPage;
