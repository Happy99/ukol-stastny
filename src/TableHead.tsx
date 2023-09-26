
type TableHead = {
    // nepouzivat any type, priradit types!
    filteredObjectsArray: any, 
    nextIdSort: any, 
    setNextIdSort: any, 
    setFilteredObjectsArray: any, 
    nextColorIdentSort: any, 
    setNextnextColorIdentSort: any
}

export const TableHead = ({filteredObjectsArray, nextIdSort, setNextIdSort, setFilteredObjectsArray, nextColorIdentSort, setNextnextColorIdentSort}: TableHead) => {

    const handleTableHeadClick = (sortBy: string) => {

        // mozna by slo udelat pouze pres funkci sort a object1.sortBy
        switch (sortBy) {
            case 'id':
                let filterIdArray = [...filteredObjectsArray];

                // zde nutno dodelat ciselny sort na unique, abecedni nebude dobre fungovat
                if ( nextIdSort ===  'ascending') {
                    filterIdArray.sort((o_one: any, o_two: any) => {
    
                        if (o_one.id > o_two.id) {
                            return -1;
                        }
                        if (o_one.id < o_two.id) {
                            return 1;
                        }            
    
                        setNextIdSort('descending');
                        return 0;
                    });
                }
                else {
                    filterIdArray.sort((o_one: any, o_two: any) => {
    
                        if (o_one.id < o_two.id) {
                            return -1;
                        }
                        if (o_one.id > o_two.id) {
                            return 1;
                        }            
    
                        setNextIdSort('ascending');
                        return 0;
                    });                    
                }

                setFilteredObjectsArray(filterIdArray);

                break;

            case 'name':
            
                break;

            case 'description':
            
                break;

            case 'colorIdentifier':
                console.log('filtr colorIdentifier');
                let filterCiArray = [...filteredObjectsArray];

                console.log("filtr puvodni: " + filterCiArray);
                console.log("nextColorIdentSort: " + nextColorIdentSort);

                if ( nextColorIdentSort ===  'ascending') {
                    filterCiArray.sort((o_one: any, o_two: any) => {
    
                        if (o_one.colorIdentifier > o_two.colorIdentifier) {
                            return -1;
                        }
                        if (o_one.colorIdentifier < o_two.colorIdentifier) {
                            return 1;
                        }            
    
                        setNextnextColorIdentSort('descending');
                        return 0;
                    });
                }
                else {
                    filterCiArray.sort((o_one: any, o_two: any) => {
    
                        if (o_one.colorIdentifier < o_two.colorIdentifier) {
                            return -1;
                        }
                        if (o_one.colorIdentifier > o_two.colorIdentifier) {
                            return 1;
                        }            
    
                        setNextnextColorIdentSort('ascending');
                        return 0;
                    });                    
                }

                console.log(filterCiArray);
                setFilteredObjectsArray(filterCiArray);

                break;

            default:
                break;
        }
        
    }

    return (
        <thead>
            <tr>
                <th onClick={() => handleTableHeadClick('id')}>Id</th>
                <th onClick={() => handleTableHeadClick('name')}>Název</th>
                <th onClick={() => handleTableHeadClick('description')}>Popis</th>
                <th onClick={() => handleTableHeadClick('colorIdentifier')}>Barevný identifikátor</th>
            </tr>
        </thead>
    )
}