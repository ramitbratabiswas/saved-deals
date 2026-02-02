import { useState } from 'react'
import './App.css'

const DEALS_LINK = "http://localhost:8000/deals"

interface Deal {
    id: number,
    title: string,
    price: number,
    url: string,
}

interface DealDisplayProps {
    deals: Deal[]
}

const deleteDeal = async (id: number) => {
    await fetch(`${DEALS_LINK}/${id}`, {
        method: "DELETE"
    })
}

const DealDisplay = (props: DealDisplayProps) => {
    const { deals } = props;
    return (
        <div className='deal-display-container'>
            <h1 className='deal-display-header'>deals for you...</h1>
            <div className='deals-list'>
                {deals.map((deal: Deal) => (
                    <>
                        <div className='deal-list-item'>
                            <div className='deal-name'>name: {deal.title}</div>
                            <div className='deal-price'>price: {deal.price}</div>
                            <div className='deal-url'>url: {deal.url}</div>
                            <button onClick={(e) => { e.preventDefault(); deleteDeal(deal.id); }}>delete</button>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

const App = () => {
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
                        <input type='text' value={newDealName} onChange={(v) => setNewDealName(v.target.value)} />
                    </div>
                    <div>
                        <label>costs($)? </label>
                        <input type='text' value={newDealPrice} onChange={(v) => setNewDealPrice(Number(v.target.value))} />
                    </div>
                    <div>
                        <label>link u found it on</label>
                        <input type='text' value={newDealUrl} onChange={(v) => setNewDealUrl(v.target.value)} />
                    </div>
                    <input type='submit' />
                </form>
            </div>
            <div className='deals'>
                {deals && <DealDisplay deals={deals} />}
            </div>
        </>
    )
}

export default App
