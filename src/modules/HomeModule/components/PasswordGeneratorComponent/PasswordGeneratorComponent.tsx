import React, { useEffect, useState } from "react";
import refreshIcon from '../../../../assets/images/refreshIcon.svg'
import copyIcon from '../../../../assets/images/copy.svg'
import "./PasswordGeneratorComponent.scss";

export const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('password')

    const [passLength, setPassLength] = useState(6)
    const [useLowerLetters, setLowerLetters] = useState(false)
    const [useUpperLetters, setUpperLetters] = useState(true)
    const [useNumbers, setNumbers] = useState(true)
    const [useSymbols, setSymbols] = useState(true)

    const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const upperLetters = lowerLetters.map(elem => elem.toUpperCase())
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '?']

    let availableSigns: string[][]

    function getRandomOne(collection: string | string[] | string[][]) {
        return collection[Math.floor(Math.random() * collection.length)]
    }

    function createSignsCollections() {
        const updatedSigns = []
        if (useLowerLetters) { updatedSigns.push(lowerLetters) }
        if (useUpperLetters) { updatedSigns.push(upperLetters) }
        if (useNumbers) { updatedSigns.push(numbers) }
        if (useSymbols) { updatedSigns.push(symbols) }
        availableSigns = updatedSigns
    }


    function generatePassword() {
        const password = []
        createSignsCollections()
        for (let i = 1; i <= passLength; i++) {
            password.push(getRandomOne(getRandomOne(availableSigns)))
        }
        setPassword(password.join(''))
    }

    useEffect(() => {
        generatePassword()
    }, [passLength, useLowerLetters, useUpperLetters, useNumbers, useSymbols])

    useEffect(() => {
        markStrengthBoxes()
    }, [password])

    function allowUncheck(currentCheckbox: boolean) {
        let checkedBoxes = 0
        if (useLowerLetters) { checkedBoxes += 1 }
        if (useUpperLetters) { checkedBoxes += 1 }
        if (useNumbers) { checkedBoxes += 1 }
        if (useSymbols) { checkedBoxes += 1 }
        if (checkedBoxes === 1 && currentCheckbox === true) return false
        else return true
    }

    function markStrengthBoxes() {
        const boxes = document.querySelectorAll('.password-generator__strength-box')
        const text = document.querySelector('.password-generator__strength-description')
        if (text) {
            text.textContent = 'Low password strength'
            boxes.forEach(box => box.classList.remove('low-strength'))
            boxes.forEach(box => box.classList.remove('medium-strength'))
            boxes.forEach(box => box.classList.remove('high-strength'))
            if (password.length >= 10 && useSymbols && useNumbers) {
                boxes.forEach(box => box.classList.add('high-strength'))
                text.textContent = 'High password strength'
            } else if (password.length >= 8 && (useSymbols || useNumbers)) {
                boxes[0].classList.add('medium-strength')
                boxes[1].classList.add('medium-strength')
                boxes[2].classList.add('medium-strength')
                text.textContent = 'Average password strength'
            } else if (password.length >= 6) {
                boxes[0].classList.add('low-strength')
                boxes[1].classList.add('low-strength')
            } else if (password.length > 1) {
                boxes[0].classList.add('low-strength')
            }
        }
    }

    return (
        <div className="password-generator">
            <h1 className="password-generator__title">Password Generator</h1>
            <form className="password-generator__form">
                <div className="password-generator__input-container">
                    <div className="password-generator__range-label"><label>Character Length</label><span className="password-generator__range-number">{passLength}</span></div>
                    <input type="range" min="4" max="16" step="1" value={passLength}
                        onChange={(event: any) => setPassLength(event.target.value)} className="password-generator__range-input"></input>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked={useUpperLetters} onChange={() => {
                        if (allowUncheck(useUpperLetters)) {
                            setUpperLetters(!useUpperLetters)
                        }
                    }} />Include Uppercase Letter</label>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked={useLowerLetters} onChange={() => {
                        if (allowUncheck(useLowerLetters)) {
                            setLowerLetters(!useLowerLetters)
                        }
                    }} />Include Lowercase Letter</label>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked={useNumbers} onChange={() => {
                        if (allowUncheck(useNumbers)) {
                            setNumbers(!useNumbers)
                        }
                    }} />Include Numbers</label>
                </div>
                <div className="password-generator__input-container">
                    <label><input type="checkbox" checked={useSymbols} onChange={() => {
                        if (allowUncheck(useSymbols)) {
                            setSymbols(!useSymbols)
                        }
                    }} />Include Symbols</label>
                </div>
            </form>
            <div className="password-generator__strength-container">
                <div className="password-generator__strength-title-container">
                    <h2 className="password-generator__strength-title">Strength</h2>
                    <span className="password-generator__strength-description"></span>
                </div>
                <div className="password-generator__strength-boxes">
                    <div className="password-generator__strength-box"></div>
                    <div className="password-generator__strength-box"></div>
                    <div className="password-generator__strength-box"></div>
                    <div className="password-generator__strength-box"></div>
                </div>
            </div>
            <div className="password-generator__password">
                <span className="password-generator__password-text">{password}</span>
                <button className="password-generator__password-icon" onClick={generatePassword}><img src={refreshIcon} alt="refresh" /></button>
            </div>
            <button className="password-generator__copy-button" onClick={() => navigator.clipboard.writeText(password)}> <img src={copyIcon} alt="copy" /> Copy Password</button>
        </div>
    );
};
