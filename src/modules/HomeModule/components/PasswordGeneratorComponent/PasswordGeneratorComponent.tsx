import React, { useEffect, useState } from "react";
import "./PasswordGeneratorComponent.scss";

export const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>()

    const initParams = {
        lowerLetters: false,
        upperLetters: true,
        numbers: true,
        symbols: true
    }

    const [passParams, setPassParams] = useState(initParams)
    const [passLen, setPassLen] = useState(6)

    const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const upperLetters = lowerLetters.map(elem => elem.toUpperCase())
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '?']

    let availableSigns: string[][] = []

    function getRandomOne(collection: string | string[] | string[][]) {
        return collection[Math.floor(Math.random() * collection.length)]
    }

    function createSignsCollections() {
        const updatedSigns = []
        if (passParams.lowerLetters) { updatedSigns.push(lowerLetters) }
        if (passParams.upperLetters) { updatedSigns.push(upperLetters) }
        if (passParams.numbers) { updatedSigns.push(numbers) }
        if (passParams.symbols) { updatedSigns.push(symbols) }
        availableSigns = updatedSigns
    }


    function generatePassword() {
        const password = []
        createSignsCollections()
        for (let i = 1; i <= passLen; i++) {
            password.push(getRandomOne(getRandomOne(availableSigns)))
        }

        setPassword(password.join(''))
    }

    useEffect(() => {
        generatePassword()
    }, [passLen])

    const changePassLenght = (event: any) => {
        setPassLen(event.target.value);
    };

    const handleCheckboxChange = () => {
        setPassParams({
            lowerLetters: !passParams.lowerLetters,
            upperLetters: true,
            numbers: true,
            symbols: true
        })
    }


    return (
        <div className="password-generator">
            <h1 className="password-generator__title">Password Generator</h1>
            <form className="password-generator__form">
                <div className="password-generator__input-container">
                    <div className="password-generator__range-label"><label>Character Length</label><span>{passLen}</span></div>
                    <input type="range" min="4" max="16" step="1" value={passLen} onChange={changePassLenght} />
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked />Include Uppercase Letter</label>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" onChange={handleCheckboxChange}/>Include Lowercase Letter</label>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked />Include Numbers</label>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked />Include Symbols</label>
                </div>
            </form>
            <div className="password-generator__strength">TU BEDZIE SIŁA HASŁA</div>
            <div className="password-generator__password">{password} <button onClick={generatePassword}>GENERATE</button></div>
            <button className="password-generator__copy-button">Copy Password</button>
        </div>
    );
};
