import React, {useEffect, useState} from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || `${location.protocol}//${location.hostname}:3002`;
const ACTIVITY_POLL_INTERVAL_MS = 5000;

export default function Status(){
  const [activity, setActivity] = useState('Loading...');

  async function fetchActivity(){
    try{
      const res = await fetch(`${API_BASE}/activity`);
      if(!res.ok){ setActivity('Failed to load activity'); return }
      const text = await res.text();
      setActivity(text);
    }catch(e){ setActivity('Error fetching activity: '+e.message) }
  }

  useEffect(()=>{
    fetchActivity();
    const id = setInterval(fetchActivity, ACTIVITY_POLL_INTERVAL_MS);
    return ()=> clearInterval(id);
  },[]);

  return (
    <div style={{padding:20}}>
      <h2>Live Activity</h2>
      <pre style={{whiteSpace:'pre-wrap',background:'#f7f7f7',padding:12}}>{activity}</pre>
    </div>
  )
}
