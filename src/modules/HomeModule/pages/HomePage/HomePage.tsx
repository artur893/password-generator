import React, { useEffect, useState } from "react";
import "./HomePage.scss";

interface IProps {
  msg: string;
}

export const HomePage: React.FC<IProps> = ({ msg }) => {
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState<string>()

  const passParams = {
    length: 20,
    passSource: {
      lowerLetters: true,
      upperLetters: true,
      numbers: true,
      symbols: true
    }
  }

  const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const upperLetters = lowerLetters.map(elem => elem.toUpperCase())
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '?']

  let availableSigns: string[][] = []

  function getRandomOne(collection: string | string[] | string[][]) {
    return collection[Math.floor(Math.random() * collection.length)]
  }

  function createAvailableSigns() {
    const updatedSigns = []
    if (passParams.passSource.lowerLetters) { updatedSigns.push(lowerLetters) }
    if (passParams.passSource.upperLetters) { updatedSigns.push(upperLetters) }
    if (passParams.passSource.numbers) { updatedSigns.push(numbers) }
    if (passParams.passSource.symbols) { updatedSigns.push(symbols) }
    availableSigns = updatedSigns
  }


  function generatePassword() {
    const password = []
    for (let i = 1; i <= passParams.length; i++) {
      password.push(getRandomOne(getRandomOne(availableSigns)))
    }

    setPassword(password.join(''))
  }

  useEffect(() => {
    createAvailableSigns()
    generatePassword()
  }, [])

  return (
    <>
      <h1>{msg}</h1>
      <div className="card">
        <p>
          See the README.md for more information on how to start your challenge.
        </p>
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>password is {password}</p>
      </div>
    </>
  );
};
