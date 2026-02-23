import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || `${location.protocol}//${location.hostname}:3002`;
const ACTIVITY_POLL_INTERVAL_MS = 5000;

function ActivityFeed() {
  const [activity, setActivity] = useState('Loading...');

  async function fetchActivity() {
    try {
      const res = await fetch(`${API_BASE}/activity`);
      if (!res.ok) { setActivity('Failed to load activity'); return; }
      setActivity(await res.text());
    } catch (e) {
      setActivity('Error fetching activity: ' + e.message);
    }
  }

  useEffect(() => {
    fetchActivity();
    const id = setInterval(fetchActivity, ACTIVITY_POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Activity Log</h2>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f7f7f7', padding: 12, borderRadius: 6, fontSize: 13 }}>
        {activity}
      </pre>
    </section>
  );
}

function EventsColumn({ title, events }) {
  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, padding: '8px 12px', background: '#e9ecef', borderRadius: 6, marginBottom: 8 }}>
        {title}
      </h3>
      {events.length === 0 ? (
        <p style={{ color: '#888', fontSize: 13, padding: '4px 0' }}>No events</p>
      ) : (
        events.map((ev, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #dee2e6', borderRadius: 6, padding: 10, marginBottom: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{ev.title}</div>
            {ev.time && <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{ev.time}</div>}
            {ev.group && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{ev.group}</div>}
          </div>
        ))
      )}
    </div>
  );
}

export default function Board() {
  // Placeholder board columns — will be populated from API once event endpoints are available
  const columns = [
    {
      title: 'Upcoming',
      events: [],
    },
    {
      title: 'This Week',
      events: [],
    },
    {
      title: 'Past',
      events: [],
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Social Calendar Board</h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Events</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {columns.map((col) => (
            <EventsColumn key={col.title} title={col.title} events={col.events} />
          ))}
        </div>
      </section>

      <ActivityFeed />
    </div>
  );
}
