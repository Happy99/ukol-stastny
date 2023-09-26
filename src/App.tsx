import { useState, useEffect } from 'react';
import { TableHead } from './TableHead';
// import { css } from '@emotion/css'

import './App.css';

type ObjectType = {
    id: string;
    name: string,
    description: string,
    colorIdentifier: string,
    // zde pridat dalsi props
}
const numberOfObjects = 10;

const colorIdents = [{
    ident: 'un',
    props: {
        color: 'red'
    }
}, {
    ident: 'deux',
    props: {
        color: 'green'
    }
}, {
    ident: 'trois',
    props: {
        color: 'blue'
    }
}]

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const getRandomNumber = (): number => {
    const randomDecimal = Math.random();
  
    // Scale the random decimal to the range [0, 1, 2]
    const randomNumber = Math.floor(randomDecimal * 3); // 3 because we want numbers from 0 to 2
    return randomNumber;
};

const getRandomIntMinMax = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const generateRandomWord = () => {
    let randomWord: string = '';

    alphabet.map(word => {
        randomWord += alphabet[getRandomIntMinMax(0, alphabet.length)];
    })

    return randomWord;
}

const makeUniqueId = (base: String, i: String) => `${base}-${i}`;

// vyresit colors: any - zkusit nadefinovat vlastni typ
const randomColorIdentifier = (colors: any) => {
    let randomArrayIndex = getRandomNumber();
    // nekontroluju delku pole, vim, ze se vejdu
    return colors[randomArrayIndex].ident;
}   

export default function App() {

    const [objectsArray, setObjectsArray] = useState<ObjectType[]>([]);
    const [filteredObjectsArray, setFilteredObjectsArray] = useState<ObjectType[]>([]);
    const [tableDataColoredCells, setTableDataColoredCells] = useState<string[]>([]);
    const [nextColorIdentSort, setNextnextColorIdentSort] = useState<string>('ascending');
    const [nextIdSort, setNextIdSort] = useState<string>('ascending');

    useEffect(() => {

        const newArray: ObjectType[] = [];
        
        for (let i = 1; i <= numberOfObjects; i++) {
            let randomIdentForObject: string = randomColorIdentifier(colorIdents);

            newArray.push({
                id: makeUniqueId('random', i.toString()),
                name: generateRandomWord(),
                description: generateRandomWord(),
                colorIdentifier: randomIdentForObject,
            });
        }

        setFilteredObjectsArray([...newArray]);
        setObjectsArray([...newArray]);

    }, []); //na konci prazdne pole, projde tedy pouze jednou pri page load 

    // filtruju podle barevneho identifikatoru
    const handleInputFilter = (inputValue: string) => {
        inputValue = inputValue.replace(/\s/g, ''); // odstranim mezery
        console.log('text z inputu: ' + inputValue);

        // metoda filtr mi vrati pouze elementy, ktere splni podminku
        const filteredResult = objectsArray.filter((item) => 
            // object.values spolecne se some projde kazdy prop objektu (vytvori se pole hodnot)
            Object.values(item).some((property) =>
            typeof property === 'string' && property.toLowerCase().includes(inputValue.toLowerCase())
            )
        );

        setFilteredObjectsArray(filteredResult);

        // projekt vyfiltrovane objekty a smazat objekty, ktere se vypisuji jako drive oznacene
    }

    // muze nastat to, ze se vypise oznacene policko, ktere kvuli fitru neni videt
    // po rerendru orig statu by bylo dobre projit oznacena pola a zase je oznacit - pripadne smazat z oznacenych
    const handleTableDataClick = (target: any, cellColorIdent: any, cellRowId: any) => {
        // let cellColorIdent: string = target.parentElement.className;
        let cellColor: string = '';
        // let cellRowId: string = target.parentElement.getAttribute("data-row-id");
        let currentCellsIds: string[] = [...tableDataColoredCells];

        colorIdents.filter(iden => {
            if ( iden.ident === cellColorIdent ) {
                cellColor = iden.props.color
            }
        });

        if ( target.style.backgroundColor === 'white' || target.getAttribute("style") === null ) {
            // barevne
            target.style.backgroundColor = cellColor;

            // if ( !currentCellsIds.includes(cellRowId) ) {
                currentCellsIds = [...currentCellsIds, cellRowId]
            // }

            setTableDataColoredCells(currentCellsIds);

        }
        else {
            // NEbarevne
            target.style.backgroundColor = 'white';
            // currentCellsIds = currentCellsIds.filter(cellId => cellId !== cellRowId);

            // blbe reseni, nutne resit pres filtr, ale pokud je vice policek v jednom radku, 
            // tak je treba delat count daneho ID - bud udelat pole objektu, nebo python list, kde se da ciselne indexovat
            let index = currentCellsIds.indexOf(cellRowId);
            if (index !== -1) {
                currentCellsIds.splice(index, 1);
            }

            
            setTableDataColoredCells(currentCellsIds);
        }
        
        console.log("cellRowId: " + cellRowId);
    };

    // console.log(objectsArray);
    // console.log(filteredObjectsArray);
    console.log(tableDataColoredCells);

    return (
        <div className='container'>
            <input type="text" name="" id="" className='input-filtr' onChange={(e) => handleInputFilter(e.target.value)} />
            <p id="coloredCells">
                {tableDataColoredCells.map(dataCell =>  `${dataCell}`).join(', ')}
            </p>

            <table id='mainDataTable'>

                {/* popremyslet, jestli by nebylo lepsi pridat eventListener na th a td */}

                <TableHead 
                    filteredObjectsArray={filteredObjectsArray} 
                    nextIdSort={nextIdSort} 
                    setNextIdSort={setNextIdSort} 
                    setFilteredObjectsArray={setFilteredObjectsArray}
                    nextColorIdentSort = {nextColorIdentSort}
                    setNextnextColorIdentSort = {setNextnextColorIdentSort}
                />

                <tbody>

                    {filteredObjectsArray.map((object) => (
                        <tr key={object.id}>
                            <td className='table-data-id' onClick={(e) => handleTableDataClick(e.target, object.colorIdentifier, object.id)}>{object.id}</td>
                            <td className='table-data-name' onClick={(e) => handleTableDataClick(e.target, object.colorIdentifier, object.id)}>{object.name}</td>
                            <td className='table-data-description' onClick={(e) => handleTableDataClick(e.target, object.colorIdentifier, object.id)}>{object.description}</td>
                            <td className='table-data-colorIdentifier' onClick={(e) => handleTableDataClick(e.target, object.colorIdentifier, object.id)}>{object.colorIdentifier}</td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div>
    )
}