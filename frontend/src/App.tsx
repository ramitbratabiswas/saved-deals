import { useState } from 'react'
import './App.css'

const DEALS_LINK = "http://localhost:8000/deals"

function App() {
    const [clickCount, setClickCount] = useState(0);
    const [deals, setDeals] = useState([]);

    const loadDeals = async () => {
        const res = await fetch(DEALS_LINK);
        const data = await res.json();
        setDeals(data);
    };

    return (
        <>
            <h1 className='center'>get ur travel deals here! (definitely not sketchy)</h1>
            <div className='buttons'>
                <button className='click-count-button' onClick={() => setClickCount((prev) => prev + 1)}>
                    this was clicked {clickCount} times
                </button>
                <button>
                    this is just here chilling
                </button>
                <button className='get-deals' onClick={() => loadDeals()}>
                    click here to get ur deals!
                </button>
            </div>
            <div className='deals'>
                {deals && deals.map((deal, i) => <div key={i}>{deal}</div>)}
            </div>
        </>
    )
}

export default App
