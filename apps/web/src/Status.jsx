import React, {useEffect, useState} from 'react';

export default function Status(){
  const [activity, setActivity] = useState('Loading...');

  async function fetchActivity(){
    try{
      const apiUrl = `${location.protocol}//${location.hostname}:3002/activity`;
      const res = await fetch(apiUrl);
      if(!res.ok){ setActivity('Failed to load activity'); return }
      const text = await res.text();
      setActivity(text);
    }catch(e){ setActivity('Error fetching activity: '+e.message) }
  }

  useEffect(()=>{
    fetchActivity();
    const id = setInterval(fetchActivity, 5000);
    return ()=> clearInterval(id);
  },[]);

  return (
    <div style={{padding:20}}>
      <h2>Live Activity</h2>
      <pre style={{whiteSpace:'pre-wrap',background:'#f7f7f7',padding:12}}>{activity}</pre>
    </div>
  )
}
