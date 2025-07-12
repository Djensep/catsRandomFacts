import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [fact, setFact] = useState("");
    const [catImage, setCatImage] = useState("");
    const [loading, setLoading] = useState(false);

    const getCatData = async () => {
        try {
            setLoading(true);
            const [factRes, imageRes] = await Promise.all([
                axios.get("https://catfact.ninja/fact"),
                axios.get("https://api.thecatapi.com/v1/images/search"),
            ]);

            setFact(factRes.data.fact);
            const image = imageRes.data[0];
            setCatImage(image.url);
        } catch (error) {
            console.error("Ошибка:", error);
            setFact("Не удалось получить факт 😿");
            setCatImage("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="left">
                    {catImage ? <img src={catImage} alt="cat" /> : <div className="placeholder">Нет изображения</div>}
                </div>
                <div className="right">
                    <h2>🐱 Случайный факт</h2>
                    <p>{loading ? "Загрузка..." : fact}</p>
                    <button onClick={getCatData}>Получить новый факт 🐾</button>
                </div>
            </div>
        </div>
    );
}

export default App;
