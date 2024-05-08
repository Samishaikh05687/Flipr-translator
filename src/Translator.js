import { useEffect, useState } from 'react';
import lang from './languages';



function Translator() {

    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en-GB');
    const [toLanguage, setToLanguage] = useState('hi-IN');
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLanguages(lang);
    }, []);

   

    const handleExchange = () => {
        let tempValue = fromText;
        setFromText(toText);
        setToText(tempValue);

        let tempLang = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(tempLang);
    };

    // const handleTranslate = async () => {
    //     const translate = new Translate({ key: 'b06ad6936emshee726479be78517p1a2869jsn990f6b166b3d' });
    //     try {
    //         const translations = await Promise.all(
    //             fromLanguage.map(async (language) => {
    //                 const [translation] = await translate.translate(fromText, language);
    //                 return { language, translation };
    //             })
    //         );
    //         setToText(translations);
    //     } catch (error) {
    //         console.error('Error translating text:', error);
    //     }
    // };

    const handleTranslate = async () => {
        setLoading(true);
        const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'b06ad6936emshee726479be78517p1a2869jsn990f6b166b3d',
                'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
            },
            body: new URLSearchParams({
                from: fromLanguage,
                to: toLanguage,
                text: fromText
            })
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        <div className="wrapper">
            <div className="text-input">
                <textarea name="from" className="from-text" placeholder="Enter Text" id="from" value={fromText} onChange={(e) => setFromText(e.target.value)}></textarea>
                <textarea name="to" className="to-text" id="to" value={toText} readonly></textarea>
            </div>
            <ul className="controls">
                <li className="row from">
                    {/* <div className="icons">
                        <i id="from" className="fa-solid fa-volume-high" onClick={(e) => handleIconClick(e.target, 'from')}></i>
                        <i id="from" className="fa-solid fa-copy" onClick={(e) => handleIconClick(e.target, 'from')}></i>
                    </div> */}
                    <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                    {Object.entries(languages).map(([code, name]) => (
                        <option key={code} value={code}>
                        {name}
                        </option>
                    ))}
                    </select>

                </li>
                <li className="exchange" onClick={handleExchange}><i className="fa-solid fa-arrow-right-arrow-left"></i></li>
                <li className="row to">
                    <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                    {Object.entries(languages).map(([code, name]) => (
                        <option key={code} value={code}>
                        {name}
                        </option>
                    ))}
                    </select>
                    {/* <div className="icons">
                        <i id="to" className="fa-solid fa-copy" onClick={(e) => handleIconClick(e.target, 'to')}></i>
                        <i id="to" className="fa-solid fa-volume-high" onClick={(e) => handleIconClick(e.target, 'to')}></i>
                    </div> */}
                </li>
            </ul>
        </div>
        <button onClick={handleTranslate} disabled={loading}>
            {loading ? 'Translating...' : 'Translate Text'}
        </button>
        </>
    )
}

export default Translator;
