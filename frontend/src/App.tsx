import { useState } from 'react'
import './App.css'

const DEALS_LINK = "http://localhost:8000/deals"

interface Deal {
    id: number,
    title: string,
    price: number,
    url: string,
}

function App() {
    const [clickCount, setClickCount] = useState(0);
    const [deals, setDeals] = useState<Deal[]>([]);
    const [newDealName, setNewDealName] = useState<string>("");
    const [newDealPrice, setNewDealPrice] = useState<number>(0);
    const [newDealUrl, setNewDealUrl] = useState<string>("");

    const loadDeals = async () => {
        const res = await fetch(DEALS_LINK);
        const data: Deal[] = await res.json();
        setDeals(data);
    };

    const addDeal = async () => {
        await fetch(DEALS_LINK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newDealName,
                price: newDealPrice,
                url: newDealUrl,
            }),
        });
    }

    const resetCurrDeal = () => {
        setNewDealName("");
        setNewDealPrice(0);
        setNewDealUrl("");
    }

    const handleAddSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addDeal();
        resetCurrDeal();
    }

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
                <h2 className='add-header'>add a new deal here</h2>
                <form inputMode='text' className='add-form' onSubmit={handleAddSubmit}>
                    <div>
                        <label>where to?</label>
                        <input type='text' onChange={(v) => setNewDealName(v.target.value)} />
                    </div>
                    <div>
                        <label>costs($)? </label>
                        <input type='text'onChange={(v) => setNewDealPrice(Number(v.target.value))}  />
                    </div>
                    <div>
                        <label>link u found it on</label>
                        <input type='text' onChange={(v) => setNewDealUrl(v.target.value)} />
                    </div>
                    <input type='submit' />
                </form>
            </div>
            <div className='deals'>
                {deals && deals.map((deal, i) => <div key={i}>{`id: ${deal.id}, name: ${deal.title}, price: ${deal.price}, site: ${deal.url}`}</div>)}
            </div>
        </>
    )
}

export default App
