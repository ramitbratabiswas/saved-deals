import { useState } from 'react'
import './App.css'

function App() {
    const [clickCount, setClickCount] = useState(0);

    return (
        <>
            <h1 className='center'>get ur travel deals here (definitely not sketchy)</h1>
            <div className='buttons'>
                <button className='click-count-button' onClick={() => setClickCount((prev) => prev + 1)}>
                    this was clicked {clickCount} times
                </button>
                <button>
                    this is just here chilling
                </button>
            </div>
        </>
    )
}

export default App
